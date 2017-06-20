import React from 'react';
import Card from './Card';

import styles from '../styles.css';

class InputBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null,
      text: null,
    }
  }
  submitForm(e) {
    e.preventDefault();
    this.setState({url: this.state.text})
  }
  render() {
    return (
      <div className={styles.form}>
        <form onSubmit={this.submitForm.bind(this)} style={{marginBottom: 20}}>
          <span>Enter Url</span>
          <input className={styles.input} type="url" autoFocus required onChange={(e) => this.setState({text: e.target.value})}/>
          <button className={styles.button}>Submit</button>
        </form>
        <Card url={this.state.url}/>
      </div>
    )
  }
}

export default InputBox;
