import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { Badge, Col, Container, ListGroup, Navbar, Row, Form, Button, Modal } from 'react-bootstrap';
import { foodData } from "../data/foodData";
import {Cart} from 'react-bootstrap-icons'

const foodContext = React.createContext([]);

export default function FoodApp() {

    const [food, setFoods] = useState(foodData);
    const [orders, setOrders] = useState([]);


    // useEffect(() => {
    //     axios.get('https://625a91bf0ab4013f94a2d9a8.mockapi.io/meals').then((respone) => {
    //         setFoods(respone.data);
    //     });
    // }, []);

    const addToCart = (food, amount) => {
        console.log(food, amount);
        const newOrders = [...orders, {
            ...food,
            amount
        }]

        setOrders(newOrders);
    };

    const addItem = (order) => {
        const newOrders = [...orders];
        const foundOrder = newOrders.find((item) => item.id === order.id);
        if (!foundOrder) return;

        foundOrder.amount += 1;

        setOrders(newOrders);
    }

    const deleteItem = (order) => {
        const newOrders = [...orders];
        const foundOrder = newOrders.find((item) => item.id === order.id);
        if (!foundOrder) return;

        foundOrder.amount -= 1;

        setOrders(newOrders.filter((item) => item.amount != 0));
    }

    return (
        <foodContext.Provider value={{ food, orders, addToCart, addItem, deleteItem }} >
            <div className="food-app">
                <Navbar>
                    <Container>
                        <Navbar.Brand> React Food App</Navbar.Brand>
                        <OrderForm />
                    </Container>
                </Navbar>

                <Container className="mt-3">
                    <h2>Food List</h2>
                    <ListGroup>
                        <ListGroup.Item>
                            <FoodItem />
                        </ListGroup.Item>
                    </ListGroup>
                </Container>
            </div>
        </foodContext.Provider>
    )
};

const FoodItem = () => {
    const foodData = useContext(foodContext);
    const { addToCart } = useContext(foodContext);

    const [amount, setAmount] = useState(0);
    return (
        <>
            {foodData.food.map((foods) => {
                return (
                    <Container className="food-item">
                        <Row>
                            <Col sm={3}>
                                <img src={foods.image} className="w-100" />
                            </Col>

                            <Col sm={6}>
                                <h3> {foods.name}</h3>
                                <div> {foods.description} </div>
                                <Badge bg="primary">$ {foods.price} </Badge>
                            </Col>

                            <Col sm={3}>
                                <div className="mb-2 d-flex align-items-center">
                                    <span className="me-2" > Amount </span>
                                    <Form.Control type="number" min={0} className="w-50" onChange={(event) => setAmount(Number(event.target.value))} />
                                </div>
                                <Button variant="primary" onClick={() => addToCart(foods, amount)}> + Add</Button>
                            </Col>
                        </Row>
                    </Container>
                )
            })}
        </>
    )
};

const OrderForm = () => {
    const orderData = useContext(foodContext)

    const [isActive, setIsActive] = useState(false);

    let totalItem = 0;
    let totalPrice = 0;

    for (let order of orderData.orders) {
        totalItem += order.amount;
        totalPrice += order.price * order.amount;
    }

    return (
        <div className="order-form">
            <Button variant="info" onClick={() => setIsActive(true)}>
                <Cart className="me-2"> </Cart>
                <Badge pill bg="light" text="dark" > {totalItem} </Badge>
            </Button>

            <Modal show={isActive} onHide={() => setIsActive(false)}>
                <Modal.Header closeButton>
                    Your cart
                </Modal.Header>

                <Modal.Body>

                    <ListGroup>
                        <ListGroup.Item>
                            <OrderItem />
                        </ListGroup.Item>
                    </ListGroup>

                    <b className="text-danger mt-3"> Total Price: {totalPrice} </b>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="success"> Make an order </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

const OrderItem = () => {

    const orderData = useContext(foodContext)
    const { addItem, deleteItem } = useContext(foodContext)

    return (
        <Container>
            <Row>
                {orderData.orders.map((orders) => {
                    return (
                        <>
                            <Col sm={2} className="mt-3">
                                <img src={orders.image} className="w-100" />
                            </Col>

                            <Col sm={7} className="mt-3">
                                <h3> {orders.name} </h3>
                                <div>
                                    <Badge bg="primary" className="me-4"> $ {orders.price}</Badge>
                                    <Badge bg="light" text="dark" className="me-4"> x{orders.amount}</Badge>
                                </div>
                            </Col>

                            <Col className="mt-3">
                                <Button variant="danger" className="me-2" size="sm" onClick={() => deleteItem(orders)}> - </Button>
                                <Button variant="primary" size="sm" onClick={() => addItem(orders)}> + </Button>
                            </Col>
                        </>
                    )
                })}
            </Row>
        </Container>
    )
}