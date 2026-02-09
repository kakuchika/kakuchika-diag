import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { jobTypes } from '@/data/questions';

export default function ResultScreen({ scores }) {
  // ※ここではスコア計算後の「勝者（最も高い職種）」判定ロジックが必要です
  // 仮で「sales」をトップとします
  const bestMatchKey = "sales"; 
  const resultJob = jobTypes[bestMatchKey];

  // グラフ用データ
  const chartData = [
    { subject: '行動力', A: 120, fullMark: 150 },
    { subject: '対人力', A: 98, fullMark: 150 },
    { subject: '分析力', A: 86, fullMark: 150 },
    { subject: '創造力', A: 99, fullMark: 150 },
    { subject: '技術力', A: 85, fullMark: 150 },
  ];

  const handleLineClick = () => {
    // 公式LINEへ飛ばす（パラメータ付きURLなども可）
    window.location.href = `https://line.me/R/ti/p/@kakuchika?text=${encodeURIComponent(resultJob.lineMessage)}`;
  };

  return (
    <div className="p-6 pb-20 animate-fade-in">
      <div className="text-center mb-6">
        <p className="text-sm text-gray-500 font-bold">診断完了！あなたの適職は...</p>
        <h2 className="text-3xl font-bold text-slate-800 mt-2">{resultJob.title}</h2>
      </div>

      {/* メインビジュアル（職種イラスト） */}
      <div className="w-full aspect-video bg-gray-200 rounded-xl mb-6 flex items-center justify-center">
        <span className="text-gray-400">Result Illustration</span>
        {/* <img src={resultJob.img} className="w-full h-full object-cover" /> */}
      </div>

      {/* レーダーチャート */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        <h3 className="text-center text-sm font-bold text-gray-500 mb-2">基礎ステータス分析</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
              <Radar name="User" dataKey="A" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.4} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 解説テキスト */}
      <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 mb-8">
        <h3 className="font-bold text-blue-800 mb-2">💡 なぜ向いている？</h3>
        <p className="text-sm text-blue-900 leading-relaxed">
          {resultJob.desc}
          <br/>
          あなたは「考えるより動く」タイプ。失敗を恐れない姿勢は、変化の激しい営業現場で最大の武器になります。
        </p>
      </div>

      {/* LINE誘導ボタン（固定フッター風でもOK） */}
      <button 
        onClick={handleLineClick}
        className="w-full bg-[#06C755] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#05b34c] transition flex items-center justify-center gap-2"
      >
        <span>LINEで求人を見る ▶︎</span>
      </button>

      <div className="mt-4 flex gap-2 justify-center">
        <button className="bg-black text-white px-4 py-2 rounded text-sm">Xで結果をシェア</button>
      </div>
    </div>
  );
}