import { useState } from 'react';
import { QuestionTypeEnum } from '../lib/types';
import styles from '../styles/TeacherQuestions.module.css';
import QuestionButton from './QuestionButton';
import QuestionCard from './QuestionCard';
import QuestionInput from './QuestionInput';

interface ITeacherQuestions {
    liveQuestion: any;
    questions: any[];
    course_id: string;
    lecture_id: string;
}

const TeacherQuestions = ({
    liveQuestion,
    questions,
    course_id,
    lecture_id,
}: ITeacherQuestions) => {
    const [addQuestion, setAddQuestion] = useState(false);

    function numberOfResponses(responseChoice: string) {
        switch (responseChoice) {
            case 'A':
                console.log('A');
                return '10';
            case 'B':
                console.log('B');
                return '25';
            case 'C':
                console.log('C');
                return '3';
            case 'D':
                console.log('D');
                return '5';
        }
    }

    return (
        <div>
            <QuestionButton
                addQuestion={addQuestion}
                setAddQuestion={setAddQuestion}
            />

            <QuestionInput
                course_id={course_id}
                lecture_id={lecture_id}
                addQuestion={addQuestion}
                setAddQuestion={setAddQuestion}
            />

            {/* If there are no questions, display a block of text telling the user to add questions. */}
            {questions.length < 1 && (
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '1rem',
                    }}
                >
                    <h4>
                        Click "Add a Question" to start adding questions here.
                    </h4>
                </div>
            )}

            {/* Only display a LIVE question if there is one */}
            {liveQuestion &&
                liveQuestion.questionType ===
                    QuestionTypeEnum.MULTIPLE_CHOICE && (
                    <>
                        <h3 className={styles.live}>Live</h3>
                        <QuestionCard
                            question={liveQuestion}
                            course_id={course_id}
                            lecture_id={lecture_id}
                        />
                    </>
                )}

            {/* <h3 className={styles.live}>Live</h3>

            <QuestionCard
                question={{
                    multipleChoiceQuestion: {
                        title: 'Which offsets do we use in linear regression’s least square line fit? Suppose the horizontal axis is the independent variable and the vertical axis is the dependent variable:',
                    },
                }}
                course_id={course_id}
                lecture_id={lecture_id}
            /> */}

            {/* Only display header if there are questions still waiting to go live */}
            {questions.length > 0 && (
                <h3 className={styles.notLive}>Waiting to go live</h3>
            )}
            {/* 
            <div className={`card ${styles.cardCustom}`}>
                <div className='card-body'>
                    <div className={`row ${styles.questionCardRow1}`}>
                        <div className={`col-auto `}>
                            <div className={`row ${styles.questionCardRow2}`}>
                                <div className={`col `}>
                                    What is your name?
                                </div>
                                <div className={`col ${styles.questionCardCenter}`}>
                                    <small className="text-muted">5/10 answered</small>
                                </div>
                            </div>

                            <div className='row'>
                                <div className={`col ${styles.questionCardCenter}`}>
                                    <h3 className="lead"> 
                                        A: <small className="text-muted"> {numberOfResponses("A")} </small>
                                        B: <small className="text-muted"> {numberOfResponses("A")} </small>
                                        C: <small className="text-muted"> {numberOfResponses("A")} </small>
                                        D: <small className="text-muted"> {numberOfResponses("A")} </small>
                                    </h3> 
                                </div>
                            </div>
                        </div>

                        <div className={`col ${styles.questionCardRight}`}>
                            <LiveIcon fill='green' />
                            <CloseButton />
                        </div>
                    </div>
                    
                </div>
            </div> */}

            {questions &&
                questions.length > 0 &&
                questions.map((q) => {
                    if (q.questionType === QuestionTypeEnum.MULTIPLE_CHOICE)
                        return (
                            <QuestionCard
                                key={q._id}
                                question={q}
                                course_id={course_id}
                                lecture_id={lecture_id}
                            />
                        );
                })}
        </div>
    );
};

export default TeacherQuestions;
