var VideoContent = React.createClass({
  render: function() {
    return (
      <div id={this.props.id} className="reveal-modal" data-reveal aria-labelledby="firstModalTitle" aria-hidden="true" role="dialog">
        <h3>{this.props.title}</h3>
        <object width="100%" height="100%;" data={this.props.src}></object>
        <a className="close-reveal-modal" aria-label="Close">&#215;</a>
      </div>
    );
  }
});

var VideoContentSection = React.createClass({
  render: function() {
    var videoContents = this.props.videos.map(function(video, index){
      return (
        <VideoContent id={"video"+String(index+1)} title={video.title} src={video.src} />
      );
    });

    return (
      <div>
        {videoContents}
      </div>
    );
  }
});

var VideoItem = React.createClass({
  render: function() {
    return (
       <li><a data-reveal-id={this.props.id} className="reveal-link button info">{this.props.title}</a></li>
    );
  }
});

var VideoList = React.createClass({
  render: function() {
    var videoList = this.props.videos.map(function(video, index) {
      return (
        <VideoItem id={"video"+String(index+1)} title={video.title} />
      );
    });

    return (
      <ul className="button-group even-2">
        {videoList}
      </ul>
    );
  }
}); 

var VideoSection = React.createClass({
  render: function() {
    return (
      <div className="content">
        <div className="title"><h3>影片發音教學</h3></div>
        <VideoList videos={this.props.videos} />
        <VideoContentSection videos={this.props.videos} />
      </div>
    );
  }
});

React.render(<VideoSection videos={videoItems} />, document.getElementById('video-section'));