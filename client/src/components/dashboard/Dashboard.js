import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { getCurrentPorfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileAction from '../dashboard/ProfileAction';
class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentPorfile()
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashBoardContent;

    if(profile === null || loading) {
      dashBoardContent = <Spinner />
    } else {
        // Check if logged in user has profile data
        if(Object.keys(profile).length > 0) {
          dashBoardContent = (
            <div>
              <p className="lead text-muted">
                Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
              </p>
              <ProfileAction />
              {/* TODO: exp and edu*/}
              <div style={{ marginBottom: '60px' }} />
              <button
                onClick={this.onDeleteClick.bind(this)}
                className="btn btn-danger"
              >
                Delete My Account
              </button>
            </div>
          )
        } else {
          dashBoardContent = (
            <div>
              <p className="lead text-muted"> Welcome {user.name}</p>
              <p>You have not yet setup a profile, please add some info</p>
              <Link to="/create-profile" className="btn btn-lg btn-info">
                Create Profile
              </Link>
            </div>
          )
        }
    }
    
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4"> Dashboard </h1>
              {dashBoardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  getCurrentPorfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentPorfile, deleteAccount })(Dashboard);