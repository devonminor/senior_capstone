/*
 *  TeacherRoster.tsx
 *  PollAnywhere - CS 98 Capstone Project
 *
 *  This component displays the roster for a course.
 *
 *  Last updated: 05/12/2023
 */

import { useEffect, useState } from 'react';
import styles from '../styles/TeacherRoster.module.css';
import { RosterRow } from './RosterRow';

interface ITeacherRoster {
    course: any;
}

export default function TeacherRoster({ course }: ITeacherRoster) {
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);

    // Once the course data is loaded, set the teachers and students
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
                    {/* Add a Row containing 'Teacher' and their email for every teacher */}
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
                    {/* Add a Row containing 'Student' and their email for every student */}
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
