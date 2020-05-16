import React from "react";
import { MenuItem } from "./";

export const Menu = (props) => {
  const { data, cart, onAddToCartClick } = props;
  return (
    <div className="row">
      {data.map((item) => (
        <MenuItem
          key={item.id}
          item={item}
          isAdded={cart.indexOf(item) === -1 ? false : true}
          onAddToCartClick={onAddToCartClick}
        />
      ))}
    </div>
  );
};
