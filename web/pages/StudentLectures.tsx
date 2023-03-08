import styles from "../styles/Layout.module.css"
import Image from 'next/image'
import jumbo from "../public/Tufts_Jumbos_logo.png"
import logo from '../public/Poll_Anywhere_logo.png'
import gear from '../public/gear-wide-connected.svg'
import {Card, Button, Col, Row, Container} from 'react-bootstrap';


const StudentLectures = () => {

    const lectures = [
        {numId: 11,
            name: 'First Lec',
            description: 'Getting Started with fundamentals, it is important to note that sometimes, evertime you must always definetly continueosly',
            createdAt: "01-01-2023",
            lastUpdated: "01-01-2023",
            active: true,
            questions: []
        },
        {numId: 11,
            name: 'Second Lec',
            description: 'Getting Started',
            createdAt: "01-05-2023",
            lastUpdated: "01-01-2023",
            active: false,
            questions: []
        },
        {numId: 11,
            name: 'Third Lec',
            description: 'Building up on previous knowledge',
            createdAt: "01-10-2023",
            lastUpdated: "01-01-2023",
            active: true,
            questions: []
        },
        {numId: 11,
            name: 'Forth Lec',
            description: 'Wrapping Up',
            createdAt: "01-30-2023",
            lastUpdated: "01-01-2023",
            active: true,
            questions: []
        },
    ]

    return (
        <>
            { /* Navbar Div */}
            <div> 
                <nav className={`navbar navbar-expand-fluid sticky-top bg-light ${styles.navbarCustom}`}>
                    <div className={`row ${styles.navRow}`}>
                        <div className={`col ${styles.navLeft}`}>
                        <a className="navbar-brand" href="/">
                            <Image className={styles.PAlogo} src={logo} alt="Bootstrap"/>
                        </a>
                        </div>
                        <div className={`col ${styles.navCenter}`}>
                            <h1 className={styles.courseText}>Welcome Anesu</h1>
                        </div>
                        <div className={`col ${styles.navRight}`}>
                        <a href="/settings">
                            <Image className={styles.gearIcon} src={gear} alt="Bootstrap"/>
                        </a>
                        </div>
                    </div>
                </nav>
            </div>
            <div className={`${styles.pageBody} mx-4` }>
                <div className="d-flex justify-content-center my-2">
                    <h4>Lectures</h4>
                </div>

                <Container>
                <Row className="justify-content-md-center">
                {lectures ? 
                    (lectures.map((lecture) => (
                    <Col md={7}>
                        <Card className="text-center my-3">
                            <Card.Header as="h5">{lecture.createdAt}</Card.Header>
                            <Card.Body>
                            <Card.Title>{lecture.name}</Card.Title>
                            <Card.Text>
                                {lecture.description}
                            </Card.Text>
                            <Button variant="btn btn-outline-primary" disabled={lecture.active}>Questions</Button>
                            </Card.Body>
                            <Card.Footer className="text-muted">Last modified: {lecture.lastUpdated}</Card.Footer>
                      </Card>
                      </Col>
          
                    ))) 
                        : 
                        (<Container>
                            <div className="d-flex justify-content-center">
                              <h4>No Lectures have been Added.</h4>
                            </div>
                          </Container>)
                }
                </Row>
                </Container>
            
                
            </div>
        </>
    )
}

export default StudentLectures;