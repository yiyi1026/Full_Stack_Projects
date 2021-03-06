import { connect } from 'react-redux';
import CommentForm from './comment_form';
import {createComment } from '../../actions/comment_actions';

const  mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser
  };
}

const mapDispatchToProps = dispatch => ({
  createComment: (answer) => dispatch(createComment(answer)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentForm);
