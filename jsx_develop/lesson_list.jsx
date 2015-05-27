var LessonItem = React.createClass({
  render: function(){
    return (
      <li><a href={this.props.url} className="button">{this.props.lesson_name}</a></li>
    );
  }
});
var LessonItems = React.createClass({
  render: function(){
    var items = this.props.items.map(function(item){
      return (
        <LessonItem url={item.url} lesson_name={item.lesson_name} />
      );
    });

    return (
      <ul className="button-group">
        {items}
      </ul>
    );
  }
});
var LessonList = React.createClass({
  render: function(){
    return (
      <div className="content">
        <div className="title"><h3>基礎文法教學</h3></div>
        <LessonItems items={this.props.lesson_infos} />
      </div>
    );
  }
});

React.render(
  <LessonList lesson_infos={lessonInfos} />,
  document.getElementById('lesson')
);