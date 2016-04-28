import { _parseSchema } from '../src/REFormsEnhance';


/* ----- CONST ----- */

export const ERROR_1        = 'Error message 1';
export const ERROR_2        = 'Error message 2';
export const SERVER_ERROR_1 = 'Server error message 1';
export const SERVER_ERROR_2 = 'Server error message 2';


/* ----- TEST SCHEMA ----- */

const emailValidators = [
   { fn: ( str ) => Boolean( str ), error: 'Email is required' }
];

const schema = {
  userForm: {
    email:    { type: 'text', validators: emailValidators },
    password: { type: 'password' }
  },
  profileForm: {
    gender:   { type: 'radio', value: 'female' },
    sports:   { type: 'checkbox', multiple: true }
  }
};

const parsedSchema = _parseSchema( schema  );

export const libData = {
  data:     parsedSchema.data,
  fns:      parsedSchema.fns,
  dispatch: () => {}
};
