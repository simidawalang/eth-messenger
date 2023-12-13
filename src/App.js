import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Chat, Home } from "./pages";
import { Navbar } from "./components";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat/:account" element={<Chat />} />
      </Routes>
    </>
  );
}

export default App;
