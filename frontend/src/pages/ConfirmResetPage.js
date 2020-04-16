import React from 'react';
import PageTitle from '../components/PageTitle';
import ConfirmReset from '../components/ConfirmReset';

const ConfirmResetPage = () =>
{
    return(
        <div style={{background: "rgb(214, 245, 230)", paddingBottom: "35.2%"}}>
            <PageTitle />
            <ConfirmReset />
        </div>
    );
}

export default ConfirmResetPage;
