import { _parseSchema } from '../src/REFormsEnhance';

/* ----- CONST ----- */

export const FORMKEY_USERFORM     = 'userForm';
export const FORMKEY_PROFILEFORM  = 'profileForm';
export const ERROR_1              = 'Error message 1';
export const ERROR_2              = 'Error message 2';
export const SERVER_ERROR_1       = 'Server error message 1';
export const SERVER_ERROR_2       = 'Server error message 2';
export const VALUE_EMAIL          = 'matt@example.com';
export const VALUE_GENDER_FEMALE  = 'female';
export const VALUE_SPORTS_RUNNING = 'running';


/* ----- TEST SCHEMA ----- */

const emailValidators = [
   { fn: ( str ) => Boolean( str ), error: 'Email is required' }
];

const schema = {
  [ FORMKEY_USERFORM ]: {
    email:    { type: 'text', value: VALUE_EMAIL, validators: emailValidators },
    password: { type: 'password' }
  },
  [ FORMKEY_PROFILEFORM ]: {
    gender:   { type: 'radio', value: VALUE_GENDER_FEMALE },
    sports:   { type: 'checkbox', value: [ VALUE_SPORTS_RUNNING ], multiple: true }
  }
};

const parsedSchema = _parseSchema( schema  );

export const libData = {
  data:     parsedSchema.data,
  fns:      parsedSchema.fns,
  dispatch: () => {}
};
