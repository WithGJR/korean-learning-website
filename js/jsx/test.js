var Question = React.createClass({displayName: "Question",
  getInitialState: function() {
    return {rightOrNot: null, msg: ""};
  },
  handleAnswer: function(event) {
    if(event.target.value == this.props.content.rightAnswer){
      this.setState({rightOrNot: true, msg: "label success"});
    }else{
      this.setState({rightOrNot: false, msg: "label alert"});
    }
  },
  render: function() {
    var answerSituationMsg = "";
    if (this.state.rightOrNot != null) {
      answerSituationMsg = this.state.rightOrNot ? "你答對了" : "你答錯了";
    }

    var options = [];
    this.props.content.options.forEach(function(option) {
      options.push(
        React.createElement("div", null, 
          React.createElement("input", {type: "radio", name: "option", value: option}, option), React.createElement("br", null)
        )
      );
    });

    return (
      React.createElement("div", null, 
        React.createElement("h1", {className: "title"}, this.props.content.title), 
        React.createElement("form", {onChange: this.handleAnswer}, 
          options
        ), 

        React.createElement("h3", null, React.createElement("span", {className: this.state.msg}, answerSituationMsg))
      )
    );
  }
});

var Questions = React.createClass({displayName: "Questions",
  render: function() {
    var questions = this.props.questions.map(function(question) {
      return (
        React.createElement(Question, {content: question})
      );
    });

    return (
      React.createElement("div", {className: "section"}, 
        questions
      )
    );
  }
});

React.render(React.createElement(Questions, {questions: questions}), document.getElementById("question"));