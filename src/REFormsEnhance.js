import React from 'react';
import { connect } from 'react-redux';

import { initFormsAction } from './REFormsActions';
import * as api from './REFormsAPI';

/**
 * REForms HOC decorator
 */
export default function REFormsEnhance( Component, schema ) {

  class EnhancedComponent extends React.Component {

    /**
     * Before mounting any formified component:
     * - extract state-relevant field props & fns from user's schema
     * - backfill all fields with expected props (unless supplied)
     * - fire action to run validations on all fields and add the updated data structure to Redux
     * - retain fns on this.fns
     */
    componentWillMount() {
      const parsedSchema = _parseSchema( schema );
      this.fns           = parsedSchema.fns;

      this.props.dispatch( initFormsAction( parsedSchema.data, this.fns ) );
    }

    /**
     * Render the formified component, passing in REForms API via the 'REForms' prop
     */
    render() {
      const { REForms, dispatch, ...rest } = this.props;

      // Supply Redux state (data), user's fns, and dispatch to all methods (as 'libData')
      const libData = {
        data:     REForms,
        fns:      this.fns,
        dispatch: dispatch
      };

      const enhancedAPI = {
        props:           _apiEnhance( api.props,           libData ),
        propsChecked:    _apiEnhance( api.propsChecked,    libData ),
        error:           _apiEnhance( api.error,           libData ),
        validationState: _apiEnhance( api.validationState, libData ),
        get:             _apiEnhance( api.get,             libData ),
        getForm:         _apiEnhance( api.getForm,         libData ),
        set:             _apiEnhance( api.set,             libData ),
        reset:           _apiEnhance( api.reset,           libData ),
        resetForm:       _apiEnhance( api.resetForm,       libData ),
        clear:           _apiEnhance( api.clear,           libData ),
        clearForm:       _apiEnhance( api.clearForm,       libData ),
        isValid:         _apiEnhance( api.isValid,         libData ),
        isFormValid:     _apiEnhance( api.isFormValid,     libData ),
        isFormDirty:     _apiEnhance( api.isFormDirty,     libData ),
        setPristine:     _apiEnhance( api.setPristine,     libData ),
        setFormPristine: _apiEnhance( api.setFormPristine, libData ),
        setServerErrors: _apiEnhance( api.setServerErrors, libData )
      };

      return <Component REForms={ enhancedAPI } { ...rest } />;
    }
  }

  return connect(
    ( state ) => ({
      REForms: state.REForms
    })
  )( EnhancedComponent );
}

/**
 * Clone an object or an array recursively
 */
function cloneObjectRecursive(object) {
  let returnObject = null;
  if(Object.prototype.toString.call(object) === '[object Object]') {
    returnObject = {};
  } else if(Object.prototype.toString.call(object) === '[object Array]') {
    returnObject = [];
  } else {
    return object;
  }
  for(let indexKey in object) {
    returnObject[indexKey] = cloneObjectRecursive(object[indexKey]);
  }
  return returnObject;
}
/**
 * Parse user's schema, create a "mirror" data structure called 'fns', containing user's validators and filters
 * Add remaining expected state-related props to each field in schema
 * Return a new object, containing both data and fns
 */
export function _parseSchema( schema ) {
  let data = cloneObjectRecursive(schema);
  let fns  = {};

  Object.keys( data ).forEach( ( formKey ) => {
    fns[ formKey ] = {};

    Object.keys( data[ formKey ] ).forEach( ( fieldKey ) => {
      fns[ formKey ][ fieldKey ] = {};
      let fieldObj = data[ formKey ][ fieldKey ];

      // extract 'validate', 'filters' into fns, delete them from data
      [ 'validators', 'filters' ].forEach( ( prop ) => {
        if ( prop in fieldObj ) {
          fns[ formKey ][ fieldKey ][ prop ] = fieldObj[ prop ];
          delete fieldObj[ prop ];
        }
      });

      // backfill with default state-related props
      data[ formKey ][ fieldKey ] = { ..._getDefaultProps( fieldObj.type, fieldObj.multiple ), ...fieldObj };

      // store initial value under 'valuePristine'
      const value = data[ formKey ][ fieldKey ].value;
      data[ formKey ][ fieldKey ].valuePristine = fieldObj.multiple ? cloneObjectRecursive(value) : value;       // make a copy for arrays

    });
  });

  return { data, fns };
}


/**
 * Helper to return the default set of props per field we want in Redux
 */
const _getDefaultProps = ( type='text', multiple=false ) => {
  let props = {
    type,
    multiple,
    errors:           [],
    serverErrors:     [],
    disabled:         false,
    focused:          false,
    touched:          false,
    dirty:            false
  };

  props.value = multiple ? [] : '';

  return props;
};


/**
 * HOF helper to supply data, fns, and dispatch (packaged as 'libData') to all API methods
 */
const _apiEnhance = ( apiMethod, libData ) => ( ...args ) => apiMethod( libData, ...args );
