var Paragraph = React.createClass({displayName: "Paragraph",
	getInitialState: function() {
		return {display: "true"};
	},
	handleClick: function(event) {
    event.preventDefault();
    console.log(this.refs.content);
		// for (var sibling in this.refs.paragraphContent.getDOMNode().siblings()) {
		// 	var display = window.getComputedStyle(sibling, null).getPropertyValue("display");
		// 	if (display == "none") {
  //       sibling.style.display = "true";
		// 	}else{
  //       sibling.style.display = "none";
		// 	};
		// };
	},
  render: function() {
  	var rawMarkup = marked(this.props.content, {sanitize: true});
  	var contentStyle = {
  		display: this.state.display
  	};
  	return (
  		React.createElement("div", {className: "paragraph"}, 
        React.createElement("h4", null, React.createElement("a", {href: "", onClick: this.handleClick}, React.createElement("span", {className: "label info"}, this.props.title))), 
        React.createElement("div", {className: "paragraph-content", style: contentStyle, dangerouslySetInnerHTML: {__html: rawMarkup}})
      )
  	);
  }
});

var Paragraphs = React.createClass({displayName: "Paragraphs",
  render: function() {
  	var paragraphs = this.props.post.map(function(paragraph) {
      return(
        React.createElement(Paragraph, {title: paragraph.title, content: paragraph.content})
      );
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