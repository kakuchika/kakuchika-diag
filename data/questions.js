// data/questions.js
export const questions = [
  // A: 営業系 (Action/Comm)
  {
    id: 1,
    text: "ライバルには絶対に負けたくないと思う。",
    category: "sales",
    chat: {
      student: "勝ち負けとか、ちょっと古くない？",
      mentor: "甘いな。ビジネスは結果が全てだ。この『なにくそ根性』が、成長スピードを倍にするんだよ。"
    }
  },
  {
    id: 2,
    text: "初対面の人とすぐに打ち解けられる方だ。",
    category: "sales",
    chat: {
      student: "ただのおしゃべり好きじゃダメ？",
      mentor: "『信頼関係』を築くスピードは才能だ。営業において最強の武器になるぞ。"
    }
  },
  // B: マーケ系 (Logic/Idea)
  {
    id: 3,
    text: "数字のデータを見て、そこから法則を見つけるのが好きだ。",
    category: "marketing",
    chat: {
      student: "数字を見ると頭が痛くなるんだけど…",
      mentor: "逆に、数字という『事実』から正解を導き出せるなら、マーケターとしての素質は抜群だ。"
    }
  },
  // ... (以下20問まで続く)
];

// 職種データ
export const jobTypes = {
  sales: {
    title: "法人営業・個人営業",
    desc: "圧倒的な行動力と対人スキルで成果を出す、ビジネスの特攻隊長。",
    img: "/images/sales.png", // 用意した画像パス
    color: "bg-blue-500",
    lineMessage: "営業のインターンを希望"
  },
  marketing: {
    title: "Webマーケティング",
    desc: "数字と仮説で人の心を動かす、市場の戦略家。",
    img: "/images/marketing.png",
    color: "bg-yellow-500",
    lineMessage: "マーケティングのインターンを希望"
  },
  // 他の職種...
};