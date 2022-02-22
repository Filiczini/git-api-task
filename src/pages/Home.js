import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import GitDataTable from "../components/data-table/git-data-table";

function Home() {
  const [repoName, setRepoName] = useState("");
  const [userName, setUserName] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState([]);
  const [filterInput, setFilterInput] = useState([]);

  function handleSubmit() {
    setIsPending(true);
    fetch(
      `https://api.github.com/repos/${userName}/${repoName}/issues?page=1&per_page=100`
    )
      .then((res) => res.json())
      .then((fetchedData) => {
        console.log(fetchedData);
        setData(fetchedData);
        setFilterInput(fetchedData);
        setIsPending(false);
      });
  }

  function handleUserName(e) {
    setUserName(e.target.value);
  }

  function handleRepoName(e) {
    setRepoName(e.target.value);
  }

  function handleAssigneeFilter(e) {
    const filteredData =
      e.target.value === ""
        ? [...data]
        : data.filter((el) => el.assignee?.login.indexOf(e.target.value) > -1);
    setFilterInput(filteredData);
  }
  return (
    <div className="Home">
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
              onChange={handleAssigneeFilter}
            />
            <Button onClick={null} variant="outlined">
              SortByDate
            </Button>
          </div>
        </div>
        <GitDataTable
          isPending={isPending}
          rows={filterInput}
          user={userName}
          repo={repoName}
        />
      </Container>
    </div>
  );
}

export default Home;
