import React, { useState } from "react";

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Spinner,
} from "reactstrap";
import { API } from "../webConfig";

import { useHistory, useLocation } from "react-router-dom";
export const Login = (props) => {
  const { onLogin } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [spinner, setSpinner] = useState(false);

  let history = useHistory();
  // let location = useLocation();

  const validateForm = () => {
    if (email === "") {
      setErrorMessage("Email is required.");
      return false;
    }
    if (password === "") {
      setErrorMessage("Password is required.");
      return false;
    }
    return true;
  };

  const loginUser = async () => {
    if (validateForm()) {
      const body = JSON.stringify({
        email,
        password,
      });
      setErrorMessage("");
      setSpinner(true);
      try {
        let result = await fetch(`${API.baseURL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
          body,
        });
        if (result.ok) {
          result = await result.json();
          localStorage.setItem("token", result.accessToken);
          onLogin();
          history.replace({ pathname: "/" });
        } else {
          result = await result.json();

          setErrorMessage(result.message);
        }
      } catch (error) {
        console.log(error);
      }
      setSpinner(false);
    }
  };
  return (
    <div
      style={{
        backgroundColor: "",
        margin: "40px 0px",
      }}
    >
      {errorMessage !== "" && <Alert color="danger">{errorMessage}</Alert>}

      <Form>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            className="col-12 col-md-6"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="Email"
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            className="col-12 col-md-6"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </FormGroup>
        <div
          className="col-12 col-md-6"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          {spinner ? (
            <Spinner color="primary" />
          ) : (
            <Button onClick={loginUser}>Sign in</Button>
          )}
        </div>
      </Form>
    </div>
  );
};
