import React from "react";

export const Header = (props) => {
  return (
    <header style={{ backgroundColor: "#795548", padding: "30px 0px" }}>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 ">
            <h2 style={{ color: "white" }}>Yummi Pizza</h2>
            <p style={{ color: "#FFFAFA" }}>
              We take inspiration from the World's best cuisines, and create a
              unique fusion experience. Our lipsmacking creations will tickle
              your culinary senses!
            </p>
          </div>
          <div className="col-12 col-md-4">
            <img style={{ height: "100px" }} src={require("../logo.jpg")}></img>
          </div>
        </div>
      </div>
    </header>
  );
};
