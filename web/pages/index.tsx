import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function Home() {
  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Text id="question-input">Q:</InputGroup.Text>
        <Form.Control
          placeholder="Type question here"
          aria-label="Question"
          aria-describedby="question-input"
        />
      </InputGroup>

      <br></br>

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
    </>
  );
}
