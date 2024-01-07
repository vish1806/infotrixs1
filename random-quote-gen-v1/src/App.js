import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  const fetchRandomQuote = () => {
    fetch('https://type.fit/api/quotes')
      .then((res) => res.json())
      .then((quotes) => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        setQuote(randomQuote.text);
        setAuthor(randomQuote.author);
      })
      .catch((error) => {
        console.error('Error fetching random quote:', error);
      });
  };

  const fetchQuoteByAuthor = (searchAuthor) => {
    fetch(`https://type.fit/api/quotes`)
      .then((res) => res.json())
      .then((quotes) => {
        const filteredQuotes = quotes.filter(
          (quote) => quote.author.toLowerCase().includes(searchAuthor.toLowerCase())
        );

        if (filteredQuotes.length > 0) {
          const specificQuote = filteredQuotes[0];
          setQuote(specificQuote.text);
          setAuthor(specificQuote.author);
        } else {
          setQuote(`No quotes found for the author: ${searchAuthor}`);
          setAuthor('');
        }
      })
      .catch((error) => {
        console.error('Error fetching quotes by author:', error);
      });
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const trimmedSearch = searchInput.trim();

    if (trimmedSearch) {
      fetchQuoteByAuthor(trimmedSearch);
    } else {
      fetchRandomQuote();
    }
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleGenerateRandomQuote = () => {
    fetchRandomQuote();
  };

  return (
    <>
      <nav className="navbar bg-dark border-bottom border-body">
        <div className="container-fluid">
          <form className="d-flex " onSubmit={handleSearchSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search by Author"
              aria-label="Search"
              value={searchInput}
              onChange={handleSearchChange}
            />
            <button className="btn btn-outline-warning" type="submit">
              Search
            </button>
          </form>
          <button className="btn btn-outline-warning  ms-2" onClick={handleGenerateRandomQuote}>
            Generate Random Quote
          </button>
        </div>
      </nav>
      <div className="quotebox">
        <h5 className="basic">{quote}</h5>
        <p>{author}</p>
      </div>
    </>
  );
}

export default App;
