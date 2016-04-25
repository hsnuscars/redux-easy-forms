import React from 'react';
import {
  Row,
  Col,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Checkbox,
  Radio
} from 'react-bootstrap';


export default class ReactBsFormsDemo extends React.Component {

  render() {
    const f = this.props.REForms;

    return (
      <div>
        <Row>
          <Col xs={ 12 } >
            <FormGroup { ...( f.validationState( 'email' ) ) }>
              <FormControl
                placeholder="Email"
                { ...f.props( 'email' ) }
              />
              <FormControl.Feedback />
              <HelpBlock>{ f.error( 'email' ) }</HelpBlock>
            </FormGroup>

            <FormGroup { ...( f.validationState( 'password' ) ) }>
              <FormControl
                placeholder="Password"
                { ...f.props( 'password' ) }
              />
              <FormControl.Feedback />
              <HelpBlock>{ f.error( 'password' ) }</HelpBlock>
            </FormGroup>

            <FormGroup { ...( f.validationState( 'phone' ) ) }>
              <FormControl
                placeholder="Phone"
                { ...f.props( 'phone' ) }
              />
              <FormControl.Feedback />
              <HelpBlock>{ f.error( 'phone' ) }</HelpBlock>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={ 6 }>
            <ControlLabel>Sports</ControlLabel>
            <Checkbox { ...f.propsChecked( 'sports', 'running' ) }>
              Running
            </Checkbox>
            <Checkbox { ...f.propsChecked( 'sports', 'biking' ) }>
              Biking
            </Checkbox>
          </Col>

          <Col xs={ 6 }>
            <ControlLabel>Gender</ControlLabel>
            <Radio { ...f.propsChecked( 'gender', 'female' ) }>
              Female
            </Radio>
            <Radio { ...f.propsChecked( 'gender', 'male' ) }>
              Male
            </Radio>
          </Col>
        </Row>

        <Row>
          <Col xs={ 12 }>
            <FormGroup>
              <ControlLabel>Make</ControlLabel>
              <FormControl componentClass="select" { ...f.props( 'make' ) }>
                <option value="acura">Acura</option>
                <option value="buick">Buick</option>
                <option value="chrysler">Chrysler</option>
              </FormControl>
            </FormGroup>

            <FormGroup>
              <ControlLabel>Upgrades</ControlLabel>
              <FormControl componentClass="select" { ...f.props( 'upgrades' ) }>
                <option value="audio">Audio</option>
                <option value="leather">Leather</option>
                <option value="wheels">Wheels</option>
              </FormControl>
            </FormGroup>
          </Col>
        </Row>

      </div>
    );
  }
}
