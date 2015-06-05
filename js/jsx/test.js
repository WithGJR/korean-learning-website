var finishedQuestion = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];

var answerCorrectness = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];

var finishedNumber = function() {
  var num = 0;
  finishedQuestion.forEach(function(element) {
    if (element == true) {
      num += 1;
    };
  });
  return num;
}

var finishedRate = function() {
  return (finishedNumber()/14.0)*100.0;
}

var answerSituation = function() {
  var total = [0, 0, 0];
  answerCorrectness.forEach(function(answer) {
    if (answer == true) {
      total[0] += 1;
    }else if (answer == false) {
      total[1] += 1;
    }else{
      total[2] += 1;
    };
  });
  return total;
}

var Question = React.createClass({displayName: "Question",
  getInitialState: function() {
    return {rightOrNot: null, msg: "", haveClicked: false};
  },
  handleAnswer: function(event) {
    if(event.target.value == this.props.content.rightAnswer){
      this.setState({rightOrNot: true, msg: "label success"});
      answerCorrectness[this.props.questionNumber] = true;
    }else{
      this.setState({rightOrNot: false, msg: "label alert"});
      answerCorrectness[this.props.questionNumber] = false;
    }
    finishedQuestion[this.props.questionNumber] = true;
    this.setState({haveClicked: true});
    this.props.update();
  },
  render: function() {
    var answerSituationMsg = "";
    if (this.state.rightOrNot != null) {
      answerSituationMsg = this.state.rightOrNot ? "你答對了" : "你答錯了。正確答案： "+String(this.props.content.rightAnswer+1);
    }

    var options = [];
    var disabled = this.state.haveClicked ? true : false;
    this.props.content.options.forEach(function(option, index) {
      options.push(
        React.createElement("div", null, React.createElement("input", {type: "radio", name: "option", disabled: disabled, value: index}, option), React.createElement("br", null))
      );
    });

    var style = {
      width: String(finishedRate())+"%"
    };

    var numberOfFinishedQuestion = finishedNumber();

    return (
      React.createElement("div", {className: "slide"}, 
        React.createElement("h4", {className: "title"}, "作答比率 ", numberOfFinishedQuestion, "/14"), 
        React.createElement("div", {className: "progress small-# success radius"}, 
          React.createElement("span", {className: "meter", style: style})
        ), 
        React.createElement("h1", {className: "title"}, this.props.content.title), 
        React.createElement("form", {onChange: this.handleAnswer}, 
          React.createElement("div", {className: "center"}, options)
        ), 
        React.createElement("h4", null, React.createElement("span", {className: this.state.msg}, answerSituationMsg))
      )
    );
  }
});

var Questions = React.createClass({displayName: "Questions",
  updateAll: function() {
    this.forceUpdate();
  },
  render: function() {
    var self = this;
    var questions = this.props.questions.map(function(question, index) {
      var update = self.updateAll.bind(self)
      return (
        React.createElement(Question, {update: update, content: question, questionNumber: index})
      );
    });
    var answerSituations = answerSituation();
    var styles = answerSituations.map(function(situation){
      return {width: String((situation/14.0)*100.0)+"%"};
    });

    return (
      React.createElement("div", {className: "section"}, 
        questions, 

        React.createElement("div", {className: "slide"}, 
          React.createElement("h2", {className: "title"}, "答題狀況"), 
          React.createElement("div", {id: "report"}, 
            React.createElement("h4", {className: "title"}, "答對 ", answerSituations[0], "題"), 
            React.createElement("div", {className: "progress small-# success radius"}, 
              React.createElement("span", {className: "meter", style: styles[0]})
            ), 
            React.createElement("h4", {className: "title"}, "答錯 ", answerSituations[1], "題"), 
            React.createElement("div", {className: "progress small-# alert radius"}, 
              React.createElement("span", {className: "meter", style: styles[1]})
            ), 
            React.createElement("h4", {className: "title"}, "未作答 ", answerSituations[2], "題"), 
            React.createElement("div", {className: "progress small-# secondary radius"}, 
              React.createElement("span", {className: "meter", style: styles[2]})
            )
          )
        )
      )
    );
  }
});

React.render(React.createElement(Questions, {questions: questions}), document.getElementById("question"));