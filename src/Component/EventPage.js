import React, { createRef } from 'react';
import io from 'socket.io-client';
import { endPoint } from '../socket/allSockets';
import { sendMessage } from '../socket/allSockets';
import { getLocalStorage } from '../Api/LocalStorage';
import { postAPI } from '../Api/Api';
import $ from 'jquery';
import "./Event/Event.scss";

import Hls from "hls.js"
import Plyr from "plyr"

class EventPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Url: this.props.Url,
      // newPoll: false,
      isPublish: false,
      Message: '',
      id: 0,
      Question: '',
      Answer: '',
      a: '',
      b: '',
      c: '',
      d: '',
      overlayState: true,
      playState: false,
      landingVideoUrl: this.props.videoUrl
    }
    this.handleVideoStart = this.handleVideoStart.bind(this)
  }

  componentDidMount() {
    this.hidePopup();
    const socket = io(endPoint, {transports: ['websocket']});
    socket.on('CurrentPoll', (resp) => {
      console.log(resp)
      this.setState({
        id: resp.id,
        Question: resp.question,
        a: resp.surveyOption.a,
        b: resp.surveyOption.b,
        c: resp.surveyOption.c,
        d: resp.surveyOption.d,
        isPublish: resp.isPublished,
        // newPoll: true
      });

      if (!resp.isPublished) {
        this.hidePopup();
      }
    });
  }

 handlePlayer = () => {
   const player = document.querySelector("#player")
   const streamUrl = this.state.Url
    if (Hls.isSupported()) {
	var hls = new Hls();
        hls.loadSource(streamUrl);
        hls.attachMedia(player);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            const ply = new Plyr('#player', {controls: ['play-large', 'play', 'mute', 'volume']})
            ply.setup(player)
            player.play();        
        });
    }
    else if (player.canPlayType('application/vnd.apple.mpegurl')) {
        player.src = streamUrl;
        player.addEventListener('loadedmetadata', () => {
        });
    }
  }

  hidePopup() {
    $(".poll").hide();
    $(".actionArea").hide();
    $(".questionBox").hide();
    $(".blackOverlay").hide();
    this.setState({
      Answer: '',
      Message: '',
    })
  }

  openPoll() {
    if (this.state.id < 1 || this.state.isPublish === false) return '';
    $(".blackOverlay").show();
    $(".actionArea").show();
    $(".poll").show();
    $(".questionBox").hide();
    $(this).toggleClass("active");
    $("#ques").removeClass("active");
  }

  openQuestion() {
    $(".blackOverlay").show();
    $(".actionArea").show();
    $(".questionBox").show();
    $(".poll").hide();
    $(this).toggleClass("active");
    $("#poll").removeClass("active");
  }

  sendMessage(e) {
    e.preventDefault();
    let User = getLocalStorage('User');
    let arr = {
      userId: User.uid,
      query: this.state.Message
    }
    this.setState({
      Message: '',
    });
    this.hidePopup();
    postAPI('survey/query', arr)
      .then(e => {
        e = e.data;
        if (e.status == 1) {
        }
      });
  }

  savePoll(e) {
    e.preventDefault();
    if (!this.state.isPublish) return '';

    let User = getLocalStorage('User');
    let arr = {
      qId: this.state.id,
      userId: User.uid,
      optId: this.state.Answer
    }
    this.setState({
      isPublish: false
    });
    this.hidePopup();
    postAPI('survey/poll', arr)
      .then(e => {
        e = e.data;
        if (e.status == 1) {
        }
      })
  }

  onRadioChange(e) {
    this.setState({
      Answer: e.target.value
    })
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleVideoStart() {
    $("#player").attr("src", this.state.landingVideoUrl)
    this.setState({playState : true})
  }

  handleVideoEnd() {
    if(this.state.overlayState) {
      this.handlePlayer()
      this.setState({overlayState : false})
    }
  }

  render() {
    return (
      <>
        <section className="EventPage">
          <div className="orientation w-100 h-100 position-absolute">
            <div className="gif h-100 w-100 d-flex align-items-center justify-content-center">
              <img src="https://balimicorp.com/site_assets/images/rotate.gif"/>
            </div>
          </div>
          <div className="banner background-Black">
            { this.state.overlayState && !this.state.playState && <img src="https://img.icons8.com/officel/256/000000/circled-play.png" className="position-absolute play-btn" onClick={() => this.handleVideoStart()}
            /> }
            { <video height="90%" width="100%" preload="none" onEnded={() => this.handleVideoEnd()} id="player"  autoPlay={true} controls={!this.state.overlayState} ></video>} 
            {/* <iframe
              id="ytplayer"
              type="text/html"
              width="100%"
              // 573px
              height="90%"
              src={this.state.Url + '&modestbranding=1&controls=0'}
              frameborder="0"
              allow="fullscreen"
            >
            </iframe> */}
            
          </div>
          <div className="blackOverlay">
            <div className="actionArea">
              <div style={{ float: "right" }} className="font25 pointer" onClick={(e) => this.hidePopup()}>
                <svg className="bi bi-x" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="poll">
                <div className="space">
                  <h3>{this.state.Question}</h3>
                  <form>
                    <div className="form-group">
                      <div className="choice">
                        <input type="radio" checked={(this.state.Answer == 'a') ? true: false} onChange={(e) => this.onRadioChange(e)} className="form-control" id="yes" value="a" name="radioGroup" />
                        <label htmlFor="yes">{this.state.a}</label>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="choice">
                        <input type="radio" checked={(this.state.Answer == 'b') ? true: false} onChange={(e) => this.onRadioChange(e)} className="form-control" id="no" value="b" name="radioGroup" />
                        <label htmlFor="no">{this.state.b}</label>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="choice">
                        <input type="radio" checked={(this.state.Answer == 'c') ? true: false} onChange={(e) => this.onRadioChange(e)} className="form-control" id="notsure" value="c" name="radioGroup" />
                        <label htmlFor="notsure">{this.state.c}</label>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="choice">
                        <input type="radio" checked={(this.state.Answer == 'd') ? true: false} onChange={(e) => this.onRadioChange(e)} className="form-control" id="yesmaybe" value="d"
                          name="radioGroup" />
                        <label htmlFor="yesmaybe">{this.state.d}</label>
                      </div>
                    </div>
                    <input type="button" onClick={(e) => this.savePoll(e)} className="btn" value="submit" />
                  </form>
                </div>
              </div>
              <div className="questionBox">
                <div className="space">
                  <h2>
                    Ask your question
                  </h2>
                  <form className="bottomForm" onSubmit={(e) => this.sendMessage(e)}>
                    <textarea name="Message" maxLength="250" value={this.state.Message} onChange={(e) => this.onChange(e)} placeholder="Please type your relevant question"></textarea>
                    <div className="marginSide">
                      <input type="submit" className="btn" value="submit" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer>
          <div className="menu">
            <a href="#" onClick={(e) => this.openPoll()} className={this.state.isPublish ? 'newPoll' : ''} id="poll">Poll</a>
            <a href="#" onClick={(e) => this.openQuestion()} id="ques">Ask a Question</a>
          </div>
        </footer>
      </>
    )
  }
}

export default EventPage;
