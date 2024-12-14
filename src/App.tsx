import './App.css'
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { FacebookShareButton, TwitterShareButton, EmailShareButton, FacebookIcon, TwitterIcon, EmailIcon } from 'react-share';

const tarotCards = [
  { name: "The Fool", meaning: "Today marks a new beginning. Embrace the unknown and infinite possibilities ahead.", image: "public/image/tarot/愚者.jpg", keywords:"Adventure", customMessage:"As you step into the unknown, remember that every adventure comes with its own set of challenges and rewards.{name}, keep an open mind and heart, and let the journey unfold." },
  { name: "The Magician", meaning: "You have the power to manifest your dreams. Focus and channel your energy into your goals.", image: "public/image/tarot/魔术师.jpg", keywords:"Manifestation", customMessage:"With the right focus and determination, you can turn your dreams into reality. {name},believe in your abilities and take action."},
  { name: "The High Priestess", meaning: "Trust your intuition. Your inner wisdom will guide you to success.", image: "public/image/tarot/女祭司.jpg", keywords:"Intuition", customMessage:"Listen to the quiet voice within. {name},it holds the answers you seek and the guidance you need." },
  { name: "The Empress", meaning: "Creativity and abundance surround you. Enjoy the beauty of life today.", image: "public/image/tarot/女皇.jpg", keywords:"Abundance", customMessage:"{name},nurture your creative side and embrace the fruitful opportunities that come your way." },
  { name: "The Emperor", meaning: "Today is a great day for planning and pursuing your goals with confidence.", image: "public/image/tarot/皇帝.jpg" , keywords:"Confidence", customMessage:"Stand firm in your decisions and take charge of your path. {name},your leadership will pave the way for success."},
  { name: "The Hierophant", meaning: "Seek knowledge and wisdom from traditions or mentors. An important insight is coming your way.", image: "public/image/tarot/教皇.jpg", keywords:"Wisdom", customMessage:"{name},embrace the teachings of those who have come before you. Their guidance can provide valuable insights for your journey." },
  { name: "The Lovers", meaning: "Relationships flourish with harmony today. Love and support are all around you.", image: "public/image/tarot/恋人.jpg", keywords:"Connection", customMessage:"{name},nurture your relationships with love and understanding. They are the foundation of your happiness and success."},
  { name: "The Chariot", meaning: "Charge ahead with determination. Victory is within your reach!", image: "public/image/tarot/战车.jpg", keywords:"Victory", customMessage:"With perseverance and focus, you can overcome any obstacle. {name},keep pushing forward towards your goals." },
  { name: "Strength", meaning: "You possess incredible inner strength. Stay confident and overcome any challenges.", image: "public/image/tarot/力量.jpg", keywords:"Courage", customMessage:"{name},face your fears with bravery and know that you have the power to triumph over any adversity." },
  { name: "The Hermit", meaning: "Take some time for introspection. You’ll find new inspiration and clarity.", image: "public/image/tarot/隐士.jpg", keywords:"Reflection", customMessage:"In the quiet moments of solitude,{name}, you can gain a deeper understanding of yourself and your path." },
  { name: "Wheel of Fortune", meaning: "Luck is turning in your favor. Expect positive changes to unfold.", image: "public/image/tarot/命运之轮.jpg", keywords:"Fortune", customMessage:"The tides of fortune are shifting.{name}, stay adaptable and be ready to seize new opportunities." },
  { name: "Justice", meaning: "Fairness and integrity are your allies. Stand by your principles, and you’ll be rewarded.", image: "public/image/tarot/正义.jpg", keywords:"Justice", customMessage:"{name},act with honesty and fairness, and trust that the universe will reflect these values back to you." },
  { name: "The Hanged Man", meaning: "A new perspective brings new opportunities. Embrace change.", image: "public/image/tarot/倒吊人.jpg", keywords:"Adaptability", customMessage:"Sometimes, looking at things from a different angle can open up new possibilities. {name},be open to change and growth." },
  { name: "Death", meaning: "The end of an old cycle leads to a fresh start. Transformation brings growth.", image: "public/image/tarot/死神.jpg", keywords:"Rebirth", customMessage:"Let go of the old to make way for the new. {name},embrace the transformation and growth that comes with it." },
  { name: "Temperance", meaning: "Harmony and balance define your day. Embrace peace and stability.", image: "public/image/tarot/节制.jpg", keywords:"Balance", customMessage:"{name},strive for moderation in all things. It is through balance that you find harmony and success." },
  { name: "The Devil", meaning: "Break free from any limitations. You have the strength to overcome fears and doubts.", image: "public/image/tarot/恶魔.jpg", keywords:"Liberation", customMessage:"Do not let fear hold you back. {name},face your challenges head-on and break free from the chains that bind you." },
  { name: "The Tower", meaning: "Change brings growth. Today is the start of something transformative.", image: "public/image/tarot/高塔.jpg", keywords:"Transformation", customMessage:"Sometimes drastic changes are necessary for growth.{name}, embrace the upheaval and look forward to the new beginnings." },
  { name: "The Star", meaning: "A day full of hope and inspiration. Follow your dreams with renewed energy.", image: "public/image/tarot/星星.jpg", keywords:"Hope", customMessage:"Believe in your dreams and trust that you have the power to make them a reality.{name}, your journey is lit by the stars." },
  { name: "The Moon", meaning: "Your creativity and imagination will guide you to new possibilities.", image: "public/image/tarot/月亮.jpg", keywords:"Imagination", customMessage:"{name},let your mind wander and explore the depths of your creativity. It will lead you to new and exciting paths." },
  { name: "The Sun", meaning: "A joyful and successful day is ahead. Bask in the positive energy around you.", image: "public/image/tarot/太阳.jpg", keywords:"Joy", customMessage:"Let the warmth of the sun fill your heart and mind.{name}, embrace the happiness and success that comes your way." },
  { name: "Judgement", meaning: "It’s time for awakening and renewal. Embrace the challenges of the future.", image: "public/image/tarot/审判.jpg", keywords:"Renewal", customMessage:"Take this opportunity to reflect on your past and prepare for a fresh start. {name},the future holds great potential." },
  { name: "The World", meaning: "A day of fulfillment and achievement. You are moving towards a brighter future.", image: "public/image/tarot/世界.jpg", keywords:"Fulfillment",customMessage:"{name},celebrate your accomplishments and know that your hard work is leading you towards a brighter tomorrow." },
];


