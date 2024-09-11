// pages/index.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

//   const fetchItems = async () => {
//     const response = await axios.get('http://localhost:5000/api/items');
//     setItems(response.data);
//   };
  const fetchItems = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/items`);
      setItems(response.data);
    } catch (error) {
      if (error.response) {
        console.error('Server responded with status code', error.response.status);
      } else if (error.request) {
        console.error('No response received', error.request);
      } else {
        console.error('Error setting up the request', error.message);
      }
    }
  };
  

  const addItem = async () => {
    const response = await axios.post('http://localhost:5000/api/items', { name });
    setItems([...items, response.data]);
    setName('');
  };

  return (
    <div>
      <h1>Items</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Add a new item"
      />
      <button onClick={addItem}>Add</button>
      <ul>
        {items.map(item => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}