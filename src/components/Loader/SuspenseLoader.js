import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  progress: {
    margin: theme.spacing(20),
    height: 5,
    color: theme.palette.primary.main,
  },
}));

export default function SuspenseLoader() {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <CircularProgress className={classes.progress} />
    </div>
  );
}
