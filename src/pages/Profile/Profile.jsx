import { Drawer } from "../Home/components/Drawer";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Back from "../../../public/assets/icons/back.svg";
import Arrow from "../../../public/assets/icons/arror.svg";
import { Card } from "../Home/components/Card";
import { Context } from "../../App";

export const Profile = () => {
  const navigate = useNavigate();

  const { showBasket, buyedItems } = useContext(Context);
  console.log(buyedItems);
  return (
    <>
      <section className="purchases-container">
        <div className="container">
          {buyedItems.length ? (
            <>
              <div className="title">
                <Link to={"/"}>
                  <Back />
                </Link>
                <h2>Мои покупки</h2>
              </div>
              <div className="cards">
                {buyedItems.map((item) => {
                  const { img, title, price } = item.items;
                  return (
                    <>
                      <Card
                        key={item.id}
                        img={img}
                        title={title}
                        price={price}
                      />
                    </>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="show-empty">
              <img src="../../../assets/sticker-2.png" alt="img" />
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
