import React from 'react';
import { postAPI } from '../Api/Api';
import { getKey, setKey } from '../Api/LocalStorage';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      UserName: '',
      Password: '',
    }
  }

  componentDidMount() {
    let token = getKey('token');
    if (token && token !== '') {
      this.props.history.push('/config');
    }
  }

  onLogin(e) {
    e.preventDefault();
    let arr = {
      userId: this.state.UserName,
      pswd: this.state.Password,
    }
    postAPI('user/adminauth', arr)
      .then(e => {
        e = e.data;
        if (e.status == 1) {
          setKey('token', e.token);
          this.props.history.push('/config');
        } else {
          alert(e.message);
        }
      });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"></link>
        <div className="container">
          <br />
          <br />
          <div className="row">
            <div className="col">
              <div className="card margin-0-auto" style={{ width: "500px" }}>
                <div className="card-body">
                  <form onSubmit={(e) => this.onLogin(e)}>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">User Name</label>
                      <input onChange={(e) => this.onChange(e)} name="UserName" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                      <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1">Password</label>
                      <input onChange={(e) => this.onChange(e)} name="Password" type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="form-group form-check">
                      <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                      <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
