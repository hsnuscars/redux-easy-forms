import React from 'react';
import { connect } from 'react-redux';

import { Grid, Row, Col, Form, InputGroup, FormGroup, FormControl, Button } from 'react-bootstrap';

import HtmlFormsDemo from './sections/HtmlFormsDemo';
import ReactBsFormsDemo from './sections/ReactBsFormsDemo';

import { REFormsEnhance } from '../index';         // <--- REForms HOC decorator

import { demoSchema } from './form-schema';

import logoSvg from './logo-reforms-demo.svg';
import logoGithub from './logo-github.svg';

export const colAccent = '#E54630';
export const colBg     = '#F0D294';
export const colBgLite = '#f8e7c3';
export const colBgDark = '#b7a581';


// the main App component, includes other sub-components
class App extends React.Component {
  constructor( props ) {
    super( props );

    // initial demo settings
    this.state = {
      inputs:       'react-bs',
      method:       'getForm',
      fieldKey:     'email',
      formKey:      '',
      setValue:     '',
      setError:     '',
      checkedValue: 'running'
    };
  }

  render() {
    console.log( 'render...' );

    const f = this.props.REForms;                   // <-- bring in API (good idea to shorten)
    const { inputs, method } = this.state;

    return (
      <div style={ styles.body }>
        <div style={ styles.header }>
          <Grid style={ styles.headerGrid }>
            <img src={ logoSvg } style={ styles.logo }/>
            <a style={ styles.gitHub } href="https://github.com/moarwick/redux-easy-forms">
              <img src={ logoGithub } style={ styles.logoGithub }/>
            </a>
            <div style={ styles.headerTitle }>API Playground</div>
          </Grid>
        </div>

        <Grid>
          <Row>

            <Col sm={ 4 } xs={ 12 } style={ styles.containerForms }>
              <h3>Form Components</h3>
              <FormGroup bsSize="large">
                <FormControl
                  componentClass="select"
                  value={ this.state.inputs }
                  onChange={ ( e ) => { this.setState( { inputs: e.target.value } ); } }
                  style={ styles.mainSelect }
                >
                  <option value="html">Raw HTML</option>
                  <option value="react-bs">React-Bootstrap</option>
                </FormControl>
              </FormGroup>

              { inputs === 'html'     && <HtmlFormsDemo    REForms={ f } /> }
              { inputs === 'react-bs' && <ReactBsFormsDemo REForms={ f } /> }
            </Col>

            <Col sm={ 8 } xs={ 12 } style={ styles.containerApi }>
              <h3>Methods</h3>
              <FormGroup bsSize="large">
                <FormControl
                  componentClass="select"
                  value={ this.state.method }
                  onChange={ this._handleMethodChange }
                  bsSize="large"
                  style={ styles.mainSelect }
                >
                  <option value="props">props</option>
                  <option value="propsChecked">propsChecked</option>
                  <option value="error">error</option>
                  <option value="validationState">validationState</option>
                  <option value="get">get</option>
                  <option value="getForm">getForm</option>
                  <option value="set">set</option>
                  <option value="unset">unset</option>
                  <option value="unsetForm">unsetForm</option>
                  <option value="clear">clear</option>
                  <option value="clearForm">clearForm</option>
                  <option value="isValid">isValid</option>
                  <option value="isFormValid">isFormValid</option>
                  <option value="isFormDirty">isFormDirty</option>
                  <option value="setPristine">setPristine</option>
                  <option value="setFormPristine">setFormPristine</option>
                  <option value="setServerErrors">setServerErrors</option>
                </FormControl>
              </FormGroup>

              { method === 'props' &&
                <div>
                  <p style={ styles.docs }>Get all REForms props for a given input field.</p>
                  <pre style={ styles.code }>
                    <span style={ styles.fn }>{ `f.props( '${ this.state.fieldKey }' )` }</span>
                    { this._renderSelectField() }
                  </pre>
                  <pre style={ styles.code }>{ JSON.stringify( this._serializeProps( f.props( this.state.fieldKey ) ), null, 2 ) }</pre>
                </div>
              }

              { method === 'propsChecked' &&
                <div>
                  <p style={ styles.docs }>Get all relevant props for an input component of type <em>checkbox</em> or <em>radio</em>.</p>
                  <pre style={ styles.code }>
                    <span style={ styles.fn }>{ `f.propsChecked( '${ this.state.fieldKey }', '${ this.state.checkedValue }' )` }</span>
                    { this._renderSelectCheckedField() }
                  </pre>
                  <pre style={ styles.code }>{ JSON.stringify( this._serializeProps( f.propsChecked( this.state.fieldKey, this.state.checkedValue ) ), null, 2 ) }</pre>
                </div>
              }

              { method === 'error' &&
                <div>
                  <p style={ styles.docs }>Get the first error message for a given input field, subject to current status of <em>focused</em> and/or <em>touched</em>.</p>
                  <pre style={ styles.code }>
                    <span style={ styles.fn }>{ `f.error( '${ this.state.fieldKey }' )` }</span>
                    { this._renderSelectField() }
                  </pre>
                  <pre style={ styles.code }>{ f.error( this.state.fieldKey) }</pre>
                </div>
              }

              { method === 'validationState' &&
                <div>
                  <p style={ styles.docs }>Primarily a <em>React-Bootstrap</em> helper, returns an object with the <em>validationState</em> prop, or en empty object.</p>
                  <pre style={ styles.code }>
                    <span style={ styles.fn }>{ `f.validationState( '${ this.state.fieldKey }' )` }</span>
                    { this._renderSelectField() }
                  </pre>
                  <pre style={ styles.code }>{ JSON.stringify( this._serializeProps( f.validationState( this.state.fieldKey ) ), null, 2 ) }</pre>
                </div>
              }

              { method === 'get' &&
                <div>
                  <p style={ styles.docs }>Get a field's "out" value (value processed through the <em>out</em> filter, if specified in the schema). Fields defined in schema as <em>multiple</em>, return arrays of values.</p>
                  <pre style={ styles.code }>
                    <span style={ styles.fn }>{ `f.get( '${ this.state.fieldKey }' )` }</span>
                    { this._renderSelectField() }
                  </pre>
                  <pre style={ styles.code }>{ JSON.stringify( f.get( this.state.fieldKey ) ) }</pre>
                </div>
              }

              { method === 'getForm' &&
                <div>
                  <p style={ styles.docs }>Get an object of key-value pairs of all fields and "out" values in a single form, several forms, or all forms.</p>
                  <pre style={ styles.code }>
                    <span style={ styles.fn }>{ `f.getForm(${ this.state.formKey ? " '" + this.state.formKey + "' " : '' })` }</span>
                    { this._renderSelectForm() }
                  </pre>
                  <pre style={ styles.code }>{ JSON.stringify( f.getForm( this.state.formKey ), null, 2 ) }</pre>
                </div>
              }

              { method === 'set' &&
                <div>
                  <p style={ styles.docs }>Set a new value into a field, or update several fields at once. Any incoming value will be first run through the field's "in" filter, if specified in schema.</p>
                  <pre style={ styles.code }>
                    <span style={ styles.fn }>{ `f.set( { ${ this.state.fieldKey }: '${ this.state.setValue }' } )` }</span>
                    { this._renderSelectField() }
                  </pre>
                  <InputGroup>
                    <FormGroup>
                      <FormControl type="text" placeholder="value"
                        value={ this.state.setValue }
                        onChange={ this._handleChangeSetValue }
                      />
                    </FormGroup>
                    <InputGroup.Button>
                      <Button bsStyle="primary" onClick={ this._handleSet }>set</Button>
                    </InputGroup.Button>
                  </InputGroup>
                </div>
              }

              { method === 'unset' &&
                <div>
                  <p style={ styles.docs }>Reset a single field, or several fields, to their <em>pristine</em> state.</p>
                  <pre style={ styles.code }>
                    <span style={ styles.fn }>{ `f.unset( '${ this.state.fieldKey }' )` }</span>
                    { this._renderSelectField() }
                  </pre>
                  <Button bsStyle="primary"
                    onClick={ this._handleUnset }
                  >
                    unset
                  </Button>
                </div>
              }

              { method === 'unsetForm' &&
                <div>
                  <p style={ styles.docs }>Reset all field values in a single form, reset multiple forms, or reset all forms, to their <em>pristine</em> state.</p>
                  <pre style={ styles.code }>
                    <span style={ styles.fn }>{ `f.unsetForm(${ this.state.formKey ? " '" + this.state.formKey + "' " : '' })` }</span>
                    { this._renderSelectForm() }
                  </pre>
                  <Button bsStyle="primary"
                    onClick={ this._handleUnsetForm }
                  >
                    unsetForm
                  </Button>
                </div>
              }

              { method === 'clear' &&
                <div>
                  <p style={ styles.docs }>Clear a single field, or several fields. Simultaneously, the <em>touched</em> flag of each field set to <em>false</em>.</p>
                  <pre style={ styles.code }>
                    <span style={ styles.fn }>{ `f.clear( '${ this.state.fieldKey }' )` }</span>
                    { this._renderSelectField() }
                  </pre>
                  <Button bsStyle="primary"
                    onClick={ this._handleClear }
                  >
                    clear
                  </Button>
                </div>
              }

              { method === 'clearForm' &&
                <div>
                  <p style={ styles.docs }>Clear all fields in a single form, in multiple forms, or clear all forms. Simultaneously, the <em>touched</em> flag of each field set to <em>false</em>.</p>
                  <pre style={ styles.code }>
                    <span style={ styles.fn }>{ `f.clearForm(${ this.state.formKey ? " '" + this.state.formKey + "' " : '' })` }</span>
                    { this._renderSelectForm() }
                  </pre>
                  <Button bsStyle="primary"
                    onClick={ this._handleClearForm }
                  >
                    clearForm
                  </Button>
                </div>
              }

              { method === 'isValid' &&
                <div>
                  <p style={ styles.docs }>Check a single field, or several fields, for presence of <em>errors</em> and/or <em>serverErrors</em>. Unlike <small><code>error()</code></small>, cares nothing for status of <em>focused</em> or <em>touched</em>.</p>
                  <pre style={ styles.code }>
                    <span style={ styles.fn }>{ `f.isValid( '${ this.state.fieldKey }' )` }</span>
                    { this._renderSelectField() }
                  </pre>
                  <pre style={ styles.code }>{ JSON.stringify( f.isValid( this.state.fieldKey ) ) }</pre>
                </div>
              }

              { method === 'isFormValid' &&
                <div>
                  <p style={ styles.docs }>Check all fields in a single form, in several forms, or in all forms, for presence of <em>errors</em> and/or <em>serverErrors</em>.</p>
                  <pre style={ styles.code }>
                    <span style={ styles.fn }>{ `f.isFormValid(${ this.state.formKey ? " '" + this.state.formKey + "' " : '' })` }</span>
                    { this._renderSelectForm() }
                  </pre>
                  <pre style={ styles.code }>{ JSON.stringify( f.isFormValid( this.state.formKey ) ) }</pre>
                </div>
              }

              { method === 'isFormDirty' &&
                <div>
                  <p style={ styles.docs }>Check if any fields in a single form, in several forms, or in all forms, were modified from their <em>pristine</em> state.</p>
                  <pre style={ styles.code }>
                    <span style={ styles.fn }>{ `f.isFormDirty(${ this.state.formKey ? " '" + this.state.formKey + "' " : '' })` }</span>
                    { this._renderSelectForm() }
                  </pre>
                  <pre style={ styles.code }>{ JSON.stringify( f.isFormDirty( this.state.formKey ) ) }</pre>
                </div>
              }

              { method === 'setPristine' &&
                <div>
                  <p style={ styles.docs }>Set a single field, or several fields, as <em>pristine</em> per their current value. Both <em>touched</em> and <em>dirty</em> are also reset.</p>
                  <pre style={ styles.code }>
                    <span style={ styles.fn }>{ `f.setPristine( '${ this.state.fieldKey }' )` }</span>
                    { this._renderSelectField() }
                  </pre>
                  <Button bsStyle="primary"
                    onClick={ this._handleSetPristine }
                  >
                    setPristine
                  </Button>
                </div>
              }

              { method === 'setFormPristine' &&
                <div>
                  <p style={ styles.docs }>Set all fields in a single form, in several forms, ar in all forms, as <em>pristine</em> per their current values. Both <em>touched</em> and <em>dirty</em> are reset.</p>
                  <pre style={ styles.code }>
                    <span style={ styles.fn }>{ `f.setFormPristine(${ this.state.formKey ? " '" + this.state.formKey + "' " : '' })` }</span>
                    { this._renderSelectForm() }
                  </pre>
                  <Button bsStyle="primary"
                    onClick={ this._handleSetFormPristine }
                  >
                    setFormPristine
                  </Button>
                </div>
              }

              { method === 'setServerErrors' &&
                <div>
                  <p style={ styles.docs }>Set "external" error message(s), e.g., from a server response, into field(s).</p>
                  <pre style={ styles.code }>
                    <span style={ styles.fn }>{ `f.setServerErrors( { ${ this.state.fieldKey }: '${ this.state.setError }' } )` }</span>
                    { this._renderSelectField() }
                  </pre>
                  <InputGroup>
                    <FormGroup>
                      <FormControl type="text" placeholder="value"
                        placeholder="e.g., This email address is already registered."
                        value={ this.state.setError }
                        onChange={ this._handleChangeSetError }
                      />
                    </FormGroup>
                    <InputGroup.Button>
                      <Button bsStyle="primary" onClick={ this._handlesetServerErrors }>setServerErrors</Button>
                    </InputGroup.Button>
                  </InputGroup>
                </div>
              }

            </Col>

          </Row>
        </Grid>
      </div>
    );
  }

