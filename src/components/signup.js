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
export const Signup = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [spinner, setSpinner] = useState(false);

  const validateFields = () => {
    if (name === "") {
      setErrorMessage("Name is required");
      return false;
    }
    if (email === "") {
      setErrorMessage("Email is required.");
      return false;
    }
    if (address === "") {
      setErrorMessage("Address is required.");
      return false;
    }
    if (password === "") {
      setErrorMessage("Password is required.");
      return false;
    }
    if (confirmPassword === "") {
      setErrorMessage("Confirm Password is required.");
      return false;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Password and confirm password do not match.");
      return false;
    }
    return true;
  };

  const registerUser = async () => {
    if (validateFields()) {
      const body = JSON.stringify({
        name,
        email,
        password,
        address,
      });
      setErrorMessage("");
      setSpinner(true);
      try {
        let result = await fetch("http://localhost:3001/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
          body,
        });
        if (result.ok) {
          result = await result.json();
          console.log(result);
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
    <div style={{ backgroundColor: "", margin: "40px auto" }}>
      {errorMessage !== "" && <Alert color="danger">{errorMessage}</Alert>}

      <Form>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(field) => setName(field.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(field) => setEmail(field.target.value)}
            placeholder="Email"
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Address</Label>
          <Input
            type="text"
            value={address}
            onChange={(field) => setAddress(field.target.value)}
            placeholder="Address"
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(field) => setPassword(field.target.value)}
            placeholder="password"
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Confirm Password</Label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(field) => setConfirmPassword(field.target.value)}
            placeholder="Confirm Password"
          />
        </FormGroup>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {spinner ? (
            <Spinner color="primary" />
          ) : (
            <Button onClick={registerUser}>Sign up</Button>
          )}
        </div>
      </Form>
    </div>
  );
};
