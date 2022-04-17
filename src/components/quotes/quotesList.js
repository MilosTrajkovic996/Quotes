import React from "react";
import QuoteItem from "./quoteItem";
import "./quote.css";

const QuotesList = ({quotes, token, updateQuote}) => {

    const renderedList = quotes.map((quote) => {
        return <QuoteItem key={quote.id} quote={quote} token={token} updateQuote={updateQuote}/>
    });

    return (
        <div className="quotes-list">
            <div className="quotes-list-container">
                <h1 className="header-title">Quotes</h1>
                {renderedList}
            </div>
        </div>
    );
};

export  default QuotesList;