  /* --- RENDER PARTIALS --- */

  _renderSelectField() {
    return (
      <FormGroup bsSize="small" style={{ float: 'right', margin: 0 }}>
        <FormControl
          componentClass="select"
          value={ this.state.fieldKey }
          onChange={ this._handleFieldKeyChange }
          style={ styles.subSelect }
        >
          <option value="email">email</option>
          <option value="password">password</option>
          <option value="phone">phone</option>
          <option value="sports">sports</option>
          <option value="gender">gender</option>
          <option value="make">make</option>
          <option value="upgrades">upgrades</option>
        </FormControl>
      </FormGroup>
    );
  }

  _renderSelectCheckedField() {
    return (
      <FormGroup bsSize="small" style={{ float: 'right', margin: 0 }}>
        <FormControl
          componentClass="select"
          style={{ float: 'right'}}
          value={ this.state.fieldKey }
          onChange={ this._handleFieldKeyChange }
          style={ styles.subSelect }
        >
          <option value="sports">sports</option>
          <option value="gender">gender</option>
        </FormControl>
      </FormGroup>
    );
  }


  _renderSelectForm() {
    return (
      <FormGroup bsSize="small" style={{ float: 'right', margin: 0 }}>
        <FormControl
          componentClass="select"
          style={{ float: 'right'}}
          value={ this.state.formKey }
          onChange={ ( e ) => { this.setState({ formKey: e.target.value }); } }
          style={ styles.subSelect }
        >
          <option value="userForm">userForm</option>
          <option value="profileForm">profileForm</option>
          <option value="">no arg (all forms)</option>
        </FormControl>
      </FormGroup>
    );
  }


