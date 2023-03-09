import { useState } from 'react';
import { QuestionType } from '../lib/types';
import styles from '../styles/TeacherQuestions.module.css';
import QuestionButton from './QuestionButton';
import QuestionCard from './QuestionCard';
import QuestionInput from './QuestionInput';

interface ITeacherQuestions {
    liveQuestion: any;
    questions: any[];
}

const TeacherQuestions = ({ liveQuestion, questions }: ITeacherQuestions) => {
    const [addQuestion, setAddQuestion] = useState(false);

    return (
        <div>
            <QuestionButton
                addQuestion={addQuestion}
                setAddQuestion={setAddQuestion}
            />

            <QuestionInput
                addQuestion={addQuestion}
                setAddQuestion={setAddQuestion}
            />

            {/* Only display a LIVE question if there is one */}
            {liveQuestion &&
                liveQuestion.questionType === QuestionType.MULTIPLE_CHOICE && (
                    <>
                        <h3 className={styles.live}>Live</h3>
                        <QuestionCard
                            title={liveQuestion.multipleChoiceQuestion.title}
                        />
                    </>
                )}

            <h3 className={styles.notLive}>Waiting to go live</h3>

            {questions &&
                questions.length > 0 &&
                questions.map((q) => {
                    if (q.questionType === QuestionType.MULTIPLE_CHOICE)
                        return (
                            <QuestionCard
                                key={q._id}
                                title={q.multipleChoiceQuestion.title}
                            />
                        );
                })}
        </div>
    );
};

export default TeacherQuestions;
