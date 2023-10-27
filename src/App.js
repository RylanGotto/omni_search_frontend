import QAContainer from './components/layout/QAContainer'
import './App.css';
import { NavBar } from './components/layout/NavBar'
import { LoginCard } from './components/info/Login';
import { SearchBar } from './components/layout/SearchBar';

function App() {
  return (
    <>
    <NavBar />
      <div className="App flex flex-row">
        <QAContainer />
        <SearchBar />
      </div>
    </>
  );
}

export default App;
