import React from "react";
import { Link } from "react-router-dom";


export default function Loading(){
    return(
        <div className="landingbody">
            <div className="landing">
            
                <h1>VIDEOGAMES</h1>
                
                <Link className="a" to="/home">
                    <button className="btn">START</button>
                </Link>

            </div>
        </div>
        
        
    )
}