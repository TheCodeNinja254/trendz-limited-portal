import React from "react";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Container, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  footerLink: {
    color: theme.palette.primary.main,
    textDecorationLine: "underline",
  },
  feedbackText: {
    fontSize: 20,
    color: theme.palette.white.main,
  },
  media: {
    height: "86px",
  },
  footerContent: {
    paddingLeft: theme.spacing(36),
    paddingRight: theme.spacing(36),
  },
  feedbackImage: {
    height: 25,
  },
  copyRight: {
    backgroundColor: theme.palette.primary.dark,
    height: 90,
  },
  faqsLinkText: {
    color: theme.palette.white.main,
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card className={classes.copyRight}>
        <CardContent>
          <Container>
            <Grid container spacing={0}>
              <Grid item lg={12} md={12} xl={12} xs={12} sm={12}>
                <Typography
                  variant="subtitle2"
                  className={classes.feedbackText}
                >
                  © Quikk {moment().format("YYYY")} | All Rights Reserved
                </Typography>
                <Typography variant="caption">Version 0.9.0</Typography>
              </Grid>
            </Grid>
          </Container>
        </CardContent>
      </Card>
    </div>
  );
};

export default React.memo(Footer);