  /* --- DEMO HANDLERS --- */

  _handleMethodChange = ( e ) => {
    const method = e.target.value;
    let fieldKey     = this.state.fieldKey;
    let checkedValue = this.state.checkedValue;

    if (  method === 'propsChecked' ) {
      if ( fieldKey !== 'sports' && fieldKey !== 'gender' ) {
        fieldKey = 'sports';
      }

      checkedValue = fieldKey === 'sports' ? 'running' : 'female';
    }

    this.setState({ method, fieldKey, checkedValue });
  }


  _handleFieldKeyChange = ( e ) => {
    const fieldKey = e.target.value;
    let checkedValue = this.state.checkedValue;
    if ( fieldKey === 'sports' ) { checkedValue = 'running'; }
    if ( fieldKey === 'gender' ) { checkedValue = 'female'; }
    this.setState( { fieldKey, checkedValue } );
  }


  _handleChangeSetValue = ( e ) => {
    this.setState( { setValue: e.target.value } );    // TODO: should be using getValue()?
  }


  _handleChangeSetError = ( e ) => {
    this.setState( { setError: e.target.value } );    // TODO: should be using getValue()?
  }


  _handleSet = () => {
    const f = this.props.REForms;
    let value;

    try {
      value = JSON.parse( this.state.setValue );
    } catch( e ) {
      value = this.state.setValue;
    }
    const dataObj = { [ this.state.fieldKey ]: value };
    f.set( dataObj );
  }

