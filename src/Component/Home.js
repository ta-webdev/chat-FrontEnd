import React from 'react';
import io from 'socket.io-client';
import { endPoint } from '../socket/allSockets';
import { getLocalStorage, setLocalStorage } from '../Api/LocalStorage';
import { postAPI, getPublicAPI } from '../Api/Api';
import WaitingPage from '../Containers/WaitingPage/WaitingPage';
import ThankYou from '../Containers/ThankYou/ThankYou';
import EventPage from './EventPage';

let AllPage = { WaitingPage, EventPage, ThankYou }

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Component: '',
      Url: '',
      Time: '',
      EventId: '',
      videoUrl: ''
    }
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    let event = query.get('eventId');
    let user = query.get('userId');

    this.setState({ EventId: event });

    getPublicAPI('event/event/1')
      .then(e => {
        e = e.data;
        if (e.status == 0 || e.status == 1) {
          e = e.data;
          this.setState({
            Time: e.time
          });
          if (e.over) {
            this.setState({
              Component: 'ThankYou'
            });
          } else {
            if (e.start === true) {
              this.setState({
                Component: 'EventPage',
                Url: e.url,
                videoUrl: e.videoUrl,
              });
            } else {
              this.setState({
                Component: 'WaitingPage',
              });
            }
          }
        } else {
        }
      });

    let User = getLocalStorage('User');
    if (event && user) {
      // if (User !== '') {
      //   this.openSocket();
      // } else {
      getPublicAPI('user/verifyuser' + this.props.location.search)
        .then(e => {
          e = e.data;
          if (e.status == 1) {
            setLocalStorage('User', e.data);
            this.openSocket();
          } else {
          }
        });
      //   }
      // } else {
      // this.openSocket();
    } else {
      if (User !== '') {
        this.openSocket();
      }
    }
  }

  addStyle = url => {
    const style = document.createElement("link");
    style.href = url;
    style.rel = "stylesheet";
    style.async = true;
    document.head.appendChild(style);
  };

  openSocket() {
    const socket = io(endPoint, { transports: ['websocket'] });
    socket.on('eventStart', (resp) => {
      console.log(resp)
      if (resp.over) {
        this.setState({
          Component: 'ThankYou'
        });
      } else {
        if (resp.start === true) {
          this.setState({
            Component: 'EventPage',
            Url: resp.url,
          });
        } else {
          this.setState({
            Component: 'WaitingPage',
          });
        }
      }
    });
  }

  render() {
    let Component = AllPage[this.state.Component];
    return (
      <div className="App">
          { this.state.Component.length > 0 && <Component videoUrl={this.state.videoUrl} Url={this.state.Url} Time={this.state.Time} EventId={this.state.EventId} location={this.props.location}/> }
      </div>
    )
  }
}

export default Home;
