import './comicsList.scss';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
const ComicsList = () => {
    const [comics , setComics] = useState([])
    const [newItemLoading , setNewItemLoading] = useState(false)
    const [offset , setOffset] = useState(210)
    const [comicsEnded, setComicsEnded] = useState(false);
    const {getComics , error , loading , clearError} = useMarvelService()
    useEffect(()=>{
        onRequest()
      
    } , [])

    const onRequest = ()=>{
        setNewItemLoading(true)
        getComics(offset)
        .then(onComicListLoaded)
    }

    const onComicListLoaded = (newComicList)=>{
        let ended = false
        if(newComicList.length < 8){
            ended = true
        }

        setComics([...comics , ...newComicList])
        setOffset(offset => offset + 9)
        setComicsEnded(comicsEnded => ended)
    }



    function renderItems(arr){
        const items = arr.map((item , i) =>{

            return(
                <li className="comics__item"
                key={i}
                >
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })
      return(
            <ul className="comics__grid">
                {items}
            </ul>
      )
    }

    const items = renderItems(comics)
    const spinner = loading ? <Spinner/> : null
    const errorMessage = error ? <ErrorMessage/> : null
    return (

        <div className="comics__list">
            {items}
            {spinner} 
            {errorMessage}
            <button className="button button__main button__long">
                <div className="inner" onClick={()=>onRequest()}>load more</div>
            </button>
        </div>
    )
}

export default ComicsList;