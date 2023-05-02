import React, { Dispatch, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import useSWRMutation from 'swr/mutation';
import { postRequest } from '../lib/server_requests';
import ResponseOption from './ResponseOption';
import styles from '../styles/QuestionInput.module.css';
import QuestionTimeLimit from './QuestionTimeLimit';


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

    const { trigger } = useSWRMutation('/api/questions', postRequest);

    const handleSave = () => {
        const options = responseOptions.map((option, i) => {
            return { name: option.text, order: i + 1 };
        });
        trigger({
            course_id: parseInt(course_id),
            lecture_id: parseInt(lecture_id),
            mcq: {
                title: questionTitle,
                options,
            },
        });
        setAddQuestion(false);
        window.location.reload();
    };

    const [responseOptions, setResponseOptions] = useState<
        {
            index: number;
            text: string;
        }[]
    >([]);
    const [questionTitle, setQuestionTitle] = useState('');
    const [questionType, setQuestionType] = useState("multipleChoice");

    function handleQType(e: any) {
        setQuestionType(e.target.value)
        console.log(e.target.value)
    }
    
    // set default question type to multiple choice
    useEffect(() => {
        if (addQuestion) {
            setQuestionType("multipleChoice")
        }

      }, [addQuestion]);

    const responseOptionsUI =
                <div>
                    <br></br>

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
                                    text: '',
                                },
                            ]);
                        }}
                    >
                        Add Option
                    </button>
                </div>

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
                <select className={`form-select ${styles.questionSelect}`} aria-label="Default select example" onChange={handleQType}>
                    <option value="multipleChoice">Multiple Choice</option>
                    <option value="freeResponse">Free Response</option>
                    <option value="freeDrawing">Free Drawing</option>
                </select>
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

                    <Modal.Title>Image</Modal.Title>

                    <input type='file'></input>
                    
                    {questionType == "multipleChoice" ? responseOptionsUI : <></>}
                    <br></br>
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
