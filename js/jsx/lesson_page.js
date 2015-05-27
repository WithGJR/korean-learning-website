var Paragraph = React.createClass({displayName: "Paragraph",
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
  		React.createElement("div", {className: "paragraph"}, 
        React.createElement("h4", null, React.createElement("a", {href: "", id: this.props.id, onClick: this.handleClick}, React.createElement("div", {className: "label info"}, this.props.title))), 
        React.createElement("div", {className: "paragraph-content "+this.state.show, dangerouslySetInnerHTML: {__html: rawMarkup}})
      )
  	);
  }
});

var Paragraphs = React.createClass({displayName: "Paragraphs",
  render: function() {
    var paragraphs = [];
  	this.props.post.forEach(function(paragraph, id, array) {
        paragraphs.push(React.createElement(Paragraph, {id: id, title: paragraph.title, content: paragraph.content}));
  	});
  	return (
  	  React.createElement("div", {id: "paragraphs"}, 
  	    paragraphs
  	  )
  	);
  }
});

var Post = React.createClass({displayName: "Post",
  render: function() {
  	return (
      React.createElement("div", {id: "post"}, 
        React.createElement(Paragraphs, {post: this.props.post})
      )
  	);
  }
});

React.render(
  React.createElement(Post, {post: post}),
  document.getElementById("content")
);