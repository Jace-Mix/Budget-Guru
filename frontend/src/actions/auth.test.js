const { loadUser, register, login, logout, confirm, resetLink, reset, tokenConfig } = require('./authActions');

// Unit Testing
test('Login doesn\'t work on empty string', () =>
{
    expect().assertions(1);
    return login({UsernName: '', Password: ''}).then(data =>
    {
        expect(data.err).toEqual('Please enter all fields');
    })
})
// Integration Testing