import { useState, useRef } from 'react';
import { questions } from '@/data/questions';

export default function QuestionScreen({ onFinish }) {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const bottomRef = useRef(null); 

  // データがない場合のエラー回避
  if (!questions || questions.length === 0) {
    return <div className="p-8 text-center">データ読み込み中...</div>;
  }

  const currentQ = questions[currentQIndex];
  const progress = ((currentQIndex + 1) / questions.length) * 100;

  const handleAnswer = (score) => {
    const newAnswers = { ...answers, [currentQ.id]: score };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQIndex < questions.length - 1) {
        setCurrentQIndex(currentQIndex + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        onFinish(newAnswers); 
      }
    }, 300);
  };

  // ★ひとつ前に戻る機能
  const handleBack = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex(currentQIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      {/* 進捗バー */}
      <div className="w-full bg-gray-200 h-2 sticky top-0 z-10">
        <div 
          className="bg-blue-600 h-2 transition-all duration-500 ease-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* 質問エリア */}
      <div className="p-8 bg-white text-center shadow-sm mb-6 relative">
        {/* ★戻るボタン (2問目以降のみ表示) */}
        {currentQIndex > 0 && (
          <button 
            onClick={handleBack}
            className="absolute top-4 left-4 text-gray-400 text-xs font-bold hover:text-blue-500 transition flex items-center gap-1"
          >
            ← ひとつ戻る
          </button>
        )}

        <p className="text-blue-600 font-bold mb-4 text-sm tracking-wider mt-6">QUESTION {currentQIndex + 1} / {questions.length}</p>
        <h3 className="text-xl font-bold text-slate-800 leading-relaxed mb-8">
          {currentQ.text}
        </h3>

        <div className="flex flex-col gap-3 max-w-sm mx-auto">
          {[
            { label: "◎ 非常によくあてはまる", score: 5 },
            { label: "〇 ややあてはまる", score: 3 },
            { label: "△ どちらともいえない", score: 1 },
            { label: "× あまりあてはまらない", score: 0 },
            { label: "×× まったくあてはまらない", score: -2 },
          ].map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option.score)}
              className="w-full border-2 border-slate-200 py-3 rounded-xl text-slate-700 font-bold hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600 transition active:scale-95"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* スクロール誘導 */}
      <div className="text-center py-4 text-gray-400 text-xs animate-bounce">
        ∨ 下にスクロールして解説を見る ∨
      </div>

      {/* チャット解説エリア */}
      <div className="bg-gray-100 p-6 space-y-6 border-t border-gray-200">
        <div className="text-xs text-gray-500 font-bold text-center mb-2">▼ この質問の意図は？ ▼</div>
        
        {/* 学生のフキダシ */}
        <div className="flex items-start gap-3">
          <img 
            src="/images/student_icon.png" 
            alt="学生" 
            className="w-10 h-10 rounded-full bg-orange-100 border-2 border-orange-200 object-cover"
            onError={(e) => e.target.src = 'https://placehold.jp/40/fcd34d/ffffff/?text=学生'}
          />
          <div className="bg-white p-4 rounded-r-2xl rounded-bl-2xl shadow-sm text-sm text-gray-700 leading-relaxed max-w-[85%] relative top-2">
            {currentQ.chat.student}
          </div>
        </div>

        {/* 先輩のフキダシ */}
        <div className="flex items-start gap-3 flex-row-reverse">
          <img 
            src="/images/mentor_icon.png" 
            alt="先輩" 
            className="w-10 h-10 rounded-full bg-blue-800 border-2 border-blue-900 object-cover"
            onError={(e) => e.target.src = 'https://placehold.jp/40/1e40af/ffffff/?text=先輩'}
          />
          <div className="bg-slate-800 p-4 rounded-l-2xl rounded-br-2xl shadow-sm text-sm text-white leading-relaxed max-w-[85%] relative top-2">
            {currentQ.chat.mentor}
          </div>
        </div>
        <div ref={bottomRef} className="h-10" />
      </div>
    </div>
  );
}