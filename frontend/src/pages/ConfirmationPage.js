import React from 'react';
import PageTitle from '../components/PageTitle';
import Confirm from '../components/auth/Confirm';

const ConfirmationPage = () =>
{
    return(
        <div style={{background: "rgb(214, 245, 230)", paddingBottom: "34%"}}>
            <PageTitle />
            <Confirm />
        </div>
    );
}

export default ConfirmationPage;
