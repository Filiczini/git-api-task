import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import GitDataTable from "../components/data-table/git-data-table";

function Home() {
  const [repoName, setRepoName] = useState("");
  const [userName, setUserName] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState([]);
  const [assigneeInput, setAssigneeInput] = useState("");
  const [labelInput, setLabelInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sorted, setSorted] = useState(false);

  useEffect(() => {
    console.log("click");
    let filteredArray = !labelInput
      ? [...data]
      : data.filter((el) =>
          el.labels.some((item) => item.name.indexOf(labelInput) > -1)
        );
    let second = !assigneeInput
      ? filteredArray
      : filteredArray.filter(
          (el) => el.assignee?.login.indexOf(assigneeInput) > -1
        );

    setFilteredData(second);
  }, [labelInput, assigneeInput, data]);

  function handleSubmit() {
    setIsPending(true);
    fetch(
      `https://api.github.com/repos/${userName}/${repoName}/issues?page=1&per_page=10`
    )
      .then((res) => res.json())
      .then((fetchedData) => {
        console.log(fetchedData);
        setData(fetchedData);
        setFilteredData(fetchedData);
        setIsPending(false);
      });
  }

  function handleUserName(e) {
    setUserName(e.target.value);
  }

  function handleRepoName(e) {
    setRepoName(e.target.value);
  }

  function handleAssignee(e) {
    setAssigneeInput(e.target.value);
  }
  function handleLabel(e) {
    setLabelInput(e.target.value);
  }

  function handleDateSort() {
    !sorted
      ? filteredData.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        ) && setSorted(true)
      : filteredData.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        ) && setSorted(false);

    setFilteredData(filteredData);
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
              onChange={handleLabel}
            />
            <TextField
              id="outlined-basic"
              label="filter by assignee"
              variant="outlined"
              onChange={handleAssignee}
            />
            <Button onClick={handleDateSort} variant="outlined">
              SortByDate
            </Button>
          </div>
        </div>
        <GitDataTable
          isPending={isPending}
          rows={filteredData}
          user={userName}
          repo={repoName}
        />
      </Container>
    </div>
  );
}

export default Home;
