import { useContext } from "react";
import { Card } from "../Home/components/Card";
import Back from "../../../public/assets/icons/back.svg";
import Arrow from "../../../public/assets/icons/arror.svg";
import { Link, useNavigate } from "react-router-dom";
import { Drawer } from "../Home/components/Drawer";

import { Context } from "../../App";

export const Purchases = () => {
  const navigate = useNavigate();

  const { showBasket, likedItems } = useContext(Context);

  return (
    <>
      <section className="purchases-container">
        <div className="container">
          {likedItems.length ? (
            <>
              <div className="title">
                <Link to={"/"}>
                  <Back />
                </Link>
                <h2>Мои закладки</h2>
              </div>
              <div className="cards">
                {likedItems.map((item) => {
                  const { img, title, price, id } = item;
                  return (
                    <Card
                      key={id}
                      id={id}
                      img={img}
                      title={title}
                      price={price}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <div className="show-empty">
              <img src="./assets/sticker-2.png" alt="sticker" />
              <h2>Закладок нет :(</h2>
              <p>Вы ничего не добавляли в закладки</p>
              <button onClick={() => navigate("/")}>
                <Arrow />
                Вернуться назад
              </button>
            </div>
          )}
        </div>
      </section>
      {showBasket && <Drawer />}
    </>
  );
};
