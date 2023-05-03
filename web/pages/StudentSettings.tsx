
import React, { Fragment, useState, useEffect } from 'react';
import {Container, Row, Col, Button, Card, Form} from 'react-bootstrap'
import { IoIosPersonAdd} from "react-icons/io";
import { FiLogOut } from "react-icons/fi";


export default function StudentSettings() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
   

    const user = {
        name: 'Anesu Gavhera',
        email: 'agavhera@gmail.com',
        role: 'Student',
        dateOfRegistration: '22/02/2023',
        classes : [
            {
                name: 'Boxing Gloves',
                order: 1,
            },
            {
                name: 'Parachute',
                order: 2,
            },
            {
                name: 'Nothing',
                order: 3,
            },
            {
                name: 'Championship belt',
                order: 4,
            },

        ]
    };

    const [displayEditProfile, toggleEditProfile] = useState(false);

    useEffect(() => {
          if (!user || !user.name ) {
            console.log("No User")
          } else {
            setName(user.name);
            setEmail(user.email);
          }
        
      }, [user]);

    const submitHandler = (e) => {
        e.preventDefault();
       
      };



  return (
   <Container>
        <div className= 'my-2' />
        <Row >
            <Col >
                <h1>Settings</h1>
            </Col>

            <Col> </Col>

            <Col>   { }</Col>
        </Row>

        <div className='my-2' />
        
        <Row>
            <Col> <IoIosPersonAdd size={35} /> Welcome {user.name} </Col>
        </Row>
        
        <div className='my-4' />

        <Row><h2>Profile</h2></Row>

        <div className='my-1' />

        <Row>
                       
            <Col md={7}>
                <Card>
                    <Card.Header as='h5'>
                        {user.role}
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>
                            {user.name}
                        </Card.Title>
                        <Card.Text>
                            {user.email}
                        </Card.Text>
                        <Button
                            variant='btn btn-outline-primary'
                            onClick={() => toggleEditProfile(!displayEditProfile)}
                        >
                            Edit Profile
                        </Button>
                    </Card.Body>
                    <Card.Footer>
                        Date of Registration: {user.dateOfRegistration}
                    </Card.Footer>
                    
                </Card>
            </Col>
                            
                       
        </Row>

        {displayEditProfile && (
            <Fragment>
                <Col md={7}>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name' className='my-2'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                        required
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email' className='my-2'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                        required
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>


                    <Button className='my-2' type='submit' variant='primary'>
                        Update
                    </Button>
                </Form>
                </Col>
            </Fragment>
        )}


   </Container>
  )
}
