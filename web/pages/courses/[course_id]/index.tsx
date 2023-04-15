import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import useSWR from 'swr';
import CreateLectureModal from '../../../components/CreateLectureModal';
import LectureRow from '../../../components/LectureRow';
import { fetcher } from '../../../lib/server_requests';
import styles from '../../../styles/lecturesPage.module.css';

const Lectures = () => {
    const router = useRouter();
    const course_id = router.query.course_id;
    const [lectures, setLectures] = useState([]);
    const [displayAddFolder, toggleAddFolder] = useState(false);
    const { data: lectureData } = useSWR(
        `/api/lectures?courseId=${course_id}`,
        fetcher
    );

    useEffect(() => {
        if (lectureData) {
            setLectures(lectureData);
        }
    }, [lectureData]);

    if (typeof course_id != 'string') {
        return <></>;
    }

    const handleShowAddFolder = () => {
        toggleAddFolder(true);
    };

    return (
        <div className={styles.pageBody}>
            <CreateLectureModal
                displayAddFolder={displayAddFolder}
                toggleAddFolder={toggleAddFolder}
            />

            <div className='row'>
                <Col className={styles.addFolderButton}>
                    <Button variant='primary' onClick={handleShowAddFolder}>
                        Add Lecture
                    </Button>
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
                            lectures.length > 0 &&
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
