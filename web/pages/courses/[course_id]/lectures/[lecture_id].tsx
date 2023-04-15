import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import useSWR from 'swr';
import TeacherClassSettings from '../../../../components/TeacherClassSettings';
import TeacherQuestions from '../../../../components/TeacherQuestions';
import TeacherRoster from '../../../../components/TeacherRoster';
import TeacherStatistics from '../../../../components/TeacherStatistics';
import { fetcher } from '../../../../lib/server_requests';
import styles from '../../../../styles/[lecture_id].module.css';

const Lecture = () => {
    const router = useRouter();
    const { course_id, lecture_id } = router.query;
    const [questions, setQuestions] = useState([]); // TODO: type this
    const { data: questionsData } = useSWR(
        `/api/questions?courseId=${course_id}&lectureId=${lecture_id}`,
        fetcher
    );

    useEffect(() => {
        if (questionsData) {
            console.log('questionsData', questionsData);
            setQuestions(questionsData);
        }
    }, [questionsData]);

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
                        liveQuestion={
                            questions &&
                            questions.length > 0 &&
                            questions.find((q: any) => {
                                return q.active;
                            })
                        }
                        questions={questions}
                        course_id={course_id as string}
                        lecture_id={lecture_id as string}
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
