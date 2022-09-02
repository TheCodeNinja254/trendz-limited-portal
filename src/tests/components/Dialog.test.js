import React from "react";
import ReactDOM from "react-dom";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { configure, mount } from "enzyme";
import { Formik } from "formik";
import { ThemeProvider } from "@material-ui/core/styles";
import DefaultTheme from "../../theme";
import Dialog from "../../components/Dialog";

configure({ adapter: new Adapter() });

describe("<Dialog />", () => {
  let openState = true;
  const handleClose = () => {
    openState = false;
    return null;
  };
  it("renders a dialog", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <ThemeProvider theme={DefaultTheme}>
        <Dialog
          open={openState}
          modalContent={<p>I love Dialogs</p>}
          handleClose={handleClose}
        />
      </ThemeProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders a form when form when form props is passed", () => {
    const wrapper = mount(
      <Formik>
        <Dialog
          open={openState}
          form
          modalContent={<p>I love Dialogs</p>}
          handleClose={handleClose}
        />
      </Formik>
    );
    // eslint-disable-next-line no-undef
    expect(wrapper.find("form").exists()).toBeTruthy();
  });
});
