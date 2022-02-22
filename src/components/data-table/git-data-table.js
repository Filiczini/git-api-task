import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function GitDataTable(props) {
  const dataRows = props.rows.map((row) => (
    <TableRow key={row.title}>
      <TableCell component="th" scope="row">
        {row.title}
      </TableCell>
      <TableCell align="right">{row.labels.map((el) => el.name)}</TableCell>
      <TableCell align="right">
        {row.assignee !== null ? row.assignee.login : "no assignees"}
      </TableCell>
      <TableCell align="right">{row.comments}</TableCell>
    </TableRow>
  ));
  return (
    <TableContainer component={Paper}>
      <Table aria-label="git table">
        <TableHead>
          <TableRow>
            <TableCell>Issues</TableCell>
            <TableCell align="right">Labels</TableCell>
            <TableCell align="right">Assignee</TableCell>
            <TableCell align="right">Comments</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.length > 0 && dataRows}
          {!props.isPending ? (
            <TableRow>
              <TableCell>Please enter Username and Repository</TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell>Loading...</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
