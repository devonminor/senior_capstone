import React, { Dispatch } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type QuestionInputProps = {
  addQuestion: boolean
  setAddQuestion: Dispatch<React.SetStateAction<boolean>>
}

export default function QuestionInput({addQuestion, setAddQuestion}: QuestionInputProps) {
    if (!addQuestion) {return <></>}

    function handleClick() {
      setAddQuestion(false)
    }
  
  return (
    <Modal show={addQuestion} onHide={handleClick}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Title>Question</Modal.Title>

          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
          

          <Modal.Title>Attachments</Modal.Title>

          <input type="file"></input>

          <br></br>
          <br></br>

          <Modal.Title>Response Options</Modal.Title>
          
          <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
              <div className="input-group-text">A</div>
            </div>
            <input type={"text"} className="form-control" id="inlineFormInputGroupUsername2" placeholder="Username"/>
          </div>

          <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
              <div className="input-group-text">B</div>
            </div>
            <input type={"text"} className="form-control" id="inlineFormInputGroupUsername2" placeholder="Username"/>
          </div>

          <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
              <div className="input-group-text">C</div>
            </div>
            <input type={"text"} className="form-control" id="inlineFormInputGroupUsername2" placeholder="Username"/>
          </div>

          <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
              <div className="input-group-text">D</div>
            </div>
            <input type={"text"} className="form-control" id="inlineFormInputGroupUsername2" placeholder="Username"/>
          </div>

          <br></br>

          <Modal.Title> Time Limit</Modal.Title>

          <div className="input-group mb-3">
            <select className="custom-select" id="inputGroupSelect02">
              <option selected>Choose...</option>
              <option value="1">30 seconds</option>
              <option value="2">60 seconds</option>
              <option value="3">120 seconds</option>
            </select>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClick}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  );
}
