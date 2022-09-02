import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import PropTypes from "prop-types";
import { SendMoneyForm } from "../../forms";
import DataTable from "../DataTable";
import GetTransactionsQuery from "../../../../api/Queries/Transactions/GetTransactions";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  infoCard: {
    backgroundColor: theme.palette.background.dark,
  },
  upsellCard: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    borderRadius: 20,
  },
  cardHeader: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: theme.palette.grey[700],
    fontWeight: 700,
  },
  cardSubHeader: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: theme.palette.grey[700],
    fontWeight: 700,
  },
  formSection: {
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0),
    },
  },
  accountSection: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const TransactionsSection = ({ authInfo, setAuthInfo }) => {
  const classes = useStyles();

  const { accountInfo } = authInfo;

  const handleLogout = () => {
    setAuthInfo({
      signedIn: false,
      accountInfo: {
        firstName: "",
        lastName: "",
        accountBalance: "",
        phoneNumber: "",
        emailAddress: "",
      },
    });
  };

  return (
    <div className={classes.root}>
      <Card elevation={0} className={classes.infoCard}>
        <CardContent>
          <Card elevation={0} className={classes.upsellCard}>
            <CardContent>
              <Grid container>
                <Grid item lg={6} md={6} xl={6} xs={12} sm={12}>
                  <Typography variant="h3" className={classes.cardHeader}>
                    My Account
                  </Typography>
                  <Chip
                    label={
                      <Typography variant="h4">
                        Account Balance:{" "}
                        <strong>Ksh. {accountInfo.accountBalance}</strong>
                      </Typography>
                    }
                    className={classes.cardHeader}
                  />
                  <Divider />
                  <Grid
                    container
                    spacing={3}
                    className={classes.accountSection}
                  >
                    <Grid item xs={6} lx={6}>
                      <Typography variant="body2">First Name</Typography>
                      <Typography variant="body2">Last Name</Typography>
                      <Typography variant="body2">Mobile No.</Typography>
                      <Typography variant="body2">Email Address</Typography>
                    </Grid>
                    <Grid item xs={6} lx={6}>
                      <Typography variant="body2">
                        <strong>{accountInfo.firstName}</strong>
                      </Typography>
                      <Typography variant="body2">
                        <strong>{accountInfo.lastName}</strong>
                      </Typography>
                      <Typography variant="body2">
                        <strong>{accountInfo.phoneNumber}</strong>
                      </Typography>
                      <Typography variant="body2">
                        <strong>{accountInfo.emailAddress}</strong>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </Button>
                </Grid>
                <Grid item lg={6} md={6} xl={6} xs={12} sm={12}>
                  <Typography variant="h3" className={classes.cardHeader}>
                    Send Money Now
                  </Typography>
                  <Box className={classes.formSection}>
                    <SendMoneyForm />
                  </Box>
                </Grid>
                <Grid item lg={12} md={12} xl={12} xs={12} sm={12}>
                  <Typography variant="h3" className={classes.cardSubHeader}>
                    My Transactions
                  </Typography>
                  <GetTransactionsQuery>
                    {({
                      getTransactions: { transactions, getTransactionsStatus },
                    }) =>
                      getTransactionsStatus && transactions.length > 0 ? (
                        <DataTable transactions={transactions} />
                      ) : (
                        <Alert severity="warning">
                          <AlertTitle>
                            <strong>Something went wrong</strong>
                          </AlertTitle>
                          No Transactions to show
                        </Alert>
                      )
                    }
                  </GetTransactionsQuery>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

TransactionsSection.propTypes = {
  authInfo: PropTypes.object.isRequired,
  setAuthInfo: PropTypes.func.isRequired,
};

export default React.memo(TransactionsSection);
