import Container from "@mui/material/Container";
import Header from "./components/header/header";
import GitDataTable from "./components/data-table/git-data-table";

function App() {
  return (
    <div className="App">
      <Header />
      <Container maxWidth="lg">
        <GitDataTable />
      </Container>
    </div>
  );
}

export default App;
