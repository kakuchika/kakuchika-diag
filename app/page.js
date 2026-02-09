"use client";
import { useState } from 'react';
import StartScreen from '@/components/StartScreen';
import QuestionScreen from '@/components/QuestionScreen';
import ResultScreen from '@/components/ResultScreen';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState('start'); // start, question, result
  const [scores, setScores] = useState({ sales: 0, marketing: 0, consulting: 0, engineer: 0 });

  // 画面遷移関数
  const startDiagnosis = () => setCurrentScreen('question');
  
  const finishDiagnosis = (finalScores) => {
    setScores(finalScores);
    setCurrentScreen('result');
  };

  return (
    <main className="min-h-screen bg-white text-gray-800 font-sans">
      <div className="max-w-md mx-auto bg-gray-50 min-h-screen shadow-xl overflow-hidden relative">
        {/* ヘッダー（共通） */}
        <header className="bg-white p-4 text-center border-b sticky top-0 z-10">
          <h1 className="font-bold text-lg text-slate-700">カクチカ適性インターン診断</h1>
        </header>

        {/* 画面切り替え */}
        {currentScreen === 'start' && <StartScreen onStart={startDiagnosis} />}
        {currentScreen === 'question' && <QuestionScreen onFinish={finishDiagnosis} />}
        {currentScreen === 'result' && <ResultScreen scores={scores} />}
      </div>
    </main>
  );
}