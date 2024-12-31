import React from 'react'
import axios from 'axios'
axios.get('http://localhost:8080/api/customers')
  .then(response => {
    setCustomers(response.data); // Store the fetched customers in state
  })
  .catch(error => console.error(error));

export const CustomerList = () => {
  return (
    <div>CustomerList</div>
  )
}
