import axios from 'axios';
import env from "react-dotenv";

const API_KEY = env.API;
const fetchNews = async (category = 'general',country= 'us') => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}`
    );
    return response.data.articles;
  } catch (error) {
    // console.error('Error fetching news:', error);
    return [];
  }
};

export { fetchNews };
