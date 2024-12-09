import './App.css'
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

const tarotCards = [
  { name: "The Fool", meaning: "Today marks a new beginning. Embrace the unknown and infinite possibilities ahead.", image: "public/image/tarot/愚者.jpg" },
  { name: "The Magician", meaning: "You have the power to manifest your dreams. Focus and channel your energy into your goals.", image: "public/image/tarot/魔术师.jpg" },
  { name: "The High Priestess", meaning: "Trust your intuition. Your inner wisdom will guide you to success.", image: "public/image/tarot/女祭司.jpg" },
  { name: "The Empress", meaning: "Creativity and abundance surround you. Enjoy the beauty of life today.", image: "public/image/tarot/女皇.jpg" },
  { name: "The Emperor", meaning: "Today is a great day for planning and pursuing your goals with confidence.", image: "public/image/tarot/皇帝.jpg" },
  { name: "The Hierophant", meaning: "Seek knowledge and wisdom from traditions or mentors. An important insight is coming your way.", image: "public/image/tarot/教皇.jpg" },
  { name: "The Lovers", meaning: "Relationships flourish with harmony today. Love and support are all around you.", image: "public/image/tarot/恋人.jpg" },
  { name: "The Chariot", meaning: "Charge ahead with determination. Victory is within your reach!", image: "public/image/tarot/战车.jpg" },
  { name: "Strength", meaning: "You possess incredible inner strength. Stay confident and overcome any challenges.", image: "public/image/tarot/力量.jpg" },
  { name: "The Hermit", meaning: "Take some time for introspection. You’ll find new inspiration and clarity.", image: "public/image/tarot/隐士.jpg" },
  { name: "Wheel of Fortune", meaning: "Luck is turning in your favor. Expect positive changes to unfold.", image: "public/image/tarot/命运之轮.jpg" },
  { name: "Justice", meaning: "Fairness and integrity are your allies. Stand by your principles, and you’ll be rewarded.", image: "public/image/tarot/正义.jpg" },
  { name: "The Hanged Man", meaning: "A new perspective brings new opportunities. Embrace change.", image: "public/image/tarot/倒吊人.jpg" },
  { name: "Death", meaning: "The end of an old cycle leads to a fresh start. Transformation brings growth.", image: "public/image/tarot/死神.jpg" },
  { name: "Temperance", meaning: "Harmony and balance define your day. Embrace peace and stability.", image: "public/image/tarot/节制.jpg" },
  { name: "The Devil", meaning: "Break free from any limitations. You have the strength to overcome fears and doubts.", image: "public/image/tarot/恶魔.jpg" },
  { name: "The Tower", meaning: "Change brings growth. Today is the start of something transformative.", image: "public/image/tarot/高塔.jpg" },
  { name: "The Star", meaning: "A day full of hope and inspiration. Follow your dreams with renewed energy.", image: "public/image/tarot/星星.jpg" },
  { name: "The Moon", meaning: "Your creativity and imagination will guide you to new possibilities.", image: "public/image/tarot/月亮.jpg" },
  { name: "The Sun", meaning: "A joyful and successful day is ahead. Bask in the positive energy around you.", image: "public/image/tarot/太阳.jpg" },
  { name: "Judgement", meaning: "It’s time for awakening and renewal. Embrace the challenges of the future.", image: "public/image/tarot/审判.jpg" },
  { name: "The World", meaning: "A day of fulfillment and achievement. You are moving towards a brighter future.", image: "public/image/tarot/世界.jpg" },
];

const generateCustomMessage = (cardName, name) => {
  const messages = {
    "The Fool": "作为愚者，你今天将勇敢地迈向新旅程。未知的道路充满无限可能，拥抱变化，迎接新的开始。",
    // ... 为每张塔罗牌生成个性化信息
  };
  return messages[cardName] || "今天，你抽到了一张特别的牌，它预示着你的一天将充满神秘和惊喜。";
};


const App = () => {
  const [name, setName] = useState('');
  const [todayTarot, setTodayTarot] = useState(null);
  const [canCheckIn, setCanCheckIn] = useState(true);

  useEffect(() => {
    localStorage.removeItem("lastCheckIn");
    const lastCheckIn = localStorage.getItem("lastCheckIn");
    const today = dayjs().format("YYYY-MM-DD");
    
    if (lastCheckIn === today) {
      const savedCard = JSON.parse(localStorage.getItem("signedInCard"));
      if (savedCard) {
        setTodayTarot(savedCard);
        setCanCheckIn(false);
      }
    }
  }, []);

  const handleCheckIn = () => {
    if (!canCheckIn) return;

    const randomIndex = Math.floor(Math.random() * tarotCards.length);
    const chosenCard = tarotCards[randomIndex];
    const customMessage = generateCustomMessage(chosenCard.name, name);
    const keyword = "控制"; // 示例关键词，可以根据牌面内容动态生成
    localStorage.setItem("lastCheckIn", dayjs().format("YYYY-MM-DD"));
    localStorage.setItem("signedInCard", JSON.stringify({ ...chosenCard, customMessage, keyword }));
    setTodayTarot({ ...chosenCard, customMessage, keyword });
    setCanCheckIn(false);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Daily tarot fortune</h1>
      {todayTarot && (
        <div>
          <h2>{todayTarot.name}</h2>
          <img src={todayTarot.image} alt={todayTarot.name} style={{width:"200px",borderRadius:"10px"}} />
          <p>{todayTarot.meaning}</p>
          <p>✨{todayTarot.customMessage}</p>
          <p>今日关键词：{todayTarot.keyword}</p>
        </div>
      )}
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "10px", margin: "10px" }}
      />
      <button
        onClick={handleCheckIn}
        disabled={!canCheckIn}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: canCheckIn ? "pointer" : "not-allowed",
        }}
      >
        {canCheckIn ? "Sign in" : "Signed in"}
      </button>
    </div>
  );
};

export default App
