import React from 'react';
import "../App.css";
import Article from './Article'

const ArticleList = ({ articles, loading }) => {

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return articles?.map(article => {
        return (
            <Article key={article.data.id} article={article}></Article>
        )
    })
}

export default ArticleList;