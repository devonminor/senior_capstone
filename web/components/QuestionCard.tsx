/*
 *  QuestionCard.tsx
 *  PollAnywhere - CS 98 Capstone Project
 *
 *  The card that displays all of the relevant information for a question
 *  that a teacher has added to a lecture.
 *
 *  Last updated: 05/12/2023
 */

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

    // When the user clicks the live button, send a request to the server
    // to update the question's live status and reload the page.
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

    // When a user clicks the delete button, send a request to the server
    // to delete the question and reload the page.
    const handleDelete = () => {
        deleteQuestionTrigger({
            courseId: parseInt(course_id),
            lectureId: parseInt(lecture_id),
            questionId: parseInt(question.numId),
        });
        window.location.reload();
    };

    // When a user clicks the stats button, toggle the stats dropdown.
    const handleStatsClick = () => {
        setShowStats(!showStats);
    };

    // Once a question is loaded, set the number of students who have answered it.
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
        console.log('question', question);
    }, [question]);

    return (
        <div className={`card ${styles.cardCustom}`}>
            <div className='card-body'>
                <div className={`row ${styles.questionCardContainer}`}>
                    <div className='col'>
                        {/* Show the title/name for the question */}
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

                        {/* Show the ratio to answered vs. total on roster */}
                        <div className='row'>
                            <div className={`col ${styles.numAnswered}`}>
                                <small className='text-muted'>
                                    {numAnswered}/{numStudents} answered
                                </small>
                            </div>
                        </div>
                    </div>

                    {/* Show the buttons for stats, live, and deletion */}
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

                {/* When the stats button is clickd and the type is multiple choice,
                    show the statistics dropdown for multiple choice. */}
                {showStats &&
                    question.questionType ===
                        QuestionTypeEnum.MULTIPLE_CHOICE && (
                        <>
                            {question.multipleChoiceQuestion.image && (
                                <img
                                    src={question.multipleChoiceQuestion.image}
                                    height={200}
                                />
                            )}
                            <MultipleChoiceStats
                                mcq={question.multipleChoiceQuestion}
                            />
                        </>
                    )}

                {/* When the stats button is clicked and the type is short answer/free response
                    show the stasistics button for free response. */}
                {showStats &&
                    question.questionType === QuestionTypeEnum.SHORT_ANSWER && (
                        <>
                            {question.shortAnswerQuestion.image && (
                                <img
                                    src={question.shortAnswerQuestion.image}
                                    height={200}
                                />
                            )}
                            <FreeResponseStats
                                saq={question.shortAnswerQuestion}
                            />
                        </>
                    )}
            </div>
        </div>
    );
};

export default QuestionCard;
