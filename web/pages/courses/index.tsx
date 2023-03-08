import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import CourseCard from '../../components/CourseCard';
import { getCourses } from '../../lib/api';
import styles from '../../styles/courses.module.css';

const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        getCourses().then((res) => {
            setCourses(res);
        });
    }, []);

    return (
        <div className={styles.pageBody}>
            <div className='row'>
                <Col className={styles.addCourseButton}>
                    <Button variant='primary'>Add Course</Button>
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
        </div>
    );
};

export default Courses;
