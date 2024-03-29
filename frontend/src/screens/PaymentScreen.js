import React, { useState } from "react";
import { Link, redirect, useLocation,useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = () => {
    const cart = useSelector((state) =>state.cart)
    const { shippingAddress } = cart


    const [ paymentMethod, setPaymentMethod] = useState('PayPal');
    
    
    const dispatch = useDispatch()
    const navigate = useNavigate();
    if(!shippingAddress){
        navigate('/shipping')
    }
    
  
      
    const submitHandler = (e)=>{
      e.preventDefault();
      dispatch(savePaymentMethod(paymentMethod))
      navigate('/placeorder')
      
      
    }
  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
            
            <Col>
            <Form.Check
             type='radio'
              label='PayPal or Credit Card'
               id='PayPal'
                name='paymentMethod'
                 value='PayPal'
                  checked onChange={(e) => setPaymentMethod(e.target.value)} >

                  </Form.Check>
                  
            <Form.Check
             type='radio'
              label='Stripe'
               id='Stripe'
                name='paymentMethod'
                 value='Stripe '
            onChange={(e) => setPaymentMethod(e.target.value)} ></Form.Check>
            
            </Col>
            </Form.Group>
        

        <Button type='submit' variant='primary'>
            Continue
        </Button>
        </Form>

      
    </FormContainer>
  )
}

export default PaymentScreen
