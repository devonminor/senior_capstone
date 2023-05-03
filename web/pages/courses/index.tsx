import { Fragment, useEffect, useState } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import CourseCard from '../../components/CourseCard';
import CreateCourseModal from '../../components/CreateCourseModal';
import { fetcher, postRequest } from '../../lib/server_requests';
import styles from '../../styles/courses.module.css';

const Courses = () => {
    const [instructorCourses, setInstructorCourses] = useState<any>([]);
    const [studentCourses, setStudentCourses] = useState<any>([]);
    const [displayAddInstructorCourse, toggleAddInstructorCourse] =
        useState(false);
    const [displayAddStudentCourse, toggleAddStudentCourse] = useState(false);
    const [courseDataLoading, setCourseDataLoading] = useState(true);
    const [studentAddCourseId, setStudentAddCourseId] = useState<string>('');

    const { data: meData } = useSWR('/api/me', fetcher, {
        revalidateOnFocus: false,
    });
    const { data: courseData } = useSWR('/api/courses', fetcher, {
        revalidateOnFocus: false,
    });

    const { trigger } = useSWRMutation('/api/courses', postRequest);

    const saveStudentCourse = () => {
        toggleAddStudentCourse(false);
        trigger({
            courseId: studentAddCourseId,
            action: 'addStudent',
        });

        // refresh the page
        window.location.reload();
    };

    useEffect(() => {
        if (courseData && meData) {
            let localInstructorCourses = [];
            let localStudentCourses = [];

            // find the courses that the user is an instructor/student for
            for (let i = 0; i < courseData.length; i++) {
                for (let j = 0; j < meData.teacherCourses.length; j++) {
                    if (courseData[i]._id === meData.teacherCourses[j].id) {
                        localInstructorCourses.push(courseData[i]);
                    }
                }
                for (let j = 0; j < meData.studentCourses.length; j++) {
                    if (courseData[i]._id === meData.studentCourses[j].id) {
                        localStudentCourses.push(courseData[i]);
                    }
                }
            }

            setInstructorCourses(localInstructorCourses);
            setStudentCourses(localStudentCourses);
            setCourseDataLoading(false);
        }
    }, [courseData, meData]);

    return (
        <div className={styles.pageBody}>
            <CreateCourseModal
                displayAddCourse={displayAddInstructorCourse}
                toggleAddCourse={toggleAddInstructorCourse}
            />

            <div className='row'>
                <h2>Instructor Courses</h2>
                <Col className={styles.addCourseButton}>
                    <div className='d-grid gap-2 my-3'>
                        <Button
                            variant='btn btn-outline-primary'
                            onClick={() => toggleAddInstructorCourse(true)}
                        >
                            Create Course
                        </Button>
                    </div>
                </Col>
            </div>

            <div className={styles.cardContainer}>
                <div className='row'>
                    {courseDataLoading && (
                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Spinner animation='border' />
                        </div>
                    )}
                    {instructorCourses &&
                        instructorCourses.length > 0 &&
                        // TODO: Give this a proper Course type
                        // TODO: Add a season to the course in database or remove it from the card
                        instructorCourses.map((course: any) => {
                            return (
                                <CourseCard
                                    isTeacher={true}
                                    key={course.numId}
                                    course_id={course.numId}
                                    course_title={course.name}
                                    course_season={course.season}
                                />
                            );
                        })}
                </div>
            </div>

            <div className='row'>
                <h2>Student Courses</h2>
                <div className='d-grid gap-2 my-3'>
                    <Button
                        variant='btn btn-outline-primary'
                        onClick={() =>
                            toggleAddStudentCourse(!displayAddStudentCourse)
                        }
                    >
                        Add Course
                    </Button>
                </div>
            </div>

            {displayAddStudentCourse && (
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
                                                value={studentAddCourseId}
                                                onChange={(e) =>
                                                    setStudentAddCourseId(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <button
                                            type='submit'
                                            className='btn btn-outline-primary my-2'
                                            onClick={saveStudentCourse}
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
                    {courseDataLoading && (
                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Spinner animation='border' />
                        </div>
                    )}
                    {studentCourses &&
                        studentCourses.length > 0 &&
                        // TODO: Give this a proper Course type
                        // TODO: Add a season to the course in database or remove it from the card
                        studentCourses.map((course: any) => {
                            return (
                                <CourseCard
                                    isTeacher={false}
                                    key={course.numId}
                                    course_id={course.numId}
                                    course_title={course.name}
                                    course_season={course.season}
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default Courses;
