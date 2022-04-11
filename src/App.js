import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router";
import Header from "./commponents/views/Header/Header";
import Home from "./commponents/views/Home/Home";
import PageNotFound from "./commponents/views/PageNotFound/PageNotFound";
import Table from "./commponents/views/Table/Table";
import { fetchTables } from "./redux/tablesReducer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => fetchTables(dispatch) ,[dispatch]);  

  return (
    <main>
      <Container style={{width: "800px"}}>
        <Header />
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
