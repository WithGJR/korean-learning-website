var Paragraph = React.createClass({
	getInitialState: function() {
		return {show: "show"};
	},
	handleClick: function(event) {
    event.preventDefault();
    
    if (this.state.show == "show") {
      this.setState({show: "notShow", text: "none"});
    }else{
      this.setState({show: "show", text: "true"});
    };
	},
  render: function() {
  	var rawMarkup = marked(this.props.content, {sanitize: true});

  	return (
  		<div className="paragraph">
        <h4><a href="" id={this.props.id} onClick={this.handleClick}><div className="label info">{this.props.title}</div></a></h4>
        <div className={"paragraph-content "+this.state.show} dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
  	);
  }
});

var Paragraphs = React.createClass({
  render: function() {
    var paragraphs = [];
  	this.props.post.forEach(function(paragraph, id, array) {
        paragraphs.push(<Paragraph id={id} title={paragraph.title} content={paragraph.content} />);
  	});
  	return (
  	  <div id="paragraphs">
  	    {paragraphs}
  	  </div>
  	);
  }
});

var Post = React.createClass({
  render: function() {
  	return (
      <div id="post">
        <Paragraphs post={this.props.post} />
      </div>
  	);
  }
});

React.render(
  <Post post={post} />,
  document.getElementById("content")
);