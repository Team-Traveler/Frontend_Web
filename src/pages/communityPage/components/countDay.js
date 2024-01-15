import React, { useState,useRef,useEffect } from "react";

export default function CountDay({start_date, end_date}){ 
  const [date1,setDate1] = useState(new Date(0));
  const [date2,setDate2] = useState(new Date(0));
  const [result,setResult] = useState("로딩 중...");

  useEffect(()=>{
    setDate1(new Date(start_date));
    setDate2(new Date(end_date));
    const msDiff = date1.getTime() - date2.getTime();
    setResult(Math.abs(Math.ceil(msDiff / (1000 * 60 * 60 * 24))));
  },[start_date,end_date,result]) 
  
  if (result==="로딩 중..."){
    return(
      <span>{result}</span>
    )
  }
  else if(result<1){
    return(
        <span> 당일치기</span>
    )
  }
  else{
    return(
        <span> {result}박 {result+1}일</span>
    )
  }
}
