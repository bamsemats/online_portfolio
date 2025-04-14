import { useState, useEffect, useRef } from "react";
import Data from "./data";
import "./styles.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function LoadMore() {
  const [cards, setCards] = useState([]);
  const [loadMore, setLoadMore] = useState(0);
  const [loading, setLoading] = useState(false);
  const isFirstRender = useRef(true);

  async function grabData() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${loadMore * 20}`
      );
      const data = await response.json();
      if (data && data.products && data.products.length) {
        setCards((prev) => [...prev, ...data.products]);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error grabbing data:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    grabData();
  }, [loadMore]);

  function handleClick() {
    setLoadMore((prev) => prev + 1);
  }

  function handleReset() {
    setLoadMore(0);
    setCards([]);
  }

  return (
    <div className="app-container bento-load-more">
      <span className="title-text ">Load More</span>

      <div className="load-more-div">
        {cards.map((object) => {
          return (
            <div className="card-container" key={object.id}>
              <img src={object.images[0]} className="card-object-image" />
              <p className="card-object-name">{object.title}</p>
            </div>
          );
        })}
      </div>
      {loading && (
        <div>
          {" "}
          <AiOutlineLoading3Quarters className="loading-image" />
          Loading data... Please wait.
        </div>
      )}
      <button
        className="button"
        onClick={loadMore < 4 ? handleClick : handleReset}
        disabled={loading}
      >
        {loading ? "Loading..." : loadMore >= 4 ? "Reset" : "Load more..."}
      </button>
    </div>
  );
}
