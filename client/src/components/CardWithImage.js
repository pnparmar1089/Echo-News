import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

const CardWithImage = ({ article }) => {
  const Navigate = useNavigate();

  function save(article) {
    const source_id = article.source.id;
    const source_name = article.source.name;
    const author = article.author;
    const title = article.title;
    const description = article.description;
    const url = article.url;
    const urlToImage = article.urlToImage;
    const publishedAt = article.publishedAt;
    const content = article.content;

    function checkAuth() {
      axios
        .get("http://localhost:3001/api/auth/checkAuth", {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((result) => {
          if (result.data.status === "ok") {
            const email = result.data.email;
            axios
              .post("http://localhost:3001/api/save/save", {
                email,
                source_id,
                source_name,
                author,
                title,
                description,
                url,
                urlToImage,
                publishedAt,
                content,
              })
              .then((result) => {
                // console.log(result);
                if (result.data.error == "saved!") {
                  alert("News Saved!");
                }
                if (result.data.error == "not save") {
                  alert("News not Save!");
                }
                if (result.data.error == "alredy saved!") {
                  alert("Already saved News!");
                }
              })
              .catch((err) => console.log(err));
          } else {
            Navigate("/Login");
          }
        })
        .catch((err) => console.log(err));
    }

    checkAuth();
  }

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow m-4">
      <a href={article.url}>
        <img className="rounded-t-lg" src={article.urlToImage} alt="" />
      </a>
      <div className="p-5">
        <a href={article.url}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {article.title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700">
          {article.description}
        </p>
        <a
          href={article.url}
          className="inline-flex items-center px-3 py-2 mx-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
        >
          Read more
        </a>
        <a
          onClick={() => {
            save(article);
          }}
          className="inline-flex items-center px-3 py-2 mx-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
        >
          <FontAwesomeIcon icon={faBookmark} /> <span className="mx-2">Save</span>
        </a>
      </div>
    </div>
  );
};

export default CardWithImage;
