var VideoContent = React.createClass({displayName: "VideoContent",
  render: function() {
    return (
      React.createElement("div", {id: this.props.id, className: "reveal-modal", "data-reveal": true, "aria-labelledby": "firstModalTitle", "aria-hidden": "true", role: "dialog"}, 
        React.createElement("h3", null, this.props.title), 
        React.createElement("object", {width: "100%", height: "100%;", data: this.props.src}), 
        React.createElement("a", {className: "close-reveal-modal", "aria-label": "Close"}, "×")
      )
    );
  }
});

var VideoContentSection = React.createClass({displayName: "VideoContentSection",
  render: function() {
    var videoContents = this.props.videos.map(function(video, index){
      return (
        React.createElement(VideoContent, {id: "video"+String(index+1), title: video.title, src: video.src})
      );
    });

    return (
      React.createElement("div", null, 
        videoContents
      )
    );
  }
});

var VideoItem = React.createClass({displayName: "VideoItem",
  render: function() {
    return (
       React.createElement("li", null, React.createElement("a", {"data-reveal-id": this.props.id, className: "reveal-link button info"}, this.props.title))
    );
  }
});

var VideoList = React.createClass({displayName: "VideoList",
  render: function() {
    var videoList = this.props.videos.map(function(video, index) {
      return (
        React.createElement(VideoItem, {id: "video"+String(index+1), title: video.title})
      );
    });

    return (
      React.createElement("ul", {className: "button-group even-2"}, 
        videoList
      )
    );
  }
}); 

var VideoSection = React.createClass({displayName: "VideoSection",
  render: function() {
    return (
      React.createElement("div", {className: "content"}, 
        React.createElement("div", {className: "title"}, React.createElement("h3", null, "影片發音教學")), 
        React.createElement(VideoList, {videos: this.props.videos}), 
        React.createElement(VideoContentSection, {videos: this.props.videos})
      )
    );
  }
});

React.render(React.createElement(VideoSection, {videos: videoItems}), document.getElementById('video-section'));