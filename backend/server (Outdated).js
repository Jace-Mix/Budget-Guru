const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const MongoClient = require('mongodb').MongoClient;
const config = require('config');
const jwt = require('jsonwebtoken');

const client = new MongoClient(config.get('mongoURI'), {useUnifiedTopology: true});
client.connect();
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) =>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

var cardList = [  'Roy Campanella',  'Paul Molitor',  'Tony Gwynn',
  'Dennis Eckersley',  'Reggie Jackson',  'Gaylord Perry',  'Buck Leonard',  'Rollie Fingers',  'Charlie Gehringer',  'Wade Boggs',  'Carl Hubbell',  'Dave Winfield',  'Jackie Robinson',  'Ken Griffey, Jr.',  'Al Simmons',  'Chuck Klein',  'Mel Ott',  'Mark McGwire',  'Nolan Ryan',  'Ralph Kiner',  'Yogi Berra',  'Goose Goslin',  'Greg Maddux',  'Frankie Frisch',  'Ernie Banks',  'Ozzie Smith',  'Hank Greenberg',  'Kirby Puckett',  'Bob Feller',  'Dizzy Dean',  'Joe Jackson',  'Sam Crawford',  'Barry Bonds',  'Duke Snider',  'George Sisler',  'Ed Walsh',  'Tom Seaver',  'Willie Stargell',  'Bob Gibson',  'Brooks Robinson',  'Steve Carlton',  'Joe Medwick',  'Nap Lajoie',  'Cal Ripken, Jr.',  'Mike Schmidt',  'Eddie Murray',  'Tris Speaker',  'Al Kaline',  'Sandy Koufax',  'Willie Keeler',  'Pete Rose',  'Robin Roberts',  'Eddie Collins',  'Lefty Gomez',
  'Lefty Grove',  'Carl Yastrzemski',  'Frank Robinson',  'Juan Marichal',  'Warren Spahn',  'Pie Traynor',  'Roberto Clemente',  'Harmon Killebrew',  'Satchel Paige',  'Eddie Plank',  'Josh Gibson',  'Oscar Charleston',  'Mickey Mantle',  'Cool Papa Bell',  'Johnny Bench',  'Mickey Cochrane',  'Jimmie Foxx',  'Jim Palmer',  'Cy Young',  'Eddie Mathews',  'Honus Wagner',  'Paul Waner',  'Grover Alexander',  'Rod Carew',  'Joe DiMaggio',  'Joe Morgan',  'Stan Musial',  'Bill Terry',  'Rogers Hornsby',  'Lou Brock',  'Ted Williams',  'Bill Dickey',  'Christy Mathewson',  'Willie McCovey',  'Lou Gehrig',  'George Brett',  'Hank Aaron',  'Harry Heilmann',  'Walter Johnson',  'Roger Clemens',  'Ty Cobb',  'Whitey Ford',  'Willie Mays',  'Rickey Henderson',  'Babe Ruth'];

app.post('/api/addcard', async(req, res, next) =>
{
    // incoming: userId, color
    // outgoing: error

    var error = '';
    const{userId, card} = req.body;

    // TEMP FOR LOCAL TESTING
    cardList.push(card);

    var ret = {error:error};
    res.status(200).json(ret);
});

app.post('/api/signup', async(req, res, next) =>
{
    // incoming: firstName, lastName, email, userName, password
    // outgoing: id, firstName, lastName, error
    const{FirstName, LastName, Email, UserName, Password} = req.body;
    var error = '';
    const db = client.db("BudgetGuru");

    // Check fields for completion
    if (!FirstName || !LastName || !Email || !UserName || !Password)
    {
        return res.status(400).json({error: "Please enter all fields"});
    }

    // Search for already existing users
    var results = await db.collection('Users').findOne({Email});
    if (results)
    {
        return res.status(400).json({error: "Email Already Registered"});
    }

    // Hash and salt password
    var newPassword = Password;
    bcrypt.genSalt(10, (err, salt) =>
    {
        bcrypt.hash(Password, salt, (err, hash) =>
        {
            if (err) throw err;
            newPassword = hash;

            try
            {
                jwt.sign(
                    {}
                );
                db.collection('Users').insertOne({FirstName, LastName, Email, UserName, Password: newPassword});
            }
            catch
            {
                error = e.toString();
            }

            var ret = {firstName: FirstName, lastName: LastName, email: Email, password: newPassword, error: error};
            return res.status(200).json(ret);
        })
    });

    res.status(400).json({error: "Unable to Register User"})
});

app.post('/api/login', async(req, res, next) =>
{
    // incoming: login, password
    // outgoing: id, firstName, lastName, error

    const{login, password} = req.body;
    const db = client.db("BudgetGuru");
    
    const results = await db.collection('Users').find({UserName:login,Password:password}).toArray();

    var id = -1;
    var fn = '';
    var ln = '';

    // Ocody10, password
    if (results.length > 0)
    {
        id = results[0].UserId;
        fn = results[0].FirstName;
        ln = results[0].LastName;
    }

    var ret = {id:id, firstName:fn, lastName:ln, error:''};
    res.status(200).json(ret);
});

app.post('/api/searchcards', async(req, res, next) => 
{
    // incoming: userId, search
    // outgoing: results[], error

    var error = '';
    const {userId, search} = req.body;

    var _search = search.toLowerCase().trim();
    var _ret = [];

    for (var i = 0; i < cardList.length; i++)
    {
        var lowerFromList = cardList[i].toLocaleLowerCase();
        if (lowerFromList.indexOf(_search) >= 0)
        {
            _ret.push(cardList[i]);
        }
    }

    var ret = {results:_ret, error:''};
    res.status(200).json(ret);
});

app.listen(5000); // Start Node + Express server on port 5000