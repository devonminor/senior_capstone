import React, { Dispatch, useState } from 'react';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import parse_course_id from "../components/parse_course_id";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import QuestionInput from '../components/QuestionInput';
import '../styles/QuestionInput.module.css';


// TODO: identify any better type to use than any
type TeacherPageProps = {
  course_id: any;
  lecture_id: any;
}

export default function TeacherPage({course_id, lecture_id}: TeacherPageProps) {
  if (course_id == undefined || lecture_id == undefined)
    return <></>

  const [addQuestion, setAddQuestion] = useState(false);

  var course_name = parse_course_id(course_id)
  var date = parse_lecture_id(lecture_id)
  
  console.log("course name: " + course_name)
  console.log("date: " + date)
  
  return (
    <>
      <div className="courseName">{course_name}</div>
      <Tabs
        defaultActiveKey="profile"
        id="justify-tab-example"
        className="mb-3"
        fill
      >
        <Tab eventKey="lectures" title="Lectures"/>
        <Tab eventKey="roster" title="Roster"/>
        <Tab eventKey="statistics" title="Statistics"/>
        <Tab eventKey="class-settings" title="Class Settings"/>
      </Tabs>

      <div className="lectureDate">{date}</div>

      <QuestionButton addQuestion={addQuestion} setAddQuestion={setAddQuestion}/>

      <QuestionInput addQuestion={addQuestion} setAddQuestion={setAddQuestion}/>

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

function parse_lecture_id(lecture_id: string) {
  // TODO: get request for date parameter of associated lecture
  // then parse date accordingly and return
  
  if (lecture_id) {
    const date = new Date().toLocaleDateString();
    console.log(date)

    return date
  }
}

type QuestionButtonProps = {
  addQuestion: boolean
  setAddQuestion: Dispatch<React.SetStateAction<boolean>>
}

function QuestionButton({addQuestion, setAddQuestion}: QuestionButtonProps) {
  function handleClick() {
    setAddQuestion(true)
  }

  return (
    <div className="d-grid gap-2" style={{padding: 10}}>
      <Button variant="primary" size="sm" active={false} onClick={handleClick}>Add a Question</Button>
    </div>
  )
}