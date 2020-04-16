import React from 'react';
import PageTitle from '../components/PageTitle';
import NotFound from '../components/NotFound';

const Page404 = () =>
{
    return(
        <div style={{background: "rgb(214, 245, 230)", paddingBottom: "34%"}}>
            <PageTitle />
            <NotFound />
        </div>
    );
}

export default Page404;