  _handlesetServerErrors = () => {
    const f = this.props.REForms;
    const dataObj = { [ this.state.fieldKey ]: this.state.setError };
    f.setServerErrors( dataObj );
  }


  _handleUnset = () => {
    const f = this.props.REForms;
    f.unset( this.state.fieldKey );
  }


  _handleUnsetForm = () => {
    const f = this.props.REForms;
    f.unsetForm( this.state.formKey );
  }


  _handleClear = () => {
    const f = this.props.REForms;
    f.clear( this.state.fieldKey );
  }


  _handleClearForm = () => {
    const f = this.props.REForms;
    f.clearForm( this.state.formKey );
  }


  _handleSetPristine = () => {
    const f = this.props.REForms;
    f.setPristine( this.state.fieldKey );
  }


  _handleSetFormPristine = () => {
    const f = this.props.REForms;
    f.setFormPristine( this.state.formKey );
  }


  /* ---- HELPERS ---- */


  // serialize functions in props (to show up in stringified output)
  _serializeProps( obj ) {
    let serialObj = { ...obj };

    Object.keys( obj ).forEach( ( key ) => {
      let val = serialObj[ key ];
      if ( typeof val === 'function' ) { serialObj[ key ] = `${ val.name }()`; }
    });

    return serialObj;
  }
}


