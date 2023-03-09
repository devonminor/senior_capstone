import React, { Dispatch, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { addQuestionToLecture } from '../lib/api';
import { QuestionTypeEnum } from '../lib/types';
import QuestionTimeLimit from './QuestionTimeLimit';
import ResponseOption from './ResponseOption';

type QuestionInputProps = {
    course_id: string;
    lecture_id: string;
    addQuestion: boolean;
    setAddQuestion: Dispatch<React.SetStateAction<boolean>>;
};

export default function QuestionInput({
    course_id,
    lecture_id,
    addQuestion,
    setAddQuestion,
}: QuestionInputProps) {
    const defaultNumResponseOptions = 2;

    const handleSave = () => {
        addQuestionToLecture(
            course_id,
            lecture_id,
            QuestionTypeEnum.MULTIPLE_CHOICE,
            questionTitle
        ).then((res) => {
            // reload the page to update the question list
            window.location.reload();
        });
        setAddQuestion(false);
    };

    const [responseOptions, setResponseOptions] = useState<
        {
            index: number;
        }[]
    >([]);
    const [questionTitle, setQuestionTitle] = useState('');

    // When the modal opens, reset it to the default state
    useEffect(() => {
        setQuestionTitle('');
        setResponseOptions(
            [...Array(defaultNumResponseOptions)].map((_, i) => {
                return { index: i, text: '' };
            })
        );
    }, [addQuestion]);

    if (!addQuestion) {
        return <></>;
    }

    return (
        <Modal show={addQuestion} onHide={() => setAddQuestion(false)}>
            <Modal.Header closeButton>
                <DropdownButton
                    id='dropdown-basic-button'
                    title='Multiple Choice'
                >
                    <Dropdown.Item>Multiple Choice</Dropdown.Item>
                    <Dropdown.Item>Free Response</Dropdown.Item>
                    <Dropdown.Item>Free Drawing</Dropdown.Item>
                </DropdownButton>
            </Modal.Header>
            <Modal.Body>
                <>
                    <Modal.Title>Question</Modal.Title>

                    <Form>
                        <Form.Group
                            className='mb-3'
                            controlId='exampleForm.ControlTextarea1'
                        >
                            <Form.Control
                                as='textarea'
                                rows={3}
                                value={questionTitle}
                                onChange={(e) => {
                                    setQuestionTitle(e.target.value);
                                }}
                            />
                        </Form.Group>
                    </Form>

                    {/* <Modal.Title>Attachments</Modal.Title>

                    <input type='file'></input> */}

                    <Modal.Title>Response Options</Modal.Title>

                    {/* For each response option, render a ResponseOption */}
                    {responseOptions.map((responseOption, i) => {
                        return (
                            <ResponseOption
                                key={i}
                                index={i + 1}
                                responseIndex={responseOption.index}
                                responseOptions={responseOptions}
                                setResponseOptions={setResponseOptions}
                            />
                        );
                    })}

                    <button
                        onClick={() => {
                            setResponseOptions([
                                ...responseOptions,
                                {
                                    index:
                                        (responseOptions.length > 0 &&
                                            responseOptions.at(-1) !=
                                                undefined &&
                                            responseOptions.at(-1)!.index +
                                                1) ||
                                        0,
                                },
                            ]);
                        }}
                    >
                        Add Option
                    </button>

                    <br></br>

                    <Modal.Title>Time Limit</Modal.Title>
                    <QuestionTimeLimit />
                </>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='primary' onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
