const supertest= require('supertest');
const { app, mongoose } = require('../server');
const request = supertest(app);

describe('Login', () => {
    it('Rejects on completely empty fields', async (done) => {
        const res = await request.post('/api/auth/').send({UserName: '', Password: ''});
        expect(res.body).toEqual({error: 'Please enter all fields'});
        done();
    });
    it('Rejects on one empty fields', async(done) => {
        const res = await request.post('/api/auth/').send({UserName: '', Password: 'something'});
        expect(res.body).toEqual({error: 'Please enter all fields'});
        done();
    });
    it('Rejects on invalid username', async(done) => {
        const res = await request.post('/api/auth/').send({UserName: 'TestingAccount1', Password: 'Test'});
        expect(res.body).toEqual({error: 'User does not exist'});
        done();
    });
    it('Rejects if the user did not confirm email link first', async (done) => {
        const res = await request.post('/api/auth').send({UserName: 'Ocody10', Password: 'something'});
        expect(res.body).toEqual({error: 'Please confirm your email to login'});
        done();
    });
    it('Rejects if the password do not match', async (done) => {
        const res = await request.post('/api/auth').send({UserName: 'TestingAccount', Password: 'Something'});
        expect(res.body).toEqual({error: 'Username/Password is incorrect'});
        done();
    });
    it('Accepts if the username and password match', async (done) => {
        const res = await request.post('/api/auth').send({UserName: 'TestingAccount', Password: 'Test'});
        expect(res.status).toBe(200);
        done();
    })
})

describe('Get User', () => {
    it('Invalidates if the user is not logged in', async (done) => {
        const res = await request.get('/api/auth/user');
        expect(res.status).toBe(401);
        done();
    })
})

describe('Reset Password', () => {
    it('Throws an error if no email is provided', async (done) => {
        const res = await request.post('/api/auth/resetLink').send({Email: ''});
        expect(res.body).toEqual({error: 'Please enter your email into the field'});
        done();
    })
    it('Throws an error if the email is not recognized', async (done) => {
        const res = await request.post('/api/auth/resetLink').send({Email: 'a'});
        expect(res.body).toEqual({error: 'Email not recognized'});
        done();
    })
    it('Throws an error if the user did not confirm their email', async (done) => {
        const res = await request.post('/api/auth/resetLink').send({Email: 'test@gmail.com'});
        expect(res.body).toEqual({error: 'This email is not active. Try checking your email for an activation link'});
        done();
    })
    it('Sends an email if the email provided is valid', async (done) => {
        const res = await request.post('/api/auth/resetLink').send({Email: 'ezdzyhqwoyvuepdecm@awdrt.org'});
        expect(res.status).toBe(200);
        done();
    })
    it('Throws an error if the fields for reset are empty', async (done) => {
        const res = await request.post('/api/auth/reset').send({Email: '', Password: '', PasswordConfirm: ''});
        expect(res.body).toEqual({error: 'Please enter all fields'});
        done();
    })
    it('Throws an error if the passwords do not match', async (done) => {
        const res = await request.post('/api/auth/reset').send({Email: 'a', Password: 'b', PasswordConfirm: 'c'});
        expect(res.body).toEqual({error: "Passwords do not match"});
        done();
    })
    it('Throws an error if the email is not recognized', async (done) => {
        const res = await request.post('/api/auth/reset').send({Email: 'a', Password: 'b', PasswordConfirm: 'b'});
        expect(res.body).toEqual({error: 'Email not recognized'});
        done();
    })
    it('Throws an error if the user\'s email was not confirmed first', async(done) => {
        const res = await request.post('/api/auth/reset').send({Email: 'test@gmail.com', Password: 'a', PasswordConfirm: 'a'})
        expect(res.body).toEqual({error: 'Please confirm your email to login'});
        done();
    })
    it('Throws an error if the user did not request a password change', async (done) => {
        const res = await request.post('/api/auth/reset').send({Email: 'ezdzyhqwoyvuepdecm@awdrt.org', Password: 'a', PasswordConfirm: 'a'});
        expect(res.body).toEqual({error: 'This account did not request a password change'});
        done();
    })
})

