import React from 'react';
import { Row, Col } from 'react-bootstrap';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { colAccent } from '../App';

const injectTouchTapEvent = require('react-tap-event-plugin');
injectTouchTapEvent();

// some minimalist inline styling (for demo purposes)
const styles = {
  block: {
    display: 'block',
    width:   '100%'
  },
  rowMargin: {
    marginTop: '10px'
  },
  error: {
    fontSize: '14px',
    color:     'maroon',
    marginTop: 0
  },
  label: {
    display:    'block',
    fontWeight: 'normal'
  },
  code: {
    display:         'block',
    backgroundColor: 'transparent',
    color:           colAccent,
    paddingBottom:   10,
    opacity:         0.65
  }
};


export default class MaterialUiFormsDemo extends React.Component {

  render() {
    const f = this.props.REForms;

    return (
      <MuiThemeProvider muiTheme={ getMuiTheme() }>
        <div>
        <Row>
          <Col xs={ 12 } >
            <code style={ styles.code }>userForm:</code>
          </Col>
        </Row>
        <Row>
          <Col xs={ 12 } >
            <TextField
              hintText="Email"
              errorText={ f.error( 'email' ) }
              { ...f.props( 'email' ) }
            />

            <TextField
              hintText="Password"
              errorText={ f.error( 'password' ) }
              { ...f.props( 'password' ) }
            />

            <TextField
              hintText="Phone Number"
              errorText={ f.error( 'phone' ) }
              { ...f.props( 'phone' ) }
            />

          </Col>
        </Row>

        <Row>
          <Col xs={ 12 } >
            <code style={ styles.code }>profileForm:</code>
          </Col>
        </Row>

        <Row style={{ marginTop: '10px' }}>
          <Col xs={ 6 }>
            <label>Checkboxes</label>
            <br/ >

            <Checkbox
              label="Running"
              { ...f.propsChecked( 'sports', 'running' ) }
            />

            <Checkbox
              label="Biking"
              { ...f.propsChecked( 'sports', 'biking' ) }
            />
          </Col>

          <Col xs={ 6 }>
            <label>Radios</label>
            <br />

            <RadioButton
              label="Female"
              { ...f.propsChecked( 'gender', 'female' ) }
            />

            <RadioButton
              label="Male"
              { ...f.propsChecked( 'gender', 'male' ) }
            />
          </Col>
        </Row>

        <Row style={{ marginTop: '10px' }}>
          <Col xs={ 12 }>
            <label>Select</label>
            <br/>

            <SelectField { ...f.props( 'make' ) } >
              <MenuItem value="acura" primaryText="Acura" />
              <MenuItem value="buick" primaryText="Buick" />
              <MenuItem value="chrysler" primaryText="Chrysler" />
            </SelectField>

            <select
              style={ styles.block }
              { ...f.props( 'make' ) }
            >
              <option value="acura">Acura</option>
              <option value="buick">Buick</option>
              <option value="chrysler">Chrysler</option>
            </select>

            <br/>
            <label>Select Multiple</label>
            <br/>
            <select
              style={ styles.block }
              { ...f.props( 'upgrades' ) }
            >
              <option value="audio">Premium Audio</option>
              <option value="leather">Leather Interior</option>
              <option value="wheels">Wheel Caps</option>
            </select>
          </Col>
        </Row>
        </div>
      </MuiThemeProvider>
    );
  }
}
