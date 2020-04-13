import React, { Component } from 'react';
import { Jumbotron, Container } from 'react-bootstrap';

export class NotFound extends Component
{
    render()
    {
        return(
            <Jumbotron fluid>
                <Container>
                    <h1>Uh oh...</h1>
                    <p>
                        Well, this is awkward... there might be a few reasons why you're here, but for now, you can click on "Budget Guru" and head back to the home page.
                    </p>
                </Container>
            </Jumbotron>
        );
    }
}

export default NotFound;