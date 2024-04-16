import React, { useEffect, useState } from "react";
import { fetchNews } from "../services/newsApi";
import Cardwithimage from "./CardWithImage";

const NewsList = ({ category, country }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const getNews = async () => {
      try {
        const data = await fetchNews(category, country);
        setNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    getNews();
  }, [category, country]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{category.toUpperCase()} News</h2>
      <div className="flex justify-center">
        <div className="flex flex-wrap gap-4 justify-center">
          {news.map((article) =>
            article.urlToImage != null ? (
              <Cardwithimage key={article.title} article={article} />
            ) : (
              <React.Fragment key={article.title} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsList;
