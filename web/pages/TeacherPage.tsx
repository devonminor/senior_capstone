import QuestionInput from '/components/QuestionInput'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';


export default function TeacherPage() {
  return (
    <>
      <div className="courseName">ES 2</div>
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
