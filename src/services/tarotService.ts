// src/services/tarotService.ts
import axios from 'axios';

const API_URL = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';// 通义千问API的URL
const ACCESS_KEY_ID = 'sk-8c81c9dddb524547976e9571b7fdbf37'; // 替换为你的AccessKey ID


interface TarotResponse {   }
    
export const getTarotCardDescription = async (cardName: string, name: string): Promise<string> => {
  try {
    const response = await axios.post(API_URL, {
      model: "qwen-turbo",
      messages: [
        {
          role: "user",
          content: `生成一张名为 "${cardName}" 的塔罗牌的文案，针对用户 ${name}。`
        }
      ],
      temperature: 0.7,
    }, {
      headers: {
        'Authorization': `Bearer ${ACCESS_KEY_ID}`,
        'Content-Type': 'application/json'
        

      }
    });
    if (!response.data.choices || response.data.choices.length === 0) {
        throw new Error('No choices returned from API');
      }
  
      return response.data.choices[0].text.trim();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.message);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        }
      } else {
        console.error('Unexpected error:', error);
      }
      throw error;
    }
};