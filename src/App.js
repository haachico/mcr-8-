import "./styles.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import MainPage from "./Pages/MainPage";
import DetailsPage from "./Pages/DetailsPage";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/meetup/:ID" element={<DetailsPage />} />
      </Routes>
    </div>
  );
}
