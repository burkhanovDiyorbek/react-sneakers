import { useContext, useState } from "react";
import Search from "../../../public/assets/icons/search.svg";
import { Card } from "./components/Card";
import { CardSkleton } from "./components/CardSkleton";
import { Basket } from "./components/Basket";
import { Context } from "../../App";

export const Home = () => {
  const [searchValue, setSearchValue] = useState("");

  const {
    showBasket,
    setShowBasket,
    isChange,
    setChange,
    sumOfPrice,
    isLoading,
    dataArr,
    isAddedArr,
  } = useContext(Context);

  document.body.style = `overflow:${showBasket ? "hidden" : "auto"};`;

  return (
    <>
      <section className="home-section">
        <div className="container">
          <img src="./assets/header.jpg" alt="header img" />
          <div className="home-title">
            <h2>
              {searchValue ? `Search for: "${searchValue}"` : "Все кроссовки"}
            </h2>
            <label htmlFor="searchInp">
              <Search />
              <input
                type="text"
                placeholder="Поиск..."
                id="searchInp"
                onInput={(e) => setSearchValue(e.target.value)}
              />
            </label>
          </div>
          <div className="cards">
            {isLoading &&
              Array(12)
                .fill(0)
                .map((_, index) => <CardSkleton key={index} />)}
            {dataArr
              ?.filter((item) =>
                searchValue
                  ? item.title.toLowerCase().includes(searchValue.toLowerCase())
                  : item
              )
              .map((item) => {
                const { title, price, id, isAdded, isLiked, imgUrl } = item;
                return (
                  <Card
                    key={id}
                    img={imgUrl}
                    title={title}
                    price={price}
                    isAdded={isAdded}
                    isLiked={isLiked}
                    id={id}
                    setChange={setChange}
                    isChange={isChange}
                  />
                );
              })}
            {dataArr?.filter((item) =>
              searchValue
                ? item.title.toLowerCase().includes(searchValue.toLowerCase())
                : item
            ).length == 0 &&
              searchValue && <p>Nothing to see... :(</p>}
          </div>
        </div>
      </section>
      {showBasket && (
        <Basket
          data={isAddedArr}
          setShowBasket={setShowBasket}
          showBasket={showBasket}
          setChange={setChange}
          isChange={isChange}
          sumOfPrice={sumOfPrice}
        />
      )}
    </>
  );
};
