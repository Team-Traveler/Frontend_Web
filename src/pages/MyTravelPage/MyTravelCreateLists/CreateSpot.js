import React, { useEffect, useState } from "react";
import './CreateSpot.css';

function CreateSpot(){
    return(
        <div className="create-spot-box">
            <input className="create-spot-input" placeholder="장소를 검색해보세요."></input>
        </div>
    )
}

export default CreateSpot;