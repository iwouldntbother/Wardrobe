import React from 'react';
import './App.css';
import ClothingItemCollection from './components/ClothingItem';
import ClothingGrid from './components/ClothingGrid';

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/db")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div>
      <ClothingItemCollection />
      <ClothingGrid size='3x2'/>
      {!data ? 'loading...' : data}
    </div>
  );
}

export default App;
