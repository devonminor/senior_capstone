import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Loader from '../components/Loader';

const StudentWaiting = () => {
    const aQuestion = {
        questionType: '',
        live: false,
        multipleChoiceQuestion: {
            title: 'What did Radha Krishnan (Cassius Clay at the time) wear while flying to Rome for the 1960 Games?',
            img: '',
            subtitle: '',
            options: [
                {
                    name: 'Boxing Gloves',
                    order: 1,
                },
                {
                    name: 'Parachute',
                    order: 2,
                },
                {
                    name: 'Nothing',
                    order: 3,
                },
                {
                    name: 'Championship belt',
                    order: 4,
                },
            ],
        },
        shortAnswerQuestion: {
            title: 'What did Radha Krishnan (Cassius Clay at the time) wear while flying to Rome for the 1960 Games?',
            img: 'Something',
            subtitle: 'Best fighter in the world',
        },
    };

    const multipleChoiceQuestion = {
        title: 'What did Radha Krishnan (Cassius Clay at the time) wear while flying to Rome for the 1960 Games?',
        img: '',
        subtitle: '',
        options: [
            {
                name: 'Boxing Gloves',
                order: 1,
            },
            {
                name: 'Parachute',
                order: 2,
            },
            {
                name: 'Nothing',
                order: 3,
            },
            {
                name: 'Championship belt',
                order: 4,
            },
        ],
    };

    return (
        <div className='my-3'>
            <Card className='text-center'>
                <Card.Body>
                    <Card.Title>
                        <Loader />
                    </Card.Title>
                    <Card.Title className='my-4'>
                        No Live Questions For This Lecture Yet
                    </Card.Title>

                    <Button variant='danger' href='/courses'>
                        Back to Courses
                    </Button>
                </Card.Body>
            </Card>

            {/* <StudentMultipleChoice /> */}
        </div>
    );
};

export default StudentWaiting;
