import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Card } from "../Home/components/Card";
import Back from "../../../public/assets/icons/back.svg";
import Arrow from "../../../public/assets/icons/arror.svg";
import { Link, useNavigate } from "react-router-dom";
import { Basket } from "../Home/components/Basket";

import { Context } from "../../App";

export const Purchases = () => {
  const [dataArr, setData] = useState([]);
  const navigate = useNavigate();

  const { showBasket, setChange, isChange } = useContext(Context);

  useEffect(() => {
    axios
      .get("http://localhost:3000/cards")
      .then((data) => setData(data.data.filter((item) => item.isLiked)));
  }, []);
  return (
    <>
      <section className="purchases-container">
        <div className="container">
          {dataArr.length ? (
            <>
              <div className="title">
                <Link to={"/"}>
                  <Back />
                </Link>
                <h2>Мои закладки</h2>
              </div>
              <div className="cards">
                {dataArr.map((item) => {
                  const { imgUrl, title, price, id } = item;
                  return (
                    <Card
                      img={imgUrl}
                      title={title}
                      key={id}
                      id={id}
                      price={price}
                      setChange={setChange}
                      isChange={isChange}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <div className="show-empty">
              <img src="../../../public/assets/sticker.png" alt="" />
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
      {showBasket && <Basket />}
    </>
  );
};
