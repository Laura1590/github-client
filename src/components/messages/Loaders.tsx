import React from "react";
import { LinearProgress, withStyles, WithStyles, Fade, Theme } from "@material-ui/core";
import classnames from "classnames";
import { ApolloError } from "apollo-client";
import Message from "./Message";

const duration = '500ms';
const delayOut = '200ms';
const delayIn = '800ms';

const styles = (theme: Theme) => ({
  root: {
    position: 'relative' as 'relative',
    paddingTop: theme.spacing.unit,
  },
  loadingBar: {
    position: 'absolute' as 'absolute',
    marginTop: -theme.spacing.unit,
    width: '100%',
  },
  content: {
    position: 'relative' as 'relative',
    '&:before': {
      width: '100%',
      height: '100%',
      borderRadius: 4,
      background: "rgba(0,0,0, 0.1)",
      position: 'absolute' as 'absolute',
      content: '""',
      transition: `all ${duration} ${delayOut} ease-in`,
      zIndex: -1,
      opacity: 0,
    }
  },
  contentDisabled: {
    '&:before': {
      transition: `all ${duration} ${delayIn} ease-out`,
      zIndex: 1,
      opacity: 1,
    },
  },
  contentHide: {
    display: 'none',
  },
});

interface WithLoadingProps {
  loading: boolean;
  error?: ApolloError;
  hideContent?: boolean;
}

const Root = withStyles(styles)((props: WithStyles & React.Props<any>) => (
  <div className={props.classes.root}>
    {props.children}
  </div>
));

const LoadingBar = withStyles(styles)((props: WithStyles & WithLoadingProps) => (
  <div className={props.classes.loadingBar}>
    <Fade
      in={props.loading}
      style={{
        transitionDelay: delayIn,
      }}
    >
      <LinearProgress color="secondary" variant="query" />
    </Fade>
  </div>
));

type ContentProps = {
  hide: boolean;
}

const Content = withStyles(styles)((props: ContentProps & WithStyles & WithLoadingProps & React.Props<any>) => (
  props.hide ? <noscript /> :
    <div className={classnames(props.classes.content, { [props.classes.contentDisabled]: props.loading })} >
      {props.children}
    </div>
));

export class ContentLoad extends React.Component<WithLoadingProps> {
  render() {
    const { loading, error, hideContent = false, children } = this.props;
    const message = error && error.message;
    if (error) { console.error(error) }
    return (
      <Root>
        <Message hide={!error} variant="error" message={message} />
        <LoadingBar loading={loading} />
        <Content loading={loading} hide={hideContent}>
          {children}
        </Content>
      </Root>
    );
  }
};