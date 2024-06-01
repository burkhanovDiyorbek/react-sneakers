import { Link } from "react-router-dom";
import Basket from "../../public/assets/icons/basket.svg";
import LikeHeader from "../../public/assets/icons/like-header.svg";
import User from "../../public/assets/icons/user.svg";
import PropTypes from "prop-types";
import { useContext } from "react";
import { Context } from "../App";

export const Header = ({ setShowBasket, showBasket }) => {
  const { sumOfPrice } = useContext(Context);

  return (
    <header className="header">
      <div className="container">
        <Link to={"/"} className="logo">
          <img src=".././assets/logo.png" alt="logo" />
          <div>
            <h2>REACT SNEAKERS</h2>
            <p>Магазин лучших кроссовок</p>
          </div>
        </Link>
        <ul className="header-tabs">
          <a onClick={() => setShowBasket(!showBasket)}>
            <Basket />
            <p>{sumOfPrice} руб.</p>
          </a>
          <Link to={"/purchases"}>
            <LikeHeader />
            <p>Закладки</p>
          </Link>
          <Link to={"/profile"}>
            <User />
            <p>Профиль</p>
          </Link>
        </ul>
      </div>
    </header>
  );
};
Header.propTypes = {
  setShowBasket: PropTypes.func,
  showBasket: PropTypes.bool,
  sumOfPrice: PropTypes.number,
};
