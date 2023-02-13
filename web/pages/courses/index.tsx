import { useRouter } from "next/router";
import jumbo from "../../public/Tufts_Jumbos_logo.png"
import Image from 'next/image'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';


const Courses = () => {
    const router = useRouter();

    return (
        <div>
            <div className="row">
                <Col className="heading">
                    <h1>Courses Page</h1>
                </Col>
                <Col className="button">
                    <Button variant="primary">Add Course</Button>
                </Col>
            </div>

            <div className="row">
                <div className="col-sm-3">
                    <div className="card">
                        <Image className="cardImage" src={jumbo} alt="Card image cap"/>
                        <div className="card-body">
                        <h5 className="card-title">CS 116</h5>
                        <p className="card-text"><small className="text-muted">Spring 2023</small></p>
                        <a href="/courses/cs116" className="btn btn-primary">View Course</a>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="card">
                        <Image className="cardImage" src={jumbo} alt="Card image cap"/>
                        <div className="card-body">
                        <h5 className="card-title">ES 56</h5>
                        <p className="card-text"><small className="text-muted">Spring 2023</small></p>
                        <a href="/courses/es56" className="btn btn-primary">View Course</a>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="card">
                        <Image className="cardImage" src={jumbo} alt="Card image cap"/>
                        <div className="card-body">
                        <h5 className="card-title">CS 170</h5>
                        <p className="card-text"><small className="text-muted">Fall 2022</small></p>
                        <a href="/courses/cs170" className="btn btn-primary">View Course</a>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="card">
                        <Image className="cardImage" src={jumbo} alt="Card image cap"/>
                        <div className="card-body">
                        <h5 className="card-title">MATH 42</h5>
                        <p className="card-text"><small className="text-muted">Fall 2022</small></p>
                        <a href="/courses/cs170" className="btn btn-primary">View Course</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Courses;