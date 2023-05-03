import { useEffect, useState } from 'react';
import styles from '../styles/TeacherRoster.module.css';
import { RosterRow } from './RosterRow';

interface ITeacherRoster {
    course: any;
}

export default function TeacherRoster({ course }: ITeacherRoster) {
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        if (course) {
            setTeachers(course.teacherEmails);
            setStudents(course.studentEmails);
        }
    }, [course]);

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
