import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import useSWRMutation from 'swr/mutation';
import { putRequest } from '../lib/server_requests';

interface IStudentMultipleChoice {
    question: any;
}

const StudentMultipleChoice = ({ question }: IStudentMultipleChoice) => {
    const [mcqResponseOrder, setMCQResponseOrder] = useState<number>(-1);

    const { trigger: mcqResponseTrigger } = useSWRMutation(
        '/api/questions',
        putRequest
    );

    useEffect(() => {
        console.log('mcq', question);
    }, []);

    const handleResponse = () => {
        mcqResponseTrigger({
            courseId: parseInt(question.courseId),
            lectureId: parseInt(question.lectureId),
            questionId: parseInt(question.numId),
            order: mcqResponseOrder,
            action: 'addMCQResponse',
        });
    };

    return (
        <div
            className='d-flex justify-content-center'
            style={{ marginTop: '25px' }}
        >
            <div className='card' style={{ width: 55 + 'rem' }}>
                <div className='content px-5'>
                    <p className='text-muted'>Multiple Choice Question</p>
                    <p className='text-justify h5 pb-2 font-weight-bold'>
                        {question.multipleChoiceQuestion.title}
                    </p>
                    {question.multipleChoiceQuestion.image && (
                        <img
                            className='mx-auto d-block my-3'
                            src={question.multipleChoiceQuestion.image}
                            height={300}
                            width='auto'
                        />
                    )}
                    <div className='options py-1'>
                        {question.multipleChoiceQuestion.options.map(
                            (question: any, i: number) => (
                                <label
                                    className='rounded p-1 option my-2'
                                    key={i}
                                >
                                    {question.name}
                                    <input
                                        type='radio'
                                        value={i}
                                        name='radio'
                                        onChange={(e) => {
                                            setMCQResponseOrder(question.order);
                                        }}
                                    />
                                    <span className='checkmark'></span>
                                </label>
                            )
                        )}

                        <Button
                            variant='btn btn-outline-primary my-1'
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

export default StudentMultipleChoice;
