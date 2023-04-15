import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../lib/server_requests';
import styles from '../styles/TeacherRoster.module.css';
import { RosterRow } from './RosterRow';

export default function TeacherRoster() {
    const router = useRouter();
    const { course_id } = router.query;
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);

    const { data: courseData } = useSWR(`/api/courses/${course_id}`, fetcher, {
        revalidateOnFocus: false,
    });

    useEffect(() => {
        if (courseData) {
            setTeachers(courseData.teacherEmails);
            setStudents(courseData.studentEmails);
        }
    }, [courseData]);

    return (
        <div className={`row ${styles.rosterContainer}`}>
            <table className='table table-striped table-hover'>
                <thead>
                    <tr>
                        <th scope='col'>Role</th>
                        <th scope='col'>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers &&
                        teachers.length > 0 &&
                        teachers.map((email: any, i: number) => {
                            return (
                                <RosterRow
                                    role={'Teacher'}
                                    email={email}
                                    key={i}
                                />
                            );
                        })}
                    {students &&
                        students.length > 0 &&
                        students.map((email: any, i: number) => {
                            return (
                                <RosterRow
                                    role={'Student'}
                                    email={email}
                                    key={i}
                                />
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}
