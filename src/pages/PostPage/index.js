import React, {Component} from 'react';

export default class Post extends Component {
  render () {
    return (
      <div className="post-container">
        <h3>{this.props.title}</h3>
        <div className="content">
          <img src={this.props.url} alt="" />
          <p>{this.props.body}</p>
        </div>
      </div>
    );
  }
}
