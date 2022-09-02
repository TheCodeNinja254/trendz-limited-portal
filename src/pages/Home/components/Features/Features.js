import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { CheckCircle, Security, Speed } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.background.dark,
  },
  heading: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    fontSize: 28,
    fontWeight: "500",
    textAlign: "center",
    color: theme.palette.text.secondary,
    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
      marginTop: theme.spacing(1),
    },
  },
  subHeading: {
    marginTop: theme.spacing(2),
    fontSize: 37,
    fontWeight: "bold",
    letterSpacing: 0,
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: 25,
    },
  },
  contentWrapper: {
    marginTop: theme.spacing(6),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(3),
    },
  },
  infoIcons: {
    backgroundColor: theme.palette.primary.main,
    height: "65px",
    width: "65px",
    borderRadius: "52px",
  },
  requirementsIcons: {
    marginTop: theme.spacing(5),
  },
  infoIconImage: {
    height: 30,
  },
  infoCard: {
    backgroundColor: theme.palette.background.dark,
  },
  featureTitle: {
    textTransform: "uppercase",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontSize: 25,
    fontWeight: "bolder",
    color: theme.palette.primary.main,
    [theme.breakpoints.down("sm")]: {
      fontSize: 16,
    },
  },
  featureDescription: {
    fontSize: 14,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: theme.palette.black,
  },
  actionButtons: {
    marginTop: theme.spacing(2),
    fontSize: 15,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.white.main,
      borderColor: theme.palette.primary.main,
    },
  },
  featureIcon: {
    color: theme.palette.white.main,
  },
}));

const Features = () => {
  const classes = useStyles();

  return (
    <div className={classes.root} id="addons">
      <Card elevation={0} className={classes.infoCard}>
        <CardContent>
          <Container className={classes.contentWrapper}>
            <Typography variant="h2" className={classes.heading}>
              Get Powered by Quikk
            </Typography>
            <Grid container justify="center" spacing={5}>
              <Grid
                item
                lg={4}
                md={4}
                xl={4}
                xs={12}
                sm={12}
                className={classes.requirementsIcons}
              >
                <div align="center">
                  <Box
                    className={classes.infoIcons}
                    justifyContent="center"
                    alignItems="center"
                    display="flex"
                  >
                    <Security className={classes.featureIcon} />
                  </Box>
                  <Typography
                    variant="h3"
                    align="center"
                    className={classes.featureTitle}
                  >
                    Secure API
                  </Typography>
                  <Typography
                    variant="body2"
                    align="center"
                    className={classes.featureDescription}
                  >
                    Security is at the core of our Platform. Send and receive
                    money securely.
                  </Typography>
                  <div align="center">
                    <Button
                      small
                      variant="outlined"
                      className={classes.actionButtons}
                    >
                      Find out more <ArrowForwardIcon />
                    </Button>
                  </div>
                </div>
              </Grid>
              <Grid
                item
                lg={4}
                md={4}
                xl={4}
                xs={12}
                sm={12}
                className={classes.requirementsIcons}
              >
                <div align="center">
                  <Box
                    className={classes.infoIcons}
                    justifyContent="center"
                    alignItems="center"
                    display="flex"
                  >
                    <Speed className={classes.featureIcon} />
                  </Box>
                  <Typography
                    variant="h3"
                    align="center"
                    className={classes.featureTitle}
                  >
                    FAST
                  </Typography>
                  <Typography
                    variant="body2"
                    align="center"
                    className={classes.featureDescription}
                  >
                    Send money in a few quick clicks. We believe it should be
                    simple.
                  </Typography>
                  <div align="center">
                    <Button
                      small
                      variant="outlined"
                      className={classes.actionButtons}
                    >
                      Find out more <ArrowForwardIcon />
                    </Button>
                  </div>
                </div>
              </Grid>
              <Grid
                item
                lg={4}
                md={4}
                xl={4}
                xs={12}
                sm={12}
                className={classes.requirementsIcons}
              >
                <div align="center">
                  <Box
                    className={classes.infoIcons}
                    justifyContent="center"
                    alignItems="center"
                    display="flex"
                  >
                    <CheckCircle className={classes.featureIcon} />
                  </Box>
                  <Typography
                    variant="h3"
                    align="center"
                    className={classes.featureTitle}
                  >
                    Reliable
                  </Typography>
                  <Typography
                    variant="body2"
                    align="center"
                    className={classes.featureDescription}
                  >
                    Always on. Always here to help. Always at your finger tips.
                  </Typography>
                  <div align="center">
                    <Button
                      small
                      variant="outlined"
                      className={classes.actionButtons}
                    >
                      Find out more <ArrowForwardIcon />
                    </Button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Container>
        </CardContent>
      </Card>
    </div>
  );
};

export default React.memo(Features);
