import React from 'react';
import { StarOutlined, StarFilled } from "@ant-design/icons";
import './showRatingBar.css'
function ShowRatingbarPage({intensity, concept, totalStar}){
    let intensityArray = new Array(5).fill(true);
    let conceptArray = new Array(5).fill(true);
    let totalStarArray = new Array(5).fill(true);

    for(var i=0; i<5; i++){
        let flag1 = i<=intensity-1 ? true : false;
        let flag2 = i<=concept-1 ? true : false;
        let flag3 = i<=totalStar-1 ? true : false;

        if(flag1===false) intensityArray[i]=false;
        if(flag2===false) conceptArray[i]=false;
        if(flag3===false) totalStarArray[i]=false;
    }

    const style = { color:"#9CBBAC", 
                    fontSize:"25px", 
                    marginRight:"5px"};
    return(
        <div className="ratingbar-box">
            <div className="ratingbar" style={{marginTop:"10px"}}>
                <span>여행 강도</span>
                <br/>
                {intensityArray.map((flag) => (
                    flag ? (<StarFilled style={style}/>) : (<StarOutlined style={style}/>)
                ))}
            </div>
            <div className="ratingbar">
                <span>여행 컨셉</span>
                <br/>
                {conceptArray.map((flag) => (
                    flag ? (<StarFilled style={style}/>) : (<StarOutlined style={style}/>)
                ))}
            </div>
            <div className="ratingbar">
                <span>총 별점</span>
                <br/>
                {totalStarArray.map((flag) => (
                    flag ? (<StarFilled style={style}/>) : (<StarOutlined style={style}/>)
                ))}
            </div>
        </div>
    );
}

export default ShowRatingbarPage;