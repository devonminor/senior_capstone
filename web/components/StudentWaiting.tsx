/*
 *  StudentWaiting.tsx
 *  PollAnywhere - CS 98 Capstone Project
 *
 *  This component is displayed when a student is waiting for a question to go
 *  live in a course.
 *
 *  Last updated: 05/12/2023
 */

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Loader from '../components/Loader';

const StudentWaiting = () => {
    return (
        <div className='my-3'>
            <Card className='text-center'>
                <Card.Body>
                    <Card.Title>
                        <Loader />
                    </Card.Title>
                    <Card.Title className='my-4'>
                        No Live Questions For This Lecture Yet
                    </Card.Title>

                    <Button variant='danger' href='/courses'>
                        Back to Courses
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default StudentWaiting;
