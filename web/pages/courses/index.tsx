import { Fragment, useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import CourseCard from '../../components/CourseCard';
import { getCourses } from '../../lib/api';
import styles from '../../styles/courses.module.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [displayAddCourse, toggleAddCourse] = useState(false);

    useEffect(() => {
        getCourses().then((res) => {
            setCourses(res);
        });
    }, []);

    function handleShowAddCourse() {
        toggleAddCourse(true)
    }

    function handleHideAddQuestion() {
        toggleAddCourse(false)
    }

    return (
        <div className={styles.pageBody}>
            <Modal show={displayAddCourse} onHide={handleHideAddQuestion}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Modal.Title>Course Name</Modal.Title>

                    <input className="form-control" type="text"/>

                    <br></br>

                    <Modal.Title>Description</Modal.Title>

                    <Form>
                        <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                        >
                        <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleHideAddQuestion}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>

            <div className='row'>
                <h2>Instructor Courses</h2>
                <Col className={styles.addCourseButton}>
                    <Button variant='primary' onClick={handleShowAddCourse}>Create Course</Button>
                </Col>
            </div>

            <div className={styles.cardContainer}>
                <div className='row'>
                    {courses &&
                        // TODO: Give this a proper Course type
                        // TODO: Add a season to the course in database or remove it from the card
                        courses.map((course: any) => {
                            return (
                                <CourseCard
                                    key={course.numId}
                                    course_id={course.numId}
                                    course_title={course.name}
                                    course_season={'Spring 2023'}
                                />
                            );
                        })}
                </div>
            </div>

            <div className='row'>
                <h2>Student Courses</h2>
                <div className='d-grid gap-2 mx-4 my-3'>
                    <Button
                        variant='btn btn-outline-primary'
                        onClick={() => toggleAddCourse(!displayAddCourse)}
                    >
                        Add Course
                    </Button>
                </div>
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
        </div>
    );
};


export default Courses;
