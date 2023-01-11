import React, { useRef, useState } from 'react';
import { register } from '../../api/apiAuth';
import Layout from '../Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthenticated, userInfo } from '../../utils/auth';
import { Redirect } from 'react-router-dom';

const Register = () => {
    const submitBtn = useRef(null);
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        disabled: false,
        error: false
    });

    const {name, email, password, disabled, error} = values;

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

        register({name: name, email: email, password: password})
            .then(response => {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    disabled: false,
                    error: false
                });

                submitBtn.current.textContent = "Register";
                submitBtn.current.classList.remove('loading');

                toast.success(`${response.data.message}`, {
                    autoClose: 3000
                });
            })
            .catch(err => {
                if (err.response) {
                    setValues({
                        ...values,
                        disabled: false,
                        error: err.response.data
                    });
                    submitBtn.current.textContent = "Register";
                    submitBtn.current.classList.remove('loading');
    
                    if (err.response.data.message) {
                        toast.error(`${err.response.data.message}`, {
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
                        submitBtn.current.textContent = "Register";
                        submitBtn.current.classList.remove('loading');
        
                        toast.error(`Registration failed! Please try again.`, {
                            autoClose: 3000
                        });
                    } else {
                        setValues({
                            ...values,
                            disabled: false,
                            error: false
                        });
                        submitBtn.current.textContent = "Register";
                        submitBtn.current.classList.remove('loading');
        
                        toast.error(`Internet connection failed!`, {
                            autoClose: 3000
                        });
                    }
                }
            });
    }

    return (
        <Layout title='Register' classname='container'>
            <ToastContainer />
            {isAuthenticated() ? <Redirect to={`/${userInfo().role}/dashboard`} /> : '' }
            <div className="row">
                <div className="col-lg-7 col-md-10 m-auto">
                <form className='loginForm' onSubmit={handleSubmit}>
                    <h1 className="text-center">Register Here</h1>
                    <div className="mb-3">
                        <label className="form-label">Your Name:</label>
                        <input type="text" className="form-control" name='name' value={name} onChange={handleChange} />
                        <div className="text-danger">{error.name ? error.name + "!" : ''}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email Address:</label>
                        <input type="text" className="form-control" name='email' value={email} onChange={handleChange} />
                        <div className="text-danger">{error.email ? error.email + "!" : ''}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input type="password" className="form-control" name='password' value={password} onChange={handleChange} />
                        <div className="text-danger">{error.password ? error.password + "!" : ''}</div>
                    </div>
                    <button type="submit" className="submitBtn" disabled={disabled} ref={submitBtn}>Register</button>
                </form>
                </div>
            </div>
        </Layout>
    );
};

export default Register;