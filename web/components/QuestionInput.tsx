import React, { Dispatch, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import useSWRMutation from 'swr/mutation';
import { postRequest } from '../lib/server_requests';
import { QuestionTypeEnum } from '../lib/types';
import styles from '../styles/QuestionInput.module.css';
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
    const DEFAULT_NUM_RESPONSE_OPTIONS = 2;

    const [previewImage, setPreviewImage] = useState<string>();
    const [responseOptions, setResponseOptions] = useState<
        {
            index: number;
            text: string;
        }[]
    >([]);
    const [questionTitle, setQuestionTitle] = useState('');
    const [questionType, setQuestionType] = useState('multipleChoice');
    const { trigger: createQuestionTrigger } = useSWRMutation(
        '/api/questions',
        postRequest
    );

    // Handle submit button click
    const handleSave = () => {
        const options = responseOptions.map((option, i) => {
            return { name: option.text, order: i + 1 };
        });

        // IF ADDING MULTIPLE CHOICE QUESTION
        if (questionType === 'multipleChoice') {
            console.log('course_id', course_id);
            console.log('lecture_id', lecture_id);
            let newQuestionId;
            createQuestionTrigger({
                courseId: parseInt(course_id),
                lectureId: parseInt(lecture_id),
                mcq: {
                    title: questionTitle,
                    options,
                },
                questionType: QuestionTypeEnum.MULTIPLE_CHOICE,
            })
                .then((res) => res?.json())
                .then((res) => {
                    console.log('QuestionInputRes', res);
                    newQuestionId = res.numId;
                });
        }
        // IF ADDING FREE RESPONSE QUESTION
        else if (questionType === 'freeResponse') {
            createQuestionTrigger({
                courseId: parseInt(course_id),
                lectureId: parseInt(lecture_id),
                saq: {
                    title: questionTitle,
                },
                questionType: QuestionTypeEnum.SHORT_ANSWER,
            });
        }
        setAddQuestion(false);
        // window.location.reload();
    };

    // Handle question type change
    const handleQType = (e: any) => {
        console.log(e.target.value);
        setQuestionType(e.target.value);
    };

    // Handle image preview
    const handleImageUploadChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = e.target.files;
        if (files) setPreviewImage(URL.createObjectURL(files[0]));
    };

    // on add question open/close reset state
    useEffect(() => {
        if (addQuestion) setQuestionType('multipleChoice');
        if (previewImage) setPreviewImage(undefined);
        if (questionTitle) setQuestionTitle('');
        setResponseOptions(
            [...Array(DEFAULT_NUM_RESPONSE_OPTIONS)].map((_, i) => {
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
                <select
                    className={`form-select ${styles.questionSelect}`}
                    aria-label='Default select example'
                    onChange={handleQType}
                >
                    <option value='multipleChoice'>Multiple Choice</option>
                    <option value='freeResponse'>Free Response</option>
                    {/* <option value='freeDrawing'>Free Drawing</option> */}
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

                    {/* Image select */}
                    <div style={{ marginBottom: '15px' }}>
                        <Modal.Title>Image</Modal.Title>
                        <input
                            type='file'
                            accept='image/*'
                            multiple={false}
                            onChange={handleImageUploadChange}
                        />
                        <div
                            style={{
                                width: '100%',
                                marginTop: '15px',
                            }}
                        >
                            <img
                                src={previewImage}
                                style={{
                                    display: 'block',
                                    width: '75%',
                                    margin: 'auto',
                                }}
                            />
                        </div>
                    </div>

                    {/* If the question is multiple choice, show options with flexible number of choices */}
                    {questionType == 'multipleChoice' && (
                        <div>
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
                                                    responseOptions.at(-1)!
                                                        .index + 1) ||
                                                0,
                                            text: '',
                                        },
                                    ]);
                                }}
                            >
                                Add Option
                            </button>
                        </div>
                    )}
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
