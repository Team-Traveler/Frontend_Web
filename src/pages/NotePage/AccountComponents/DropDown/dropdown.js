import React, { useState } from 'react';
import './ExpenseButtons.css'; // CSS 파일을 import

function ExpenseButtons() {
  const [selectedExpense, setSelectedExpense] = useState('');

  const handleClick = (expense) => {
    setSelectedExpense(expense);
  };

  return (
    <div>
      <button className={selectedExpense === '식비' ? 'expense-selected' : 'expense'} onClick={() => handleClick('식비')}>식비</button>
      <button className={selectedExpense === '교통비' ? 'expense-selected' : 'expense'} onClick={() => handleClick('교통비')}>교통비</button>
      <button className={selectedExpense === '쇼핑' ? 'expense-selected' : 'expense'} onClick={() => handleClick('쇼핑')}>쇼핑</button>
      <button className={selectedExpense === '관광' ? 'expense-selected' : 'expense'} onClick={() => handleClick('관광')}>관광</button>
      <button className={selectedExpense === '기타' ? 'expense-selected' : 'expense'} onClick={() => handleClick('기타')}>기타</button>
      
    </div>
  );
}

export default ExpenseButtons;