import { useState } from 'react';
import React from 'react';
import Login from './components/Login';
import Home from './components/Home';

function App() {

  const [username, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onLogin = (data) => {
    setName(data.username);
    setIsSubmitted(data.isSubmitted);
    console.log(isSubmitted);
    console.log(username);
  }

  if (isSubmitted) {
    return <Home username={username} />
  }
  return <Login onLogin={onLogin} />

}

export default App;
