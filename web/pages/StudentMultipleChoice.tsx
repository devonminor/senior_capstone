// import styled from 'styled-components'

import pgBar from 'react-bootstrap/progressbar';
import { Col, Container, Row } from 'react-bootstrap';
import {  useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useEffect } from "react";



const studentMultipleChoice = () => {

    const [response, setResponse] = useState('');

    useEffect(() => {
      console.log(response);
    }, [response]);

    const multipleChoiceQuestion = {
        title: 'What did Radha Krishnan (Cassius Clay at the time) wear while flying to Rome for the 1960 Games?',
        img: '',
        subtitle: '',
        options : [
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

        ]
    };
        

    

    return (
        <>
        
            <div className="d-flex justify-content-center my-2">
                    <div className="row">
                        <div className="col">
                            <h1>Question Type: Multiple Choice</h1>
                        </div>        
                    </div>
            </div>

            <div className='d-flex justify-content-center'>
                <div className="card" style={{width: 55 + 'rem'}}>
                    <div className="content px-5">
        
                        <p className="text-muted">Multiple Choice Question</p>
                        <p className="text-justify h5 pb-2 font-weight-bold">{multipleChoiceQuestion.title}</p>
                        <div className="options py-1">

                        {multipleChoiceQuestion ? (
                                    multipleChoiceQuestion.options.map((question, i) => (
                                        <label className="rounded p-1 option my-2" key={i}>
                                            {question.name}
                                            <input type="radio" value={i} name="radio" onChange={(e) => setResponse(e.target.value)} />
                                            <span className="checkmark"></span>
                                
                                        </label>

                                        
                                        
                                    ) )

                                    


                                ) : (
                                    <Container>
                                        <div className='d-flex justify-content-center'>
                                            <h4>
                                                Question not defined, Error!
                                            </h4>
                                        </div>
                                    </Container>
                                )}

                                {multipleChoiceQuestion? (<Button variant='btn btn-outline-primary my-1'> Submit Response</Button>) : (<div />)}
                        </div>

    
                    
                    </div>
                            
                </div>
            </div> 

        </>
    )
}

export default studentMultipleChoice;