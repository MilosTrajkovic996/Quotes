import React, { useEffect, useState }  from 'react';
import QuotesList from '../quotes/quotesList';
import Select from 'react-select';
import Modal from "react-modal";
import { sortByOptions, tagss, sortDirectionOptions } from '../../constants/constants';
import './Main.css';

const Main = () => {

    const [tags, setTags] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    const [quotes, setQuotes] = useState([]);
    const [token, setToken] = useState(null);
    
    const [isOpen, setIsOpen] = useState(false);

    const handleTagsChange = (event) => {
        const text = event.target.value;
        setTags(text.split(',').map(tag => tag.trim()));
    }

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value);
    }

    const handleContentChange = (event) => {
        setContent(event.target.value);
    }

    Modal.setAppElement("#root");
    function handleModal() {
      setIsOpen(!isOpen);
    }
    
    // useEffect(() => {
    //     fetch('http://localhost:5000/tags', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     .then(res => res.json())
    //     .then(data => setTagsArray(data))
    //     .catch(err => console.log(err));
    // }, [quotes, tags]);

    useEffect(() => {
        if(!token) {
            fetch('http://localhost:5000/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '
                },
                body: JSON.stringify({
                    username: 'fazi',
                    password: '1234'
                })
            })

            .then(res => res.json())
            .then(data => {
                setToken(data.token);
            })
            .catch(error => console.log(error))
        }
            
        fetch('http://localhost:5000/quotes')
            .then(res => res.json())
            .then(data => {
                setQuotes(data.quotes);
                })
            .catch(error => console.log(error));
    }, [token]);

    const updateQuote = (quote) => {
        setQuotes((quotes) => quotes.map(q => q.id === quote.id ? quote : q));
    }

    const sortBy = (e) => {
        const sortBy = e.value;
        fetch(`http://localhost:5000/quotes?sortBy=${sortBy}`)
            .then(res => res.json())
            .then(data => {
                setQuotes(data.quotes);
            })
            .catch(err => console.log(err));
    }

    const sortDirection = (e) => {
        const sortDirection = e.value;
        fetch(`http://localhost:5000/quotes?sortDirection=${sortDirection}`)
            .then(res => res.json())
            .then(data => {
                setQuotes(data.quotes);
            })
            .catch(err => console.log(err));
    }

    const searchByTags = (e, values) => {
        const tags = e.value;
        fetch(`http://localhost:5000/quotes?tags=${tags}`)
            .then(res => res.json())
            .then(data => {
                setQuotes(data.quotes);
            })
            .catch(err => console.log(err));
    }
    
    const handleSubmit = event => {
        event.preventDefault();

        const formData = {
            tags: tags,
            author: author,
            content: content
        }

        fetch('http://localhost:5000/quotes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => {
            setQuotes([...quotes, data])
            handleModal();
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="main">
            <div className="main-container">
                <div className='sort-container'>
                    <Select
                        className="select-sort"
                        options={sortByOptions}
                        onChange={sortBy}
                        placeholder="Sort by"
                    >
                    </Select>
                    <Select
                        className="select-sort"
                        options={sortDirectionOptions}
                        onChange={sortDirection}
                        placeholder="Sort direction"
                    >
                    </Select>
                    <Select
                        className="select-sort"
                        options={tagss}
                        onChange={searchByTags}
                        placeholder="Filter by tags"
                        // isMulti
                    >
                    </Select>
                </div>  
                <div>
                <button className="main-button" onClick={handleModal}>Create QUOTE</button>
                    <Modal
                        isOpen={isOpen}
                        onRequestClose={handleModal}
                        contentLabel="My dialog"
                        className="mymodal"
                        overlayClassName="myoverlay"
                        closeTimeoutMS={500}
                    >
                        <div>
                            <div className="modal-header">
                                <i className="fa-solid fa-xmark closeMark" onClick={handleModal}></i>                    
                                <h2>Create new Quote</h2>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="quote">Content</label>
                                        <textarea className="form-control" id="content" rows="3" placeholder="Content" onChange={handleContentChange}></textarea>
                                    </div>                                    
                                    <div className="form-group">
                                        <label htmlFor="author">Author</label>
                                        <input type="text" className="form-control" id="author" placeholder="Author" onChange={handleAuthorChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="tags">Tags</label>
                                        <input type="text" className="form-control" id="tags" placeholder="Tags" onChange={handleTagsChange}/>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="submit" className="submit-button">Save</button>
                                    </div>                                      
                                </form>
                        </div>
                    </div>
                    </Modal>
                </div>              
                <QuotesList quotes={quotes} token={token} updateQuote={updateQuote}/>
            </div>
        </div>
    );
}

export default Main;
