import { useEffect, useState } from 'react';
import { CloseButton } from 'react-bootstrap';
import { ImStatsBars } from 'react-icons/im';
import { TbLivePhoto, TbLivePhotoOff } from 'react-icons/tb';
import useSWRMutation from 'swr/mutation';
import { deleteRequest, putRequest } from '../lib/server_requests';
import { QuestionTypeEnum } from '../lib/types';
import styles from '../styles/TeacherQuestions.module.css';
import FreeResponseStats from './FreeResponseStats';
import MultipleChoiceStats from './MultipleChoiceStats';

interface IQuestionCard {
    numStudents: number;
    question: any;
    live?: boolean;
    course_id: string;
    lecture_id: string;
}

const QuestionCard = ({
    numStudents,
    question,
    live = false,
    course_id,
    lecture_id,
}: IQuestionCard) => {
    const [showStats, setShowStats] = useState(false);
    const [numAnswered, setNumAnswered] = useState(0);

    const { trigger: deleteQuestionTrigger } = useSWRMutation(
        '/api/questions',
        deleteRequest
    );
    const { trigger: liveQuestionTrigger } = useSWRMutation(
        '/api/questions',
        putRequest
    );

    const handleLive = (isGoingLive: boolean) => {
        console.log('live');
        console.log('course_id', course_id);
        console.log('lecture_id', lecture_id);
        liveQuestionTrigger({
            courseId: parseInt(course_id),
            lectureId: parseInt(lecture_id),
            questionId: parseInt(question.numId),
            live: isGoingLive,
            action: 'updateLive',
        });
        window.location.reload();
    };

    const handleDelete = () => {
        deleteQuestionTrigger({
            courseId: parseInt(course_id),
            lectureId: parseInt(lecture_id),
            questionId: parseInt(question.numId),
        });
        window.location.reload();
    };

    const handleStatsClick = () => {
        setShowStats(!showStats);
    };

    useEffect(() => {
        if (question) {
            if (
                question.multipleChoiceQuestion &&
                question.multipleChoiceQuestion.responses
            ) {
                setNumAnswered(
                    question.multipleChoiceQuestion.responses.length
                );
            } else if (
                question.shortAnswerQuestion &&
                question.shortAnswerQuestion.responses
            ) {
                setNumAnswered(question.shortAnswerQuestion.responses.length);
            }
        }
    }, [question]);

    return (
        <div className={`card ${styles.cardCustom}`}>
            <div className='card-body'>
                <div className={`row ${styles.questionCardContainer}`}>
                    <div className='col'>
                        <div className='row'>
                            <div
                                className={`col ${styles.questionCardQuestion}`}
                            >
                                {question.questionType ==
                                    QuestionTypeEnum.MULTIPLE_CHOICE &&
                                    question.multipleChoiceQuestion.title}
                                {question.questionType ==
                                    QuestionTypeEnum.SHORT_ANSWER &&
                                    question.shortAnswerQuestion.title}
                            </div>
                        </div>

                        {/* TODO: UPDATE THIS WITH ACTUAL NUMBERS */}
                        <div className='row'>
                            <div className={`col ${styles.numAnswered}`}>
                                <small className='text-muted'>
                                    {numAnswered}/{numStudents} answered
                                </small>
                            </div>
                        </div>
                    </div>

                    <div className={`col`}>
                        <div className={styles.questionCardIcons}>
                            <button
                                type='button'
                                className={`btn btn-secondary  ${styles.graphIcon}`}
                                onClick={handleStatsClick}
                            >
                                <ImStatsBars />
                            </button>
                            {live && (
                                <TbLivePhoto
                                    fill='green'
                                    size={30}
                                    onClick={() => handleLive(false)}
                                    onMouseEnter={({
                                        target,
                                    }: {
                                        target: any;
                                    }) => {
                                        target.style.cursor = 'pointer';
                                        target.style.fill = 'darkgreen';
                                    }}
                                    onMouseLeave={({
                                        target,
                                    }: {
                                        target: any;
                                    }) => {
                                        target.style.fill = 'green';
                                    }}
                                />
                            )}
                            {!live && (
                                <TbLivePhotoOff
                                    fill='red'
                                    size={30}
                                    onClick={() => handleLive(true)}
                                    onMouseEnter={({
                                        target,
                                    }: {
                                        target: any;
                                    }) => {
                                        target.style.cursor = 'pointer';
                                        target.style.fill = 'darkred';
                                    }}
                                    onMouseLeave={({
                                        target,
                                    }: {
                                        target: any;
                                    }) => {
                                        target.style.fill = 'red';
                                    }}
                                />
                            )}
                            <CloseButton onClick={handleDelete} />
                        </div>
                    </div>
                </div>

                {showStats &&
                    question.questionType ===
                        QuestionTypeEnum.MULTIPLE_CHOICE && (
                        <MultipleChoiceStats
                            mcq={question.multipleChoiceQuestion}
                        />
                    )}

                {showStats &&
                    question.questionType === QuestionTypeEnum.SHORT_ANSWER && (
                        <FreeResponseStats saq={question.shortAnswerQuestion} />
                    )}
            </div>
        </div>
    );
};

export default QuestionCard;
