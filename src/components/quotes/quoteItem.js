import React from "react";

const quoteItem = ({quote, token, updateQuote}) => {

    const handleUpvote = (e) => {
        e.preventDefault();
        if (token) {
            if(quote.givenVote === 'upvote') {
                fetch(`http://localhost:5000/quotes/${quote.id}/upvote`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                })
                .then(res => res.json())
                .then(data => updateQuote(data))
                .catch(err => console.log(err));
            } else {
                fetch(`http://localhost:5000/quotes/${quote.id}/upvote`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(res => res.json())
                .then(data => updateQuote(data))
                .catch((err) => {
                    console.log(err)
                });            
            }
        }
    }

    const handleDownvote = (e) => {
        e.preventDefault();
        if (token) {
            if(quote.givenVote === 'downvote') {
                fetch(`http://localhost:5000/quotes/${quote.id}/downvote`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }

                })
                .then(res => res.json())
                .then(data => updateQuote(data))
                .catch(err => console.log(err))
            } else {
                fetch(`http://localhost:5000/quotes/${quote.id}/downvote`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(res => res.json())
                .then(data => updateQuote(data))
                .catch((err) => {
                    console.log(err)
                });
            }
        }
    }
    
    const votePercentage = Math.round((quote.upvotesCount / (quote.upvotesCount + quote.downvotesCount) )*100);
    
    return (
        <div className="quote-item-container">
            <div className="quote-item-votes">
                <i className={`fa-solid fa-caret-up ${quote.givenVote !== 'upvote' ? 'gray-color' : 'white-color'}`} onClick={handleUpvote}></i>
                <p className="vote-percentage" style={{color : `hsl(${votePercentage || 0},50%, 50%)`}}>{votePercentage || 0}% </p>
                <p className="votes-counts">{quote.upvotesCount}/{quote.downvotesCount}</p>
                <i className={`fa-solid fa-caret-down ${quote.givenVote !== 'downvote' ? 'gray-color' : 'white-color'}`} onClick={handleDownvote}></i>
            </div>
            <div className="quote-item-content">
                <p className="quote-content">{quote.content}</p>
                <p className="quote-author">-- {quote.author}</p>
            </div>
        </div>
    );
}

export default quoteItem;