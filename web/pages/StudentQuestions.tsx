import Button from 'react-bootstrap/Button';
import styles from "../styles/Teacher_Questions.module.css"

export default function Teacher_Questions() {

    return (
    <>  
        
        <div className='mx-3'>

            <h3 className={styles.live}>Live</h3>
            
            <div className={`card ${styles.cardCustom}`}>
                <div className="card-body">
                    <div className="row">
                        <div className={`col ${styles.questionCardLeft}`}>What is your name?</div>
                        <div className={`col ${styles.questionCardRight}`}>3/18 answered</div>
                    </div>  
                </div>
            </div>

            <h3 className={styles.notLive}>History</h3>

            
            
        </div>
    </>
    );
}