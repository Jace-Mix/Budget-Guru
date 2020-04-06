import React from 'react';
import PageTitle from '../components/PageTitle';
import Confirm from '../components/auth/Confirm';

const ConfirmationPage = () =>
{
    return(
        <div>
            <PageTitle />
            <Confirm />
        </div>
    );
}

export default ConfirmationPage;