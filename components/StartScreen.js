import { useEffect, useState } from 'react';

export default function StartScreen({ onStart }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 bg-white animate-fade-in min-h-[80vh]">
      
      {/* ▼▼▼ ここが画像を表示する部分です ▼▼▼ */}
      <div className="w-full max-w-xs mb-8 flex justify-center">
        <img 
          src="/images/top_illustration.png" 
          alt="診断トップイラスト" 
          className="w-full h-auto object-contain drop-shadow-sm"
          onError={(e) => e.target.style.display = 'none'} // 画像がない時は隠す
        />
      </div>
      {/* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */}

      <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center leading-relaxed">
        あなたの才能が輝く<br/>
        <span className="text-blue-600">本当のインターン職種</span>は？
      </h2>
      
      <p className="text-gray-500 text-sm mb-10 text-center leading-6">
        性格・思考パターン・隠れた才能。<br/>
        20の質問で、あなたに本当に合った<br/>
        インターン職種をAIが解析します。
      </p>

      <button 
        onClick={onStart}
        className="w-full max-w-xs bg-slate-900 text-white font-bold py-4 rounded-full shadow-lg hover:bg-slate-700 hover:shadow-xl transition-all transform hover:scale-105"
      >
        診断を始める ▶︎
      </button>

      <div className="mt-8 text-xs text-gray-400 text-center">
        所要時間：約3分 / 完全無料
      </div>
    </div>
  );
}