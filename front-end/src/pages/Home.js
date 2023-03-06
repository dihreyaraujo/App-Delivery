import React from 'react';
import { Navigate } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
        <Navigate to="/login" replace />
      </div>
    );
  }
}

export default Home;
