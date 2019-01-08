import React, { ComponentType } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core';
import { mutation } from '../../data/mutations/openIssues';
import { Mutation, WithApolloClient } from 'react-apollo';
import { withApolloClient } from '../helpers/WithApollo';
import { compose } from 'redux';

type IProps = {
  repositoryId: string;
  open: boolean;
  close: () => void;
}

const SubmitButton = (props) => (<button {...props} type='submit' />);

const NewIssueDialog = (props: IProps & WithApolloClient<any>) => {
  const input = {
    title: { value: '' },
    body: { value: '' },
  };

  return (
    <Mutation mutation={mutation}>
      {(addIssue) => (
        <Dialog
          open={props.open}
          onClose={props.close}
          aria-labelledby="form-dialog-title"
        >
          <form
            onSubmit={e => {
              e.preventDefault();
              addIssue({
                variables: {
                  title: input.title.value,
                  body: input.body.value,
                  repositoryId: props.repositoryId
                }
              }).then(props.client.resetStore)
              props.close();
            }}
          >
            <DialogTitle id="form-dialog-title">Create new issue</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                id="title"
                label="Title"
                variant="outlined"
                margin="normal"
                fullWidth
                inputRef={node => { input.title = node; }}
              />
              <TextField
                id="description"
                label="Description"
                variant="outlined"
                margin="normal"
                fullWidth
                multiline
                rows="5"
                inputRef={node => { input.body = node; }}
              />
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={props.close}>
                Cancel
              </Button>
              <Button color="primary" component={SubmitButton}>
                Create
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      )}
    </Mutation>
  )
}

export default compose<ComponentType<IProps>>(
  withApolloClient
)(NewIssueDialog);