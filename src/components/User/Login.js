import React, { useRef, useState } from 'react';
import { login } from '../../api/apiAuth';
import Layout from '../Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router-dom';
import { authenticate, isAuthenticated, userInfo } from '../../utils/auth';

const Login = () => {
    const submitBtn = useRef(null);
    const [values, setValues] = useState({
        email: '',
        password: '',
        disabled: false,
        error: false,
        redirect: false
    });

    const { email, password, disabled, error, redirect} = values;

    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        
        setValues({
            ...values,
            disabled: true
        });

        submitBtn.current.textContent = "";
        submitBtn.current.classList.add('loading');

        login({email: email, password: password})
            .then(response => {
                authenticate(response.data.token, () => {
                    setValues({
                        ...values,
                        email: '',
                        password: '',
                        disabled: false,
                        error: false,
                        redirect: true
                    });
    
                    submitBtn.current.textContent = "Login";
                    submitBtn.current.classList.remove('loading');
                });
            })
            .catch(err => {
                if (err.response) {
                    setValues({
                        ...values,
                        disabled: false,
                        error: err.response.data
                    });
                    submitBtn.current.textContent = "Login";
                    submitBtn.current.classList.remove('loading');
    
                    if (err.response.data.loadingErr) {
                        toast.error(`${err.response.data.loadingErr}`, {
                            autoClose: 3000
                        });
                    }
                } else {
                    if (navigator.onLine) {
                        setValues({
                            ...values,
                            disabled: false,
                            error: false
                        });
                        submitBtn.current.textContent = "Login";
                        submitBtn.current.classList.remove('loading');
        
                        toast.error(`Login failed! Please try again.`, {
                            autoClose: 3000
                        });
                    } else {
                        setValues({
                            ...values,
                            disabled: false,
                            error: false
                        });
                        submitBtn.current.textContent = "Login";
                        submitBtn.current.classList.remove('loading');
        
                        toast.error(`Internet connection failed!`, {
                            autoClose: 3000
                        });
                    }
                }
            });
    }

    const redirectUser = () => {
        if (redirect) {
            return <Redirect to={`/${userInfo().role}/dashboard`} />
        }
        if (isAuthenticated()) {
            return <Redirect to={`/${userInfo().role}/dashboard`} />
        }
    }

    return (
        <Layout title='Login' classname='container'>
            <ToastContainer />
            {redirectUser()}
            <div className="row">
                <div className="col-lg-7 col-md-10 m-auto">
                <form className='loginForm' onSubmit={handleSubmit}>
                    <h1 className="text-center">Login Here</h1>
                    <div className="mb-3">
                        <label className="form-label">Email Address:</label>
                        <input type="text" className="form-control" name='email' value={email} onChange={handleChange} />
                        <div className="text-danger">{error.message ? error.message + "!" : ''}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input type="password" className="form-control" name='password' value={password} onChange={handleChange} />
                    </div>
                    <button type="submit" className="submitBtn" disabled={disabled} ref={submitBtn}>Login</button>
                </form>
                </div>
            </div>
        </Layout>
    );
};

export default Login;