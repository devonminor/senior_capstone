import { useRouter } from "next/router";
import parse_course_id from "../../../components/parse_course_id";

const Course = () => {
    const router = useRouter();
    const course_id = router.query.course_id;

    if (typeof course_id != "string") {
        return <></>
    }

    var course_name = parse_course_id(course_id)

    return (
        <div>
            <div className="courseName">{course_name}</div>

            <table className="table table-hover">
            <thead>
                <tr>
                <th scope="col">Unit #</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">1</th>
                <td>Building a Web Page Overview</td>
                </tr>
                <tr>
                <th scope="row">2</th>
                <td>Setting Up the Backend</td>
                </tr>
                <tr>
                <th scope="row">3</th>
                <td>Setting Up the Frontend</td>
                </tr>
            </tbody>
            </table>
        </div>
    )
}

export default Course;