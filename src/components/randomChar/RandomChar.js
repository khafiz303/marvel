import { Component, useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

import setContent from '../../utils/setContent';
const RandomChar = ()=> {
 
    const[char , setChar] = useState({})
    
    const { getCharacter , clearError , process , setProcess} = useMarvelService()

   
    useEffect(()=>{
        updateChar()
    }, [])


    const onCharLoaded = (char)=>{
        setChar(char)
  
    }

   
    const updateChar = ()=>{
        clearError()
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        getCharacter(id)
        .then(onCharLoaded)
        .then(()=> setProcess('confirmed'))
    
  
    }

// const errorMessage = error ? <ErrorMessage/> : null
// const spinner = loading ? <Spinner/> : null
// const content  = !(loading || error) ? <View char={char}/> : null

return (
    <div className="randomchar">
        {setContent(process , View , char)}
        
        <div className="randomchar__static">
            <p className="randomchar__title">
                Random character for today!<br/>
                Do you want to get to know him better?
            </p>
            <p className="randomchar__title">
                Or choose another one
            </p>
            <button className="button button__main">
                <div className="inner" onClick={()=> updateChar()}>try it</div>
            </button>
            <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
        </div>
    </div>
)
}

const View = ({data})=>{
    const {name ,description , thumbnail , homepage , wiki} = data

    let notFound  = false
    if(thumbnail == 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
        notFound = true
    }
    
    let shortDescription;
   
    if (description && description.length > 50) {
        shortDescription = description.slice(0, 50) + '...';
    } else if (description && description.trim() != '') {
        shortDescription = description;
    } else {
        shortDescription = 'Description is not available';
    }
    return( 
        <div className="randomchar__block">
        <img style={notFound ? {objectFit : 'contain'} : {}} src={thumbnail} alt="Random character" className="randomchar__img"/>
        <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">
                {shortDescription}
            </p>
            <div className="randomchar__btns">
                <a href={`${homepage}`} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a href={`${wiki}`} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div>
    )
}

export default RandomChar;