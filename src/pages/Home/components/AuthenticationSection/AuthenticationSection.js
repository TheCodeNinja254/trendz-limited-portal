import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Card, CardContent, Grid, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import accountsImage from "../../../../assets/images/Graphics/accounts.jpg";
import Image from "../../../../components/Image";
import { CreateAccountForm, SignInForm } from "../../forms";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  inCardHeading: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(3),
    fontSize: 32,
    fontWeight: 700,
    letterSpacing: 0,
    textAlign: "left",
    color: theme.palette.primary.light,
  },
  buttonAction: {
    textTransform: "capitalize",
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  cardWithImageText: {
    marginLeft: theme.spacing(0),
  },
  infoCard: {
    backgroundColor: theme.palette.background.dark,
  },
  cardImage: {
    width: 300,
    borderRadius: 10,
    [theme.breakpoints.down("sm")]: {
      width: 280,
    },
  },
  upsellCard: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    borderRadius: 20,
  },
  cardHeader: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: theme.palette.grey[700],
    fontWeight: 700,
  },
  cardSubHeader: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: theme.palette.grey[700],
    fontWeight: 700,
  },
  formSection: {
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0),
    },
  },
}));

const AuthenticationSection = ({ setAuthInfo }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card elevation={0} className={classes.infoCard}>
        <CardContent>
          <Card elevation={0} className={classes.upsellCard}>
            <CardContent>
              <Grid container>
                <Grid item lg={4} md={4} xl={4} xs={12} sm={12}>
                  <Typography variant="h2" className={classes.cardHeader}>
                    Get to your account
                  </Typography>
                  <Image
                    src={accountsImage}
                    alt="info icon"
                    className={classes.cardImage}
                  />
                </Grid>
                <Grid item lg={4} md={4} xl={4} xs={12} sm={12}>
                  <Typography variant="h3" className={classes.cardSubHeader}>
                    Create your account
                  </Typography>
                  <Box className={classes.formSection}>
                    <CreateAccountForm setAuthInfo={setAuthInfo} />
                  </Box>
                </Grid>
                <Grid item lg={4} md={4} xl={4} xs={12} sm={12}>
                  <Typography variant="h3" className={classes.cardSubHeader}>
                    Sign in to your account
                  </Typography>
                  <Box className={classes.formSection}>
                    <SignInForm setAuthInfo={setAuthInfo} />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

AuthenticationSection.propTypes = {
  setAuthInfo: PropTypes.func.isRequired,
};

export default React.memo(AuthenticationSection);
