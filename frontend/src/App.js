import axios from 'axios';

function App() {
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleClick = async () => {
    const response = await axios.get(apiUrl);
    alert(response.data);
  };

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

export default App;
