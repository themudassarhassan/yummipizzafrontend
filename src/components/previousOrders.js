import React, { Component } from "react";
import { API } from "../webConfig";
import { Table, Button } from "reactstrap";
export class PreviousOrders extends Component {
  constructor() {
    super();
    this.state = {
      orders: [],
    };
  }

  async componentDidMount() {
    try {
      const token = localStorage.getItem("token");
      let result = await fetch(`${API.baseURL}/api/orders`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      result = await result.json();

      this.setState({ orders: result.orders });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    if (this.state.orders.length === 0) return <p>No previous orders.</p>;
    return (
      <div>
        <h2 style={{ textAlign: "center" }}>Shopping cart</h2>

        <Table style={{ marginTop: "40px" }}>
          <thead>
            <tr>
              <th>Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {this.state.orders.map((item) => (
              <tr key={item.id}>
                <td> {item.price} </td>
                <td> {item.createdAt} </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
