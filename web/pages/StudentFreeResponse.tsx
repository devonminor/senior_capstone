// import styled from 'styled-components'
import Image from 'next/image';
import { Container, Row } from 'react-bootstrap';
import {  useState , useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import jumbo from '../public/Tufts_Jumbos_logo.png';



const StudentFreeResponse = () => {

    const [response, setResponse] = useState('');

    useEffect(() => {
      console.log(response);
    }, [response]);

    const freeResponseQuestion = {
        title: 'What did Radha Krishnan (Cassius Clay at the time) wear while flying to Rome for the 1960 Games?',
        img: 'Something',
        subtitle: 'Best fighter in the world',
    
    };
        

    

    return (
        <>
        
            <div className="d-flex justify-content-center my-2">
                    <div className="row">
                        <div className="col">
                            <h1>Question Type: Free Response</h1>
                        </div>        
                    </div>
            </div>

            <div className='d-flex justify-content-center'>
                <div className="card" style={{width: 55 + 'rem'}}>
                    <div className="content px-5">
        
                        <p className="text-muted">Free Response Question</p>
                        <p className="text-justify h5 pb-2 font-weight-bold">{freeResponseQuestion.title}</p>
                       

                        {freeResponseQuestion ? (
                                 <div className="form-group">
                                
                                {freeResponseQuestion.img? (<Image
                                                        className="rounded mx-auto d-block my-3"
                                                        src={jumbo} // {freeResponseQuestion.img}
                                                        alt='Free Response Image'
                                                    />) : (<div className="my-1" />)}
                                
                                 <textarea className="form-control" id="exampleFormControlTextarea1" rows={4} ></textarea>
                                 <Button variant='btn btn-outline-primary my-2'> Submit Response</Button>
                               </div>

                                    


                                ) : (
                                    <Container>
                                        <div className='d-flex justify-content-center'>
                                            <h4>
                                                Question not defined, Error!
                                            </h4>
                                        </div>
                                    </Container>
                                )}
                      

    
                    
                    </div>
                            
                </div>
            </div> 

        </>
    )
}

export default StudentFreeResponse;