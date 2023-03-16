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
import { getUserDetails, updateUser, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import FormContainer from "../components/FormContainer";
import { USER_UPDATE_RESET } from "../constants/userConstants";

const UserEditScreen = () => {
  const params = useParams();
  const userId = params.id

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  
  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate


  useEffect(() => {
    if (successUpdate) {
        dispatch({ type: USER_UPDATE_RESET })
        navigate('/admin/userlist')
      } else {
        if (!user.name || user._id !== userId) {
          dispatch(getUserDetails(userId))
        } else {
          setName(user.name)
          setEmail(user.email)
          setIsAdmin(user.isAdmin)
        }
      }

  }, [dispatch, navigate, userId, user,successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, name, email, isAdmin }))
  };

  return (
    <>
    <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (<Loader/>) :error ? (<Message variant = 'danger'>{error}</Message>):(
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='isAdmin'>
              <Form.Label>isAdmin</Form.Label>
              <Form.Check
                type='checkbox'
                placeholder='Is Admin'
                value={isAdmin}
                onChange={(e) => setIsAdmin(e.target.value)}
              ></Form.Check>
            </Form.Group>

            
            <Button type='submit' variant='primary'>
              Update
            </Button>

            </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
