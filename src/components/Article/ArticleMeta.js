import ArticleActions from './ArticleActions';
import { Link } from 'react-router-dom';
import React from 'react';

const ArticleMeta = props => {
  const article = props.article;
  return (
    <div className="article-meta">
      <Link to={`/@${article.author.username}`}>
        <img
          src={article.author.image || 'https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg'}
          alt={article.author.username}
          onError={e => { e.target.onerror = null; e.target.src = 'https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg'; }}
        />
      </Link>

      <div className="info">
        <Link to={`/@${article.author.username}`} className="author">
          {article.author.username}
        </Link>
        <span className="date">
          {new Date(article.createdAt).toDateString()}
        </span>
      </div>

      <ArticleActions canModify={props.canModify} article={article} />
    </div>
  );
};

export default ArticleMeta;
