'use client';

import { useState, useEffect } from 'react';
import './globals.css';

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

  useEffect(() => {
    const saved = localStorage.getItem('expenses');
    if (saved) {
      setExpenses(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    const newExpense = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      category,
      date: new Date().toLocaleDateString()
    };

    setExpenses([newExpense, ...expenses]);
    setDescription('');
    setAmount('');
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const categoryTotals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  return (
    <div className="container">
      <header>
        <h1>Expense Tracker</h1>
        <div className="total">Total: ${total.toFixed(2)}</div>
      </header>

      <form onSubmit={addExpense} className="form">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input"
        />
        <input
          type="number"
          step="0.01"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select"
        >
          <option>Food</option>
          <option>Transport</option>
          <option>Shopping</option>
          <option>Entertainment</option>
          <option>Bills</option>
          <option>Other</option>
        </select>
        <button type="submit" className="btn-add">Add Expense</button>
      </form>

      {Object.keys(categoryTotals).length > 0 && (
        <div className="categories">
          {Object.entries(categoryTotals).map(([cat, amt]) => (
            <div key={cat} className="category-tag">
              {cat}: ${amt.toFixed(2)}
            </div>
          ))}
        </div>
      )}

      <div className="expenses">
        {expenses.length === 0 ? (
          <p className="empty">No expenses yet. Add your first expense above.</p>
        ) : (
          expenses.map((expense) => (
            <div key={expense.id} className="expense-item">
              <div className="expense-info">
                <div className="expense-desc">{expense.description}</div>
                <div className="expense-meta">
                  <span className="expense-category">{expense.category}</span>
                  <span className="expense-date">{expense.date}</span>
                </div>
              </div>
              <div className="expense-right">
                <div className="expense-amount">${expense.amount.toFixed(2)}</div>
                <button
                  onClick={() => deleteExpense(expense.id)}
                  className="btn-delete"
                >
                  ×
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
