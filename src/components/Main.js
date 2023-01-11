import React from 'react';
import {Switch, Route} from 'react-router-dom';
import AdminDashboard from './Admin/AdminDashboard';
import Home from './Home/Home';
import PageNotFound from './PageNotFound';
import AdminRoute from './ProtectedRoutes/AdminRoute';
import PrivateRoute from './ProtectedRoutes/PrivateRoute';
import Dashboard from './User/Dashboard';
import Login from './User/Login';
import Register from './User/Register';

const Main = () => {
    return (
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/login' exact component={Login} />
            <Route path='/register' exact component={Register} />
            <PrivateRoute path='/user/dashboard' exact>
                <Dashboard />
            </PrivateRoute>
            <AdminRoute path='/admin/dashboard' exact>
                <AdminDashboard />
            </AdminRoute>
            <Route path='*' component={PageNotFound} />
        </Switch>
    );
};

export default Main;