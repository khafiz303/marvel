import './comicsList.scss';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>;
        case 'confirmed':
            return <Component/>;
        case 'error':
            return <ErrorMessage/>;
        default:
            throw new Error('Unexpected process state');
    }
};

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(true);
    const [offset, setOffset] = useState(210);
    const [comicsEnded, setComicsEnded] = useState(false);
    const {getComics, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        clearError();
        setNewItemLoading(!initial);

        getComics(offset)
            .then(onComicListLoaded)
            .then(() => setProcess('confirmed'))
            .catch(() => setProcess('error'));
    };

    const onComicListLoaded = (newComicList) => {
        let ended = false;
        if (newComicList.length < 8) {
            ended = true;
        }

        setComics(comics => [...comics, ...newComicList]);
        setOffset(offset => offset + 9);
        setNewItemLoading(false);
        setComicsEnded(ended);
    };

    const renderItems = (arr) => {
        const items = arr.map((item, i) => {
            return (
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            );
        });
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        );
    };

    return (
        <div className="comics__list">
            {setContent(process, () => renderItems(comics), newItemLoading)}
            {!comicsEnded && (
                <button 
                    disabled={newItemLoading} 
                    className="button button__main button__long"
                    onClick={() => onRequest(offset, false)}
                >
                    <div className="inner">load more</div>
                </button>
            )}
        </div>
    );
};

export default ComicsList;
