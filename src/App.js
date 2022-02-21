import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Header from "./components/header/header";
import GitDataTable from "./components/data-table/git-data-table";

function App() {
  const [repoName, setRepoName] = useState("");
  const [userName, setUserName] = useState("");
  const [data, setData] = useState([]);

  function handleSubmit() {
    fetch(`https://api.github.com/repos/${userName}/${repoName}/issues`)
      .then((res) => res.json())
      .then((fetchedData) => {
        setData(fetchedData);
      });
  }
  function handleUserName(e) {
    setUserName(e.target.value);
  }
  function handleRepoName(e) {
    setRepoName(e.target.value);
  }


  return (
    <div className="App">
      <Header />

      <Container maxWidth="lg">
        <div className="table-header">
          <form>
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              onChange={handleUserName}
            />
            <TextField
              id="outlined-basic"
              label="Repo name"
              variant="outlined"
              onChange={handleRepoName}
            />
            <Button onClick={handleSubmit} variant="outlined">
              Search
            </Button>
          </form>
          <div className="table-filtering">
            <TextField
              id="outlined-basic"
              label="filter by label"
              variant="outlined"
              onChange={handleUserName}
            />
            <TextField
              id="outlined-basic"
              label="filter by assignee"
              variant="outlined"
            />
            <Button onClick={null} variant="outlined">
              SortByDate
            </Button>
          </div>
        </div>

        <GitDataTable rows={data} />
      </Container>
    </div>
  );
}

export default App;
