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
import trimNonNumbers from "../../../utils/trimNonNumbers";
import ErrorHandler from "../../../utils/errorHandler";
import Dialog from "../../../components/Dialog";
import StatusIcon from "../../../components/StatusIcon";
import { CREATE_ACCOUNT } from "../../../api/Mutations/Authentication";

const CreateAccountSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required.")
    .min(3, "Please enter a valid name"),
  lastName: Yup.string()
    .required("Last name is required.")
    .min(3, "Please enter a valid name"),
  password: Yup.string()
    .min(6, "The entered password number is too short")
    .max(32, "The entered password is too long")
    .required("Password is required"),
  phoneNumber: Yup.string()
    .min(9, "Invalid mobile number provided")
    .max(12, "Invalid mobile number provided")
    .required("Mobile number is required"),
  rechargeAmount: Yup.number().required("Load your account with some money*"),
  emailAddress: Yup.string()
    .required("Email address is required.")
    .email("The email address provided is invalid"),
  username: Yup.string()
    .required("Create an easy to remember username")
    .min(5, "The username is too short!")
    .max(32, "The username is too long!"),
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

const CreateAccountForm = ({ setAuthInfo }) => {
  const classes = useStyles();

  const buttonDisabledStatus = (errors, values, loading) => {
    let buttonStatus = true;
    if (
      isEmpty(errors) &&
      values.firstName !== "" &&
      values.lastName !== "" &&
      values.emailAddress !== "" &&
      values.phoneNumber !== "" &&
      values.rechargeAmount !== "" &&
      values.username !== null &&
      values.password !== null &&
      loading === false
    ) {
      buttonStatus = false;
    }
    return buttonStatus;
  };

  const [createAccountDetails, setCreateAccountDetails] = React.useState({
    open: false,
    status: false,
    message: "",
  });

  const [CreateAccountMutation, { loading }] = useMutation(CREATE_ACCOUNT);

  const { open, status, message } = createAccountDetails;
  const closeDialog = () => {
    setCreateAccountDetails({ open: false, status: false, message: "" });
  };

  return (
    <div>
      <Typography className={classes.formSubtitle} gutterBottom>
        Provide valid information in the below form to register your account
      </Typography>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          username: "",
          emailAddress: "",
          password: "",
          phoneNumber: "",
          rechargeAmount: 0,
        }}
        validationSchema={CreateAccountSchema}
        onSubmit={(values) => {
          CreateAccountMutation({
            variables: {
              input: {
                firstName: values.firstName,
                lastName: values.lastName,
                username: values.username,
                emailAddress: values.emailAddress,
                password: values.password,
                phoneNumber: values.phoneNumber,
                rechargeAmount: Number(values.rechargeAmount),
              },
            },
          })
            .then((response) => {
              const {
                data: {
                  createAccount: {
                    status: createAccountStatus,
                    message: customerMessage,
                    emailAddress,
                    firstName,
                    lastName,
                    phoneNumber,
                    accountBalance,
                  },
                },
              } = response;
              if (createAccountStatus) {
                setCreateAccountDetails({
                  open: true,
                  status: createAccountStatus,
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
                setCreateAccountDetails({
                  open: true,
                  status: createAccountStatus,
                  message: customerMessage,
                });
              }
            })
            .catch((res) => {
              setCreateAccountDetails({
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
                    text={
                      status ? "Account created." : "Account creation failed"
                    }
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
                  First Name
                </Typography>
                <TextField
                  fullWidth
                  placeholder="E.g John"
                  margin="normal"
                  name="firstName"
                  error={!!errors.firstName}
                  onChange={(e) => {
                    setFieldValue("firstName", e.target.value, true);
                  }}
                  value={values.firstName}
                  variant="standard"
                  className={classes.textFieldWithLable}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Typography variant="subtitle2" gutterBottom>
                  First Name
                </Typography>
                <TextField
                  fullWidth
                  placeholder="E.g Doe"
                  margin="normal"
                  name="lastName"
                  error={!!errors.lastName}
                  onChange={(e) => {
                    setFieldValue("lastName", e.target.value, true);
                  }}
                  value={values.lastName}
                  variant="standard"
                  className={classes.textFieldWithLable}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Phone Number
                </Typography>
                <TextField
                  fullWidth
                  placeholder="E.g 0700 000 001"
                  margin="normal"
                  name="phoneNumber"
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber || null}
                  onChange={(e) => {
                    const clean = trimNonNumbers(e.target.value);
                    setFieldValue("phoneNumber", clean, true);
                  }}
                  value={values.phoneNumber}
                  variant="standard"
                  className={classes.textFieldWithLable}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Email Address
                </Typography>
                <TextField
                  fullWidth
                  placeholder="E.g johndoe@gmail.com"
                  margin="normal"
                  name="emailAddress"
                  error={!!errors.emailAddress}
                  helperText={errors.emailAddress || null}
                  onChange={(e) => {
                    setFieldValue("emailAddress", e.target.value, true);
                  }}
                  value={values.emailAddress}
                  variant="standard"
                  className={classes.textFieldWithLable}
                />
              </Grid>
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
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Initial account recharge
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  placeholder="E.g 10000"
                  margin="normal"
                  name="rechargeAmount"
                  error={!!errors.rechargeAmount}
                  helperText={errors.rechargeAmount || null}
                  onChange={(e) => {
                    setFieldValue("rechargeAmount", e.target.value, true);
                  }}
                  value={values.rechargeAmount}
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
              {loading ? "Please wait..." : "Create Account"}
            </Button>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

CreateAccountForm.propTypes = {
  setAuthInfo: PropTypes.func.isRequired,
};

export default React.memo(CreateAccountForm);
