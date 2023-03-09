import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import TeacherClassSettings from '../../../../components/TeacherClassSettings';
import TeacherQuestions from '../../../../components/TeacherQuestions';
import TeacherRoster from '../../../../components/TeacherRoster';
import TeacherStatistics from '../../../../components/TeacherStatistics';
import { getQuestionsForLecture } from '../../../../lib/api';
import styles from '../../../../styles/[lecture_id].module.css';

const Lecture = () => {
    const router = useRouter();
    const { course_id, lecture_id } = router.query;
    const [questions, setQuestions] = useState([]); // TODO: type this

    useEffect(() => {
        if (typeof course_id === 'string' && typeof lecture_id === 'string') {
            getQuestionsForLecture(course_id, lecture_id).then((res) => {
                console.log(res);
                setQuestions(res);
            });
        }
    }, [course_id, lecture_id]);

    return (
        <div className={styles.pageBody}>
            <Tabs
                defaultActiveKey='questions'
                id='justify-tab-example'
                className='mb-3'
                fill
            >
                <Tab eventKey='questions' title='Questions'>
                    <TeacherQuestions
                        liveQuestion={questions.find((q: any) => {
                            return q.active;
                        })}
                        questions={questions}
                    />
                </Tab>
                <Tab eventKey='roster' title='Roster'>
                    <TeacherRoster />
                </Tab>
                <Tab eventKey='statistics' title='Statistics'>
                    <TeacherStatistics />
                </Tab>
                <Tab eventKey='class-settings' title='Class Settings'>
                    <TeacherClassSettings />
                </Tab>
            </Tabs>
        </div>
    );
};

export default Lecture;
