import PropTypes from "prop-types";
import Add from "../../../../public/assets/icons/add.svg";
import Added from "../../../../public/assets/icons/added.svg";
import Like from "../../../../public/assets/icons/like.svg";
import Liked from "../../../../public/assets/icons/liked.svg";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../../App";

export const Card = ({ img, title, price, id }) => {
  const { onLiked, onAddToCart, likedItems, cartItems } = useContext(Context);

  const [like, setLike] = useState(false);
  const [add, setAdd] = useState(false);

  useEffect(() => {
    setLike(likedItems.find((item) => item.id === id));
  }, [likedItems]);

  useEffect(() => {
    setAdd(cartItems.find((item) => item.id === id));
  }, [cartItems]);

  return (
    <div className="card">
      <button
        onClick={() => {
          setLike(!like);
          onLiked({ img, title, price, id });
        }}
        className="like-btn"
      >
        {!like ? <Like /> : <Liked />}
      </button>
      <img src={img} alt="sneakers img" className="img" />
      <h2 className="title">{title}</h2>
      <div>
        <p className="price">
          <span>Цена:</span>
          <span className="price-span">{price} руб.</span>
        </p>
        <button
          onClick={() => {
            onAddToCart({ id, img, title, price });
            setAdd(!add);
          }}
          className="add-btn"
        >
          {!add ? <Add /> : <Added />}
        </button>
      </div>
    </div>
  );
};

Card.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
  id: PropTypes.string,
  onRemove: PropTypes.func,
};
