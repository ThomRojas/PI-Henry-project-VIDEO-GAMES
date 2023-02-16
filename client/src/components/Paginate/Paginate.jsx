import React from "react";
import styles from "./Paginate.module.css"
export default function Paginated({ videoGamesPerPage, allVideoGames, paginated, currentPages }){

    const pageNumber = [];

    for (let i = 0; i < Math.ceil(allVideoGames / videoGamesPerPage); i++) {
        pageNumber.push(i+1)
        
        
    }

    function handlerFlechas(event){
        event.target.value === "prev" && currentPages !== 1 && paginated(currentPages - 1)
        event.target.value === "next" && currentPages !== Math.ceil((allVideoGames / videoGamesPerPage)) && paginated(currentPages + 1)
    }


    return(
        <nav className="center">
            <ul >
                <button className="btnPaginate" value="prev" onClick = {handlerFlechas}> Prev </button>
                {
                    pageNumber?.map(number => (
                        <button className={`number ${number === currentPages ? "current" : "btnPaginate"}`} key={number} onClick={()=>paginated(number)}>{number}</button>
                    ))
                }
                <button className="btnPaginate" value="next" onClick = {handlerFlechas}> Next </button>
            </ul>
        </nav>
    )

}