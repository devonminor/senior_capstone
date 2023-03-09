import { useState } from 'react';
import { CloseButton } from 'react-bootstrap';

interface IReponseOption {
    index: number;
    responseIndex: number;
    responseOptions: {
        index: number;
    }[];
    setResponseOptions: React.Dispatch<
        React.SetStateAction<
            {
                index: number;
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

    return (
        <div className='input-group mb-2 mr-sm-2'>
            <div className='input-group-prepend'>
                <div
                    className='input-group-text'
                    onMouseEnter={() => setHoveringIndex(true)}
                    onMouseLeave={() => setHoveringIndex(false)}
                    onClick={() => {
                        console.log('clicked');
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
            />
        </div>
    );
};

export default ResponseOption;
