import React from 'react';
import { SnackbarContent, WithStyles, IconButton, withStyles } from "@material-ui/core";
import {
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Close as CloseIcon,
} from "@material-ui/icons";
import classNames from 'classnames';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const variantDefaultMessage = {
  succes: 'Succes',
  warning: 'Warning!',
  error: 'Something went wrong!',
  info: 'Info!'
}

const styles = theme => ({
  common: {
    margin: theme.spacing.unit,
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

type IProps = {
  classes: any,
  className?: string,
  message?: any,
  hide?: boolean,
  onClose?: any,
  variant: 'success' | 'warning' | 'error' | 'info',
};

function Message(props: WithStyles & IProps) {
  const { classes, className, message, onClose, variant, hide, ...other } = props;
  const Icon = variantIcon[variant];
  const messageContent = message || variantDefaultMessage[variant];

  if (hide) return null;

  return (
    <SnackbarContent
      className={classNames(classes[variant], className, classes.common)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {messageContent}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

export default withStyles(styles)(Message);
