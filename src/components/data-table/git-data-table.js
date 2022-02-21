import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, label, assignee, comments) {
  return { name, label, assignee, comments };
}

const rows = [
  createData(
    "[Profile] Implement functionality to remove users avatar (Front End part)",
    ["feature", "fontEnd part", "UI"],
    "SirSir",
    3
  ),
  createData(
    "(SP:2) Save user configs to DB after logging out (Front End part)",
    ["data base", "feature", "fontEnd part"],
    "Anastasia",
    5
  ),
  createData(
    "[Catalog] Make adaptive design for Catalog page",
    ["design", "fontEnd part", "responsive"],
    "filiczini",
    2
  ),
  createData(
    "(SP:3) Refactor payment with Fondy",
    ["Functional", "priority: high"],
    "Mark",
    7
  ),
  createData(
    "(SP:0.5) Investigate response from Fondy",
    ["fontEnd part", "Functional", "priority: high"],
    "Oleh",
    8
  ),
];

export default function GitDataTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Issues</TableCell>
            <TableCell align="right">Label</TableCell>
            <TableCell align="right">Assignee</TableCell>
            <TableCell align="right">Comments</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.label}</TableCell>
              <TableCell align="right">{row.assignee}</TableCell>
              <TableCell align="right">{row.comments}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
