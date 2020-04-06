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
                        Well, this is awkward... you might be here because you didn't verify an email link on time (or you hacked your way here).
                    </p>
                </Container>
            </Jumbotron>
        );
    }
}

export default NotFound;