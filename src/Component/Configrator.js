import React from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import { endPoint } from '../socket/allSockets';
import { postAPI, putAPI, getAPI, getPublicAPI, delAPI } from '../Api/Api';
import ToggleButton from 'react-toggle-button';
import { getLocalStorage, getKey } from '../Api/LocalStorage';
import Datetime from 'react-datetime';
import '../assets/react-datetime.css';
import DateTimePicker from 'react-datetime-picker';


class Configrator extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      Poll: [],
      StartDate: '',
      url: 'sd',
      Question: '',
      Ans1: '',
      Ans2: '',
      Ans3: '',
      Ans4: '',
      startDateTime: '',
      endDateTime: '',
      streamUrl: '',
      landingVideoUrl: ''
    }

    this.handleUrlChange = this.handleUrlChange.bind(this)
    this.handleVideoUrlChange = this.handleVideoUrlChange.bind(this)
  }

  onSetStartDataTime = startDateTime => {
    this.setState({ startDateTime })
  }

  onSetEndDataTime = endDateTime => {
    this.setState({ endDateTime })
  }

  
  handleUrlChange(e) {
    const { value } = e.target
    this.setState(prev => ({ ...prev, streamUrl : value }))
  }

  handleVideoUrlChange(e) {
    const { value } = e.target
    this.setState(prev => ({ ...prev, landingVideoUrl : value }))
  }
  
  onSetStartTime = () => {
    if (!window.confirm('Do you want to change start time?')) return '';

    putAPI('event/setStartTime/1',{startTime : this.state.startDateTime})
      .then(e => {
        if(e.data.message == "updated"){
          alert('Time is Updated Successfully....')
        }else{
          alert("Try Again!");
        }
      })
  }

  onSetEndTime = () => {
    if (!window.confirm('Do you want to change end time?')) return '';

    putAPI('event/setEndTime/1',{endTime : this.state.endDateTime})
      .then(e => {
        if(e.data.message == "updated"){
          alert('Time is Updated Successfully....')
        }else{
          alert("Try Again!");
        }
      })
  }

  onSetStreamUrl = () => {
    if (!window.confirm('Do you want to change stream url?')) return '';

    putAPI('event/streamUrl/1',{url : this.state.streamUrl.trim()})
      .then(e => {
        if(e.data.message == "updated"){
          alert('Url is Updated Successfully....')
        }else{
          alert("Try Again!");
        }
      })
  }

  onSetLandingVideoUrl = () => {
    if (!window.confirm('Do you want to change media url?')) return '';

    putAPI('event/landingVideoUrl/1',{videoUrl : this.state.landingVideoUrl.trim()})
      .then(e => {
        if(e.data.message == "updated"){
          alert('Media Url is Updated Successfully....')
        }else{
          alert("Try Again!");
        }
      })
  }

  componentDidMount() {
    // Fetch Time From DB
    getPublicAPI('event/event/1')
      .then( e => {
        if(e.data.data.endTime){
          const { time, endTime, url, videoUrl } = e.data.data;
          this.onSetStartDataTime(new Date(time))
          this.onSetEndDataTime(new Date(endTime))
          this.setState({ streamUrl : url})       
          this.setState({ landingVideoUrl : videoUrl})       
        }else{
          this.onSetStartDataTime(new Date(e.data.data.time))
        }
      })

    let token = getKey('token');
    if (!token || token === '') {
      this.props.history.push('/login');
    }

    const socket = io(endPoint, { transports: ['websocket'] });
    socket.on('listmessage', (message) => {
      console.log(message);
      let AllMessage = this.state.list;
      AllMessage.unshift(message);
      console.log(message, AllMessage)
      this.setState({
        list: AllMessage
      });
    });

    getAPI('survey/question')
      .then(e => {
        e = e.data;
        if (e.status == 1) {
          this.setState({
            Poll: e.data
          });
        } else {
          // error
        }
      });
  }

  renderQuestions(list) {
    if (!list || list.length < 1) return <></>;
    return list.map((l, k) => {
      return (
        <li key={k} onClick={(e) => this.selectQuestion(l)} className="pointer list-group-item"><b>{l.user}</b> ({l.time}) : {l.message}</li>
      )
    })
  }

  selectQuestion(l) {
    getAPI('survey/userquery/' + l.id)
      .then(e => {
        e = e.data;
        console.log(e);
      })
  }

  makeLive(val) {
    putAPI('survey/publish/' + val.id + '/' + ((val.isPublished) ? 0 : 1), {})
      .then(e => {
        e = e.data;
        if (e.status == 1) {
          this.changetoggle(val);
        }
      });
  }

  changetoggle(val) {
    let AllPoll = this.state.Poll;
    AllPoll.forEach((a, k) => {
      if (a.id == val.id) {
        a.isPublished = !val.isPublished;
      }
    });
    this.setState({
      Poll: AllPoll
    })
  }

  removePoll(val) {
    if (!window.confirm(`Do you want to delete poll-${val['id']} ?`)) return '';

    delAPI(`survey/removePoll/${val['id']}`,{})
      .then(e => {
        const { status, message } = e.data;
        console.log("Status : ",status,"---",message)
        if(status === 1 && message === "Deleted"){
          alert('Poll is Deleted Successfully....')
          window.location.reload();
        }else{
          alert('Poll is Not Deleted')
        }
      });
  }

  showResult(l) {
    putAPI('survey/pollimp/' + l.id)
      .then(e => {
        e = e.data;
        if (e.status == 1) {
          console.log(e);
        }
      })
    // this.props.history.push(
    //   '/pollresult',
    //   { pollId: l.id }
    // );
  }

  renderPoll(list) {
    if (!list || list.length < 1) return <></>;
    return list.map((l, k) => {
      return (
        <li key={k} className="col-12 list-group-item">
          <div className="row">
            <div className="col-9">
              {l.question}
            </div>
            <div className="col-3">
              <div className="row d-flex justify-content-around">
                <span>Live:</span>
                <ToggleButton
                  value={l.isPublished}
                  onToggle={(e) => this.makeLive(l)} />
              </div>
              <div className="row">
                <div className="col-12 pointer" onClick={(e) => this.showResult(l)}>
                  Show Results
                </div>
              </div>
              <div className="row d-flex justify-content-end">
                <svg onClick={(e) => this.removePoll(l)} className="pointer color-red bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z" />
                  <path fill-rule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </li>
      )
    })
  }

  saveQuestion(e) {
    e.preventDefault();
    let arr = {
      "question": this.state.Question,
      "option": {
        "a": this.state.Ans1,
        "b": this.state.Ans2,
        "c": this.state.Ans3,
        "d": this.state.Ans4,
      }
    }
    postAPI('survey/question', arr)
      .then(e => {
        e = e.data;
        if (e.status == 1) {
          let AllPoll = this.state.Poll;
          AllPoll.push(e.data);
          this.setState({
            Poll: AllPoll
          });
          this.resetQuestion();
        } else {
          //
        }
      });
  }

  resetQuestion() {
    this.setState({
      Question: '',
      Ans1: '',
      Ans2: '',
      Ans3: '',
      Ans4: ''
    });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleChange = (e) => {
    this.setState({
      StartDate: e._d
    })
  }

  onStartDateSave() {
    let arr = {
      StartDate: this.state.StartDate
    }
    postAPI('event/event/1', arr)
      .then(e => {
        e = e.data;
        if (e.status == 1) {
          console.log(e);
        } else { }
      });
  }

  onStartEvent() {
    if (!window.confirm('Do you want to start the session early?')) return '';
    if (!window.confirm('Are you sure?')) return '';

    putAPI('event/startevent/1/1', {})
      .then(e => {
        e = e.data;
        if (e.status == 1) {
          console.log(e);
        } else { }
      });
  }

  onEndEvent() {
    if (!window.confirm('Do you want to end the session?')) return '';
    if (!window.confirm('Are you sure?')) return '';

    putAPI('event/startevent/1/0', {})
      .then(e => {
        e = e.data;
        if (e.status == 1) {
          console.log(e);
        } else { }
      });
  }


  render() {
    return (
      <div className="wrapper container">
        <h2>Event Details</h2>
        <div className="row">
          <div className="col-md-5">
            <div className="row flex-column">
              {/* Set Start Time Buttons */}
              <div className="form-group d-flex align-items-center justify-content-center">
                <div className="col-md-7">
                  <DateTimePicker onChange={this.onSetStartDataTime} value={this.state.startDateTime} />
                </div>
                <button type="button" onClick={(e) => this.onSetStartTime()} className="col-md-5 btn btn-success">Set Start Time</button>
              </div> 
              {/* Set End Time Buttons */}
              <div className="form-group d-flex align-items-center justify-content-center">
                <div className="col-md-7">
                  <DateTimePicker onChange={this.onSetEndDataTime} value={this.state.endDateTime} />
                </div>
                <button type="button" onClick={(e) => this.onSetEndTime()} className="col-md-5 btn btn-success">Set End Time</button>
              </div>
              {/* Live Url */}
              <div className="form-group d-flex align-items-center justify-content-center my-md-1">
                <div className="col-md-7">
                  <input type="text" className="col-md-12 text-dark text-left p-0" placeholder="Enter Your Stream Url" onChange={this.handleUrlChange} value={this.state.streamUrl}/>
                </div>
                <button type="button" onClick={(e) => this.onSetStreamUrl()} className="col-md-5 btn btn-success">Set Stream Url</button>
              </div>

              {/* Landing Video Url */}
              <div className="form-group d-flex align-items-center justify-content-center my-md-1">
                <div className="col-md-7">
                  <input type="text" className="col-md-12 text-dark text-left p-0" placeholder="Enter Your Stream Url" onChange={this.handleVideoUrlChange} value={this.state.landingVideoUrl}/>
                </div>
                <button type="button" onClick={(e) => this.onSetLandingVideoUrl()} className="col-md-5 btn btn-success">Set Media Url</button>
              </div>
              {/* Start and End Event Buttons*/}
              <h3>Event Start/End</h3> 
              <div className="form-group d-flex align-items-center justify-content-center">
                <button type="button" onClick={(e) => this.onStartEvent()} className="col-md-4 btn btn-success">Start Event</button>
                <div className="col-md-4">&nbsp;</div>
                <button type="button" onClick={(e) => this.onEndEvent()} className="col-md-4 btn btn-danger">End Event</button>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="poll-header w-100">
                  <h3>Poll</h3>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                    <a href="/pollresult" target="_blank" >Live Poll Url</a>
                </div>
                <ul className="row list-group list-group-flush">
                    {this.renderPoll(this.state.Poll)}
                </ul>
              </div>
              <div className="form-group card w-100">
                <h3>Add Poll</h3>
                <div className="card-body">
                  <form onSubmit={(e) => this.saveQuestion(e)} className="margin-0-auto">
                    <div className="form-group">
                      <label htmlFor="question">Question :</label>
                      <input onChange={(e) => this.onChange(e)} value={this.state.Question} name="Question" type="text" className="form-control" id="question" aria-describedby="emailHelp" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="ans1">Answer 1</label>
                      <input onChange={(e) => this.onChange(e)} value={this.state.Ans1} name="Ans1" type="text" className="form-control" id="ans1" aria-describedby="emailHelp" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="ans2">Answer 2</label>
                      <input onChange={(e) => this.onChange(e)} value={this.state.Ans2} name="Ans2" type="text" className="form-control" id="ans2" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="ans3">Answer 3</label>
                      <input onChange={(e) => this.onChange(e)} value={this.state.Ans3} name="Ans3" type="text" className="form-control" id="ans3" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="ans4">Answer 4</label>
                      <input onChange={(e) => this.onChange(e)} value={this.state.Ans4} name="Ans4" type="text" className="form-control" id="ans4" />
                    </div>
                    <div className="form-group d-flex align-items-center justify-content-center">
                      <button type="submit" className="btn btn-primary col-md-4">Add Poll</button>
                      <div className="col-md-4">&nbsp;</div>
                      <button type="button" onClick={(e) => this.resetQuestion()} className="btn btn-primary col-md-4">Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <br />
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-6">
            <div className="row">
              <div className="col">
                <a href="/selectedMessage" target="_blank" >Selected Messages</a>
              </div>
            </div>
            <h3>Questions</h3>
            <div className="form-group height300px">
              <ul className="list-group list-group-flush">
                {this.renderQuestions(this.state.list)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Configrator;
