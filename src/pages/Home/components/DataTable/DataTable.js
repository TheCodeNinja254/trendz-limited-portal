import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import PropTypes from "prop-types";

const DataTable = ({ transactions }) => {
  return (
    <>
      <Typography variant="body2" gutterBottom>
        Use the below form to send money to your circle
      </Typography>
      <Paper variant="outlined">
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">TID</TableCell>
                <TableCell align="center">Recipient Email</TableCell>
                <TableCell align="center">Recipient Phone</TableCell>
                <TableCell align="center">Amount</TableCell>
                <TableCell align="center">Timestamp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((row) => (
                <TableRow
                  key={row.transactionId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {row.transactionId}
                  </TableCell>
                  <TableCell align="center">{row.recipientEmail}</TableCell>
                  <TableCell align="center">
                    {row.recipientPhoneNumber}
                  </TableCell>
                  <TableCell align="center">{row.amount}</TableCell>
                  <TableCell align="center">
                    {moment(row.timestamp).format("ddd-MM-yyyy hh:mm:ss")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

DataTable.propTypes = {
  transactions: PropTypes.array.isRequired,
};
export default DataTable;
