import React from 'react';

import PageTitle from '../components/PageTitle';
import Categories from '../components/Categories';

const CategoriesPage = () =>
{
    return(
        <div style={{background: "rgb(214, 245, 230)", paddingBottom: "2.24%"}}>
            <PageTitle />
            <br />
            <Categories />
        </div>
    );
};

export default CategoriesPage;
