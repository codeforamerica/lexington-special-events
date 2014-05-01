/**
 * @jsx React.DOM
 */
$(function() {
  var CommentForm = React.createClass({
    render: function() {
      return (
        <form className="commentForm" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Your name" ref="author" value="foo" />
          <input
            type="text"
            placeholder="Say something..."
            value="foo"
            ref="text"
          />
          <input type="submit" value="Post" />
        </form>
      );
    },
    handleSubmit: function() {
      var author = this.refs.author.getDOMNode().value.trim();
      var text = this.refs.text.getDOMNode().value.trim();
      this.props.onCommentSubmit({author: author, text: text});
      // this.refs.author.getDOMNode().value = '';
      // this.refs.text.getDOMNode().value = '';
      return false;
    }
  });
  var CommentList = React.createClass({
    render: function() {
      var commentNodes = this.props.data.map(function (comment) {
        return <Comment author={comment.author}>{comment.text}</Comment>;
      });
      return (
        <div className="commentList">
          {commentNodes}
        </div>
      );
    }
  });
  var CommentBox = React.createClass({
    getInitialState: function() {
      return {data: []}
    },
    handleCommentSubmit: function(comment) {
      var comments = this.state.data;
      var newComments = comments.concat([comment]);
      this.setState({data: newComments});
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: comment,
        success: function(data) {
          this.setState({data: data});
        }.bind(this)
      });
    },
    loadCommentsFromServer: function() {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    componentWillMount: function() {
      this.loadCommentsFromServer();
      // setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function() {
      return (
        <div className="commentBox">
          <h1>Comments</h1>
          <CommentList data={this.state.data}/>
          <CommentForm onCommentSubmit={this.handleCommentSubmit} />
        </div>
      );
    }
  });
  var converter = new Showdown.converter();
  var Comment = React.createClass({
    render: function() {
      var rawMarkup = converter.makeHtml(this.props.children.toString());
      return (
        <div className="comment">
          <h2 className="commentAuthor">
            {this.props.author}
          </h2>
          <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
        </div>
      );
    }
  });
  React.renderComponent(
    <CommentBox url="parks.json" pollInterval={20000} />,
    document.getElementById('content')
  );
});
