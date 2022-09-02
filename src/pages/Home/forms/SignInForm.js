import "date-fns";
import React from "react";
import TextField from "@material-ui/core/TextField";
import { Form as FormikForm, Formik } from "formik";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import isEmpty from "lodash.isempty";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation } from "@apollo/client";
import * as Yup from "yup";
import PropTypes from "prop-types";
import ErrorHandler from "../../../utils/errorHandler";
import Dialog from "../../../components/Dialog";
import StatusIcon from "../../../components/StatusIcon";
import { SIGN_IN } from "../../../api/Mutations/Authentication";

const SignInSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  username: Yup.string().required("Create an easy to remember username"),
});

const useStyles = makeStyles((theme) => ({
  textFieldWithLable: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.white.main,
  },
  submitButton: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(3),
    height: "30px",
    width: 150,
  },
  formSubtitle: {
    fontSize: 13,
    fontWeight: 500,
  },
  dialogContent: {
    textAlign: "center",
  },
}));

const SignInForm = ({ setAuthInfo }) => {
  const classes = useStyles();

  const buttonDisabledStatus = (errors, values, loading) => {
    let buttonStatus = true;
    if (
      isEmpty(errors) &&
      values.username !== null &&
      values.password !== null &&
      loading === false
    ) {
      buttonStatus = false;
    }
    return buttonStatus;
  };

  const [signInDetails, setSignInDetails] = React.useState({
    open: false,
    status: false,
    message: "",
  });

  const [SignInMutation, { loading }] = useMutation(SIGN_IN);

  const { open, status, message } = signInDetails;
  const closeDialog = () => {
    setSignInDetails({ open: false, status: false, message: "" });
  };

  return (
    <div>
      <Typography className={classes.formSubtitle} gutterBottom>
        Login to your account.
      </Typography>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={SignInSchema}
        onSubmit={(values) => {
          SignInMutation({
            variables: {
              input: {
                username: values.username,
                password: values.password,
              },
            },
          })
            .then((response) => {
              const {
                data: {
                  signIn: {
                    status: signInStatus,
                    message: customerMessage,
                    firstName,
                    lastName,
                    phoneNumber,
                    emailAddress,
                    accountInfo: { accountBalance },
                  },
                },
              } = response;
              if (signInStatus) {
                setSignInDetails({
                  open: true,
                  status: signInStatus,
                  message: customerMessage,
                });
                setAuthInfo({
                  signedIn: true,
                  accountInfo: {
                    firstName,
                    lastName,
                    phoneNumber,
                    emailAddress,
                    accountBalance,
                  },
                });
              } else {
                setSignInDetails({
                  open: true,
                  status: signInStatus,
                  message: customerMessage,
                });
              }
            })
            .catch((res) => {
              setSignInDetails({
                open: true,
                status: false,
                message: ErrorHandler(
                  res.message || res.graphQLErrors[0].message
                ),
              });
            });
        }}
      >
        {({ errors, setFieldValue, values }) => (
          <FormikForm>
            <Dialog
              open={open}
              modalContent={
                <Box className={classes.dialogContent}>
                  <StatusIcon
                    status={status ? "success" : "error"}
                    text={status ? "Signed In Successfully" : "Sign In Failed"}
                  />
                  <Typography variant="body1"> {message}</Typography>
                </Box>
              }
              modalActions={
                <Button
                  variant="contained"
                  onClick={() => closeDialog()}
                  color="primary"
                  autoFocus
                >
                  {status ? "Proceed to transact" : "Retry"}
                </Button>
              }
              handleClose={closeDialog}
            />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Username
                </Typography>
                <TextField
                  fullWidth
                  placeholder="E.g john.doe"
                  margin="normal"
                  name="username"
                  error={!!errors.username}
                  helperText={errors.username || null}
                  onChange={(e) => {
                    setFieldValue("username", e.target.value, true);
                  }}
                  value={values.username}
                  variant="standard"
                  className={classes.textFieldWithLable}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Password
                </Typography>
                <TextField
                  fullWidth
                  type="password"
                  placeholder="E.g pasS$32!W0rD"
                  margin="normal"
                  name="password"
                  error={!!errors.password}
                  helperText={errors.password || null}
                  onChange={(e) => {
                    setFieldValue("password", e.target.value, true);
                  }}
                  value={values.password}
                  variant="standard"
                  className={classes.textFieldWithLable}
                />
              </Grid>
            </Grid>
            <Button
              color="primary"
              className={classes.submitButton}
              disabled={buttonDisabledStatus(errors, values, loading)}
              size="small"
              type="submit"
              variant="contained"
            >
              {loading ? "Please wait..." : "Sign In"}
            </Button>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

SignInForm.propTypes = {
  setAuthInfo: PropTypes.func.isRequired,
};

export default React.memo(SignInForm);
