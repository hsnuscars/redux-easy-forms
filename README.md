![Alt text](./src/logo-reforms.jpg)

redux-easy-forms
=================

> Work-in-progress, not ready for "public consumption"...

### Forms got you down? Try REForms!

* Define your fields via a simple "schema" object
* REForms automatically flows your form data through Redux state
* Use a friendly API to interact with your forms and data
* Supply your own validation functions and error messages, sanitizers, filters
* Use it with raw HTML inputs, React-Bootstrap, custom components
* Lightweight, no dependencies, under 40Kb!

> The intention behind REForms is a *simple* library to minimize the tedium of dealing with client-side forms. Its focus is on capturing/setting of form data, validations, and props generation. You still need to render your own inputs in JSX, write onSubmit handlers, communicate with your backend, etc.

> Major thanks to [@saltycrane](https://github.com/saltycrane) for initial brainstorming & contributions!


### Install
```
npm install redux-easy-forms --save
```

1) Add `REFormsReducer` to your Redux store as `REForms`:
```js
import { REFormsReducer } from 'redux-easy-forms';   // <---

const rootReducer = combineReducers({
  REForms: REFormsReducer,                           // <---
  /* ... */                                          // any other reducers..
});
```


2) Define your form fields, for example:
```js
const fields = {
  loginForm: {                                      // unique form key, per each form
    password: { type: 'password' }                  // unique field key, per each input name
    email:    {},                                   // empty obj ok, assumes input type of "text"
    phone:    { validators: phoneValidators },      // can specify validator, filters..
  },                           
  profileForm: {
    gender:   { type: 'radio', value: 'female' },   // can set init value, other props
    sports:   { type: 'checkbox', multiple: true }  // when 'multiple', vals are stored as arrays
  }
};
```

3) Wrap any of your Redux-connected components with `REFormsEnhance` (a higher order component), and pass in your *schema*. Perhaps it's a `UserPage` component, using the above form definition:
```js
import { REFormsEnhance } from 'redux-easy-forms';  // <---

class UserPage extends React.Component { /* ... */ }

export default connect(
  ( state ) => ({ /* ... */ }),
  ( dispatch ) => ({ /* ... */ })
)( REFormsEnhance( UserPage, fields ) );            // <---
```

The enhanced component automatically gets `this.props.REForms`.

> For any given form definition, you should apply `REFormsEnhance` only once within your React app, preferably at the top of the component tree. You can pass it down to lower sub-components via props...


### Usage
The `REForms` prop provides a handy API to your forms data:

```js
const f = this.props.REForms;   // TIP: acquire a short reference to the API
```

Now, let's say you want to render the `email` input, all you need is:

```js
<input
  placeholder="Email"
  { ...f.props( 'email' ) }
/>
<p className="error">{ f.error( 'email' ) }</p>
```

As long as the field key matches up with your schema, the `props()` method returns all the necessary props and we use the handy ES6 `...` spread operator to provide them to the input component. No need to specify all those props manually!

Here is the example again, done with React-Bootstrap:
```js
import { FormGroup, FormControl, HelpBlock } from 'react-bootstrap';
```

```js
<FormGroup { ...( f.validationState( 'email' ) ) }>
  <FormControl
    placeholder="Email"
    { ...f.props( 'email' ) }
  />
  <FormControl.Feedback />
  <HelpBlock>{ f.error( 'email' ) }</HelpBlock>
</FormGroup>
```

> REForms does not expose its Redux state directly, nor does it provide any actions. It's all about the API.

In addition to the `props` method, you now have a host of other useful methods available. For example:
```js
f.get( 'gender' );                      // --> 'female'
f.set( { email: 'matt@example.com' } ); // --> address appears in email field
f.getForm( 'loginForm' );               // --> { email: 'matt@example.com', password: '', phone: '' }
f.isFormValid( 'loginForm' );           // --> false
```

For an interactive demo, try the [REForms API Playground](http://moarwick.github.io/redux-easy-forms/).


### API Methods
For the complete API, see the [API Documentation](api.md).


### Schema, Validators, Filters
When defining your schema, the following field props are relevant, though none are actually required. While an empty object will suffice, you *should* specify the `type` at least.

#### type: "text"|"tel"|"checkbox"|"radio"|"select"|"textarea"
The type of the input element. `"text"` is default. For number fields, `"tel"` is mobile-friendly.

#### multiple: true|false
`false` by default.

#### disabled: true|false
`false` by default.

#### value: string|number
Desired initial value.

#### validators: Object[]
An array of "validator objects", each specifying the `fn` validation function, the desired `error` message, and `arg` (optional).
```js
[
  { fn: isRequired, error: 'Password is required' },
  { fn: isLength, arg: { min: 4, max: undefined }, error: 'Password too short' }
]
```

The `fn` function will receive the input's `value` as the first argument, and `arg` as the second argument (if specified). The functions will be run per the order in the array, and any error messages accumulate in the field's `errors` prop. Use your own functions, or pull in from a suitable validation library. The [demo schema](src/demos/form-schema.js) does both.

#### filters: Object
An object containing up to three functions:
```js
{
  in:      trimToPhoneLength,  // sanitizer
  display: toPhone,            // display filter
  out:     toInt               // getter transform
}
```

The `in` function is applied during `onChange`, when reading-in an input field. The `display` function is applied to the main `value` prop, used during render. Finally, the `out` function is applied in REForm's `get` or `getForm` methods.


### To Do
* Tests
* Dynamic addition/removal of forms
* Nested sub-forms
