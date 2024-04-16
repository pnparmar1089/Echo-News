import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Save = () => {
  const [savenews, setSavenews] = useState([]);
  const [email, setEmail] = useState("");
  const Navigate = useNavigate();
  useEffect(() => {
    function checkauth() {
      axios
        .get("http://localhost:3001/api/auth/checkAuth", {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((result) => {
          // console.log(result)
          if (result.data.status === "error") {
            Navigate("/Login");
          }
          if (result.data.status === "ok") {
            let email = result.data.email;
            setEmail(email)
          }
        })
        .catch((err) => console.log(err));
    }

    checkauth();

    function saved() {
      axios
        .get("http://localhost:3001/api/save/saved", {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((result) => {
          // console.log(result);
          if (result.data.status === "ok") {
            setSavenews(result.data.news);
            // console.log(result)
          }
        })
        .catch((err) => console.log(err));
    }

    saved();
  }, [savenews]);

  async function Delete(id) {

    await axios
      .post("http://localhost:3001/api/save/delete", {
        email,id
      })
      .then((result) => {
        // console.log(result);
        if (result.data.error === "News deleted successfully") {
          alert("Delete News Successfully");
        }
        if (result.data.error === "Error to find news") {
          alert("Error in Deleteing news");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Saved News</h2>
      <div className="flex justify-center">
        <div className="flex flex-wrap gap-4 justify-center">
          {savenews.map((article) => (
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4">
              <a href={article.url}>
                <img className="rounded-t-lg" src={article.urlToImage} alt="" />
              </a>
              <div className="p-5">
                <a href={article.url}>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {article.title}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {article.description}
                </p>
                <a
                  href={article.url}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
                >
                  Read more
                </a>
                <button
                  onClick={() => {Delete(article._id)}}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Save;
