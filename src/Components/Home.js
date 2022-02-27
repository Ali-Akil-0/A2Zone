import React from "react";
import "./Home.css";
import Product from "./Product";
const Home = () => {
  const bannersrc =
    "https://m.media-amazon.com/images/I/61TD5JLGhIL._SX3740_.jpg";
  // "https://www.junglescout.com/wp-content/uploads/2020/05/Prime-day-banner.png";
  return (
    <div className="home">
      <div className="home__container">
        {/* Banner */}
        <img className="home__banner" alt="Banner" src={bannersrc} />
        <div className="home__row">
          <Product
            id={100}
            rating={5}
            price={200}
            title="title two"
            image="https://edit.org/images/cat/book-covers-big-2019101610.jpg"
          />
          <Product
            id={100}
            rating={5}
            price={200}
            title="title"
            image="https://edit.org/images/cat/book-covers-big-2019101610.jpg"
          />
          {/* <Product /> */}
        </div>
        <div className="home__row">
          <Product
            id={100}
            rating={5}
            price={200}
            title="title 3"
            image="https://edit.org/images/cat/book-covers-big-2019101610.jpg"
          />
          <Product
            id={100}
            rating={5}
            price={200}
            title="title 4"
            image="https://edit.org/images/cat/book-covers-big-2019101610.jpg"
          />
          <Product
            id={100}
            rating={5}
            price={200}
            title="title 5"
            image="https://edit.org/images/cat/book-covers-big-2019101610.jpg"
          />
        </div>
        <div className="home__row">
          {/* <Product /> */}
          <Product
            id={100}
            rating={5}
            price={200}
            title="title 6"
            image="https://edit.org/images/cat/book-covers-big-2019101610.jpg"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
