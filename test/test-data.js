import { _parseSchema } from '../src/REFormsEnhance';


/* ----- CONST ----- */

export const ERROR_1        = 'Error message 1';
export const ERROR_2        = 'Error message 2';
export const SERVER_ERROR_1 = 'Server error message 1';
export const SERVER_ERROR_2 = 'Server error message 2';


/* ----- BASE SCHEMA ----- */

const emailValidators = [
  { fn: ( str ) => Boolean( str ), error: 'Email is required' }
];

const passwordValidators = [
  { fn: ( str ) => Boolean( str ), error: 'Password is required' }
];

const schema = {
  userForm: {
    email:    { type: 'text',     validators: emailValidators },
    password: { type: 'password', validators: passwordValidators }
  },
  profileForm: {
    gender:   { type: 'radio', value: 'female' },
    sports:   { type: 'checkbox', multiple: true }
  }
};

export const libData = {
  data:     _parseSchema( schema ).data,
  fns:      _parseSchema( schema ).fns,
  dispatch: () => {}
};

/* ----- ERRORS DATA ----- */

const schemaErrors = {
  emailsForm: {
    emailCorrect:   { type: 'text', value: 'correct@example.com', validators: emailValidators },
    emailIncorrect: { type: 'text', value: 'incorrect', validators: emailValidators },
    emailEmpty:     { type: 'text', value: '', validators: emailValidators }
  }
};

export const libDataErrors = {
  data:     _parseSchema( schemaErrors ).data,
  fns:      _parseSchema( schemaErrors ).fns,
  dispatch: () => {}
};
