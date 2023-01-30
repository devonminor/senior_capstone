import QuestionInput from '/components/QuestionInput'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';

type TeacherPageProps = {
  course_id: string;
  lecture_id: string;
}
// TODO: handle renderign before course_id prop is defined
export default function TeacherPage({course_id, lecture_id}: TeacherPageProps) {
  var course_name = parse_course_id(course_id)

  console.log("course name: " + course_name)
  
  return (
    <>
      <h4>Course #{course_id}</h4>
      <h5>Lecture #{lecture_id}</h5>
      <div className="courseName">{course_name}</div>
      <Tabs
      defaultActiveKey="profile"
      id="justify-tab-example"
      className="mb-3"
      fill
      >
        <Tab eventKey="lectures" title="Lectures">
        </Tab>
        <Tab eventKey="roster" title="Roster">
        </Tab>
        <Tab eventKey="statistics" title="Statistics">
        </Tab>
        <Tab eventKey="class-settings" title="Class Settings">
        </Tab>
      </Tabs>

      <div className="lectureDate">Monday, December 13, 2022</div>

      <div className="d-grid gap-2" style={{padding: 10}}>
        <Button variant="primary" size="sm">Add a Question</Button>
      </div>

      <QuestionInput></QuestionInput>

      <h3 className="live">Live</h3>

      <div className="questionBox">
        <div className="row">
          <div className="col1">What is your name?</div>
          <div className="col2">3/18 answered</div>
        </div>  
      </div>

      <h3 className="notLive">Waiting to go live</h3>

      <div className="questionBox">
        <div className="row">
          <div className="col1">What is your major?</div>
          <div className="col2"><CloseButton /></div>
        </div>  
      </div>
      <div className="questionBox">
        <div className="row">
          <div className="col1">What year/month are you graduating?</div>
          <div className="col2"><CloseButton /></div>
        </div>  
      </div>
      <div className="questionBox">
        <div className="row">
          <div className="col1">How has your experience in the School of Engineering been?</div>
          <div className="col2"><CloseButton /></div>
        </div>  
      </div>
      <div className="questionBox">
        <div className="row">
          <div className="col1">Name your favorite 3 courses at Tufts.</div>
          <div className="col2"><CloseButton /></div>
        </div>  
      </div>
    </>
  );
}

// course id must be a string in the form of [characters][digits]
// e.g. es11, math166
function parse_course_id(course_id) {
  if (course_id) {
    var course_id_len = course_id.length
    var parsedString = ""
    var isNum = false
    if (course_id_len == 0) {
      throw new Error("INVALID COURSE ID")
    }
    for (let i = 0; i < course_id_len; i++) {
      if ((/[a-zA-Z]/).test(course_id[i])) {
        if (isNum == true) {
          throw new Error("INVALID COURSE ID"); 
        }
        parsedString = parsedString.concat(course_id[i].toUpperCase())
      }
      else if (/^\d$/.test(course_id[i]))  {
        if (i == 0) {
          throw new Error("INVALID COURSE ID")
        }
        if (isNum == false) {
          parsedString = parsedString.concat(" ")
        }
        isNum = true
        parsedString = parsedString.concat(course_id[i])
      }
      else {
        throw new Error("INVALID COURSE ID")
      }
    }
  
    return parsedString
  }
}