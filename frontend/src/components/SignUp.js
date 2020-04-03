import React, {useState} from 'react';
import {Form, Button, Card, Alert} from 'react-bootstrap';

function SignUp()
{
    var firstName, lastName, email, username, password, passwordRetyped;

    const[message, setMessage] = useState('');
    const[show, setShow] = useState(false);

    // Incomplete: Need to update API backend (research JWT backend security)
    const signUpAttempt = async event =>
    {
        event.preventDefault();

        if (firstName.value !== "Jace")
        {
            setMessage('Testing Error');
            setShow(true);
            return;
        }

        if (password.value !== passwordRetyped.value)
        {
            setMessage('Passwords do not match');
            setShow(true);
            return;
        }

        var js = '{"firstName":"' + firstName + '","lastName":"' + lastName + '","email":"' + email + '","username":"' + username + '","password":"' + password + '"}';
        try
        {
            const response = await fetch('http://localhost:5000/api/signup', {method:'POST', body:js, headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());

            if (res.error !== '')
            {
                setMessage('Error has occurred');
                setShow(true);
                return;
            }
            setShow(false);
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    };

    function warning()
    {
        return(
            <Alert variant="danger" show={show} style={{width: '60rem', margin: 'auto', padding: '25px'}}>
                <p>{message}</p>
            </Alert>
        );
    }

    return(
        <div>
        <Card style={{width: '60rem', margin: 'auto', padding: '25px'}}>
        <Card.Header className="text-center" as="h5">Sign Up</Card.Header>
        <Form className="mx-xl-2">
            <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" ref={(c)=> firstName = c}/>
            </Form.Group>

            <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" ref={(c)=> lastName = c}/>
            </Form.Group>

            <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={(c)=> email = c}/>
            </Form.Group>

            <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" ref={(c)=> username = c}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={(c)=> password = c}/>
            </Form.Group>

            <Form.Group controlId="formPasswordRetype">
                <Form.Label>Retype Password</Form.Label>
                <Form.Control type="password" ref={(c)=> passwordRetyped = c}/>
            </Form.Group>
            

            <Button variant="primary" type="submit" onClick={signUpAttempt}>
                Register
            </Button>
        </Form>
        </Card>
        {warning()}
        </div>
    );
};

export default SignUp;