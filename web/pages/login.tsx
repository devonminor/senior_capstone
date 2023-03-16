const Login = () => {
    return (
        <>
            <div className='d-flex justify-content-center'>
                <div className='row'>
                    <div className='col'>
                        <h1>Welcome to the Classroom Response System</h1>
                    </div>
                </div>
            </div>

            <div className='container'>
                <div className='d-flex justify-content-center'>
                    <div className='row'>
                        <div className='col'>
                            <h2>Login</h2>
                        </div>
                    </div>
                </div>

                <div className='d-flex justify-content-center'>
                    <form className='col-md-6'>
                        <div className='form-group '>
                            <div className='row '>
                                <label htmlFor='loginEmail'>
                                    Email address
                                </label>
                                <input
                                    type='email'
                                    className='form-control'
                                    id='loginEmail'
                                    placeholder='john.doe@tufts.edu'
                                />
                            </div>
                        </div>

                        <div className='form-group'>
                            <div className='row'>
                                <label htmlFor='exampleInputPassword1'>
                                    Password
                                </label>
                                <input
                                    type='password'
                                    className='form-control'
                                    id='loginPassword'
                                    placeholder='Password'
                                />
                            </div>
                        </div>

                        <div className='d-flex justify-content-center'>
                            <button
                                type='submit'
                                className='btn btn-outline-primary'
                            >
                                Login
                            </button>
                        </div>

                        <div className='row'>
                            {/* not doing anything, using it to render ::after padding before the Other Login Options */}
                        </div>
                    </form>
                </div>
            </div>

            <div className='d-flex justify-content-center'>
                <h2>Other Login Options</h2>
            </div>

            <div className='d-flex justify-content-around'>
                <button type='button' className='btn btn-outline-primary'>
                    SAML
                </button>
                <button type='button' className='btn btn-outline-success'>
                    GOOGLE
                </button>
            </div>

            <div className='container'>
                <div className='d-flex justify-content-center'>
                    <div className='row'>
                        <h2>No Account? Sign UP!</h2>
                    </div>
                </div>

                <div className='d-flex justify-content-center'>
                    <button type='button' className='btn btn-outline-secondary'>
                        Sign Up
                    </button>
                </div>
            </div>
        </>
    );
};

export default Login;