interface TarotCard {
  name: string;
  image: string;
  meaning: string;
  customMessage: string | undefined;
  keyword: string;
}


// const generateCustomMessage = (cardName, name) => {
//   const messages = [
//     "The Fool": `As the Fool, you are embarking on a new journey today, ${name}. Embrace the unknown and the infinite possibilities ahead.`,
//     // ... 为每张塔罗牌生成个性化信
//   ];
//   return messages[cardName] || "You've pulled a unique card today, signaling a day ahead brimming with enigmatic delights and unexpected surprises";
// };


const App = () => {
  const [name, setName] = useState('');
  const [todayTarot, setTodayTarot] = useState<TarotCard | null>(null);
 
  const [canCheckIn, setCanCheckIn] = useState(true);

  useEffect(() => {
    localStorage.removeItem("lastCheckIn");
    const lastCheckIn = localStorage.getItem("lastCheckIn");
    const today = dayjs().format("YYYY-MM-DD");
    
    if (lastCheckIn === today) {
      const savedCard = JSON.parse(localStorage.getItem("signedInCard") || '{}');
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
    //const customMessage = generateCustomMessage(chosenCard.name, name);
    const customMessage = chosenCard.customMessage? chosenCard.customMessage.replace("{name}", name)
    : `You've pulled a unique card today, ${name}. It foretells a day ahead brimming with enigmatic delights and unexpected surprises.`;;
    const keyword = chosenCard.keywords; // 示例关键词，可以根据牌面内容动态生成
    localStorage.setItem("lastCheckIn", dayjs().format("YYYY-MM-DD"));
    localStorage.setItem("signedInCard", JSON.stringify({ ...chosenCard, customMessage, keyword }));
    setTodayTarot({ 
      ...chosenCard, customMessage, keyword,
     });
    setCanCheckIn(false);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Daily tarot fortune</h1>
      {todayTarot && (
        <div>
          <h2>{todayTarot.name}</h2>
          <img src={todayTarot.image} alt={todayTarot.name} style={{width:"200px",borderRadius:"10px"}} />
          <p>✨{todayTarot.meaning}</p>
          <p>Today's keyword:{todayTarot.keyword}</p>
          <p>🌟{todayTarot.customMessage}🚀</p>
          
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
        className="tarot-button"
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
      {todayTarot && (
        <div>
          <FacebookShareButton
            url={window.location.href}
            quote={todayTarot.customMessage}
            hashtag="#tarotfortune"
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton
            url={window.location.href}
            title={todayTarot.customMessage}
            hashtags={['tarotfortune']}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <EmailShareButton
            url={window.location.href}
            subject={`Your Daily Tarot Fortune - ${todayTarot.name}`}
            body={todayTarot.customMessage}
          >
            <EmailIcon size={32} round />
          </EmailShareButton>
        </div>
      )}
    </div>
  );
};

export default App
