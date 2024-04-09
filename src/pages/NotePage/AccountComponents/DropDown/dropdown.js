import React, { useState } from 'react';
import { useRecoilState } from "recoil";
import './ExpenseButtons.css'; // CSS 파일을 import
import add_btn from "../../../../assets/images/add_btn.png";
import axios from "axios";
import { userInfoState } from "../../../../recoil/atoms/userState";
import { accountState } from "../../../../recoil/atoms/accountState";
import { selectedNoteId } from "../../../../recoil/atoms/noteState";
import { API } from "../../../../config";
function ExpenseButtons({tid, list}) {
  const [account, setAccount] = useRecoilState(accountState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [selectedNote, setSelectedNote] = useRecoilState(selectedNoteId);
  const [selectedExpense, setSelectedExpense] = useState('');
  const handleClick = (expense) => {
    setSelectedExpense(expense);
  };
    
  const [detail, setDetail] = useState('');
  const handleDetailChange = (event) => {
      setDetail(event.target.value);
    };

  const [price, setPrice] = useState('');
  const handlePriceChange = (event) => {
      const input = event.target.value;
      const numericInput = input.replace(/[^0-9]/g, ""); // 숫자 이외의 문자 모두 제거
    
      const numberWithCommas = numericInput.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setPrice(numberWithCommas);
      // const priceWithUnit = numberWithCommas + "원";
      // setPrice(priceWithUnit);
    };    
  const fetchAccount = async () => {
    try {
        const response = await axios.get(`${API.HEADER}/accountbook/travel/${selectedNote}`);
        console.log("가계부 조회 성공");
        console.log("가계부 조회 response : ", response);
        setAccount(response.data.result);
    } catch (error) {
        console.log(error);
        console.log("가계부 조회 실패");
    } 
  };
  const createItem = async () => {
    try {
      const numericPrice = price.replace(/,/g, ""); // 콤마 제거
      
      if(list.budget == 0){
      const response = await axios.post(
          `${API.HEADER}/accountbook/transactionAdd/${tid}`,
          {
              totalBudget: numericPrice,
              expenseCategory: selectedExpense,
              expenseDetail: detail,
              amount: numericPrice,
              date: list.date,
          },
          {
              headers: {
                  Authorization: `${userInfo.accessToken}`,
              },
          }
      );
        } else {
          const response = await axios.post(
            `${API.HEADER}/accountbook/transactionAdd/${tid}`,
            {
                totalBudget: list.budget,
                expenseCategory: selectedExpense,
                expenseDetail: detail,
                amount: numericPrice,
                date: list.date,
            },
            {
                headers: {
                    Authorization: `${userInfo.accessToken}`,
                },
            }
          );          
        }
      console.log("내역 생성 성공!");
      // console.log("내역 생성 response : ", response);
      console.log("내역 생성 결과 : ", list);
      fetchAccount();
      } catch (error) {
          console.log(list);
          console.log(error);
          console.log("내역 생성 실패");
      }    
  };
  return (
    <div className="account-input-form">
      <div className="account-input-expense-box">
        <div>
        <button className={selectedExpense === '식비' ? 'expense-selected' : 'expense'} onClick={() => handleClick('식비')}>식비</button>
        <button className={selectedExpense === '교통비' ? 'expense-selected' : 'expense'} onClick={() => handleClick('교통비')}>교통비</button>
        <button className={selectedExpense === '쇼핑' ? 'expense-selected' : 'expense'} onClick={() => handleClick('쇼핑')}>쇼핑</button>
        <button className={selectedExpense === '관광' ? 'expense-selected' : 'expense'} onClick={() => handleClick('관광')}>관광</button>
        <button className={selectedExpense === '기타' ? 'expense-selected' : 'expense'} onClick={() => handleClick('기타')}>기타</button>
        </div>
      </div>
      <div className="account-input-description-box">
      <input
          type="text"
          value={detail}
          placeholder="세부 사항"
          className="account-input-description"
          onChange={handleDetailChange}
      >
      </input>
      </div>
      <div className="account-input-price-box">
          <input
              type="text"
              value={price}
              placeholder="가격"
              className="account-input-price"
              onChange={handlePriceChange}
          >
          </input>
          <div
              className="account-add-btn"
              style={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}
          >
              <img
                  src={add_btn}
                  alt="add_btn"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                      createItem();
                  }}
              />
          </div>                        
      </div>   
    </div> 
  );
}

export default ExpenseButtons;