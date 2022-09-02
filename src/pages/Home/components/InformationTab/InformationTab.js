import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, CardContent, Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import upsellImage from "../../../../assets/images/Graphics/upsellImage.jpg";

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
    width: 500,
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
}));

const InformationTab = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card elevation={0} className={classes.infoCard}>
        <CardContent>
          <Card elevation={0} className={classes.upsellCard}>
            <CardContent>
              <Grid container>
                <Grid item lg={6} md={6} xl={6} xs={12} sm={12}>
                  <img
                    src={upsellImage}
                    alt="info icon"
                    className={classes.cardImage}
                  />
                </Grid>
                <Grid item lg={6} md={6} xl={6} xs={12} sm={12}>
                  <div className={classes.cardWithImageText}>
                    <Typography className={classes.inCardHeading}>
                      This is to the easy life. <br />
                      Easy, fast, secure and relevant to you.
                    </Typography>
                  </div>
                  <Button size="small" className={classes.buttonAction}>
                    Find out more <NavigateNextIcon />
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default React.memo(InformationTab);
