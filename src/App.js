import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage.js";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/main" element={<MainPage />}></Route>
                <Route path="/recommend"></Route>
            </Routes>
        </div>
    );
}

export default App;
