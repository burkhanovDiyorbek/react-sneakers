import { Drawer } from "../Home/components/Drawer";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Back from "../../../public/assets/icons/back.svg";
import Arrow from "../../../public/assets/icons/arror.svg";
import { Card } from "../Home/components/Card";
import { Context } from "../../App";
import axios from "axios";

export const Profile = () => {
  const navigate = useNavigate();
  const { showBasket, buyedItems, setBuyedItems } = useContext(Context);
  axios
    .get("https://665961e4de346625136c2c22.mockapi.io/buyed")
    .then((res) => setBuyedItems(res.data));

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
                  return item.items.map((item) => {
                    const { img, title, price } = item;
                    return (
                      <>
                        <Card
                          key={item.id}
                          img={img}
                          title={title}
                          price={price}
                          rem={true}
                        />
                      </>
                    );
                  });
                })}
              </div>
            </>
          ) : (
            <div className="show-empty">
              <img src="./assets/sticker.png" alt="img" />
              <h2>У вас нет заказов</h2>
              <p>Закладок нет :(</p>
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
