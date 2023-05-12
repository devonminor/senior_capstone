/*
 *  ResponseOption.tsx
 *  PollAnywhere - CS 98 Capstone Project
 *
 *  The ResponseOption component is a dynamic input field that allows the user to
 *  add any number of responses to a multiple choice question.
 *
 *  Last updated: 05/12/2023
 */

import { useEffect, useState } from 'react';
import { CloseButton } from 'react-bootstrap';

interface IReponseOption {
    index: number;
    responseIndex: number;
    responseOptions: {
        index: number;
        text: string;
    }[];
    setResponseOptions: React.Dispatch<
        React.SetStateAction<
            {
                index: number;
                text: string;
            }[]
        >
    >;
}
const ResponseOption = ({
    index,
    responseIndex,
    responseOptions,
    setResponseOptions,
}: IReponseOption) => {
    const [hoveringIndex, setHoveringIndex] = useState(false);

    const [text, setText] = useState('');

    useEffect(() => {
        // update the response option in the array
        setResponseOptions(
            responseOptions.map((responseOption) => {
                if (responseOption.index === responseIndex) {
                    return { index: responseIndex, text };
                }
                return responseOption;
            })
        );
    }, [text]);

    return (
        <div className='input-group mb-2 mr-sm-2'>
            <div className='input-group-prepend'>
                <div
                    className='input-group-text'
                    onMouseEnter={() => setHoveringIndex(true)}
                    onMouseLeave={() => setHoveringIndex(false)}
                    onClick={() => {
                        // remove the response option from the array
                        setResponseOptions(
                            responseOptions.filter(
                                (responseOption) =>
                                    responseOption.index !== responseIndex
                            )
                        );
                    }}
                >
                    {!hoveringIndex && index}
                    {hoveringIndex && <CloseButton />}
                </div>
            </div>
            <input
                type={'text'}
                className='form-control'
                id='inlineFormInputGroupUsername2'
                value={text}
                onChange={(e) => {
                    setText(e.target.value);
                }}
            />
        </div>
    );
};

export default ResponseOption;
