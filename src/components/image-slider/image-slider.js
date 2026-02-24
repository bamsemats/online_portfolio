import { useEffect, useState } from "react";
import data from "./data";
import {
  BsArrowLeftCircleFill,
  BsArrowRightCircleFill,
  BsCircleFill,
  BsCircle,
} from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "./styles.css";
import matchersStandalone from "@testing-library/jest-dom/matchers";
import { IoImagesSharp } from "react-icons/io5";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

export default function ImageSlider() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const randomNumber = Math.floor(Math.random() * 10);

  async function grabData() {
    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${randomNumber}&limit=10`
      );
      const data = await response.json();

      data.forEach((item) => {
        const img = new Image();
        img.src = item.download_url;
      });

      setImages(data);

      images.forEach((item) => {
        const img = new Image();
        img.src = item.download_url;
      });
    } catch (e) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    grabData();
  }, []);

  function handleClickRight() {
    if (currentPage < 10) {
      setCurrentPage((prev) => prev + 1);
    } else return;
  }

  function handleClickLeft() {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else return;
  }

  return (
    <div className="app-container image-slider-container bento-image-slider">
      <span className="title-text">Image Slider</span>
      <AiOutlineLoading3Quarters className="loading-image-slider" />
      <div className="image-slider-div">
        {images.map((object, i) => {
          if (i + 1 === currentPage) {
            return (
              <img src={object.download_url} className="image-slide" key={i} />
            );
          }
        })}
        <button className="slider-button left" onClick={handleClickLeft}>
          <FaRegArrowAltCircleLeft />
        </button>
        <button className="slider-button right" onClick={handleClickRight}>
          <FaRegArrowAltCircleRight />
        </button>
      </div>
      <div className="circle-div">
        {images.map((object, i) => {
          if (i + 1 === currentPage) {
            return (
              <BsCircleFill
                className="circle-element-filled"
                key={`arrow-${i}`}
              />
            );
          } else {
            return (
              <BsCircleFill className="circle-element" key={`arrow-${i}`} />
            );
          }
        })}
      </div>
    </div>
  );
}
