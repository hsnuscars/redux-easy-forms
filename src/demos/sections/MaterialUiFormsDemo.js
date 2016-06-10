import React from 'react';
import { Row, Col } from 'react-bootstrap';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { colAccent, colBgDark } from '../App';

// some minimalist inline styling (for demo purposes)
const styles = {
  textFieldWrapper: {
    height: 75
  },
  code: {
    display:         'block',
    backgroundColor: 'transparent',
    color:           colAccent,
    padding:         '0 0 10px 0',
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
            <div style={ styles.textFieldWrapper }>
              <TextField
                floatingLabelText="Email"
                errorText={ f.error( 'email' ) }
                { ...f.props( 'email' ) }
                underlineStyle={ { borderColor: colBgDark } }
              />
            </div>

            <div style={ styles.textFieldWrapper }>
              <TextField
                floatingLabelText="Password"
                errorText={ f.error( 'password' ) }
                { ...f.props( 'password' ) }
                underlineStyle={ { borderColor: colBgDark } }
              />
            </div>

            <div style={ styles.textFieldWrapper }>
              <TextField
                floatingLabelText="Phone Number"
                errorText={ f.error( 'phone' ) }
                { ...f.props( 'phone' ) }
                underlineStyle={ { borderColor: colBgDark } }
              />
            </div>
          </Col>
        </Row>

        <br/><br/>

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

        <Row style={{ marginTop: 20 }}>
          <Col xs={ 12 }>
            <label>Select</label>
            <br/>

            <SelectField { ...f.props( 'make' ) }
              underlineStyle={ {borderColor: '#ab9569'} }
              iconStyle={ {fill: '#ab9569'} }
            >
              <MenuItem value="acura" primaryText="Acura" />
              <MenuItem value="buick" primaryText="Buick" />
              <MenuItem value="chrysler" primaryText="Chrysler" />
            </SelectField>

            <br/><br/>

            <label>Select Multiple</label>
            <br/>

            <em>Not supported in Material-UI </em>
            {/*
            <SelectField { ...f.props( 'upgrades' ) } >
              <MenuItem value="audio" primaryText="Premium Audio" />
              <MenuItem value="leather" primaryText="Leather Interior" />
              <MenuItem value="wheels" primaryText="Wheel Caps" />
            </SelectField>
            */}
          </Col>
        </Row>
        </div>
      </MuiThemeProvider>
    );
  }
}
