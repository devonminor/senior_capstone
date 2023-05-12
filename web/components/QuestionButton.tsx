/*
 *  QuestionButton.tsx
 *  PollAnywhere - CS 98 Capstone Project
 *
 *  Button to add a question on the TeacherQuestions page.
 *
 *  Last updated: 05/12/2023
 */

import { Dispatch } from 'react';
import { Button } from 'react-bootstrap';

interface QuestionButtonProps {
    addQuestion: boolean;
    setAddQuestion: Dispatch<React.SetStateAction<boolean>>;
}

const QuestionButton = ({
    addQuestion,
    setAddQuestion,
}: QuestionButtonProps) => {
    const handleClick = () => {
        setAddQuestion(true);
    };

    return (
        <div className='d-grid gap-2 p-10'>
            <Button
                variant='primary'
                size='sm'
                active={false}
                onClick={handleClick}
            >
                Add a Question
            </Button>
        </div>
    );
};

export default QuestionButton;
