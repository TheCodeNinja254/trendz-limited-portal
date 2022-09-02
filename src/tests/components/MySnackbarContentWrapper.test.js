import React from "react";
import renderer from "react-test-renderer";
import { ThemeProvider } from "@material-ui/core/styles";
import DefaultTheme from "../../theme";
import MySnackbarContentWrapper from "../../components/MySnackbarContentWrapper";

describe("<MySnackbarContentWrapper />", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={DefaultTheme}>
          <MySnackbarContentWrapper
            variant="danger"
            variantText="dangerText"
            message="Sorry an error occurred"
          />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
