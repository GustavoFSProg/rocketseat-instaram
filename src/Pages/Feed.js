import React, { Component } from 'react'
import './Feed.css'
import more from '../assets/more.svg'
import like from '../assets/like.svg'
import comment from '../assets/comment.svg'
import send from '../assets/send.svg'
import api from '../services/api'
import io from 'socket.io-client'

class Feed extends Component {
  state = {
    feed: [],
  }

  async componentDidMount() {
    this.registerToSocket()

    const { data } = await api.get('posts')

    console.log('Response:  ' + data)

    this.setState({ feed: data })
  }

  registerToSocket = () => {
    const socket = io('https://omnistack-instagram.herokuapp.com')

    socket.on('post', (newPost) => {
      this.setState({ feed: [newPost, ...this.state.feed] })
    })

    socket.on('like', (likedPost) => {
      this.setState({
        feed: this.state.feed.map((post) =>
          post._id === likedPost.id ? likedPost : post
        ),
      })
    })
  }

  handleLike = (id) => {
    api.post(`/posts/${id}/like`)
  }

  render() {
    return (
      <section id="post-list">
        {this.state.feed.map((post) => (
          <article key={post._id}>
            <header>
              <div className="user-info">
                <span>{post.author}</span>
                <span className="place">{post.place}</span>
              </div>
              <img src={more} alt="mais" />
            </header>
            <img
              src={`https://omnistack-instagram.herokuapp.com/files/${post.image}`}
              alt="uma"
            />

            <footer>
              <div className="actions">
                <button type="button" onClick={() => this.handleLike(post._id)}>
                  <img src={like} alt="like" />
                </button>
                <img src={comment} alt="comment" />
                <img src={send} alt="send" />
              </div>
              <strong> {post.likes} Curtidas </strong>

              <p>
                {post.description}
                <span>{post.hashtags}</span>
              </p>
            </footer>
          </article>
        ))}
      </section>
    )
  }
}

export default Feed
