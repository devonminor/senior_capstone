import { CloseButton } from 'react-bootstrap';
import useSWRMutation from 'swr/mutation';
import { deleteRequest } from '../lib/server_requests';
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
    const { trigger } = useSWRMutation('/api/questions', deleteRequest);

    const handleDelete = () => {
        trigger({
            courseId: parseInt(course_id),
            lectureId: parseInt(lecture_id),
            questionId: parseInt(question.numId),
        });
        window.location.reload();
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
