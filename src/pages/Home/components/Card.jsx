import PropTypes from "prop-types";
import Add from "../../../../public/assets/icons/add.svg";
import Added from "../../../../public/assets/icons/added.svg";
import Like from "../../../../public/assets/icons/like.svg";
import Liked from "../../../../public/assets/icons/liked.svg";
import { useEffect, useState } from "react";
import axios from "axios";

export const Card = ({ img, title, price, id, setChange, isChange }) => {
  const [like, setLike] = useState(false);
  const [add, setAdd] = useState(false);
  const [obj, setObj] = useState({
    id,
    imgUrl: img,
    title,
    price,
    isAdded: false,
    isLiked: false,
  });

  useEffect(() => {
    axios
      .get(`https://6655455a3c1d3b602938c16d.mockapi.io/dataSneakers/${id}`)
      .then((req) => req.data)
      .then((data) => {
        setObj(data);
        setLike(data.isLiked);
        setAdd(data.isAdded);
      });
  }, [isChange]);

  const changeItem = (type, bool, id) => {
    axios.put(
      `https://6655455a3c1d3b602938c16d.mockapi.io/dataSneakers/${id}`,
      {
        ...obj,
        [type]: !bool,
      }
    );
  };
  return (
    <div className="card">
      <button
        onClick={() => {
          setLike(!like);
          changeItem("isLiked", like, id);
          setChange((isChange) => isChange + 1);
        }}
        className="like-btn"
      >
        {!like && <Like />}
        {like && <Liked />}
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
            setAdd(!add);
            changeItem("isAdded", add, id);
            setChange((isChange) => isChange + 1);
          }}
          className="add-btn"
        >
          {!add && <Add />}
          {add && <Added />}
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
  setChange: PropTypes.func,
  isChange: PropTypes.number,
};
