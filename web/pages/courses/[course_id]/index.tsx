import { useRouter } from "next/router";
import parse_course_id from "../../../components/parse_course_id";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

const Course = () => {
    const router = useRouter();
    const course_id = router.query.course_id;

    if (typeof course_id != "string") {
        return <></>
    }

    var course_name = parse_course_id(course_id)

    function handleClick() {
        var url = "/courses/" + course_id + "/123456"
        router.push(url)
    }

    return (
        <div>
            <div className="row">
                <Col className="button">
                    <Button variant="primary">Add Folder</Button>
                </Col>
            </div>
            <div className="row lecturesContainer">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                        <th scope="col">Unit #</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr onClick={handleClick}>
                            <th scope="row">1</th>
                            <td>Building a Web Page Overview</td>
                        </tr>
                        <tr onClick={handleClick}>
                            <th scope="row">2</th>
                            <td>Setting Up the Backend</td>
                        </tr>
                        <tr onClick={handleClick}>
                            <th scope="row">3</th>
                            <td>Setting Up the Frontend</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Course;