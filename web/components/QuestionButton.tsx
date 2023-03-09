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
    function handleClick() {
        setAddQuestion(true);
    }

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
