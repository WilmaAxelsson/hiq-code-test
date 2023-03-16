import React, { useState } from 'react';
import "../App.css";

const convertTime = (unixTimeStamp) => {
    const milliseconds = unixTimeStamp * 1000
    return new Date(milliseconds);
}

const Article = ({ article }) => {

    const [clickedPost, setClickedPost] = useState(null);

    const { thumbnail, created, num_comments, author, score, permalink, title } = article.data;

    const date = convertTime(created);

    const handleClickArticle = (article) => {
        setClickedPost(article);
    };
    return (
        <li className='list-item' onClick={() => handleClickArticle(article)} data-testid="article">
            <div className='title'>{title}</div>
            {thumbnail && <img src={thumbnail} alt='Thumbnail'></img>}
            <div className='information'>Created: {date.toLocaleString()}</div>
            <div className='information'>{num_comments} comments</div>
            <div className='information'>Author: {author}</div>
            <div className='information'>Score: {score}</div>
            <div className='information'><a href={'https://www.reddit.com' + permalink}>Click here to view full article!</a></div>
            {clickedPost && clickedPost.data.id === article.data.id && (
                <div>
                    <p className='selftext'>{clickedPost.data.selftext}</p>
                </div>
            )
            }
        </li>
    )
}

export default Article;