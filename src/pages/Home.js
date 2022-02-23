import React, { useState, useMemo } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import GitDataTable from "../components/data-table/git-data-table";

function Home() {
  const [repoName, setRepoName] = useState("");
  const [userName, setUserName] = useState("");

  const [isPending, setIsPending] = useState(false);

  const [assigneeInput, setAssigneeInput] = useState("");
  const [labelInput, setLabelInput] = useState("");
  const [data, setData] = useState([]);

  const [sorted, setSorted] = useState(false);

  async function handleSubmit() {
    try {
      setIsPending(true);
      const issues = await fetch(
        `https://api.github.com/repos/${userName}/${repoName}/issues?page=1&per_page=100`
      );
      const preparedData = await issues.json();
      setData(preparedData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsPending(false);
    }
  }
  const filteredArray = useMemo(() => {
    const filterByLabel = data.filter((el) =>
      el.labels.some((item) => item.name.includes(labelInput))
    );
    if (!assigneeInput) {
      return filterByLabel;
    }
    return filterByLabel.filter((el) =>
      el.assignee?.login.includes(assigneeInput)
    );
  }, [labelInput, data, assigneeInput]);

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
      ? filteredArray.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        ) && setSorted(true)
      : filteredArray.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        ) && setSorted(false);

    return filteredArray;
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
              size="small"
            />
            <TextField
              id="outlined-basic"
              label="Repo name"
              variant="outlined"
              onChange={handleRepoName}
              size="small"
            />
            <Button onClick={handleSubmit} variant="outlined" size="large">
              Search
            </Button>
          </form>
          <div className="table-filtering">
            <TextField
              id="outlined-basic"
              label="filter by label"
              variant="outlined"
              onChange={handleLabel}
              size="small"
            />
            <TextField
              id="outlined-basic"
              label="filter by assignee"
              variant="outlined"
              onChange={handleAssignee}
              size="small"
            />
            <Button onClick={handleDateSort} variant="outlined" size="large">
              SortByDate
            </Button>
          </div>
        </div>
        <GitDataTable
          isPending={isPending}
          rows={filteredArray}
          user={userName}
          repo={repoName}
        />
      </Container>
    </div>
  );
}

export default Home;
