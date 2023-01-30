const Signup = () => {
    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="row">
                    <div className="col">
                        <h1>Welcome to the Classroom Response System</h1>
                    </div>        
                </div>
            </div>
            

        <div className="d-flex justify-content-center">
            <div className="row">
                <div className="col">
                    <figure className="text-center">
                        <blockquote className="blockquote">
                            <p>Education is the passport to the future, for tomorrow belongs to those who prepare for it today</p>
                        </blockquote>
                        <figcaption className="blockquote-footer">
                            Malcom X <cite title="Source Title"></cite>
                        </figcaption>
                    </figure>
                </div>
            </div>
        </div>

        <div className="container">
                <div className="d-flex justify-content-center">
                    <div className="row">
                        <div className="col">
                            <h2>Sign Up</h2>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center">
                    
                    <form className="col-md-6">
                        <div className="form-group">
                            <div className="row ">
                                <label htmlFor="inputName">Full Name</label>
                                <input type="text" className="form-control" id="inputAddress" placeholder="John Smith"/>
                            </div>
                        </div>


                        <div className="form-group ">
                            <div className="row ">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" id="signUpEmail" placeholder="Enter email"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <label htmlFor="signUpPassword">Password</label>
                                <input type="password" className="form-control" id="signUpPassword" placeholder="Password" aria-describedby="signUpPasswordHelpBlock"/>
                                <small id="signUpPasswordHelpBlock" className="form-text text-muted">
                                    Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                                </small>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <label htmlFor="signUpPassword">Confirm Password</label>
                                <input type="password" className="form-control" id="signUpPassword" placeholder="Password"/>
                            </div>
                        </div>
                        <div className="form-check"> 
                            <input type="checkbox" className="form-check-input" id="signUpCheckbox1"/>
                            <label className="form-check-label" htmlFor="signUpCheckbox1">I agree to the Terms of Conditions</label>
                        </div>

                        <div className="form-check"> 
                            <input type="checkbox" className="form-check-input" id="signUpCheckbox2"/>
                            <label className="form-check-label" htmlFor="signUpCheckbox2">I agree to receive marketing and promotion emails</label>
                        </div>

                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-outline-primary">Sign Up</button>     
                        </div>
      
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup;