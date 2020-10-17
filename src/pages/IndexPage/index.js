import React, {Component} from 'react';
import './css/styles.scss';
import Post from '../PostPage';

export default class IndexPage extends Component {
  state = {
    title: '',
    body: '',
    posts: [],
    featured_image: null,
  };

  componentDidMount () {
    this.getPosts ();
  }

  getPosts = () => {
    fetch ('http://localhost:3000/posts')
      .then (response => response.json ())
      .then (posts => this.setState ({posts: posts}));
  };

  handleChange = event => {
    this.setState ({[event.target.name]: event.target.value});
  };

  handleSubmit = async event => {
    event.preventDefault ();
    const formData = new FormData ();
    formData.append ('title', this.state.title);
    formData.append ('body', this.state.body);
    formData.append ('featured_image', this.state.featured_image);

    await fetch ('http://localhost:3000/new', {
      method: 'POST',
      body: formData,
    }).catch (error => console.log (error));
    this.setState ({
      title: '',
      body: '',
      featured_image: null,
    });
    this.getPosts ();
  };

  onImageChange = event => {
    this.setState ({featured_image: event.target.files[0]});
  };

  render () {
    return (
      <div className="container">
        <h1>Create a new post</h1>
        <hr />
        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="post-title">
              <label htmlFor="title">Post title: </label>
              <input
                name="title"
                type="text"
                onChange={this.handleChange}
                value={this.state.title}
              />
            </div>
            <div className="post-body">
              <label htmlFor="body">Post body</label>
              <textarea
                name="body"
                onChange={this.handleChange}
                value={this.state.body}
              />
            </div>
            <div className="post-image">
              <label htmlFor="img">Select image:</label>
              <input
                type="file"
                accept="image/*"
                multiple={false}
                onChange={this.onImageChange}
              />
            </div>
            <button className="submit" type="submit">Create post</button>
          </form>
        </div>
        {this.state.posts.map (post => (
          <Post
            key={post.id}
            title={post.title}
            body={post.body}
            url={post.featured_image.url}
          />
        ))}
      </div>
    );
  }
}
