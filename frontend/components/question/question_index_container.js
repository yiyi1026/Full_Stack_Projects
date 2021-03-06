import {connect} from 'react-redux';
import QuestionIndex from './question_index';
import {requestAllQuestions, createQuestion, updateQuestion, deleteQuestion} from '../../actions/question_actions';
import {selectAllQuestions, selectQuestionsByTopicId} from '../../reducers/selectors';
import { RingLoader } from 'react-spinners';

const mapStateToProps = (state, {match}) => {
  const topicId = match.params.topicId? match.params.topicId : null;
  let q = selectQuestionsByTopicId(state.questions, topicId);
  return {
    questions: q,
    allQuestionsIds: state.questions.allIds,
    currentQuestion: state.questions.currentQuestion,
    topics: state.topics,
    currentUser: state.session.currentUser,
    currentTopic: state.session.currentTopic,
    errors: []
}};

const mapDispatchToProps = dispatch => ({
  requestSingleTopic: (topicId) => dispatch(requestSingleTopic(topicId)),
  requestAllQuestions: () => dispatch(requestAllQuestions()),
  createQuestion: (question) => dispatch(createQuestion(question)),
  updateQuestion: (question) => dispatch(updateQuestion(question))
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionIndex);
