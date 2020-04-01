import React, {useState} from 'react';
import {Form, Button, Card} from 'react-bootstrap';

function Login()
{
    var loginName;
    var loginPassword;

    const[message, setMessage] = useState('');

    const doLogin = async event =>
    {
        event.preventDefault();

        var js = '{"login":"' + loginName.value + '","password":"' + loginPassword.value + '"}';
        try
        {
            const response = await fetch('http://localhost:5000/api/login', {method:'POST', body:js, headers:{'Content-Type': 'application/json'}});
            var res = JSON.parse(await response.text());

            if (res.id <= 0)
            {
                setMessage('User/Password combination incorrect');
            }
            else
            {
                var user = {firstName:res.firstName, lastName:res.lastName, id:res.id};
                localStorage.setItem('user_data',JSON.stringify(user));

                setMessage('');
                window.location.href = '/cards';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    };

    return(
       <div id="loginDiv">
           <Card style={{width: '60rem', margin: 'auto', padding: '25px'}}>
            <Card.Header className="text-center" as="h5">Login</Card.Header>
           <Form className="mx-sm-3">
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="email" placeholder="Enter Username" ref={(c)=> loginName = c}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" ref={(c)=> loginPassword = c} />
            </Form.Group>
            <Button variant="primary" type="submit" id="loginButton" onClick={doLogin}>
                Submit
            </Button>
            <span id="loginResult">{message}</span>
            </Form>
            </Card>
       </div>
    );
};

export default Login;