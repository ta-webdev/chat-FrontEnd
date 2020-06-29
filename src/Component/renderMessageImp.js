import React from 'react';
import io from 'socket.io-client';
import { endPoint } from '../socket/allSockets';

class renderMessageImp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    }
  }

  componentDidMount() {
    this.openSocket();
  }

  openSocket() {
    const socket = io(endPoint, {transports: ['websocket']});
    socket.on('userQuery', (message) => {
      let AllMessage = [];
      AllMessage.push(message);
      this.setState({
        list: AllMessage
      });
    });
  }

  renderQuestions(list) {
    if (!list || list.length < 1) return <></>;
    return list.map((l, k) => {
      return (
        <li key={k} className="list-group-item"><b>{l.user}<br /></b> {l.message}</li>
      )
    })
  }

  render() {
    return (
      <div className="App">
        <h3>Questions</h3>
        <div className="form-group height300px">
          <ul className="list-group list-group-flush">
            {this.renderQuestions(this.state.list)}
          </ul>
        </div>
      </div>
    )
  }
}

export default renderMessageImp;
