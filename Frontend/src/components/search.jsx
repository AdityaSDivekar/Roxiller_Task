import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { useState } from 'react';
export default function SearchTransaction() {
  const [value, setValue] = React.useState(null); // For search input
  const [selectedMonth, setSelectedMonth] = useState("March"); // Default selected month
  const [transactions, setTransactions] =useState([]); // For storing transactions
  const [filteredTransactions, setFilteredTransactions] = useState([]); // For storing filtered transactions

  // Fetch transactions for the selected month when the component mounts or when the selectedMonth changes
  React.useEffect(() => {
    fetchTransactions(selectedMonth);
  }, [selectedMonth]);

  // Function to fetch transactions from the API
  const fetchTransactions = async (month) => {
    try {
      const response = await axios.get(`/api/transactions?month=${month}`); // Replace with your API endpoint
      setTransactions(response.data);
      setFilteredTransactions(response.data); // Initially, no filter, show all transactions
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  // Handle search input change
  const handleSearchChange = (event, newValue) => {
    setValue(newValue);
    
    if (newValue === "") {
      // If search box is cleared, show all transactions for the selected month
      setFilteredTransactions(transactions);
    } else {
      // Filter transactions based on title, description, or price
      const filtered = transactions.filter((transaction) => {
        const searchTerm = newValue.toLowerCase();
        return (
          transaction.title.toLowerCase().includes(searchTerm) ||
          transaction.description.toLowerCase().includes(searchTerm) ||
          transaction.price.toString().includes(searchTerm)
        );
      });
      setFilteredTransactions(filtered);
    }
  };

  return (
    <div>
      <h3>Search Transactions</h3>
      
      {/* Search bar */}
      <Autocomplete
        value={value}
        onChange={handleSearchChange}
        options={[]}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Search by title, description, or price" />
        )}
      />

      {/* Transaction list */}
      <ul>
      {Array.isArray(filteredTransactions) && filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <li key={transaction.id}>
              <div>{transaction.title}</div>
              <div>{transaction.description}</div>
              <div>${transaction.price}</div>
            </li>
          ))
        ) : (
          <li>No transactions found</li>
        )}
      </ul>
    </div>
  );
}
