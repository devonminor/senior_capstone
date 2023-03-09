import React, { Dispatch, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import QuestionTimeLimit from './QuestionTimeLimit';
import ResponseOption from './ResponseOption';

type QuestionInputProps = {
    addQuestion: boolean;
    setAddQuestion: Dispatch<React.SetStateAction<boolean>>;
};

export default function QuestionInput({
    addQuestion,
    setAddQuestion,
}: QuestionInputProps) {
    const defaultNumResponseOptions = 2;

    const handleClick = () => {
        setAddQuestion(false);
    };

    const [responseOptions, setResponseOptions] = useState<
        {
            index: number;
        }[]
    >([]);

    useEffect(() => {
        console.log(responseOptions);
    }, [responseOptions]);

    useEffect(() => {
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
        <Modal show={addQuestion} onHide={handleClick}>
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
                            <Form.Control as='textarea' rows={3} />
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
                <Button variant='primary' onClick={handleClick}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
