import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import { API } from "../webConfig";
export const MenuItem = (props) => {
  const { item, isAdded, onAddToCartClick } = props;
  return (
    <div className="col-12 col-md-4" style={{ margin: "10px 0px" }}>
      <Card>
        <CardImg
          top
          width="100%"
          src={`${API.baseURL}/${item.img}`}
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle>{item.name}</CardTitle>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <CardSubtitle>$ {item.price} </CardSubtitle>
            <Button disabled={isAdded} onClick={() => onAddToCartClick(item)}>
              {isAdded ? "Added to cart" : "Add to cart"}
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
