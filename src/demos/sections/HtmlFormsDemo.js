import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { colAccent } from '../App';

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
    paddingBottom:   10
  }
};


export default class HtmlFormsDemo extends React.Component {

  render() {
    const f = this.props.REForms;

    return (
      <div>
        <Row>
          <Col xs={ 12 } >
            <code style={ styles.code }>userForm:</code>
          </Col>
        </Row>
        <Row>
          <Col xs={ 12 } >
            <input
              style={ styles.block }
              placeholder="Email"
              { ...f.props( 'email' ) }
            />
            <p style={ styles.error }>{ f.error( 'email' ) }</p>

            <input
              style={ styles.block }
              placeholder="Password"
              { ...f.props( 'password' ) }
            />
            <p style={ styles.error }>{ f.error( 'password' ) }</p>

            <input
              style={ styles.block }
              placeholder="Phone Number"
              { ...f.props( 'phone' ) }
            />
            <p style={ styles.error }>{ f.error( 'phone' ) }</p>

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

            <label style={ styles.label }>
              <input
                { ...f.propsChecked( 'sports', 'running' ) }
              />
              &nbsp;Running
            </label>

            <label style={ styles.label }>
              <input
                { ...f.propsChecked( 'sports', 'biking' ) }
              />
              &nbsp;Biking
            </label>
          </Col>

          <Col xs={ 6 }>
            <label>Radios</label>
            <br />

            <label style={ styles.label }>
              <input
                { ...f.propsChecked( 'gender', 'female' ) }
              />
              &nbsp;Female
            </label>

            <label style={ styles.label }>
              <input
                { ...f.propsChecked( 'gender', 'male' ) }
              />
              &nbsp;Male
            </label>
          </Col>
        </Row>

        <Row style={{ marginTop: '10px' }}>
          <Col xs={ 12 }>
            <label>Select</label>
            <br/>
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
    );
  }
}
