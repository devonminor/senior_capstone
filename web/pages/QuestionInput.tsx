import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';


export default function QuestionInput() {
  return (
    <>
    <div className="inputBlock">
      <div className="row">
        <div className="textArea">
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Multiple Choice
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="#">Multiple Choice</a>
              <a className="dropdown-item" href="#">Free Response</a>
              <a className="dropdown-item" href="#">Free Drawing</a>
            </div>
          </div>
        </div>
        <div className="buttonArea1">
          <CloseButton />
        </div>
        <div className="buttonArea2">
          <Button variant="success">+</Button>
        </div>
        <hr className="line"></hr>
      </div>
      <div className="row">
          <h5>Question</h5>
            <InputGroup className="mb-4">
              <InputGroup.Text id="question-input">Q:</InputGroup.Text>
              <Form.Control
                placeholder="Type question here"
                aria-label="Question"
                aria-describedby="question-input"
              />
            </InputGroup>

          <h5>Attachments</h5>
          <form>
            <div className="form-group">
              <input type="file" className="form-control-file" id="exampleFormControlFile1"></input>
            </div>
          </form>

          <br></br>
          <br></br>

          <h5>Response Options</h5>

          <InputGroup className="mb-3">
            <InputGroup.Text id="a-input">A:</InputGroup.Text>
            <Form.Control
              placeholder="Type answer here"
              aria-label="Option A"
              aria-describedby="a-input"
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="b-input">B:</InputGroup.Text>
            <Form.Control
              placeholder="Type answer here"
              aria-label="Option B"
              aria-describedby="b-input"
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="c-input">C:</InputGroup.Text>
            <Form.Control
              placeholder="Type answer here"
              aria-label="Option C"
              aria-describedby="c-input"
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="d-input">D:</InputGroup.Text>
            <Form.Control
              placeholder="Type answer here"
              aria-label="Option D"
              aria-describedby="d-input"
            />
          </InputGroup>
        </div>
    </div>
    </>
  );
}
