import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Bills({ filterLastMonths }) {
  const initialTransactions = [
    { id: 1, date: '2023-01-15', restaurant: 'Pizza Palace', amount: 40.0, friends: ['Alice', 'Bob'], status: 'Paid' },
    { id: 2, date: '2023-02-10', restaurant: 'Sushi Spot', amount: 65.0, friends: ['Charlie'], status: 'Unpaid' },
    { id: 3, date: '2023-03-05', restaurant: 'Burger Haven', amount: 25.0, friends: ['Alice', 'Dave'], status: 'Paid' },
    { id: 4, date: '2023-03-22', restaurant: 'Pasta Place', amount: 55.0, friends: ['Bob', 'Eve'], status: 'Unpaid' },
    { id: 5, date: '2023-04-10', restaurant: 'Taco Town', amount: 30.0, friends: ['Charlie', 'Dave'], status: 'Paid' },
    { id: 6, date: '2023-04-20', restaurant: 'Steakhouse Deluxe', amount: 100.0, friends: ['Alice', 'Eve', 'Bob'], status: 'Paid' },
    { id: 7, date: '2023-08-01', restaurant: 'Noodle House', amount: 40.0, friends: ['Bob'], status: 'Paid' },
    { id: 8, date: '2023-09-10', restaurant: 'Mexican Grill', amount: 70.0, friends: ['Alice'], status: 'Unpaid' },
    { id: 9, date: '2023-10-15', restaurant: 'Italian Bistro', amount: 50.0, friends: ['Charlie', 'Dave'], status: 'Paid' },
    { id: 10, date: '2023-11-20', restaurant: 'French Cafe', amount: 80.0, friends: ['Alice', 'Eve'], status: 'Unpaid' },
    { id: 11, date: '2023-12-25', restaurant: 'Holiday Diner', amount: 60.0, friends: ['Bob', 'Charlie'], status: 'Paid' },
    { id: 12, date: '2024-01-10', restaurant: 'New Year\'s Feast', amount: 90.0, friends: ['Alice', 'Dave'], status: 'Unpaid' },
    { id: 13, date: '2024-02-14', restaurant: 'Valentine\'s Dinner', amount: 120.0, friends: ['Eve'], status: 'Paid' },
    { id: 14, date: '2024-03-17', restaurant: 'St. Patrick\'s Pub', amount: 45.0, friends: ['Charlie', 'Bob'], status: 'Unpaid' },
    { id: 15, date: '2024-04-22', restaurant: 'Earth Day Eatery', amount: 70.0, friends: ['Alice', 'Eve'], status: 'Paid' },
    { id: 16, date: '2024-05-05', restaurant: 'Cinco de Mayo Cantina', amount: 85.0, friends: ['Dave', 'Charlie'], status: 'Unpaid' },
    { id: 17, date: '2024-06-21', restaurant: 'Summer Solstice Grill', amount: 110.0, friends: ['Alice', 'Bob'], status: 'Paid' },
    { id: 18, date: '2024-07-04', restaurant: 'Independence BBQ', amount: 95.0, friends: ['Eve', 'Charlie'], status: 'Unpaid' },
    { id: 19, date: '2024-08-15', restaurant: 'Mid-Summer Feast', amount: 60.0, friends: ['Dave', 'Alice'], status: 'Paid' },
    { id: 20, date: '2024-09-10', restaurant: 'Autumn Harvest', amount: 75.0, friends: ['Bob', 'Eve'], status: 'Unpaid' },
    { id: 21, date: '2024-10-31', restaurant: 'Halloween Hangout', amount: 50.0, friends: ['Charlie', 'Dave'], status: 'Paid' },
    { id: 22, date: '2024-10-15', restaurant: 'Spooky Diner', amount: 45.0, friends: ['Alice', 'Eve'], status: 'Unpaid' },
    { id: 23, date: '2024-11-05', restaurant: 'Thanksgiving Feast', amount: 150.0, friends: ['Charlie', 'Bob'], status: 'Paid' },
    { id: 24, date: '2024-11-20', restaurant: 'Pre-Holiday Dinner', amount: 80.0, friends: ['Alice', 'Dave'], status: 'Unpaid' },
    { id: 25, date: '2024-11-25', restaurant: 'Black Friday Brunch', amount: 60.0, friends: ['Eve', 'Charlie'], status: 'Paid' },
    { id: 26, date: '2024-11-30', restaurant: 'End of November Bash', amount: 100.0, friends: ['Bob', 'Alice'], status: 'Unpaid' },
  ];

  const [transactions, setTransactions] = useState(initialTransactions.map((t) => ({ ...t, expanded: false })));
  const [sortOption, setSortOption] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    try {
      let filteredTransactions = initialTransactions;

      if (filterLastMonths) {
        const filterDate = new Date();
        filterDate.setMonth(filterDate.getMonth() - filterLastMonths);

        filteredTransactions = initialTransactions.filter(transaction => {
          const transactionDate = new Date(transaction.date);
          return transactionDate >= filterDate;
        });
      }

      setTransactions(filteredTransactions.map((t) => ({ ...t, expanded: false })));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filterLastMonths]);

  const handleSort = (option) => {
    setSortOption(option);

    const sortedTransactions = [...transactions];

    switch (option) {
      case 'amount':
        sortedTransactions.sort((a, b) => a.amount - b.amount);
        break;
      case 'date':
        sortedTransactions.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'friends':
        sortedTransactions.sort((a, b) => a.friends.join(', ').localeCompare(b.friends.join(', ')));
        break;
      case 'status':
        sortedTransactions.sort((a, b) => a.status.localeCompare(b.status));
        break;
      default:
        break;
    }

    setTransactions(sortedTransactions);
  };

  const toggleExpand = (id) => {
    setTransactions(transactions.map(transaction =>
      transaction.id === id
        ? { ...transaction, expanded: !transaction.expanded }
        : transaction
    ));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="bills-page">
      <h2>{filterLastMonths ? `Recent Transactions (Last ${filterLastMonths} Months)` : 'All Restaurant Transactions'}</h2>

      <div className="sort-options">
        <label htmlFor="sort">Sort by: </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="">Select</option>
          <option value="amount">Amount</option>
          <option value="date">Date</option>
          <option value="friends">Person</option>
          <option value="status">Status (Paid/Unpaid)</option>
        </select>
      </div>

      <table className="transactions-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Restaurant</th>
            <th>Amount</th>
            <th>Friends</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction.id} onClick={() => toggleExpand(transaction.id)} style={{ cursor: 'pointer' }}>
                <td>{transaction.date}</td>
                <td>{transaction.restaurant}</td>
                <td>${transaction.amount.toFixed(2)}</td>
                <td>{transaction.friends.join(', ')}</td>
                <td className={`status ${transaction.status.toLowerCase()}`}>{transaction.status}</td>
                {transaction.expanded && (
                  <tr className="transaction-details">
                    <td colSpan="5">
                      <p><strong>Restaurant:</strong> {transaction.restaurant}</p>
                      <p><strong>Amount:</strong> ${transaction.amount.toFixed(2)}</p>
                      <p><strong>Friends:</strong> {transaction.friends.join(', ')}</p>
                      <p className={`status ${transaction.status.toLowerCase()}`}>
                        <strong>Status:</strong> {transaction.status}
                      </p>
                    </td>
                  </tr>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No transactions found for the last {filterLastMonths} months.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

Bills.propTypes = {
  filterLastMonths: PropTypes.number,
};

export default Bills;