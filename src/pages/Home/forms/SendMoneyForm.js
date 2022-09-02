import "date-fns";
import React from "react";
import TextField from "@material-ui/core/TextField";
import { Form as FormikForm, Formik } from "formik";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import isEmpty from "lodash.isempty";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation } from "@apollo/client";
import * as Yup from "yup";
import { SEND_MONEY } from "../../../api/Mutations/Transactions";
import trimNonNumbers from "../../../utils/trimNonNumbers";
import ErrorHandler from "../../../utils/errorHandler";
import Dialog from "../../../components/Dialog";
import StatusIcon from "../../../components/StatusIcon";

const CreateAccountSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .min(9, "Invalid mobile number provided")
    .max(12, "Invalid mobile number provided")
    .nullable(),
  amount: Yup.number().required("How much do you wish to send?"),
  sendBy: Yup.string().required("This field is required"),
  emailAddress: Yup.string()
    .email("The email address provided is invalid")
    .nullable(),
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

const sendByOptions = [
  {
    id: "phoneNumber",
    name: "Phone Number",
  },
  {
    id: "emailAddress",
    name: "Email Address",
  },
];

const SendMoneyForm = () => {
  const classes = useStyles();

  const buttonDisabledStatus = (errors, values, loading) => {
    let buttonStatus = true;
    if (isEmpty(errors) && values.amount !== "" && loading === false) {
      buttonStatus = false;
    }
    return buttonStatus;
  };

  const [sendMoneyDetails, setSendMoneyDetails] = React.useState({
    open: false,
    status: false,
    message: "",
  });

  const [SendMoneyMutation, { loading }] = useMutation(SEND_MONEY);

  const { open, status, message } = sendMoneyDetails;
  const closeDialog = () => {
    setSendMoneyDetails({ open: false, status: false, message: "" });
  };

  return (
    <div>
      <Typography className={classes.formSubtitle} gutterBottom>
        Use the below form to send money to your circle
      </Typography>
      <Formik
        initialValues={{
          emailAddress: "",
          phoneNumber: "",
          sendBy: "phoneNumber",
          amount: 0,
        }}
        validationSchema={CreateAccountSchema}
        onSubmit={(values) => {
          SendMoneyMutation({
            variables: {
              input: {
                recipientId: values.phoneNumber || values.emailAddress,
                recipientIdType: values.sendBy,
                amount: Number(values.amount),
              },
            },
          })
            .then((response) => {
              const {
                data: {
                  sendMoney: {
                    status: sendMoneyStatus,
                    message: customerMessage,
                  },
                },
              } = response;
              if (sendMoneyStatus) {
                setSendMoneyDetails({
                  open: true,
                  status: sendMoneyStatus,
                  message: customerMessage,
                });
              } else {
                setSendMoneyDetails({
                  open: true,
                  status: sendMoneyStatus,
                  message: customerMessage,
                });
              }
            })
            .catch((res) => {
              setSendMoneyDetails({
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
                      status
                        ? "Money Sent!"
                        : "Sending failed. Please try again later!"
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
                  Close
                </Button>
              }
              handleClose={closeDialog}
            />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Send by Email/Phone No.
                </Typography>
                <FormControl variant="standard" fullWidth>
                  <Select
                    labelId="demo-simple-select-standard-label-products"
                    id="demo-simple-select-standard-products"
                    fullWidth
                    error={!!errors.sendBy}
                    helperText={errors.sendBy || null}
                    onChange={(e) => {
                      setFieldValue("sendBy", e.target.value, true);
                    }}
                    value={values.sendBy}
                  >
                    {sendByOptions.map((option) => (
                      <MenuItem value={option.id} key={option.id}>
                        <Typography>{option.name}</Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {values.sendBy === "phoneNumber" && (
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
              )}

              {values.sendBy === "emailAddress" && (
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
              )}

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Amount to send
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  placeholder="E.g 10000"
                  margin="normal"
                  name="amount"
                  error={!!errors.amount}
                  helperText={errors.amount || null}
                  onChange={(e) => {
                    setFieldValue("amount", e.target.value, true);
                  }}
                  value={values.amount}
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
              {loading ? "Please wait..." : "Send Now!"}
            </Button>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default React.memo(SendMoneyForm);
