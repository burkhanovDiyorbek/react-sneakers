import Cross from "../../../../public/assets/icons/cross.svg";
import Arrow from "../../../../public/assets/icons/arror.svg";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../../App";
import axios from "axios";

export const Drawer = () => {
  const {
    cartItems,
    setShowBasket,
    showBasket,
    onAddToCart,
    sumOfPrice,
    setCartItems,
  } = useContext(Context);

  const [isBuyed, setIsBuyed] = useState(false);
  const [buyedId, setBuyedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get("https://665961e4de346625136c2c22.mockapi.io/cart")
      .then((req) => setCartItems(req.data));
  }, []);

  const clickToOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://665961e4de346625136c2c22.mockapi.io/buyed",
        {
          items: cartItems,
        }
      );
      setBuyedId(data.id);
      setIsBuyed(true);
      setCartItems([]);
      // await axios
      //   .get("https://665961e4de346625136c2c22.mockapi.io/cart")
      //   .then((req) => setCartItems(req.data));
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          "https://665961e4de346625136c2c22.mockapi.io/cart/" + item.id
        );
      }
    } catch (error) {
      alert("Ошибка при создании заказа :(");
    }
    setIsLoading(false);
  };

  return (
    <div
      className={
        showBasket ? "basket-container visible" : "basket-container hiddein"
      }
    >
      <div className="container-b">
        <div className="basket-title">
          <h2>Корзина</h2>
          <button onClick={() => setShowBasket(!showBasket)}>
            <Cross />
          </button>
        </div>
        <div className="basket-content">
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
                <button disabled={isLoading} onClick={() => clickToOrder()}>
                  Оформить заказ <Arrow />
                </button>
              </div>
            </>
          )}
          {isBuyed && (
            <div className="show-buyed">
              <img src="./assets/completed.png" alt="" />
              <h2>Заказ оформлен!</h2>
              <p>
                Ваш заказ #{buyedId} скоро будет передан курьерской доставке
              </p>
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
    </div>
  );
};
