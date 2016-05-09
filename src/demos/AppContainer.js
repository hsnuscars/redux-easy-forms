import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'react-bootstrap';

import NavBar from './Nav';

class AppContainer extends Component {

  render() {
    // Hide/show navbar.  Get prop from react-router.
    const { hidenav } = this.props.routes[1];

    return (
      <div>
        { !hidenav && <NavBar /> }
        <Grid>
          { this.props.children }
        </Grid>
      </div>
    );
  }
}

export default connect( ( state ) => {
  return state;
})( AppContainer );
