import React, { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi"; 
import { MdClose } from "react-icons/md";
import ReactDOM from 'react-dom';
import './BtnMyTravelMenu.css';

const BtnMyTravelMenu = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleButtonClick = (event) => {
    if (!isOpen) {
      event.preventDefault();
    } else {
      // 여기에서 원하는 동작을 수행하세요.
    }
  }

  const handleButton = (buttonNumber) => {
    console.log(`버튼 ${buttonNumber}가 클릭되었습니다.`);
    switch(buttonNumber){
      case 1:
        props.setView('profile');
        break;
      case 2:
        props.setView('review');
        break;
      case 3:
        props.setView('like');
        break;
      case 4:
        props.setView('add');
        break;
      case 5:
        props.toggleEditMode();
        break;
    }
    
    setIsOpen(false);
  };


  return (
    <div className="menu-container">
      <button className="toggle-button" onClick={handleClick}>
        {isOpen ? <MdClose size={50} /> : <GiHamburgerMenu size={50} />}
      </button>

      <div className={isOpen ? "menu visible" : "menu hidden"}>
        <button onClick={() => handleButton(1)} className={isOpen ? "first-child button-open button-1" : "first-child button-close button-5"}>프로필 편집</button>
        <button onClick={() => handleButton(2)} className={isOpen ? "button-open button-2" : "first-child button-close button-4"} >후기 작성</button>
        <button onClick={() => handleButton(3)} className={isOpen ? "button-open button-3" : "button-close button-3"} >찜한 여행</button>
        <button onClick={() => handleButton(4)} className={isOpen ? "button-open button-4" : "button-close button-2"} >여행 만들기</button>
        <button onClick={() => handleButton(5)} className={isOpen ? "button-open button-5" : "button-close button-1"} >목록 편집</button>
      </div>
    </div>
  );
};
export default BtnMyTravelMenu;