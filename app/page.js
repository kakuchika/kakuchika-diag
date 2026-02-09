"use client";
import { useState } from 'react';
import StartScreen from '@/components/StartScreen';
import QuestionScreen from '@/components/QuestionScreen';
import ResultScreen from '@/components/ResultScreen';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState('start'); // start, question, result
  const [finalAnswers, setFinalAnswers] = useState({}); // 回答結果を保存

  // 画面遷移関数
  const startDiagnosis = () => {
    setFinalAnswers({}); // 回答をリセット
    setCurrentScreen('question');
  };
  
  const finishDiagnosis = (answers) => {
    setFinalAnswers(answers);
    setCurrentScreen('result');
  };

  // ★追加：最初に戻る関数
  const resetDiagnosis = () => {
    setCurrentScreen('start');
    window.scrollTo({ top: 0, behavior: 'smooth' }); // ページトップへ
  };

  return (
    <main className="min-h-screen bg-white text-gray-800 font-sans">
      <div className="max-w-md mx-auto bg-gray-50 min-h-screen shadow-xl overflow-hidden relative">
        {/* ヘッダー */}
        <header className="bg-white p-4 text-center border-b sticky top-0 z-10">
          <h1 className="font-bold text-lg text-slate-700 cursor-pointer" onClick={resetDiagnosis}>
            カクチカ適性インターン診断
          </h1>
        </header>

        {/* 画面切り替え（★ResultScreenにリセット関数を渡す） */}
        {currentScreen === 'start' && <StartScreen onStart={startDiagnosis} />}
        {currentScreen === 'question' && <QuestionScreen onFinish={finishDiagnosis} />}
        {currentScreen === 'result' && <ResultScreen answers={finalAnswers} onReset={resetDiagnosis} />}
      </div>
    </main>
  );
}