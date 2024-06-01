import { useContext, useState } from "react";
import Search from "../../../public/assets/icons/search.svg";
import { Card } from "./components/Card";
import { CardSkleton } from "./components/CardSkleton";
import { Drawer } from "./components/Drawer";
import { Context } from "../../App";

export const Home = () => {
  const [searchValue, setSearchValue] = useState("");

  const { showBasket, isLoading, items, onRemove } = useContext(Context);

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
            {items
              .filter((item) =>
                item.title.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((item) => {
                const { id, title, price, imgUrl } = item;
                return (
                  <Card
                    key={id}
                    id={id}
                    img={imgUrl}
                    title={title}
                    price={price}
                    onRemove={onRemove}
                  />
                );
              })}
            {/* {items?.filter((item) =>
              searchValue
                ? item.title.toLowerCase().includes(searchValue.toLowerCase())
                : item
            ).length == 0 &&
              searchValue && <p>Nothing to see... :(</p>} */}
          </div>
        </div>
      </section>
      {showBasket && <Drawer />}
    </>
  );
};
