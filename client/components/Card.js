import React from 'react';
import axios from 'axios';

import styles from '../styles.css';

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      error: null,
      defaultImage: 'http://www.gifbin.com/bin/122016/surfing-with-two-dogs.gif',
    };
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.url && this.props.url != nextProps.url) {
      this.setState({ data: null, error: null });
      axios.post('/urls', { url: nextProps.url })
        .then(response => {
          this.setState({ data: response.data });
        })
        .catch(e => { this.setState({error: e.response.data })})
    }
  }
  render() {
    if(this.props.url) {
      if(this.state.data) {
        var imageUrl = this.state.data.facebook.image[0] || this.state.data.twitter.image[0] || this.state.defaultImage;
        return (
          <div className={styles.cardWrapper}>
            <div className={styles.cardImage} style={{backgroundImage: `url(${imageUrl})`}}></div>
            <div className={styles.cardData}>
              <p className={`${styles.elipsify} ${styles.title}`}>{ this.state.data.facebook.description || this.state.data.twitter.description || this.state.data.general.title }</p>
              <a target='_blank' href={this.state.data.url} className={`${styles.elipsify} ${styles.link}`}>{ this.state.data.url }</a>
            </div>
          </div>
        )
      } 
      else if (this.state.error) {
        return (
          <div className={styles.errorMessage}>Invalid Link</div>
        )
      }
      else {
        return <div><img className={styles.loader} src="http://readwrite.com/wp-content/plugins/malinky-ajax-pagination/img/loader.gif" height={25} width={25}/></div>
      }
    } else {
      return null;
    }
  }
}

export default Card;
