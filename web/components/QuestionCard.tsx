import { CloseButton } from 'react-bootstrap';
import { removeQuestionFromLecture } from '../lib/api';
import styles from '../styles/TeacherQuestions.module.css';
import LiveIcon from './svg/LiveIcon';

interface IQuestionCard {
    question: any;
    live?: boolean;
    course_id: string;
    lecture_id: string;
}

const QuestionCard = ({
    question,
    live = false,
    course_id,
    lecture_id,
}: IQuestionCard) => {
    const handleDelete = () => {
        removeQuestionFromLecture(course_id, lecture_id, question.numId).then(
            () => {
                // refresh the page
                window.location.reload();
            }
        );
    };

    return (
        <div className={`card ${styles.cardCustom}`}>
            <div className='card-body'>
                <div className='row'>
                    <div className={`col-6 ${styles.questionCardLeft}`}>
                        {question.multipleChoiceQuestion.title}
                    </div>
                    <div className={`col ${styles.questionCardRight}`}>
                        {live && <LiveIcon fill='green' />}
                        {!live && <LiveIcon fill='darkred' />}
                        <CloseButton onClick={handleDelete} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionCard;
