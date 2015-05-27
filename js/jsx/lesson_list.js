var LessonItem = React.createClass({displayName: "LessonItem",
  render: function(){
    return (
      React.createElement("li", null, React.createElement("a", {href: this.props.url, className: "button"}, this.props.lesson_name))
    );
  }
});
var LessonItems = React.createClass({displayName: "LessonItems",
  render: function(){
    var items = this.props.items.map(function(item){
      return (
        React.createElement(LessonItem, {url: item.url, lesson_name: item.lesson_name})
      );
    });

    return (
      React.createElement("ul", {className: "button-group"}, 
        items
      )
    );
  }
});
var LessonList = React.createClass({displayName: "LessonList",
  render: function(){
    return (
      React.createElement("div", {className: "content"}, 
        React.createElement("div", {className: "title"}, React.createElement("h3", null, "基礎文法教學")), 
        React.createElement(LessonItems, {items: this.props.lesson_infos})
      )
    );
  }
});

React.render(
  React.createElement(LessonList, {lesson_infos: lessonInfos}),
  document.getElementById('lesson')
);