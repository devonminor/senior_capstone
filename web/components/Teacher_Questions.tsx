import React, { Dispatch, useState } from 'react';
import QuestionInput from '../components/QuestionInput';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import styles from "../styles/Teacher_Questions.module.css"


export default function Teacher_Questions() {
    const [addQuestion, setAddQuestion] = useState(false);

    return (
    <div>
        <QuestionButton addQuestion={addQuestion} setAddQuestion={setAddQuestion}/>

        <QuestionInput addQuestion={addQuestion} setAddQuestion={setAddQuestion}/>

        <h3 className={styles.live}>Live</h3>
        
        <div className={`card ${styles.cardCustom}`}>
            <div className="card-body">
                <div className="row">
                    <div className={`col ${styles.questionCardLeft}`}>What is your name?</div>
                    <div className={`col ${styles.questionCardRight}`}>3/18 answered</div>
                </div>  
            </div>
        </div>

        <h3 className={styles.notLive}>Waiting to go live</h3>

        <div className={`card ${styles.cardCustom}`}>
            <div className="card-body">
                <div className="row">
                    <div className={`col-6 ${styles.questionCardLeft}`}>What is your major?</div>
                    <div className={`col ${styles.questionCardRight}`}><CloseButton/></div>
                </div>  
            </div>
        </div>
        <div className={`card ${styles.cardCustom}`}>
            <div className="card-body">
                <div className="row">
                    <div className={`col-6 ${styles.questionCardLeft}`}>What year/month are you graduating?</div>
                    <div className={`col ${styles.questionCardRight}`}><CloseButton/></div>
                </div>  
            </div>
        </div>
        <div className={`card ${styles.cardCustom}`}>
            <div className="card-body">
                <div className="row">
                    <div className={`col-6 ${styles.questionCardLeft}`}>Name your favorite 3 courses at Tufts.</div>
                    <div className={`col ${styles.questionCardRight}`}><CloseButton/></div>
                </div>  
            </div>
        </div>
        <div className={`card ${styles.cardCustom}`}>
             <div className="card-body">
                <div className="row">
                    <div className={`col-6 ${styles.questionCardLeft}`}>How has your experience in the School of Engineering been?</div>
                    <div className={`col ${styles.questionCardRight}`}><CloseButton/></div>
                </div>  
            </div>
        </div>
    </div>
    );
}

type QuestionButtonProps = {
    addQuestion: boolean
    setAddQuestion: Dispatch<React.SetStateAction<boolean>>
}
  
function QuestionButton({addQuestion, setAddQuestion}: QuestionButtonProps) {
    function handleClick() {
        setAddQuestion(true)
    }

    return (
        <div className="d-grid gap-2" style={{padding: 10}}>
        <Button variant="primary" size="sm" active={false} onClick={handleClick}>Add a Question</Button>
        </div>
    )
}