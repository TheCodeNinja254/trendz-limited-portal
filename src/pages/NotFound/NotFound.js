import React from "react";
import {
  Container,
  Box,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Page from "../../components/Page";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    height: "100%",
  },
  cardHeader: {
    "& span": {
      fontSize: 20,
    },
  },
}));
const NotFound = () => {
  const classes = useStyles();
  return (
    <Page title="404 - Not Found" className={classes.root}>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={4} xl={4} />
            <Grid item lg={4} xl={4} sm={12} xs={12}>
              <Card>
                <CardHeader title="404" className={classes.cardHeader} />
                <CardContent>
                  <Typography variant="body1">
                    We are sorry, this page doesn&#39;t exist
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item lg={4} xl={4} />
          </Grid>
        </Container>
      </Box>
    </Page>
  );
};

export default NotFound;
