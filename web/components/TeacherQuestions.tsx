import { useState } from 'react';
import { QuestionTypeEnum } from '../lib/types';
import styles from '../styles/TeacherQuestions.module.css';
import QuestionButton from './QuestionButton';
import QuestionCard from './QuestionCard';
import QuestionInput from './QuestionInput';
import { CloseButton } from 'react-bootstrap';
import LiveIcon from './svg/LiveIcon';
import Image from 'next/image';
import jumbo from '../public/Tufts_Jumbos_logo.png';


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
    lecture_id
}: ITeacherQuestions) => {
    const [addQuestion, setAddQuestion] = useState(false);
    const [MCStatsVisbility, setMCStatsVisbility] = useState(false);
    const [FRStatsVisbility, setFRStatsVisbility] = useState(false);
    const [FDStatsVisbility, setFDStatsVisbility] = useState(false);

    function numberOfResponses(responseChoice: string) {
        switch (responseChoice) {
            case "A":
                console.log("fetch number of answers = A")
                return "10"
            case "B":
                console.log("fetch number of answers = B")
                return "25"
            case "C":
                console.log("fetch number of answers = C")
                return "3"
            case "D":
                console.log("fetch number of answers = D")
                return "5"
        }
    }

    function handleStatsClick() {
        console.log("CLICK!")
        setMCStatsVisbility(!MCStatsVisbility)
        setFRStatsVisbility(!FRStatsVisbility)
        setFDStatsVisbility(!FDStatsVisbility)
    }

    const MCStats =
        <div>
            <hr></hr>
            <div className="container text-center">
                <div className="row">
                    <div className="col">
                        <h3 className="lead">
                            A: <small className="text-muted"> {numberOfResponses("A")} </small>
                        </h3> 
                    </div>
                    <div className="col">
                        <h3 className="lead">
                            B: <small className="text-muted"> {numberOfResponses("B")} </small>
                        </h3> 
                    </div>
                    <div className="col">
                        <h3 className="lead">
                            C: <small className="text-muted"> {numberOfResponses("C")} </small>
                        </h3> 
                    </div>
                    <div className="col">
                        <h3 className="lead">
                            D: <small className="text-muted"> {numberOfResponses("D")} </small>
                        </h3> 
                    </div>
                </div>
            </div>
        </div>

        const FRStats =
            <div>
                <hr></hr>
                <div className="card">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Tufts provides its undergraduates the resources of a major research university and the attention of a liberal arts college. Browse our over 150+ majors and minors below! You can narrow down your options by filtering by School, Category, or Program Type.</li>
                        <li className="list-group-item">The interdisciplinary offerings at Tufts mean you can pursue your interests in and across our three undergraduate schools, all led by inspiring faculty members eager to work with undergraduate students.</li>
                        <li className="list-group-item">The Tufts University School of Engineering offers rigorous engineering education in a unique environment that blends the intellectual and technology resources of a world-class research university with the strengths of a top-ranked liberal arts college. Choose from more than 35 graduate degree and certificate programs, and engineer your future!</li>
                    </ul>
                </div>
            </div>
        
        const FDStats =
            <div>
                <hr></hr>
                <div className="card-group">
                    <div className="card">
                        <Image className={styles.cardImage} src={jumbo} alt='Card image cap'/>                        
                    </div>
                    <div className="card">
                        <Image className={styles.cardImage} src={jumbo} alt='Card image cap'/>                        
                    </div>
                    <div className="card">
                        <Image className={styles.cardImage} src={jumbo} alt='Card image cap'/>                        
                    </div>
                    <div className="card">
                        <Image className={styles.cardImage} src={jumbo} alt='Card image cap'/>                        
                    </div>
                </div>
            </div>

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

            <h3 className={styles.notLive}>Waiting to go live</h3>

            <div className={`card ${styles.cardCustom}`}>
                <div className='card-body'>
                    <div className={`row ${styles.questionCardContainer}`}>
                        <div className='col'>
                            <div className='row'>
                                <div className={`col ${styles.questionCardQuestion}`}>
                                    What is your name?
                                </div>
                            </div>
                            <div className='row'>
                                <div className={`col ${styles.numAnswered}`}>
                                    <small className="text-muted">5/10 answered</small>
                                </div>
                            </div>
                        </div>

                        <div className='col'>
                            <div className={styles.questionCardIcons}>
                                <button type="button" className={`btn btn-secondary  ${styles.graphIcon}`} onClick={handleStatsClick}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bar-chart-line" viewBox="0 0 16 16">
                                        <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2zm1 12h2V2h-2v12zm-3 0V7H7v7h2zm-5 0v-3H2v3h2z"/>
                                    </svg>
                                </button>
                                <LiveIcon fill='green' />
                                <CloseButton />
                            </div>
                        </div>

                        
                    </div>

                    {MCStatsVisbility ? MCStats : <></>}
                </div>
            </div>

            <div className={`card ${styles.cardCustom}`}>
                <div className='card-body'>
                    <div className={`row ${styles.questionCardContainer}`}>
                        <div className='col'>
                            <div className='row'>
                                <div className={`col ${styles.questionCardQuestion}`}>
                                    What is your name?
                                </div>
                            </div>
                            <div className='row'>
                                <div className={`col ${styles.numAnswered}`}>
                                    <small className="text-muted">5/10 answered</small>
                                </div>
                            </div>
                        </div>

                        <div className='col'>
                            <div className={styles.questionCardIcons}>
                                <button type="button" className={`btn btn-secondary  ${styles.graphIcon}`} onClick={handleStatsClick}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bar-chart-line" viewBox="0 0 16 16">
                                        <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2zm1 12h2V2h-2v12zm-3 0V7H7v7h2zm-5 0v-3H2v3h2z"/>
                                    </svg>
                                </button>
                                <LiveIcon fill='green' />
                                <CloseButton />
                            </div>
                        </div>

                        
                    </div>

                    {MCStatsVisbility ? FRStats : <></>}
                </div>
            </div>

            <div className={`card ${styles.cardCustom}`}>
                <div className='card-body'>
                    <div className={`row ${styles.questionCardContainer}`}>
                        <div className='col'>
                            <div className='row'>
                                <div className={`col ${styles.questionCardQuestion}`}>
                                    What is your name?
                                </div>
                            </div>
                            <div className='row'>
                                <div className={`col ${styles.numAnswered}`}>
                                    <small className="text-muted">5/10 answered</small>
                                </div>
                            </div>
                        </div>

                        <div className='col'>
                            <div className={styles.questionCardIcons}>
                                <button type="button" className={`btn btn-secondary  ${styles.graphIcon}`} onClick={handleStatsClick}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bar-chart-line" viewBox="0 0 16 16">
                                        <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2zm1 12h2V2h-2v12zm-3 0V7H7v7h2zm-5 0v-3H2v3h2z"/>
                                    </svg>
                                </button>
                                <LiveIcon fill='green' />
                                <CloseButton />
                            </div>
                        </div>

                        
                    </div>

                    {FDStatsVisbility ? FDStats : <></>}
                </div>
            </div>

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
