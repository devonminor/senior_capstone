import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import LectureRow from '../../../components/LectureRow';
import { getLecturesForCourse } from '../../../lib/api';
import styles from '../../../styles/lecturesPage.module.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'

const Lectures = () => {
    const router = useRouter();
    const course_id = router.query.course_id;
    const [lectures, setLectures] = useState([]);
    const [displayAddFolder, toggleAddFolder] = useState(false);

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

    function handleShowAddFolder() {
        toggleAddFolder(true)
    }

    function handleHideAddFolder() {
        toggleAddFolder(false)
    }

    return (
        <div className={styles.pageBody}>
            <Modal show={displayAddFolder} onHide={handleHideAddFolder}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Folder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Modal.Title>Folder Name</Modal.Title>

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
                <Button variant="primary" onClick={handleHideAddFolder}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
            <div className='row'>
                <Col className={styles.addFolderButton}>
                    <Button variant='primary' onClick={handleShowAddFolder}>Add Folder</Button>
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
