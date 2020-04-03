import React, {useState} from 'react';

function CardUI()
{
    var _ud;
    if ((_ud = localStorage.getItem('user_data')) === null)
    {
        window.location.href = '/';
    }
    var ud = JSON.parse(_ud);
    var userId = ud.id;
    var firstName = ud.firstName;
    var lastName = ud.lastName;


    var card = '';
    var search = '';

    const[message, setMessage] = useState('');
    const[searchResults, setResults] = useState('');
    const[cardList, setCardList] = useState('');

    const addCard = async event =>
    {
        event.preventDefault();

        var js = '{"userId":"' + userId + '","card":"' + card.value + '"}';

        try
        {
            const response = await fetch('http://localhost:5000/api/addcard', {method:'POST', body:js, headers:{'Content-Type': 'application/json'}});

            var txt = await response.text();
            var res = JSON.parse(txt);

            if (res.error.length > 0)
            {
                setMessage("API Error:" + res.error);
            }
            else
            {
                setMessage("Card has been added");
            }
        }
        catch(e)
        {
            setMessage(e.toString());
        }
    };

    const searchCard = async event =>
    {
        event.preventDefault();

        var js = '{"userId":"' + userId + '","search":"' + search.value + '"}';

        try
        {
            const response = await fetch('http://localhost:5000/api/searchcards', {method:'POST', body:js, headers:{'Content-Type': 'application/json'}});

            var txt = await response.text();
            var res = JSON.parse(txt);
            var _results = res.results;
            var resultText = '';
            for (var i = 0; i < _results.length; i++)
            {
                resultText += _results[i];
                if (i < _results.length - 1)
                {
                    resultText += ', ';
                }
            }
            setResults('Card(s) have been retrieved');
            setCardList(resultText);
        }
        catch(e)
        {
            alert(e.toString());
            setResults(e.toString());
        }
    };

    return(
        <div id="accessUIDiv">
            {/* For testing reasons, delete afterwards */}
            <p>Logged in as {firstName} {lastName}</p>
            <br />
            <input type="text" id="searchText" placeholder="Card To Search For" ref={(c) => search = c}/>
            <button type="button" id="SearchCardButton" class="buttons" onClick={searchCard}> Search Card </button><br />
            <span id="cardSearchResult">{searchResults}</span>
            <p id="cardList">{cardList}</p><br /><br />

            <input type="text" id="cardText" placeholder="Card To Add" ref={(c) => card = c}/>
            <button type="button" id="addCardButton" class="buttons" onClick={addCard}> Add Card </button><br />
            <span id="cardAddResult">{message}</span>
        </div>
    );
};

export default CardUI;