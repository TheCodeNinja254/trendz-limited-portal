import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Button, Container, Grid, Hidden, Tab, Tabs } from "@material-ui/core";
import { NavHashLink } from "react-router-hash-link";

const useStyles = makeStyles((theme) => ({
  root: {},
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginLeft: theme.spacing(6),
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  lowerMenu: {
    paddingLeft: theme.spacing(4),
    flexGrow: 1,
  },
  lowerMenuItem: {
    marginRight: theme.spacing(6),
    fontSize: 15,
    fontWeight: 700,
  },
  lowerMenuItemActive: {
    marginRight: theme.spacing(6),
    fontSize: 15,
    fontWeight: 700,
    color: theme.palette.primary.main,
    textDecoration: "underline",
  },
  denseTopBar: {
    height: "40px",
  },
  search: {
    position: "relative",
    borderRadius: 100,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    marginRight: theme.spacing(36),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  Tab: {
    fontWeight: 700,
    textTransform: "none",
    color: theme.palette.black,
    "&:hover": {
      backgroundColor: theme.palette.white.main,
    },
  },
  TabButton: {
    fontWeight: 700,
    textTransform: "none",
    color: theme.palette.black,
    "&:hover": {
      backgroundColor: theme.palette.white.main,
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  logo: {
    height: 27,
    display: "flex",
    marginTop: theme.spacing(1),
  },
  mobileLogo: {
    height: 25,
    display: "flex",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  secondAppBar: {
    height: 60,
  },
  mobileSecondAppBar: {
    marginTop: theme.spacing(5),
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  TabItems: {
    overflowX: "auto",
    marginBottom: theme.spacing(0),
  },
  menuItems: {
    display: "flex",
    justifyContent: "right",
  },
}));

const siteLinks = [
  {
    label: "Create Account",
    url: "/home#auth",
  },
  {
    label: "Send Money",
    url: "/home#transactions",
  },
  {
    label: "About Quikk",
    url: "/home#about",
  },
];

const Menubar = () => {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container className={classes.root}>
      <Hidden mdDown>
        <AppBar
          color="inherit"
          elevation={1}
          position="fixed"
          className={classes.secondAppBar}
        >
          <Toolbar>
            <Container>
              <Grid container spacing={5}>
                <Grid item>
                  <img
                    alt="Logo"
                    className={classes.logo}
                    src="/favicons/Logo.png"
                  />
                </Grid>
                <Grid item>
                  <Tabs
                    value={value}
                    className={classes.menuItems}
                    onChange={handleChange}
                    aria-label="icon label tabs example"
                    TabIndicatorProps={{
                      style: {
                        height: "3px",
                        backgroundColor: "#000025",
                      },
                    }}
                  >
                    {siteLinks.map((siteLink) => (
                      <Tab
                        key={siteLink.label}
                        className={classes.Tab}
                        label={
                          <NavHashLink
                            to={siteLink.url}
                            key={siteLink.label}
                            smooth
                          >
                            <Tab
                              key={siteLink.label}
                              className={classes.TabButton}
                              label={siteLink.label}
                              disableRipple
                              disableFocusRipple
                            />
                          </NavHashLink>
                        }
                      />
                    ))}
                  </Tabs>
                </Grid>
              </Grid>
            </Container>
          </Toolbar>
        </AppBar>
      </Hidden>
      <Hidden lgUp>
        <AppBar color="inherit" elevation={1} position="fixed">
          <Toolbar>
            <Grid container direction="row" justify="center">
              <Grid item>
                <img
                  alt="Logo"
                  className={classes.mobileLogo}
                  src="/favicons/Logo.png"
                />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <AppBar
          color="inherit"
          elevation={1}
          position="fixed"
          className={classes.mobileSecondAppBar}
        >
          <Toolbar>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="icon label tabs example-2"
              className={classes.TabItems}
              variant="scrollable"
              scrollButtons="on"
              TabIndicatorProps={{
                style: {
                  height: "3px",
                  backgroundColor: "#000025",
                },
              }}
            >
              {siteLinks.map((siteLink) => (
                <Tab
                  key={siteLink.label}
                  className={classes.Tab}
                  label={
                    <NavHashLink
                      to={siteLink.url}
                      key={siteLink.label}
                      className={classes.Tab}
                      smooth
                    >
                      <Button className={classes.Tab}>{siteLink.label}</Button>
                    </NavHashLink>
                  }
                />
              ))}
            </Tabs>
          </Toolbar>
        </AppBar>
      </Hidden>
      )
    </Container>
  );
};

export default React.memo(Menubar);
