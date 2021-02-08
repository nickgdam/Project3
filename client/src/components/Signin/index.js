import React, { Component} from 'react';
import {Link } from 'react-router-dom';
import './style.css';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
// import 'bootstrap/dist/css/bootstrap.min.css';


class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isAuthenticated: false,
      errors: {}
    };
  }

  // componentDidMount() {
  //   // If logged in and user navigates to Register page, should redirect them to dashboard
  //   if (this.state.isAuthenticated) {
  //     this.props.history.push("/dashboard");
  //   } else {
  //      this.props.history.push("/Signin");
  //   }
  // }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

  const userInfo = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(userInfo);

      axios.post('/api/login', userInfo)
      .then(res => {
        console.log(res);
        const { token } = res.data;
        
        localStorage.setItem('jwtToken', token);
        const decodedToken = jwt_decode(token);
        localStorage.setItem('decodedTokenID', (decodedToken.id))
        console.log(decodedToken.id);
        this.state = {isAuthenticated: true};
        
      })
      .then(res => this.props.history.push('/dashboard'))
      .catch(err => {
       console.log(err);
      })
  };

    render() {
      const { errors } = this.state;
      return (
        <div className="main">
            <div className="pillar">
              <h1 className="lead brand">
                  Nutri<span className = "highlight">Vice</span>
              </h1>
              <div className = "quote">
                <p className="display-4 quotes">
                  {/* <h3 className="quotes"> Famous quote</h3> */}
                  <h4 className="quotes"> “Healthy eating is a way of life, so it’s important to establish routines that are simple, realistically, and ultimately livable.”</h4>
                  <h6 className="quotes">– Horace</h6>
                </p>
              </div>
                 
              {/* user signin form */}
              <form className="signin" noValidate onSubmit={this.onSubmit}>
              <div className="mb-3
              ">
                 <label htmlFor="email" className="form-label">Email</label>
                 <input type="email" className="form-control" aria-describedby="emailhelp" 
                 onChange={this.onChange}
                 value={this.state.email}
                 error={errors.email}
                 id="email"
                 type="email"
                 />
              </div>
              <div className="mb-3">
                 <label htmlFor="password" className="form-label">Password</label>
                 <input type="password" className="form-control" aria-describedby="emailhelp"
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                 />
              </div>
              <button type="submit"  className="btn btn-primary">Signin</button>
              <p className="register grey-text text-darken-1">
                Don't have an account? <a href="/signup">Register</a>
              </p>
            </form>
            {/* sales texts */}
            </div>
             <div>
            
             </div>
  
        </div>
      )
    }
}

export default Signin;