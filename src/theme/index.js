import { createMuiTheme } from "@material-ui/core";
import shadows from "./shadows";
import typography from "./typography";
import palette from "./palette";
import overrides from "./overrides";

const theme = createMuiTheme({
  palette,
  shadows,
  typography,
  overrides,
});

export default theme;
