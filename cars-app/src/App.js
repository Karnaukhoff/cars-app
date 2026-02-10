import logo from './logo.svg';
import './App.css';

// Вывод списка машин (name, model, year, price)
// Создание машины (name, model, year, color, price)
// Редактирование машины (по полю name и price)
// Удаление машины
// Сделать сортировку машин по year и price

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
