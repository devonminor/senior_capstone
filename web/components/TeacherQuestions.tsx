import { useEffect, useState } from 'react';
import { QuestionTypeEnum } from '../lib/types';
import styles from '../styles/TeacherQuestions.module.css';
import QuestionButton from './QuestionButton';
import QuestionCard from './QuestionCard';
import QuestionInput from './QuestionInput';

interface ITeacherQuestions {
    course: any;
    liveQuestion: any;
    questions: any[];
    course_id: string;
    lecture_id: string;
}

const TeacherQuestions = ({
    course,
    liveQuestion,
    questions,
    course_id,
    lecture_id,
}: ITeacherQuestions) => {
    const [addQuestion, setAddQuestion] = useState(false);

    useEffect(() => {
        console.log('courseData', course);
    }, []);

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
            {!liveQuestion && questions.length < 1 && (
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
            {liveQuestion && (
                <>
                    <h3 className={styles.live}>Live</h3>
                    <QuestionCard
                        numStudents={course.studentEmails.length}
                        question={liveQuestion}
                        live={true}
                        course_id={course_id}
                        lecture_id={lecture_id}
                    />
                </>
            )}

            {/* Only display header if there are questions still waiting to go live */}
            {questions.length > 0 && (
                <h3 className={styles.notLive}>Waiting to go live</h3>
            )}

            {questions &&
                questions.length > 0 &&
                questions.map((q) => {
                    if (
                        q.questionType === QuestionTypeEnum.MULTIPLE_CHOICE ||
                        q.questionType === QuestionTypeEnum.SHORT_ANSWER
                    )
                        return (
                            <QuestionCard
                                numStudents={course.studentEmails.length}
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