/* ---- CONNECT REDUX TO APP, ENHANCE WITH REFORMS ---- */

export default connect(
  ( state ) => ({
    // your mapStateToProps here...
  }),
  ( dispatch ) => ({
    // your mapDispatchToProps here...
  })
)( REFormsEnhance( App, demoSchema ) );      // <-- decorate with REForms, and supply your form "schema"


const styles = {
  header: {
    backgroundColor: colAccent,
    color:           colBg,
    height:          75,
    paddingTop:      10,
    marginBottom:    10
  },
  headerGrid: {
    position: 'relative'
  },
  logo: {
    position: 'absolute',
    left:     10,
    width:    250
  },
  headerTitle: {
    position: 'absolute',
    left:     280,
    top:      5,
    fontSize: 36
  },
  gitHub: {
    position: 'absolute',
    right:    15,
    top:      5
  },
  logoGithub: {
    width: 45
  },
  mainSelect: {
    backgroundColor: colAccent,
    color:           colBg,
    border:          'none',
    fontWeight:      'bold',
    boxShadow:       'none'
  },
  subSelect: {
    backgroundColor: colAccent,
    color:           colBgLite,
    border:          'none',
    boxShadow:       'none'
  },
  code: {
    backgroundColor: colBgLite,
    border:          'none'
  },
  fn: {
    display:   'inline-block',
    marginTop: 6,
    color:     colAccent
  }
};
