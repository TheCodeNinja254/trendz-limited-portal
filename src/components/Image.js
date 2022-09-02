import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(() => ({
  root: {
    objectFit: "cover",
    maxWidth: "100%",
  },
}));

const Image = React.forwardRef(({ src, alt, className, ...rest }, ref) => {
  const classes = useStyles();
  return (
    <img
      src={src}
      alt={alt}
      className={clsx(className, classes.root)}
      ref={ref}
      {...rest}
    />
  );
});

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

export default React.memo(Image);
