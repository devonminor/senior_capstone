import { CloseButton } from 'react-bootstrap';
import styles from '../styles/TeacherQuestions.module.css';
import LiveIcon from './svg/LiveIcon';

interface IQuestionCard {
    title: string;
    live?: boolean;
}

const QuestionCard = ({ title, live = false }: IQuestionCard) => {
    return (
        <div className={`card ${styles.cardCustom}`}>
            <div className='card-body'>
                <div className='row'>
                    <div className={`col-6 ${styles.questionCardLeft}`}>
                        {title}
                    </div>
                    <div className={`col ${styles.questionCardRight}`}>
                        {live && <LiveIcon fill='green' />}
                        {!live && <LiveIcon fill='darkred' />}
                        <CloseButton />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionCard;
