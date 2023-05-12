/*
 *  LectureRow.tsx
 *  PollAnywhere - CS 98 Capstone Project
 *
 *  The row that represents a lecture in the lecture table from /courses/[course_id].
 *
 *  Last updated: 05/12/2023
 */

import { NextRouter } from 'next/router';

interface ILectureRow {
    row: number;
    router: NextRouter;
    course_id: string;
    lecture_id: string;
    lecture_name: string;
}

const LectureRow = ({
    row,
    router,
    course_id,
    lecture_id,
    lecture_name,
}: ILectureRow) => {
    // When a lecture is clicked, redirect to the questions page for that lecture
    const handleClick = () => {
        var url = `/courses/${course_id}/lectures/${lecture_id}`;
        router.push(url);
    };

    return (
        <tr onClick={handleClick}>
            <th scope='row'>{row}</th>
            <td>{lecture_name}</td>
        </tr>
    );
};

export default LectureRow;
