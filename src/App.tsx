import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import { RecoilRoot } from "recoil";
import ManagePage from "./pages/managePage";
import AuthorityPage from "./pages/AuthorityPage";

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/search" element={<SearchPage />}></Route>
          <Route path="/management" element={<ManagePage />}></Route>
          <Route path="/auth" element={<AuthorityPage />}></Route>
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
