import React from "react";
import PropTypes from "prop-types";
import { useReactiveVar } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import { loadingStatus } from "../../Apollo/ReactiveVariables";
import Menubar from "./MenuNavigation";
import Footer from "./Footer/Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.white,
  },
  wrapper: {
    marginTop: theme.spacing(5),
    flex: "1 1 auto",
    overflow: "hidden",
    backgroundColor: theme.palette.white.dark,
  },
  contentContainer: {
    flex: "1 1 auto",
  },
  content: {
    flex: "1 1 auto",
    backgroundColor: theme.palette.white,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: theme.palette.primary.main,
  },
}));
const MainLayout = ({ children }) => {
  const classes = useStyles();
  const loading = useReactiveVar(loadingStatus);
  return (
    <div className={classes.root}>
      <Backdrop open={loading} className={classes.backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Menubar />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

MainLayout.propType = {
  children: PropTypes.element.isRequired,
};

export default MainLayout;
