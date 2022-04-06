import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router";
import Home from "./commponents/views/Home";
import PageNotFound from "./commponents/views/PageNotFound";
import Table from "./commponents/views/Table";

function App() {
  return (
    <main>
      <Container style={{width: "800px"}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/table/:id" element={<Table />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Container>
    </main>
  );
}

export default App;
