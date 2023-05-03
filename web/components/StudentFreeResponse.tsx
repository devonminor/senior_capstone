// import styled from 'styled-components'
import Image from 'next/image';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import useSWRMutation from 'swr/mutation';
import { putRequest } from '../lib/server_requests';

interface IStudentFreeResponse {
    question: any;
}

const StudentFreeResponse = ({ question }: IStudentFreeResponse) => {
    const [response, setResponse] = useState('');

    const { trigger: saqResponseTrigger } = useSWRMutation(
        '/api/questions',
        putRequest
    );

    const handleResponse = () => {
        console.log(response);
        saqResponseTrigger({
            courseId: parseInt(question.courseId),
            lectureId: parseInt(question.lectureId),
            questionId: parseInt(question.numId),
            freeResponse: response,
            action: 'addSAQResponse',
        });
    };

    return (
        <div
            className='d-flex justify-content-center'
            style={{ marginTop: '25px', marginBottom: '25px' }}
        >
            <div className='card' style={{ width: 55 + 'rem' }}>
                <div className='content px-5'>
                    <p className='text-muted'>Free Response Question</p>
                    <p className='text-justify h5 pb-2 font-weight-bold'>
                        {question.shortAnswerQuestion.title}
                    </p>

                    <div className='form-group'>
                        {question.shortAnswerQuestion.image && (
                            <Image
                                className='rounded mx-auto d-block my-3'
                                src={question.shortAnswerQuestion.image}
                                alt='Free Response Image'
                            />
                        )}

                        <textarea
                            className='form-control'
                            id='exampleFormControlTextarea1'
                            rows={4}
                            value={response}
                            onChange={(e) => setResponse(e.target.value)}
                        ></textarea>
                        <Button
                            variant='btn btn-outline-primary my-2'
                            onClick={handleResponse}
                        >
                            Submit Response
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentFreeResponse;
