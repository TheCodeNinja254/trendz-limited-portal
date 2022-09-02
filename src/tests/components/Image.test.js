import React from "react";
import renderer from "react-test-renderer";
import Logo from "../../../public/favicons/saf-logo.png";
import Image from "../../components/Image";

describe("<Image />", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Image src={Logo} alt="Logo" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
