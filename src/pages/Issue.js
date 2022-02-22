import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";

function Issue() {
  let params = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    console.log(params.user, params.repo);
    fetch(
      `https://api.github.com/repos/${params.user}/${params.repo}/issues/${params.number}`
    )
      .then((res) => res.json())
      .then((fetchedData) => {
        console.log(fetchedData);
        setData(fetchedData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="issue">
      <Container maxWidth="lg">
        {" "}
        {data && (
          <Paper elevation={24}>
            <h2>{data.title}</h2>
            <p>{data.body}</p>
            {data.labels && data.labels.map((label) => <p>{label.name}</p>)}
            {data.assignee && <p>{data.assignee.login}</p>}
            <p>Comments : {data.comments}</p>
            <p>Status: {data.state}</p>
          </Paper>
        )}
      </Container>
    </div>
  );
}

export default Issue;
