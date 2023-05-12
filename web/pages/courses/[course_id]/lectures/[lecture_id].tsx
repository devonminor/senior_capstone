/*
 *  [lecture_id].tsx
 *  PollAnywhere - CS 98 Capstone Project
 *
 *  This is the entry point for lecture questions. From the page, you can
 *  add/remove questions, view the roster, and view the info/settings of the
 *  course.
 *
 *  Last updated: 05/12/2023
 */

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import useSWR from 'swr';
import TeacherClassSettings from '../../../../components/TeacherClassSettings';
import TeacherQuestions from '../../../../components/TeacherQuestions';
import TeacherRoster from '../../../../components/TeacherRoster';
import { fetcher } from '../../../../lib/server_requests';
import styles from '../../../../styles/[lecture_id].module.css';

const Lecture = () => {
    const router = useRouter();
    const { course_id, lecture_id } = router.query;
    const [questions, setQuestions] = useState([]);
    const [course, setCourse] = useState<any>(null);
    const { data: courseData } = useSWR(`/api/courses/${course_id}`, fetcher);
    const { data: questionsData } = useSWR(
        `/api/questions?courseId=${course_id}&lectureId=${lecture_id}`,
        fetcher
    );

    useEffect(() => {
        if (courseData) setCourse(courseData);
    }, [courseData]);

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
                {/* Tab for questions */}
                <Tab eventKey='questions' title='Questions'>
                    <TeacherQuestions
                        course={course}
                        liveQuestion={
                            questions &&
                            questions.length > 0 &&
                            questions.find((q: any, index: number) => {
                                if (!q.live) return;
                                let liveQuestion = q.live;
                                questions.splice(index, 1);
                                return liveQuestion;
                            })
                        }
                        questions={questions}
                        course_id={course_id as string}
                        lecture_id={lecture_id as string}
                    />
                </Tab>

                {/* Tab for rosters */}
                <Tab eventKey='roster' title='Roster'>
                    <TeacherRoster course={course} />
                </Tab>

                {/* Tab for settings */}
                <Tab eventKey='class-settings' title='Class Settings'>
                    <TeacherClassSettings course={course} />
                </Tab>
            </Tabs>
        </div>
    );
};

export default Lecture;
