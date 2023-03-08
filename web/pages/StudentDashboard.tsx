import Image from 'next/image';
import { Fragment, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import jumbo from '../public/Tufts_Jumbos_logo.png';

import styles from '../styles/Layout.module.css';

const StudentDashboard = () => {
    const [displayAddCourse, toggleAddCourse] = useState(false);

    const courses = [
        {
            numId: 1,
            name: 'CS100',
            description: 'Intro to CS',
            active: true,
            hasActiveLecture: true,
            lectures: [
                {
                    numId: 11,
                    name: 'First Lec',
                    description: 'Getting Started',
                    createdAt: '01-01-2023',
                    active: true,
                    questions: [],
                },
            ],
        },
        {
            numId: 1,
            name: 'CS101',
            description: 'CS Fundamentals',
            active: false,
            hasActiveLecture: false,
            lectures: [],
        },
        {
            numId: 1,
            name: 'CS102',
            description: 'Data Structures',
            active: true,
            hasActiveLecture: true,
            lectures: [],
        },
    ];

    return (
        <>
            {/* Add Button Div */}
            <div>
                <main>
                    <div className={styles.pageBody}>
                        <div className='d-grid gap-2 mx-4 my-3'>
                            <Button
                                variant='btn btn-outline-primary'
                                onClick={() =>
                                    toggleAddCourse(!displayAddCourse)
                                }
                            >
                                Add Course
                            </Button>
                        </div>

                        {displayAddCourse && (
                            <Fragment>
                                <Container>
                                    <Row className='justify-content-md-center'>
                                        <Col md='auto'>
                                            <form>
                                                <div className='form-group '>
                                                    <div className='row '>
                                                        <label
                                                            className='justify-content-md-center'
                                                            htmlFor='courseCodeReg'
                                                        >
                                                            Course Code ID
                                                        </label>
                                                        <input
                                                            type='email'
                                                            className='form-control'
                                                            id='courseCodeReg'
                                                            placeholder='Tufts 00000'
                                                        />
                                                    </div>
                                                </div>
                                                <div className='d-flex justify-content-center'>
                                                    <button
                                                        type='submit'
                                                        className='btn btn-outline-primary my-2'
                                                    >
                                                        Add
                                                    </button>
                                                </div>
                                            </form>
                                        </Col>
                                    </Row>
                                </Container>
                            </Fragment>
                        )}

                        <div className={styles.cardContainer}>
                            <div className='row'>
                                {courses ? (
                                    courses.map((course, i) => (
                                        <div className='col-sm-4 my-2' key={i}>
                                            <div className={styles.cardCustom}>
                                                <div
                                                    className='card'
                                                    key={`${course.name}div`}
                                                >
                                                    <Image
                                                        className={
                                                            styles.cardImage
                                                        }
                                                        src={jumbo}
                                                        alt='Card image cap'
                                                    />
                                                    <div className='card-body'>
                                                        <h5 className='card-title'>
                                                            {course.name}
                                                        </h5>
                                                        <p className='card-text'>
                                                            <small className='text-muted'>
                                                                {
                                                                    course.description
                                                                }
                                                            </small>
                                                        </p>
                                                        <Button
                                                            variant='primary'
                                                            size='lg'
                                                            disabled={
                                                                course.active
                                                            }
                                                        >
                                                            View Course
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <Container>
                                        <div className='d-flex justify-content-center'>
                                            <h4>
                                                No Courses Added. Click above to
                                                Add Courses.{' '}
                                            </h4>
                                        </div>
                                    </Container>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default StudentDashboard;
