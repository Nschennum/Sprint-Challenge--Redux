import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { getSmurfs, addSmurf, deleteSmurf } from '../actions';

class App extends Component {
  state = {
    name: '',
    age: '',
    height: ''
  };

  componentDidMount() {
    this.props.getSmurfs();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit() {
    this.props.addSmurf(this.state);
    this.setState({
      name: '',
      age: '',
      height: ''
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Smurf Village</h1>
        <img className='smurf__pic' src='https://www.smurf.com/images/homepage/houses/house--blue-roof.png' height= '100px'/>
        {this.props.smurfs.map(smurf => {
          return (
            <div key={smurf.id}>
              <h4>{smurf.name}</h4>
              <p>
                Age: {smurf.age} years | Height: {smurf.height}cm
              </p>
              <button onClick={() => this.props.deleteSmurf(smurf.id)}>
                Delete
              </button>
            </div>
          );
        })}
        <form onSubmit={() => this.handleSubmit()}>
          <input
            name="name"
            placeholder="Name"
            onChange={this.handleChange.bind(this)}
          />
          <input
            name="age"
            placeholder="Age"
            onChange={this.handleChange.bind(this)}
          />
          <input
            name="height"
            placeholder="Height"
            onChange={this.handleChange.bind(this)}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    smurfs: state.smurfs,
    isFetching: state.isFetching
  };
};

export default connect(mapStateToProps, { getSmurfs, addSmurf, deleteSmurf })(App);