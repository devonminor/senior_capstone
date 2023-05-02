import { Dispatch, SetStateAction, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import useSWRMutation from 'swr/mutation';
import { postRequest } from '../lib/server_requests';

interface ICreateCourseModal {
    displayAddCourse: boolean;
    toggleAddCourse: Dispatch<SetStateAction<boolean>>;
}

const CreateCourseModal = ({
    displayAddCourse,
    toggleAddCourse,
}: ICreateCourseModal) => {
    const [courseName, setCourseName] = useState<string>('');
    const [courseDescription, setCourseDescription] = useState<string>('');
    const [courseSeason, setCourseSeason] = useState<string>('Fall');
    const [courseYear, setCourseYear] = useState<string>('2023');

    const { trigger } = useSWRMutation('/api/courses', postRequest);

    const saveCourse = () => {
        trigger({
            name: courseName,
            description: courseDescription,
            season: `${courseSeason} ${courseYear}`,
            action: 'createCourse',
        });
        toggleAddCourse(false);
        window.location.reload();
    };

    return (
        <Modal show={displayAddCourse} onHide={() => toggleAddCourse(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Create Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <h4>Course Name</h4>
                    <Form.Control
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                    />

                    <br />

                    <h4>Description</h4>
                    <Form.Control
                        as='textarea'
                        style={{ resize: 'none' }}
                        rows={3}
                        value={courseDescription}
                        onChange={(e) => setCourseDescription(e.target.value)}
                    />

                    <br />

                    <h4>Course Season</h4>
                    <div
                        style={{
                            display: 'flex',
                            width: '100%',
                            flexDirection: 'row',
                        }}
                    >
                        <Form.Select
                            value={courseSeason}
                            onChange={(e) => setCourseSeason(e.target.value)}
                        >
                            <option value={'Fall'}>Fall</option>
                            <option value={'Summer'}>Summer</option>
                            <option value={'Spring'}>Spring</option>
                        </Form.Select>

                        <Form.Select
                            value={courseYear}
                            onChange={(e) => setCourseYear(e.target.value)}
                        >
                            <option value={'2023'}>2023</option>
                            <option value={'2024'}>2024</option>
                        </Form.Select>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='primary' onClick={saveCourse}>
                    Save Course
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
export default CreateCourseModal;
