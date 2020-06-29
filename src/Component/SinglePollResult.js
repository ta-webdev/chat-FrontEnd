import React from 'react';
import Chart from 'chart.js';
import { endPoint } from '../socket/allSockets';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import io from 'socket.io-client';

class SinglePollResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      Questions: '?',
      a: '',
      b: '',
      c: '',
      d: '',
      data: [0, 0, 0, 0]
    }
  }

  componentDidMount() {
    this.openSocket();
  }

  openSocket() {
    const socket = io(endPoint, { transports: ['websocket'] });
    socket.on('pollResult', (resp) => {
      if (resp.length < 1) return '';
      resp = resp[0];
      this.setState({
        a: resp.A.name,
        b: resp.B.name,
        c: resp.C.name,
        d: resp.D.name,
        data: [
          resp.A.value,
          resp.B.value,
          resp.C.value,
          resp.D.value,
        ],
        Questions: resp.question,
      }, () => {
        this.renderCanvas();
      });
    });
  }

  renderCanvas() {
    var ctx = document.getElementById('myChart');
    // .getContext('2d');
    ctx.style.backgroundColor = 'rgba(0,177,64, 0.0)';
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
            '#27B8B7',
            '#00A1D8',
            '#626191',
            '#331845',
          ],
          borderColor: [
            '#27B8B7',
            '#00A1D8',
            '#626191',
            '#331845',
          ],
          borderWidth: 1,
        }]
      },
      options: {
        animation: {
          duration: 0
        },
        legend: {
          display: false
        },
        events: [],
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
              color: "rgba(0, 0, 0, 0.05)",
            },
            ticks: {
              beginAtZero: true,
              steps: 10,
              stepValue: 10,
              max: 100
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
          <div className="row" style={{ background: '#ffffff' }}>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title">{this.state.Questions}</h2>
                </div>
                <div>
                  <ul className="list-group list-group-flush">
                    <li className="listRender"><span style={{ background: '#27B8B7' }} className="colWidth"></span> <b>{this.state.a}</b></li>
                    <li className="listRender"><span style={{ background: '#00A1D8' }} className="colWidth"></span> <b>{this.state.b}</b></li>
                    <li className="listRender"><span style={{ background: '#626191' }} className="colWidth"></span> <b>{this.state.c}</b></li>
                    <li className="listRender"><span style={{ background: '#331845' }} className="colWidth"></span> <b>{this.state.d}</b></li>
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

export default SinglePollResult;
