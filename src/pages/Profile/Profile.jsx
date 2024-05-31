import { Basket } from "../Home/components/Basket";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Back from "../../../public/assets/icons/back.svg";
import Arrow from "../../../public/assets/icons/arror.svg";
import { Card } from "../Home/components/Card";
import { Context } from "../../App";

export const Profile = () => {
  const navigate = useNavigate();
  const [dataArr, setDataArr] = useState([]);

  const { showBasket, setChange, isChange } = useContext(Context);

  useEffect(() => {
    axios
      .get("https://6655455a3c1d3b602938c16d.mockapi.io/dataBuyedSneakers")
      .then((rq) => setDataArr(rq.data));
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
                <h2>Мои покупки</h2>
              </div>
              <div className="cards">
                {dataArr.map((item) => {
                  return item.data.map((item) => {
                    const { imgUrl, title, price, id } = item;
                    return (
                      <>
                        <Card
                          img={imgUrl}
                          title={title}
                          key={item.id}
                          id={id}
                          price={price}
                          setChange={setChange}
                          isChange={isChange}
                        />
                      </>
                    );
                  });
                })}
              </div>
            </>
          ) : (
            <div className="show-empty">
              <img src="../../../public/assets/sticker-2.png" alt="img" />
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
