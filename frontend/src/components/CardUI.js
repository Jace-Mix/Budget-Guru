import React, { Component } from 'react';

export class CardUI extends Component
{
    render()
    {
        return(
        <div id="accessUIDiv">
            <br />
            <input type="text" id="searchText" placeholder="Card To Search For"/>
            <button type="button" id="SearchCardButton"> Search Card </button><br />
            <span id="cardSearchResult"></span>
            <p id="cardList"></p><br /><br />

            <input type="text" id="cardText" placeholder="Card To Add"/>
            <button type="button" id="addCardButton"> Add Card </button><br />
            <span id="cardAddResult"></span>
        </div>
        );
    }
}

export default CardUI;