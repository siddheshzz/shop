import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap"
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {listUsers,deleteUser} from '../actions/userActions'


const UserListScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const { search } = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();



//   const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
//   const { success } = userUpdateProfile;

//   const orderListMy = useSelector((state) => state.orderListMy);
//   const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;



  useEffect(() => {
    if(userInfo && userInfo.isAdmin){
        dispatch(listUsers())
    }else{
        navigate('/login')
    }
  }, [dispatch, navigate, userInfo]);

  const deleteHandler = (id) => {
    if(window.confirm('Are you sure')){
        dispatch(deleteUser(id))
    }
  };

  return (
    <Row>
      <Col md={9}>
        <h2> My Orders </h2>{" "}
        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :(
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td><a href = {`mailto:${user.email}`}>{user.email}</a></td>
                  <td>
                    {user.isAdmin ? (
                        <i className = 'fas fas-check' style={{color:'green'}}></i>
                        
                    ):(
                        <i className = 'fas fas-times' style={{color:'red'}}></i>)}
                    
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button className="btn-sm"variant='light'><i className='fas fa-edit'></i></Button>
                    </LinkContainer>
                    <Button variant='danger' className='btn-sm' onClick={()=>
                    deleteHandler(user._id)}>
                        <i className = 'fas fa-trash'></i>
                    </Button>
                  </td>
                  
                </tr>
                
              ))}
            </tbody>
          </Table>
        )}
      </Col>{" "}
    </Row>
  );
};

export default UserListScreen;
