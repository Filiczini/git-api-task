import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Header from "./components/header/header";
import GitDataTable from "./components/data-table/git-data-table";

function App() {
  const rows = [
    {
      title:
        "[Profile] Implement functionality to remove users avatar (Front End part)",
      labels: ["feature", "fontEnd part", "UI"],
      assignee: "SirSir",
      comments: 3,
    },
    {
      title:
        "(SP:2) Save user configs to DB after logging out (Front End part)",
      labels: ["data base", "feature", "fontEnd part"],
      assignee: "Anastasia",
      comments: 5,
    },
    {
      title: "[Catalog] Make adaptive design for Catalog page",
      labels: ["design", "fontEnd part", "responsive"],
      assignee: "filiczini",
      comments: 2,
    },
    {
      title: "(SP:3) Refactor payment with Fondy",
      labels: ["Functional", "priority: high"],
      assignee: "Mark",
      comments: 7,
    },
    {
      title: "(SP:0.5) Investigate response from Fondy",
      labels: ["fontEnd part", "Functional", "priority: high"],
      assignee: "Oleh",
      comments: 8,
    },
  ];

  const [repoName, setRepoName] = useState("");
  const [userName, setUserName] = useState("");
  const [data, setData] = useState(rows);

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`https://api.github.com/repos/${userName}/${repoName}/issues`)
      .then((res) => res.json())
      .then((data) => {
        return setData(data);
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
          <Button type="submit" onClick={handleSubmit} variant="outlined">
            Search
          </Button>
        </form>
        <GitDataTable rows={data} />
      </Container>
    </div>
  );
}

export default App;
