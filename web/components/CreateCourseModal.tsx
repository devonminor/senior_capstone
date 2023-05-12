/*
 *  CreateCourseModal.tsx
 *  PollAnywhere - CS 98 Capstone Project
 *
 *  The modal that pops up when the user wants to create a new course.
 *
 *  Last updated: 05/12/2023
 */

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

    // When the user clicks the save course button, send a request to the
    // server to create the course and refresh the page.
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
                    {/* Course Name Input */}
                    <h4>Course Name</h4>
                    <Form.Control
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                    />

                    <br />

                    {/* Course Description Input */}
                    <h4>Description</h4>
                    <Form.Control
                        as='textarea'
                        style={{ resize: 'none' }}
                        rows={3}
                        value={courseDescription}
                        onChange={(e) => setCourseDescription(e.target.value)}
                    />

                    <br />

                    {/* Course Season Selection */}
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

            {/* Save Course Button */}
            <Modal.Footer>
                <Button variant='primary' onClick={saveCourse}>
                    Save Course
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
export default CreateCourseModal;
