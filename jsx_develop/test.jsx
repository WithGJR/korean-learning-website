var Question = React.createClass({
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
        <div>
          <input type="radio" name="option" value={option}>{option}</input><br />
        </div>
      );
    });

    return (
      <div>
        <h1 className="title">{this.props.content.title}</h1>
        <form onChange={this.handleAnswer}>
          {options}
        </form>

        <h3><span className={this.state.msg}>{answerSituationMsg}</span></h3>
      </div>
    );
  }
});

var Questions = React.createClass({
  render: function() {
    var questions = this.props.questions.map(function(question) {
      return (
        <Question content={question} />
      );
    });

    return (
      <div className="section">
        {questions}
      </div>
    );
  }
});

React.render(<Questions questions={questions} />, document.getElementById("question"));