import isEmail from 'validator/lib/isEmail';        // <--- any validation functions for REForms
import isLength from 'validator/lib/isLength';      // <--- e.g. from https://github.com/chriso/validator.js

import { trimLength, toPhone, toInt } from '../filters.js';            // TODO: rethink / how to best package?


const validators = {
  email: [
    {
      fn:    ( str ) => Boolean( str ),
      error: 'Email is required'
    },
    {
      fn:    isEmail,
      error: 'Invalid email format'
    }
  ],
  password: [
    {
      fn:    ( str ) => Boolean( str ),
      error: 'Password is required'
    },
    {
      fn:    isLength,
      arg:   { min: 4, max: undefined },
      error: 'Password is too short'
    }
  ]
};


const phoneFilters = {
  in:      trimLength( 14 ),
  display: toPhone,
  out:     toInt
};


export const demoSchema = {
  userForm: {
    email:    { type: 'text', value: 'matt@example.com', validators: validators.email },
    password: { type: 'password', validators: validators.password },
    phone:    { type: 'tel', filters: phoneFilters }
  },
  profileForm: {
    sports:   { type: 'checkbox', multiple: true },
    gender:   { type: 'radio', value: 'female' },
    make:     { type: 'select', value: 'buick' },
    upgrades: { type: 'select', multiple: true }
  }
};
