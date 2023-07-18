import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/main"></Route>
                    <Route path="/recommend"></Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
