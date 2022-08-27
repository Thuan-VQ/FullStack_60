import React, { useState } from "react";
import { Button, Checkbox, Col, Form, Input, List, notification, Radio, Row, Popconfirm } from 'antd';
import TextArea from "antd/lib/input/TextArea";
import data from "../data/data";

export default function MemberForm() {
    const [people, setPeople] = useState(data);
    const [name, setName] = useState();
    const [age, setAge] = useState();
    const [gender, setGender] = useState();
    const [address, setAddress] = useState();


    const handleCreateMember = (event) => {
        event.preventDefault()
        setPeople((item) => [...item, {
            id: people.length + 1,
            name: name,
            age: age,
            gender: gender,
            address: address,
        }])
    }

    const confirmDelete = () => {
        setPeople([]);

        notification['success']({
            message: 'Deleted all member successfully',
            duration: 3
        })
    }

    const cancelDelete = () => {
        return
    }

    const removePeople = (id) => {
        const removedData = people.filter((item) => item.id !== id);
        setPeople(removedData);

        notification['success']({
            message: 'Deleted this member successfully',
            duration: 3
        })
    }


    const searchMember = (keyword) => {
        const searchMember = people.filter((item) => item.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1);
        setPeople(searchMember)
    }

    return (
        <>
            <Form
                wrapperCol={{ span: 8 }}>

                <Col>
                    <Popconfirm
                        title="Are you sure to delete all member?"
                        onConfirm={confirmDelete}
                        onCancel={cancelDelete}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button style={{ float: 'right', marginRight: 20 }}>Delete all</Button>
                    </Popconfirm>
                </Col>

                <Form.Item
                    label="Name"
                    name="Name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input type='text' onChange={(event) => setName(event.target.value)} />
                </Form.Item>

                <Form.Item
                    label="Age"
                    name="Age"
                    rules={[{ required: true, message: 'Please input your age!' }]}
                >
                    <Input type='number' min={1} max={100} onChange={(event) => setAge(event.target.value)} />
                </Form.Item>

                <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
                    <Radio.Group onChange={(event) => setGender(event.target.value)}>
                        <Radio value="Male">Male</Radio>
                        <Radio value="Female">Female </Radio>
                        <Radio value="Other">Other</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label="Address"
                    name="Adress"
                    rules={[{ required: true, message: 'Please input your address!' }]}
                >
                    <Input type='text' onChange={(event) => setAddress(event.target.value)} />
                </Form.Item>

                <Form.Item
                    label="Phone"
                    name="Phone"
                    rules={[{ required: true, message: 'Please input your phone !' }]}
                >
                    <Input type='number' />
                </Form.Item>

                <Form.Item
                    label="Hobby"
                    name="Hobby"
                >
                    <Checkbox> Soccer </Checkbox>
                    <Checkbox> Volleyball </Checkbox>
                    <Checkbox> Baseball </Checkbox>
                    <Checkbox> Basketball </Checkbox>
                </Form.Item>

                <Form.Item
                    label="Self Introduction"
                    name="Self Introduction"
                >
                    <TextArea rows={4} />
                </Form.Item>

                <Button onClick={handleCreateMember}> Add New Member</Button>

            </Form>

            <div>
                <Row>
                    <Col span={16}>
                        <Input placeholder="Search" onChange={(e) => searchMember(e.target.value)} type='text' style={{ marginTop: 30, }}></Input>
                    </Col>
                </Row>
                <List
                    itemLayout="horizontal"
                    dataSource={people}
                    renderItem={item => (
                        <List.Item style={{ textAlign: 'left' }}>
                            <List.Item.Meta
                                title={<a href="https://ant.design">{item.name}</a>}
                                description={
                                    <div>
                                        <Row>
                                            <Col>Age: </Col>
                                            <Col>{item.age}</Col>
                                        </Row>

                                        <Row>
                                            <Col>Gender: </Col>
                                            <Col>{item.gender}</Col>
                                        </Row>
                                        <Row>
                                            <Col>Address: </Col>
                                            <Col>{item.address}</Col>
                                        </Row>
                                    </div>
                                }
                            />

                            <div style={{ marginRight: 20 }}>
                                <Button onClick={() => removePeople(item.id)}>Delete</Button>
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        </>
    )
}