import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

export default class NaviBar extends Component {

  render() {
    return (
      <div>
        <Navbar>
          <Nav onSelect={ this.onSelect } >
            <IndexLinkContainer to="/main">
              <NavItem>Demo</NavItem>
            </IndexLinkContainer>
            <IndexLinkContainer to="/sub">
              <NavItem>Empty</NavItem>
            </IndexLinkContainer>
          </Nav>
        </Navbar>
      </div>
    );
  }

  onSelect = ( selectedKey ) => {

  };
}
