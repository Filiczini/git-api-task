import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Issue from "./pages/Issue";
import Header from "./components/header/header";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/issue/:user/:repo/:type/:number" element={<Issue />} />
          <Route
            path="*"
            element={
              <main>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
