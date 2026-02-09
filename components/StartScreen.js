export default function StartScreen({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] p-6 text-center">
      {/* イラストエリア（画像プレースホルダー） */}
      <div className="w-64 h-64 mb-8 bg-gray-200 rounded-full flex items-center justify-center">
        <span className="text-gray-400 text-sm">Top Illustration</span>
        {/* <img src="/images/top_ill.png" alt="診断" /> */}
      </div>

      <h2 className="text-2xl font-bold mb-4 text-slate-800">
        あなたの<span className="text-blue-600">「得意」</span>を、<br/>仕事に変える。
      </h2>
      <p className="text-gray-500 mb-10 text-sm leading-relaxed">
        性格、思考パターン、隠れた才能。<br/>
        20の質問で、あなたに本当に合った<br/>
        インターン職種を解析します。
      </p>

      <button 
        onClick={onStart}
        className="w-full bg-slate-800 text-white font-bold py-4 rounded-full shadow-lg hover:bg-slate-700 transition transform hover:scale-105"
      >
        診断を始める ▶︎
      </button>
    </div>
  );
}