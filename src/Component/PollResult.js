import React from 'react';
import Chart from 'chart.js';
import { endPoint } from '../socket/allSockets';
import { getAPI } from '../Api/Api';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import io from 'socket.io-client';

class PollResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      Questions: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      a: 'yes',
      b: 'no',
      c: 'yyes',
      d: 'nno',
      data: [12, 100, 3, 5]
    }
  }

  componentDidMount() {
    console.log(this.props.location.search);
    if (this.props.location.search && this.props.location.search.indexOf('pollId') !== -1) {
      let search = this.props.location.search;
      let id = search.substring(this.props.location.search.indexOf(':') + 1, search.length);
      this.setState({
        id: id
      })
      this.firstLoad(id);
      this.openSocket();
    }
    // alert(JSON.stringify(this.props))
    // if (this.props.location && this.props.location.state && this.props.location.state.pollId) {
    //   this.setState({
    //     id: this.props.location.state.pollId
    //   })
    //   this.firstLoad(this.props.location.state.pollId);
    //   this.openSocket();
    // }
  }

  firstLoad(id) {
    getAPI('survey/pollresult')
      .then(e => {
        e = e.data;
        if (e.status == 1) {
          this.renderCVSelect(id, e.data);
        } else {
        }
      });
  }

  renderCVSelect(id, resp) {
    let r = {};
    resp.forEach((l, k) => {
      if (l.questionId == id) {
        r = l
      }
    });

    if (Object.keys(r).length < 1) return '';

    this.setState({
      a: r.A.name,
      b: r.B.name,
      c: r.C.name,
      d: r.D.name,
      data: [
        r.A.value,
        r.B.value,
        r.C.value,
        r.D.value,
      ],
      Questions: r.question,
    }, () => {
      this.renderCanvas();
    });
  }

  openSocket() {
    const socket = io(endPoint, { transports: ['websocket'] });
    socket.on('pollResult', (resp) => {
      console.log(resp, this.state.id);
      this.renderCVSelect(this.state.id, resp);
    });
  }

  renderCanvas() {
    var ctx = document.getElementById('myChart');
    // .getContext('2d');
    ctx.style.backgroundColor = 'rgba(0,177,64,1)';
    Chart.plugins.unregister(ChartDataLabels);
    new Chart(ctx, {
      type: 'bar',
      plugins: [ChartDataLabels],
      data: {
        labels: ['A', 'B', 'C', 'D'],
        datasets: [{
          label: '# of Votes',
          data: this.state.data,
          backgroundColor: [
            '#b7181e',
            '#fff700',
            '#6a76be',
            '#f65f1e',
          ],
          borderColor: [
            '#b7181e',
            '#fff700',
            '#6a76be',
            '#f65f1e',
          ],
          borderWidth: 1,
        }]
      },
      options: {
        legend: {
          display: false
        },
        plugins: {
          datalabels: {
            color: 'white',
            labels: {
              title: {
                font: {
                  weight: 'bold'
                }
              },
              value: {
                color: 'green'
              }
            }
          }
        },
        scales: {
          yAxes: [{
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            }
          }],
          xAxes: [{
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            }
          }]
        }
      }
    });
  }

  render() {
    return (
      <>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"></link>
        <div className="container">
          <br /><br />
          <div className="row" style={{ background: '#55b241' }}>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body poolResult">
                  <h2 className="card-title">Q: {this.state.Questions}</h2>
                </div>
                <div>
                  <ul className="list-group list-group-flush">
                    <li className="listRender"><span style={{ background: '#b7181e' }} className="colWidth"></span> <b>{this.state.a}</b></li>
                    <li className="listRender"><span style={{ background: '#fff700' }} className="colWidth"></span> <b>{this.state.b}</b></li>
                    <li className="listRender"><span style={{ background: '#6a76be' }} className="colWidth"></span> <b>{this.state.c}</b></li>
                    <li className="listRender"><span style={{ background: '#f65f1e' }} className="colWidth"></span> <b>{this.state.d}</b></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <canvas id="myChart" width="80px" height="80px"></canvas>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default PollResult;
