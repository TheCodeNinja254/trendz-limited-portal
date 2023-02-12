import React from "react";
import { Box, Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Page from "../../components/Page";
import Features from "./components/Features";
import InformationTab from "./components/InformationTab/InformationTab";
import IntroductionScreen from "./components/IntroductionScreen/IntroductionScreen";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(3),
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Page title="Home" className={classes.root}>
      <IntroductionScreen />
      <Box justifyContent="center">
        <Container>
          <Grid container spacing={3}>
            <Grid item lg={12} xl={12} sm={12} xs={12} id="about">
              <Features />
            </Grid>
            <Grid item lg={12} xl={12} sm={12} xs={12} id="about">
              <Features />
            </Grid>
          </Grid>
          <InformationTab />
        </Container>
      </Box>
    </Page>
  );
};

export default Home;
