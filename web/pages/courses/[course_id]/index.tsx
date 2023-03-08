import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import LectureRow from '../../../components/LectureRow';
import { getLecturesForCourse } from '../../../lib/api';
import styles from '../../../styles/lecturesPage.module.css';

const Lectures = () => {
    const router = useRouter();
    const course_id = router.query.course_id;
    const [lectures, setLectures] = useState([]);

    useEffect(() => {
        if (typeof course_id === 'string') {
            getLecturesForCourse(course_id).then((res) => {
                console.log(res);
                setLectures(res);
            });
        }
    }, [course_id]);

    if (typeof course_id != 'string') {
        return <></>;
    }

    return (
        <div className={styles.pageBody}>
            <div className='row'>
                <Col className={styles.addFolderButton}>
                    <Button variant='primary'>Add Folder</Button>
                </Col>
            </div>
            <div className={`row ${styles.lecturesContainer}`}>
                <table className='table table-striped table-hover'>
                    <thead>
                        <tr>
                            <th scope='col'>Unit #</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* TODO: Give this a proper Lecture type */}
                        {lectures &&
                            lectures.map((lecture: any, i: number) => {
                                return (
                                    <LectureRow
                                        key={lecture.numId}
                                        row={i + 1}
                                        router={router}
                                        course_id={course_id}
                                        lecture_id={lecture.numId}
                                        lecture_name={lecture.name}
                                    />
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Lectures;
