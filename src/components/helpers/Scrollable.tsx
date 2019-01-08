import React from "react";
import Scrollbars from "react-custom-scrollbars";
import { WithStyles, withStyles } from "@material-ui/core";
import classnames from "classnames";

const styles = {
  scroll: {
    scroll: "auto!important",
  },
  fillHeight: {
    height: "100%!important",
  },
}

type Props = {
  fillHeight?: boolean;
}

function Scrollable(props: WithStyles & React.Props<any> & Props) {
  const { classes, fillHeight } = props;
  const className = classnames(classes.scroll, { [classes.fillHeight]: fillHeight });
  return (
    <Scrollbars
      autoHeight
      autoHeightMin="100%"
      autoHeightMax="100%"
      className={className}
    >
      {props.children}
    </Scrollbars>
  )
}

export default withStyles(styles)(Scrollable);