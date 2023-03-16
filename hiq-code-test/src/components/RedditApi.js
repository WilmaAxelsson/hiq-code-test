import React, { useState, useEffect } from 'react';
import ArticleList from './ArticleList';

function RedditApi() {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [before, setBefore] = useState(null);
    const [after, setAfter] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [category, setCategory] = useState("javascript");
    const [limit, setLimit] = useState(10);

    const handleAPICall = (url) => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setBefore(data.data.before);
                setAfter(data.data.after);
                setArticles(data.data.children);
                setLoading(false);
            })
            .catch(error => console.log(error));
    }
    const getInitialArticles = () => {
        setLoading(true);
        let url = `https://www.reddit.com/r/${category}.json?limit=${limit - 2}`;

        handleAPICall(url);
    }

    useEffect(() => {
        setPageNumber(1);
        getInitialArticles();
    }, [limit]);

    const getNextPage = () => {
        setLoading(true);

        setPageNumber(pageNumber + 1);

        let url = `https://www.reddit.com/r/${category}.json?limit=${limit}&count=${pageNumber * limit}&after=${after}`;
        //Count specifies the number of listings already seen

        handleAPICall(url);
    }

    const getPrevPage = () => {
        setLoading(true);

        setPageNumber(pageNumber - 1);

        let url = `https://www.reddit.com/r/${category}.json?limit=${limit}&count=${((pageNumber * limit))}&before=${before}`;

        handleAPICall(url);
    }

    const handleLimitClick = (e) => {
        setLimit(parseInt(e.target.value));
    };
    const handleCategoryChange = () => {
        getInitialArticles();
    };

    return (
        <div>
            <div className='settings-container'>
                <label htmlFor="limit-select">Change shown number of articles:</label>
                <select id="limit-select" value={limit} onChange={handleLimitClick}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>

                <label htmlFor='category-input'>Search new category:</label>
                <input id="category-input" type="text" value={category} onChange={(event) => setCategory(event.target.value)} />
                <button type="submit" className='button' onClick={handleCategoryChange}>Search</button>
            </div>
            <div className='container'>
                <ul className='list' data-testid="article-list">
                    <ArticleList articles={articles} loading={loading}></ArticleList>
                </ul>
            </div>
            <button disabled={pageNumber === 1} className='button' onClick={getPrevPage}>Previous page</button>
            <button className='button' onClick={getNextPage}>Next page</button>
        </div>
    );
}

export default RedditApi;