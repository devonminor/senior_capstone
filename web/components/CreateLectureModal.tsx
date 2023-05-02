import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import useSWRMutation from 'swr/mutation';
import { postRequest } from '../lib/server_requests';

interface ICreateCourseModal {
    displayAddFolder: boolean;
    toggleAddFolder: Dispatch<SetStateAction<boolean>>;
}

const CreateLectureModal = ({
    displayAddFolder,
    toggleAddFolder,
}: ICreateCourseModal) => {
    const [lectureName, setLectureName] = useState<string>('');
    const [lectureDescription, setLectureDescription] = useState<string>('');
    const router = useRouter();
    const { trigger } = useSWRMutation('/api/lectures', postRequest);
    const { course_id } = router.query;

    const handleHideAddFolder = () => {
        toggleAddFolder(false);
    };

    const saveLecture = () => {
        trigger({
            courseId: course_id,
            name: lectureName,
            description: lectureDescription,
        });
        toggleAddFolder(false);
        window.location.reload();
    };

    return (
        <Modal show={displayAddFolder} onHide={handleHideAddFolder}>
            <Modal.Header closeButton>
                <Modal.Title>Create Lecture</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <h4>Lecture Name</h4>
                    <Form.Control
                        value={lectureName}
                        onChange={(e) => setLectureName(e.target.value)}
                    />

                    <br />

                    <h4>Lecture Description</h4>
                    <Form.Control
                        as='textarea'
                        style={{ resize: 'none' }}
                        rows={3}
                        value={lectureDescription}
                        onChange={(e) => setLectureDescription(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='primary' onClick={saveLecture}>
                    Save Lecture
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateLectureModal;
