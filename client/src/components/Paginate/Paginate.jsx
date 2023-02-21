import React from "react";
import styles from "./Paginate.module.css"

export default function Paginated({ videoGamesPerPage, allVideoGames, paginated, currentPage }){
  
    
    const pageNumber = [];

    if (!Number.isInteger(videoGamesPerPage)) {
        videoGamesPerPage = 15; // asignar un valor por defecto
    } else {
        videoGamesPerPage = parseInt(videoGamesPerPage);
    }

    for (let i = 0; i < Math.ceil(allVideoGames / videoGamesPerPage); i++) {
        pageNumber.push(i+1)
    }

    function handlerFlechas(event){
        event.target.value === "prev" && currentPage !== 1 && paginated(currentPage - 1)
        event.target.value === "next" && currentPage !== Math.ceil((allVideoGames / videoGamesPerPage)) && paginated(currentPage + 1)
    }
    console.log(videoGamesPerPage)
    return(
        <nav className="center">
            <ul>
                <button className={styles.btnPaginate} value="prev" onClick={handlerFlechas}> Prev </button>
                {
                    pageNumber?.map(number => (
                        <button 
                            className={`${styles.number} ${number === currentPage ? "current" : styles.btnPaginate}`} 
                            key={number} 
                            onClick={()=>paginated(number)}
                        >
                            {number}
                        </button>
                    ))
                }
                <button className={styles.btnPaginate} value="next" onClick={handlerFlechas}> Next </button>
            </ul>
        </nav>
    )

}