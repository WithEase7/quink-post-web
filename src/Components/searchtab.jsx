import React, { useState } from 'react'
import "../Styles/searchtab.css"
import SearchArticle from './search/searchArticle';
import SearchChallange from './search/searchChallange';
import SearchCommunity from './search/searchCommunity';
import SearchPeople from './search/searchPeople';
function Searchtab() {
    const[article,setArticle]= useState(true);
    const[people,setPeople]= useState(false);
    const[community,setCommunity]= useState(false);
    const[challenge,setChallenge]=useState(false);
    const handleClick1=()=>{
       setArticle(true);
       setPeople(false);
       setCommunity(false);
       setChallenge(false);
    }
    const handleClick2=()=>{
        setArticle(false);
        setPeople(true);
        setCommunity(false);
        setChallenge(false);
    }
    const handleClick3=()=>{
        setArticle(false);
        setPeople(false);
        setCommunity(true);
        setChallenge(false);
    }
    const handleClick4=()=>{
        setArticle(false);
       setPeople(false);
       setCommunity(false);
       setChallenge(true);
    }
    return (
        <div className="searchtab-container">
           <div className="upper-category">
               <div className= {`upper-category-each ${article && "upper-category-each-active"}`} onClick={handleClick1} >Articles</div>
               <div className={`upper-category-each ${people && "upper-category-each-active"}`} onClick={handleClick2} >People</div>
               <div className={`upper-category-each ${community && "upper-category-each-active"}`} onClick={handleClick3} >Communities</div>
               <div className={`upper-category-each ${challenge && "upper-category-each-active"}`} onClick={handleClick4} >Challenges</div>
           </div>
           <div className="search-result-container">
               <div className={`${!article && "search-display-none"}`}>
                 <SearchArticle />
               </div>
               <div className={`${!people && "search-display-none"}`}>
                 <SearchPeople />
               </div>
               <div className={`${!community && "search-display-none"}`}>
               <SearchCommunity />
               </div>
               <div className={`${!challenge && "search-display-none"}`}>
               <SearchChallange /> 
               </div>
           </div>
        </div>
    )
}

export default Searchtab
