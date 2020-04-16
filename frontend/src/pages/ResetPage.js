import React from 'react';
import PageTitle from '../components/PageTitle';
import PasswordReset from '../components/PasswordReset';

const ResetPage = () =>
{
    return(
        <div style={{background: "rgb(214, 245, 230)", paddingBottom: "23.7%"}}>
            <PageTitle />
            <PasswordReset />
        </div>
    );
};

export default ResetPage;