import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { jobTypes, questions } from '@/data/questions';

export default function ResultScreen({ answers, onReset }) {
  // --- 1. スコア計算ロジック ---
  // カテゴリを5つに増やしました
  const scores = { personal: 0, corporate: 0, marketing: 0, consulting: 0, engineer: 0 };
  
  if (answers && Object.keys(answers).length > 0) {
    Object.keys(answers).forEach(qId => {
      const question = questions.find(q => q.id === parseInt(qId));
      if (question && question.category) {
        if (scores[question.category] !== undefined) {
           scores[question.category] += answers[qId];
        }
      }
    });
  }

  // デフォルトは personal に設定
  let bestMatchKey = "personal";
  let maxScore = -999;
  
  Object.keys(scores).forEach(key => {
    if (scores[key] > maxScore) {
      maxScore = scores[key];
      bestMatchKey = key;
    }
  });

  const resultJob = jobTypes[bestMatchKey];

  // --- 2. グラフ用データ ---
  // 5つのカテゴリを6つの能力パラメータに配分して表示
  const chartData = [
    { subject: '行動力', A: (scores.personal || 0) * 5, fullMark: 100 }, // 個人営業力
    { subject: '対人力', A: ((scores.personal || 0) + (scores.corporate || 0)) * 2.5, fullMark: 100 }, // 両営業の合算
    { subject: '分析力', A: (scores.marketing || 0) * 5, fullMark: 100 },
    { subject: '創造力', A: ((scores.marketing || 0) + (scores.engineer || 0)) * 2.5, fullMark: 100 },
    { subject: '技術力', A: (scores.engineer || 0) * 5, fullMark: 100 },
    { subject: '論理力', A: ((scores.consulting || 0) + (scores.corporate || 0)) * 2.5, fullMark: 100 }, // コンサル+法人営業
  ];

  // LINEボタンのクリック動作
  const handleLineClick = () => {
    window.location.href = 'https://line.me/R/ti/p/@571tbhqw';
  };

  // X（Twitter）ボタンのクリック動作
  const handleShare = () => {
    const text = `私の適職は【${resultJob.title}】でした！\nカクチカ適性インターン診断\n#カクチカ`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="p-6 pb-20 animate-fade-in bg-white min-h-screen">
      <div className="text-center mb-6 pt-4">
        <p className="text-sm text-gray-500 font-bold mb-2">診断完了！あなたの適職は...</p>
        <h2 className="text-2xl font-bold text-slate-800">{resultJob.title}</h2>
      </div>

      {/* --- メインビジュアル --- */}
      <div className="w-full aspect-video bg-gray-50 rounded-xl mb-6 flex items-center justify-center border border-gray-100 overflow-hidden shadow-sm">
        {resultJob.img ? (
          <img 
            src={resultJob.img} 
            alt={resultJob.title} 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
            onError={(e) => e.target.style.display = 'none'}
          />
        ) : (
          <span className="text-gray-400 font-bold">画像準備中...</span>
        )}
      </div>

      {/* --- レーダーチャート --- */}
      <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100 mb-6">
        <h3 className="text-center text-xs font-bold text-gray-400 mb-2">▼ 基礎ステータス分析 ▼</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar name="User" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* --- 解説テキスト --- */}
      <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 mb-8">
        <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
          <span>💡</span> なぜ向いている？
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed">
          {resultJob.desc}
        </p>
      </div>

      {/* --- アクションボタン群 --- */}
      <div className="space-y-4">
        {/* LINEボタン */}
        <button 
          onClick={handleLineClick}
          className="w-full bg-[#06C755] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#05b34c] transition flex items-center justify-center gap-2 transform hover:scale-[1.02]"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 5.96 2 10.84C2 13.9 3.93 16.63 6.84 18.15C6.7 18.78 6.44 19.98 6.44 19.98C6.44 19.98 9.53 19.14 11.23 17.96C11.49 17.98 11.74 18 12 18C17.52 18 22 14.04 22 9.16C22 4.28 17.52 2 12 2Z" /></svg>
          <span className="text-sm">公式LINEで自分に合ったインターンを見つける ▶︎</span>
        </button>

        {/* シェアボタン */}
        <button 
          onClick={handleShare}
          className="w-full bg-black text-white font-bold py-4 rounded-xl shadow-lg hover:bg-gray-800 transition flex items-center justify-center gap-2 transform hover:scale-[1.02]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
          <span className="text-sm">X (Twitter) で結果をシェア</span>
        </button>

        {/* もう一度診断するボタン */}
        <div className="text-center pt-6 pb-8">
          <button 
             onClick={onReset} 
             className="text-gray-400 font-bold text-sm border-b border-gray-300 hover:text-blue-500 hover:border-blue-500 transition pb-1"
           >
             🔄 もう一度最初から診断する
           </button>
        </div>
      </div>
    </div>
  );
}