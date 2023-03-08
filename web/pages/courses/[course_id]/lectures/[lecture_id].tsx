import { useRouter } from 'next/router';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Teacher_ClassSettings from '../../../../components/Teacher_ClassSettings';
import Teacher_Questions from '../../../../components/Teacher_Questions';
import Teacher_Roster from '../../../../components/Teacher_Roster';
import Teacher_Statistics from '../../../../components/Teacher_Statistics';
import styles from '../../../../styles/[lecture_id].module.css';

const Lecture = () => {
    const router = useRouter();
    const { course_id, lecture_id } = router.query;

    return (
        <div className={styles.pageBody}>
            <Tabs
                defaultActiveKey='questions'
                id='justify-tab-example'
                className='mb-3'
                fill
            >
                <Tab eventKey='questions' title='Questions'>
                    <Teacher_Questions />
                </Tab>
                <Tab eventKey='roster' title='Roster'>
                    <Teacher_Roster />
                </Tab>
                <Tab eventKey='statistics' title='Statistics'>
                    <Teacher_Statistics />
                </Tab>
                <Tab eventKey='class-settings' title='Class Settings'>
                    <Teacher_ClassSettings />
                </Tab>
            </Tabs>
        </div>
    );
};

export default Lecture;