describe('Registration', () => {
    it('Rejects on empty fields', async (done) => {
        const input = {
            FirstName: '',
            LastName: '',
            Email: '',
            UserName: '',
            Password: '',
            PasswordConfirm: ''
        }
        const res = await request.post('/api/users/').send(input);
        expect(res.body).toEqual({error: 'Please enter all fields'});
        done();
    })
    it('Rejects on any empty field', async (done) => {
        const input = {
            FirstName: '',
            LastName: 'a',
            Email: 'b',
            UserName: 'c',
            Password: 'd',
            PasswordConfirm: 'e'
        }
        const res = await request.post('/api/users/').send(input);
        expect(res.body).toEqual({error: 'Please enter all fields'});
        done();
    })
    it('Rejects if the passwords do not match', async (done) => {
        const input = {
            FirstName: 'f',
            LastName: 'a',
            Email: 'b',
            UserName: 'c',
            Password: 'd',
            PasswordConfirm: 'e'
        }
        const res = await request.post('/api/users/').send(input);
        expect(res.body).toEqual({error: 'Passwords do not match'});
        done();
    })
    it('Rejects if the email is already registered', async (done) => {
        const input = {
            FirstName: 'f',
            LastName: 'a',
            Email: 'test@gmail.com',
            UserName: 'c',
            Password: 'e',
            PasswordConfirm: 'e'
        }
        const res = await request.post('/api/users/').send(input);
        expect(res.body).toEqual({error: 'Email already registered'});
        done();
    })
    it('Creates a new entry in the database on valid inputs', async (done) => {
        const input = {
            FirstName: 'f',
            LastName: 'a',
            Email: 'b',
            UserName: 'c',
            Password: 'e',
            PasswordConfirm: 'e'
        }
        const res = await request.post('/api/users/').send(input);
        expect(res.status).toBe(200);
        done();
    })
})

describe('Budget Guru Calibration', () => {
    it('Rejects if the inputs are not numerical', async (done) => {
        const input = {
            MonthlyIncome: 'a',
            MonthlyBill: 'a',
            Clothing: 'a',
            FoodDrink: 'a',
            Home: 'a',
            Entertainment: 'a',
            Transportation: 'a',
            Health: 'a',
            Misc: 'a'
        }
        const res = await request.post('/api/categories/update').send(input);
        expect(res.status).toBe(401);
        done();
    })
    it('Rejects if the monthly bill is greater than the monthly income', async (done) => {
        const input = {
            MonthlyIncome: 10,
            MonthlyBill: 20,
            Clothing: 20,
            FoodDrink: 10,
            Home: 10,
            Entertainment: 20,
            Transportation: 10,
            Health: 20,
            Misc: 10
        }
        const res = await request.post('/api/categories/update').send(input);
        expect(res.status).toBe(401);
        done();
    })
    it('Rejects if any of the categories are below 0%', async (done) => {
        const input = {
            MonthlyIncome: 10,
            MonthlyBill: 20,
            Clothing: 20,
            FoodDrink: 10,
            Home: 10,
            Entertainment: 20,
            Transportation: 10,
            Health: 20,
            Misc: -2
        }
        const res = await request.post('/api/categories/update').send(input);
        expect(res.status).toBe(401);
        done();
    })
    it('Rejects if the categories don\'t sum to 100%', async (done) => {
        const input = {
            MonthlyIncome: 10,
            MonthlyBill: 20,
            Clothing: 20,
            FoodDrink: 10,
            Home: 10,
            Entertainment: 20,
            Transportation: 10,
            Health: 25,
            Misc: 10
        }
        const res = await request.post('/api/categories/update').send(input);
        expect(res.status).toBe(401);
        done();
    })
    it('Invalidates any modifications if the user is not logged in', async (done) => {
        const res = await request.get('/api/categories/getCategories');
        expect(res.status).toBe(401);
        done();
    })
})

describe('Dashboard Actions', () => {
    it('Rejects on 0 spent in Spent function', async (done) => {
        const res = await request.post('/api/dashboard/updateSpent').send({Spent: 0, Category: ''});
        expect(res.status).toBe(401);
        done();
    })
    it('Rejects on empty category in Spent function', async (done) => {
        const res = await request.post('/api/dashboard/updateSpent').send({Spent: 10, Category: ''});
        expect(res.status).toBe(401);
        done();
    })
    it('Rejects on unknown category option in Spent function', async (done) => {
        const res = await request.post('/api/dashboard/updateSpent').send({Spent: 10, Category: 'a'});
        expect(res.status).toBe(401);
        done();
    })
    it('Rejects on 0 earned Earned function', async (done) => {
        const res = await request.post('/api/dashboard/updateEarned').send({Earned: 0});
        expect(res.status).toBe(401);
        done();
    })
})

afterAll(done => {
    mongoose.connection.close();
    done();
})