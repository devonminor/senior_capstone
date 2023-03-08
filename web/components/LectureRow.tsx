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
