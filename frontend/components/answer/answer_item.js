import React from 'react';
import {Route} from 'react-router-dom';
import javascript_time_ago from 'javascript-time-ago';
import {requestSingleAnswer} from '../../actions/answer_actions';
import * as SESSIONUTIL from '../../util/session_api_util';


class AnswerItem extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      waiting: true
    };
  }
  componentDidMount() {
    this.props.requestAllAnswers(this.props.question_id).then(
      () => this.setState({waiting: false})
    );
  }
  render() {
    const {answers} = this.props;
    if (this.state.waiting|| (!answers)){
      return (<div></div>);
    }
    let all_answers_html = answers.map(
      (answer) => {
        let { body, id, question_id, created_at, author} = answer;

        // comment for debugging
        let avatar = SESSIONUTIL.getAvatarUrl(author);

        javascript_time_ago.locale(require('javascript-time-ago/locales/en'));
        require('javascript-time-ago/intl-messageformat-global');
        require('intl-messageformat/dist/locale-data/en');

        const time_ago_english = new javascript_time_ago('en-US');

        let create_date = new Date(created_at);
        let timeAgo = time_ago_english.format(create_date.getTime());

        return (
        <div key={`answers${answer.id}`} className="container top-boader top-margin-30">
          <div className="row all-margin-10">
              <div className="all-margin-10">
                <a href="#"><img className="img-circle pull-left" src={avatar} width="40" height="40"/></a>
              </div>
              <div className="left-margin-10 right-margin-10">
                <div className="">
                  <span>
                    <a className="user black" href="#">{author.username}</a>
                  </span>
                  <span >,
                  </span>
                  <span className="">{author.description}</span>
                </div>
                <div className="">
                  <span>
                    <a className="grey" href="#" target="">Answered {timeAgo}</a>
                  </span>
                </div>
              </div>
            </div>

          <span dangerouslySetInnerHTML={{
                __html: body
              }}></span>


          <div className="row top-margin-10 bottom-margin-10">
              <div className=" accordion-heading">
                <span className="left-margin-10">
                  <a className="Upvote" href="#">
                    <span>Upvote</span>
                    <span className="divider-vertical-15px"></span>
                    <span className=" ">95</span>
                  </a>
                </span>
                <span className="left-margin-10">
                  <a className="Downvote grey" href="#">
                    <span className=" ">Downvote</span>
                  </a>
                </span>
              </div>
            </div>
            <div className="row add-comment-form ">
              <div className=" left-padding-30">
                <a className="add-comment-form-item" href="#"><img className="img-circle pull-left" src={SESSIONUTIL.getAvatarUrl(currentUser)} width="25" height="25"/></a>
                <input className="left-margin-10 add-comment-form-item add-comment-input line-height-15" placeholder="Add a comment..."/>
                <button className="add-comment-form-item PerfectColdButton all-margin-10" >
                  <span>Submit</span>
                </button>
              </div>
            </div>
        </div>

      );
    });

  return(<div>{all_answers_html}</div>);

  }
}

// <AnswerForm createAnswer={this.props.createAnswer} />
export default AnswerItem;
