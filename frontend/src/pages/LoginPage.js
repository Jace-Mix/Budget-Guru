import React from 'react';

import PageTitle from '../components/PageTitle';
import Login from '../components/auth/Login';

const LoginPage = () =>
{
    return(
        <div style={{background: "rgb(214, 245, 230)", paddingBottom: "5.1%"}}>
            <PageTitle />
            <Login />
        </div>
    );
};

export default LoginPage;
