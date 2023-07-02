import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { ToDoPage } from './pages/ToDoPage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ToDoPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
