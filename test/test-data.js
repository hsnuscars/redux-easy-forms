import { _parseSchema } from '../src/REFormsEnhance';

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
