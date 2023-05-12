/*
 *  StudentLectures.tsx
 *  PollAnywhere - CS 98 Capstone Project
 *
 *  This file is not currently being used in the application.
 *
 *  It is a template for how lectures could be displayed to students or
 *  teachers. It was not removed because it could be useful.
 *
 *  Last updated: 05/12/2023
 */

import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import styles from '../styles/Layout.module.css';

const StudentLectures = () => {
    const lectures = [
        {
            numId: 11,
            name: 'First Lec',
            description:
                'Getting Started with fundamentals, it is important to note that sometimes, evertime you must always definetly continueosly',
            createdAt: '01-01-2023',
            lastUpdated: '01-01-2023',
            active: true,
            questions: [],
        },
        {
            numId: 11,
            name: 'Second Lec',
            description: 'Getting Started',
            createdAt: '01-05-2023',
            lastUpdated: '01-01-2023',
            active: false,
            questions: [],
        },
        {
            numId: 11,
            name: 'Third Lec',
            description: 'Building up on previous knowledge',
            createdAt: '01-10-2023',
            lastUpdated: '01-01-2023',
            active: true,
            questions: [],
        },
        {
            numId: 11,
            name: 'Forth Lec',
            description: 'Wrapping Up',
            createdAt: '01-30-2023',
            lastUpdated: '01-01-2023',
            active: true,
            questions: [],
        },
    ];

    return (
        <>
            <div className={`${styles.pageBody} mx-4`}>
                <div className='d-flex justify-content-center my-2'>
                    <h4>Lectures</h4>
                </div>

                <Container>
                    <Row className='justify-content-md-center'>
                        {lectures ? (
                            lectures.map((lecture, i) => (
                                <Col md={7} key={i}>
                                    <Card className='text-center my-3'>
                                        <Card.Header as='h5'>
                                            {lecture.createdAt}
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Title>
                                                {lecture.name}
                                            </Card.Title>
                                            <Card.Text>
                                                {lecture.description}
                                            </Card.Text>
                                            <Button
                                                variant='btn btn-outline-primary'
                                                disabled={lecture.active}
                                            >
                                                Questions
                                            </Button>
                                        </Card.Body>
                                        <Card.Footer className='text-muted'>
                                            Last modified: {lecture.lastUpdated}
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <Container>
                                <div className='d-flex justify-content-center'>
                                    <h4>No Lectures have been Added.</h4>
                                </div>
                            </Container>
                        )}
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default StudentLectures;
