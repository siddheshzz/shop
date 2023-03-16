import React, { useState, useEffect } from "react";
import {
  Link,
  redirect,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";

const UserEditScreen = () => {
  const params = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {

  }, [dispatch, navigate, userInfo, user]);

  const submitHandler = (e) => {};

  return (
    
    <Row>
        <p>Siddhesh</p>
      <Col md={3}>
        <h2> User Profile </h2>{" "}
        {/* {message && <Message variant="danger"> {message} </Message>}{" "}
        {error && <Message variant="danger"> {error} </Message>}{" "}
        {success && <Message variant="success"> Profile Updated </Message>}{" "} */}
        {loading && <Loader />}{" "}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label> Name </Form.Label>{" "}
            <Form.Control
              type="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>{" "}
          </Form.Group>{" "}
          <Form.Group controlId="email">
            <Form.Label> Email Address </Form.Label>{" "}
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>{" "}
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label> Password </Form.Label>{" "}
            <Form.Control
              type="password"
              placeholder="Enter Email"
              //   value={password}
              //   onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>{" "}
          </Form.Group>{" "}
          <Form.Group controlId="confirmPassword">
            <Form.Label> Confirm Password </Form.Label>{" "}
            <Form.Control
              type="Password"
              placeholder="Confirm Password"
              //   value={confirmPassword}
              //   onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>{" "}
          </Form.Group>
          <Button type="submit" variant="primary">
            Update{" "}
          </Button>{" "}
        </Form>
      </Col>{" "}
    </Row>
  );
};

export default UserEditScreen;
