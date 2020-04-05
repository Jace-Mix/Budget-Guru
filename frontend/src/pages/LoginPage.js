import React from 'react';

import PageTitle from '../components/PageTitle';
import Login from '../components/auth/Login';

const LoginPage = () =>
{
    return(
        <div>
            <PageTitle />
            <br />
            <Login />
        </div>
    );
};

export default LoginPage;