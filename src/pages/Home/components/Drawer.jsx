import Cross from "../../../../public/assets/icons/cross.svg";
import Arrow from "../../../../public/assets/icons/arror.svg";
import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../../App";

export const Drawer = () => {
  const { cartItems, setShowBasket, showBasket, onAddToCart, sumOfPrice } =
    useContext(Context);

  const [isBuyed, setIsBuyed] = useState(false);

  const sendData = (data, id) => {
    axios.post("http://localhost:3000/buyed", { id, data });
  };

  return (
    <div className="basket-container">
      <div className="container-b">
        <div className="basket-title">
          <h2>Корзина</h2>
          <button onClick={() => setShowBasket(!showBasket)}>
            <Cross />
          </button>
        </div>
        {!cartItems.length && !isBuyed && (
          <div className="empty-basket">
            <img src="./assets/empty-card.png" alt="empty card" />
            <h2>Корзина пустая</h2>
            <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
            <button onClick={() => setShowBasket(!showBasket)}>
              <Arrow /> Вернуться назад
            </button>
          </div>
        )}
        {cartItems.length > 0 && !isBuyed && (
          <>
            <div className="basket">
              {cartItems.map((item, index) => (
                <div className="basket-card" key={index}>
                  <img src={item.img} alt="img" />
                  <div>
                    <h2>{item.title}</h2>
                    <p>{item.price} руб.</p>
                  </div>
                  <Cross onClick={() => onAddToCart(item)} />
                </div>
              ))}
            </div>
            <div className="basket-bottom">
              <div className="inform">
                <span>Итого: </span>
                <p></p>
                <b>{sumOfPrice} руб.</b>
              </div>
              <div className="inform">
                <span>Налог 5%: </span>
                <p></p>
                <b>{Math.trunc((sumOfPrice / 100) * 5)} руб.</b>
              </div>
              <button
                onClick={() => {
                  setIsBuyed(!isBuyed);
                  sendData(cartItems);
                }}
              >
                Оформить заказ <Arrow />
              </button>
            </div>
          </>
        )}
        {isBuyed && (
          <div className="show-buyed">
            <img src="../../../public/assets/completed.png" alt="" />
            <h2>Заказ оформлен!</h2>
            <p>Ваш заказ #1 скоро будет передан курьерской доставке</p>
            <button
              onClick={() => {
                setShowBasket(!showBasket);
              }}
            >
              <Arrow /> Вернуться назад
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
