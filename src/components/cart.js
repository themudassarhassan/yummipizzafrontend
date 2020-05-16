import React, { useState } from "react";
import { Table, Button, Spinner } from "reactstrap";
import { API } from "../webConfig";
import { useHistory } from "react-router-dom";

export const Cart = (props) => {
  const { data, onIncrement, onDecrement, isLoggedIn, onCheckout } = props;
  const [spinner, setSpinner] = useState(false);
  const history = useHistory();

  const count = data.length;
  if (!count) return <p>Your cart is empty.</p>;

  let subTotal = 0;
  const calculateSubTotal = (item) => {
    subTotal += item.quantity * item.price;
  };
  data.forEach(calculateSubTotal);
  const totalPrice = subTotal + 20;

  const handleCheckout = async () => {
    if (!isLoggedIn) return alert("Please log in first");
    const body = JSON.stringify({
      price: totalPrice,
      items: data,
    });
    setSpinner(true);
    const token = localStorage.getItem("token");
    try {
      let result = await fetch(`${API.baseURL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
        body,
      });
      if (result.ok) {
        onCheckout();
        history.replace({ pathname: "/" });
      } else {
        result = await result.json();
        console.log(result);
      }
    } catch (error) {
      console.log(error.message);
    }
    setSpinner(false);
  };

  return (
    <div style={{ paddingTop: "30px" }}>
      <h2 style={{ textAlign: "center" }}>Shopping cart</h2>
      <Table style={{ marginTop: "40px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td> {item.name} </td>
              <td> {item.quantity} </td>
              <td> {item.quantity * item.price} </td>
              <td>
                <Button
                  onClick={() => onDecrement(item)}
                  color="danger"
                  style={{ marginRight: "10px" }}
                >
                  -
                </Button>
                <Button onClick={() => onIncrement(item)} color="success">
                  +
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ marginRight: "10px" }}>Sub Total:</p>
            <p>${subTotal}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ marginRight: "10px" }}>Delivery fee:</p>
            <p>$20</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ marginRight: "10px" }}>Grand Total:</p>
            <p>${totalPrice}</p>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "20px 0px",
        }}
      >
        {spinner ? (
          <Spinner color="primary" />
        ) : (
          <Button onClick={handleCheckout} color="primary">
            Checkout
          </Button>
        )}
      </div>
    </div>
  );
};
