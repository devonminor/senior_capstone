import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import styles from '../../../styles/lecturesPage.module.css';

const Course = () => {
    const router = useRouter();
    const course_id = router.query.course_id;

    if (typeof course_id != 'string') {
        return <></>;
    }

    function handleClick() {
        var url = `/courses/${course_id}/123456`;
        router.push(url);
    }

    return (
        <div className={styles.pageBody}>
            <div className='row'>
                <Col className={styles.addFolderButton}>
                    <Button variant='primary'>Add Folder</Button>
                </Col>
            </div>
            <div className={`row ${styles.lecturesContainer}`}>
                <table className='table table-striped table-hover'>
                    <thead>
                        <tr>
                            <th scope='col'>Unit #</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr onClick={handleClick}>
                            <th scope='row'>1</th>
                            <td>Building a Web Page Overview</td>
                        </tr>
                        <tr onClick={handleClick}>
                            <th scope='row'>2</th>
                            <td>Setting Up the Backend</td>
                        </tr>
                        <tr onClick={handleClick}>
                            <th scope='row'>3</th>
                            <td>Setting Up the Frontend</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Course;
