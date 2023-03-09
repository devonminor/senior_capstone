const QuestionTimeLimit = () => {
    return (
        <div className='input-group mb-3'>
            <select
                className='custom-select'
                id='inputGroupSelect02'
                defaultValue={0}
            >
                <option value='0' disabled>
                    Choose...
                </option>
                <option value='1'>30 seconds</option>
                <option value='2'>60 seconds</option>
                <option value='3'>120 seconds</option>
            </select>
        </div>
    );
};

export default QuestionTimeLimit;
