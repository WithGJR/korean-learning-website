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

var Question = React.createClass({
  getInitialState: function() {
    return {rightOrNot: null, msg: ""};
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
    this.props.update();
  },
  render: function() {
    var answerSituationMsg = "";
    if (this.state.rightOrNot != null) {
      answerSituationMsg = this.state.rightOrNot ? "你答對了" : "你答錯了";
    }

    var options = [];
    this.props.content.options.forEach(function(option, index) {
      options.push(
        <div><input type="radio" name="option" value={index}>{option}</input><br /></div>
      );
    });

    var style = {
      width: String(finishedRate())+"%"
    };

    var numberOfFinishedQuestion = finishedNumber();

    return (
      <div className="slide">
        <h4 className="title">作答比率 {numberOfFinishedQuestion}/14</h4>
        <div className="progress small-# success radius">
          <span className="meter" style={style}></span>
        </div>
        <h1 className="title">{this.props.content.title}</h1>
        <form onChange={this.handleAnswer}>
          <div className="center">{options}</div>
        </form>
        <h4><span className={this.state.msg}>{answerSituationMsg}</span></h4>
      </div>
    );
  }
});

var Questions = React.createClass({
  updateAll: function() {
    this.forceUpdate();
  },
  render: function() {
    var self = this;
    var questions = this.props.questions.map(function(question, index) {
      var update = self.updateAll.bind(self)
      return (
        <Question update={update} content={question} questionNumber={index} />
      );
    });
    var answerSituations = answerSituation();
    var styles = answerSituations.map(function(situation){
      return {width: String((situation/14.0)*100.0)+"%"};
    });

    return (
      <div className="section">
        {questions}

        <div className="slide">
          <h2 className="title">答題狀況</h2>
          <div id="report">
            <h4 className="title">答對 {answerSituations[0]}題</h4>
            <div className="progress small-# success radius">
              <span className="meter" style={styles[0]}></span>
            </div>
            <h4 className="title">答錯 {answerSituations[1]}題</h4>
            <div className="progress small-# alert radius">
              <span className="meter" style={styles[1]}></span>
            </div>
            <h4 className="title">未作答 {answerSituations[2]}題</h4>
            <div className="progress small-# secondary radius">
              <span className="meter" style={styles[2]}></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

React.render(<Questions questions={questions} />, document.getElementById("question"));