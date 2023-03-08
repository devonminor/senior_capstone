import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import CourseCard from '../../components/CourseCard';
import styles from '../../styles/courses.module.css';

const Courses = () => {
    return (
        <div className={styles.pageBody}>
            <div className='row'>
                <Col className={styles.addCourseButton}>
                    <Button variant='primary'>Add Course</Button>
                </Col>
            </div>

            <div className={styles.cardContainer}>
                <div className='row'>
                    <CourseCard
                        course_title='CS 116'
                        course_season='Spring 2023'
                    />
                    <CourseCard
                        course_title='ES 56'
                        course_season='Spring 2023'
                    />
                    <CourseCard
                        course_title='CS 170'
                        course_season='Fall 2022'
                    />
                    <CourseCard
                        course_title='MATH 42'
                        course_season='Fall 2022'
                    />
                </div>
            </div>
        </div>
    );
};

export default Courses;
