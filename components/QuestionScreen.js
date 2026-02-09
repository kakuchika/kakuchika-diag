import { useState, useRef, useEffect } from 'react';
import { questions } from '@/data/questions';

export default function QuestionScreen({ onFinish }) {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const bottomRef = useRef(null); // 自動スクロール用

  // データがない場合のエラー回避
  if (!questions || questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  const currentQ = questions[currentQIndex];
  const progress = ((currentQIndex + 1) / questions.length) * 100;

  const handleAnswer = (score) => {
    // 回答を保存
    const newAnswers = { ...answers, [currentQ.id]: score };
    setAnswers(newAnswers);

    // 少し待ってから次の質問へ、または終了
    setTimeout(() => {
      if (currentQIndex < questions.length - 1) {
        setCurrentQIndex(currentQIndex + 1);
        // ページトップへ戻す
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // 集計ロジックへ
        onFinish(newAnswers); 
      }
    }, 400);
  };

  return (
    <div className="pb-20">
      {/* 進捗バー */}
      <div className="w-full bg-gray-200 h-2">
        <div 
          className="bg-blue-600 h-2 transition-all duration-300" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* 質問エリア */}
      <div className="p-8 bg-white text-center animate-fade-in">
        <p className="text-blue-500 font-bold mb-4 text-sm">Q.{currentQIndex + 1}</p>
        <h3 className="text-xl font-bold text-slate-800 leading-relaxed mb-8">
          {currentQ.text}
        </h3>

        <div className="flex flex-col gap-3">
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
              className="w-full border-2 border-slate-200 py-3 rounded-lg text-slate-600 font-bold hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600 transition"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* スクロール誘導 */}
      <div className="text-center py-6 text-gray-400 text-xs animate-bounce">
        ∨ 下にスクロールして解説を見る ∨
      </div>

      {/* チャット解説エリア */}
      <div className="bg-gray-100 p-6 space-y-4 border-t border-gray-200">
        <div className="text-xs text-gray-400 text-center mb-2">▼ この質問の意図は？ ▼</div>
        
        {/* 学生のフキダシ */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center text-xl">🐤</div>
          <div className="bg-white p-3 rounded-r-xl rounded-bl-xl shadow-sm text-sm text-gray-700 max-w-[80%]">
            {currentQ.chat.student}
          </div>
        </div>

        {/* 先輩のフキダシ */}
        <div className="flex items-start gap-3 flex-row-reverse">
          <div className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center text-xl text-white">👤</div>
          <div className="bg-slate-800 p-3 rounded-l-xl rounded-br-xl shadow-sm text-sm text-white max-w-[80%]">
            {currentQ.chat.mentor}
          </div>
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}