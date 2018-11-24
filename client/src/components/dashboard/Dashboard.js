import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; 
import { getCurrentPorfile } from '../../actions/profileActions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentPorfile()
  }
  
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    )
  }
}

export default connect(null, { getCurrentPorfile })(Dashboard);