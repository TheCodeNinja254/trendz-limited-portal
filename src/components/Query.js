import React from "react";
import { useQuery, NetworkStatus } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Loader from "./Loader";
import ErrorHandler from "../utils/errorHandler";
import Alert from "./Alert";

const printErrorMessage = (error) => {
  let message =
    error.message ||
    "Looks like we are experiencing a technical difficulty. Our team is working to resolve the issue. Please try again later.";
  if (error.message === "Network error: Failed to fetch") {
    message =
      "Sorry! We encountered a network error. Please refresh this page.";
  }
  return ErrorHandler(message);
};

const useStyles = makeStyles((theme) => ({
  root: {},
  alerts: {
    marginTop: theme.spacing(1),
    overflowWrap: "inherit",
  },
}));

const Query = ({
  children,
  getTranslations,
  fetchMore,
  loader,
  query,
  hideError = false,
  ...restProps
}) => {
  const {
    loading,
    error,
    data,
    networkStatus,
    fetchMore: apolloFetchMore,
    refetch,
  } = useQuery(query, { ...restProps });
  const classes = useStyles();

  if (error && hideError === false) {
    let message = printErrorMessage(error);
    if (printErrorMessage(error).match(/Network error.*/)) {
      message =
        "Looks like we are experiencing a technical difficulty. Our team is working to resolve the issue. Please try again later.";
    }
    return (
      <>
        <Alert severity="warning" className={classes.alerts}>
          <div>
            <Typography variant="body2">{ErrorHandler(message)}</Typography>
          </div>
        </Alert>
      </>
    );
  }

  if (
    networkStatus === NetworkStatus.loading ||
    (networkStatus !== NetworkStatus.fetchMore && loading)
  ) {
    return loader || <Loader />;
  }

  const props = {
    ...data,
    networkStatus,
    fetchMore: fetchMore ? () => fetchMore(data, apolloFetchMore) : undefined,
    refetch,
  };

  return children(props);
};

export default Query;
