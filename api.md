<h2>REForms API Methods</h2>

[props](api.md#propsfieldkey-formkey--object) |
[propsChecked](api.md#propscheckedfieldkey-checkedvalue-formkey--object) |
[error](api.md#errorfieldkey-formkey--string) |
[validationState](api.md#validationstatefieldkey-formkey--object) |
[get](api.md#getfieldkey-formkey--) |
[getForm](api.md#getformformkey--object) |
[set](api.md#setsetdata-formkey) |
[reset](api.md#resetfieldkey-formkey) |
[resetForm](api.md#resetformformkey) |
[isValid](api.md#isvalidfieldkey-formkey--boolean) |
[isFormValid](api.md#isformvalidformkey--boolean) |
[isFormDirty](api.md#isformdirtyformkey--boolean) |
[setPristine](api.md#setpristinefieldkey-formkey) |
[setFormPristine](api.md#setformpristineformkey) |
[setServerErrors](api.md#setservererrorssetdata-formkey)

#### props(fieldKey, [formKey]) ⇒ <code>Object</code>
Get all relevant props for a given input field.
Use this method to deliver props to your fields, or to check status of any individual prop, e.g. 'dirty', 'focused', etc.
For 'select' and 'textarea' inputs, the prop 'componentClass' (React-Bootstrap specific) replaces 'type' (causes warnings in Chrome).

**Example**: <code>f.props( 'email', 'userForm' )</code>

**Returns**: <code>Object</code> - Object containing all props, or an empty 'value' prop only

| Param | Type | Description |
| --- | --- | --- |
| fieldKey | <code>string</code> | The key of the requested field |
| [formKey] | <code>string</code> | The field's formKey (optional, recommended) |


#### propsChecked(fieldKey, checkedValue, [formKey]) ⇒ <code>Object</code>
Get all relevant props for an input component of type 'checkbox' or 'radio'.
The desired 'checkedValue' must be specified to determines the status of the 'checked' prop.

**Example**: <code>f.propsChecked( 'sports', 'running', 'profileForm' )</code>

**Returns**: <code>Object</code> - Object containing all props, or an empty 'value' prop only  

| Param | Type | Description |
| --- | --- | --- |
| fieldKey | <code>string</code> | The key of the requested field |
| checkedValue | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | Desired value when input is 'checked' |
| [formKey] | <code>string</code> | The field's formKey (optional, recommended) |


#### error(fieldKey, [formKey]) ⇒ <code>string</code>
Get the first error message for a given input field.
Checks for presence of 'serverErrors' first.
Ignores client-side errors if the field is currently 'focused' or hasn't been 'touched'.
Ignores server errors if the field is currently 'focused'.
To get all errors regardless of status, use the 'props()' method, keying in for 'errors' or 'serverErrors'.

**Example**: <code>f.error( 'email', 'userForm' )</code>

**Returns**: <code>string</code> - Error message, or an empty string  

| Param | Type | Description |
| --- | --- | --- |
| fieldKey | <code>string</code> | The key of the requested field |
| [formKey] | <code>string</code> | The field's formKey (optional, recommended) |


#### validationState(fieldKey, [formKey]) ⇒ <code>Object</code>
Primarily a React-Bootstrap helper, returns an object with the 'validationState' prop, or en empty object
The prop will be present only if it evaluates to "error" per above conditions, or to "success" for a 'dirty' (modified) field.

**Example**: <code>f.validationState( 'email', 'userForm' )</code>

**Returns**: <code>Object</code> - Object containing 'valdationState' prop, or an empty object  

| Param | Type | Description |
| --- | --- | --- |
| fieldKey | <code>string</code> | The key of the requested field |
| [formKey] | <code>string</code> | The field's formKey (optional, recommended) |


#### get(fieldKey, [formKey]) ⇒ <code>\*</code>
Get a field's "out" value (value processed through the 'out' filter, if specified in the schema).
Fields defined in schema as 'multiple' return arrays of "out" values.

**Example**: <code>f.get( 'email', 'userForm' )</code>

**Returns**: <code>\*</code> - The "out" value (a string, unless transformed by the 'out' filter)  

| Param | Type | Description |
| --- | --- | --- |
| fieldKey | <code>string</code> | The key of the requested field |
| [formKey] | <code>string</code> | The field's formKey (optional, recommended) |


#### getForm([formKey]) ⇒ <code>Object</code>
Get an object of key-value pairs of all fields and "out" values within a given form, or within multiple forms.
When requesting multiple forms, the data is nested. If no argument is supplied, returns ALL forms.

**Example**: <code>f.getForm( 'userForm' ), or f.getForm( [ 'userForm', 'profileForm' ] ), or f.getForm()</code>

**Returns**: <code>Object</code> - Object containing a form's key-vals, or several form sub-objects, or an empty object  

| Param | Type | Description |
| --- | --- | --- |
| [formKey] | <code>string</code> | The formKey of the requested form (if not supplied, returns all forms) |


#### set(setData, [formKey])
Set a new value into a field, or update several fields at once.
When setting values into a field defined as 'multiple', supply an array of values; single value acts as a "toggle".
Setting an empty string into a 'multiple' field gets converted into an empty array.
Any incoming value will be first run through the field's "in" filter, if specified in schema.
A value can also be an object of other props to be updated, e.g. { disabled: true }, but tread lightly!

**Example**: <code>f.set( { gender: 'female', sports: [ 'running' ] }, 'profileForm' )</code>


| Param | Type | Description |
| --- | --- | --- |
| setData | <code>Object</code> | The data object, with fieldKey and new value key-val pairs to be updated |
| [formKey] | <code>string</code> | The formKey of the form containing the fields in setData (optional, recommended) |


#### reset(fieldKey, [formKey])
Reset a single field, or several fields, to their 'pristine' state.

**Example**: <code>f.reset( 'email', 'userForm' ), or f.reset( [ 'email', 'password' ] )</code>


| Param | Type | Description |
| --- | --- | --- |
| fieldKey | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | The fieldKey(s) to be reset. |
| [formKey] | <code>string</code> | The fields' formKey (optional, recommended) |


#### resetForm(formKey)
Reset all field values in a single form, or reset multiple forms, to their 'pristine' state.
If no argument is supplied, resets ALL forms.

**Example**: <code>f.resetForm( 'userForm' ), or f.resetForm( [ 'userForm', 'profileForm' ] ), or f.resetForm()</code>


| Param | Type | Description |
| --- | --- | --- |
| formKey | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | The formKey(s) of the form(s) to be reset, or no arg to reset all |


#### clear(fieldKey, [formKey])
Clear a single field, or several fields.
Fields defined in schema as 'multiple' are reset as empty arrays.
Simultaneously, the 'touched' flag is also set to 'false'.

**Example**: <code>f.clear( 'email', 'userForm' ), or f.clear( [ 'email', 'password' ] )</code>


| Param | Type | Description |
| --- | --- | --- |
| fieldKey | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | The fieldKey(s) to be cleared. |
| [formKey] | <code>string</code> | The fields' formKey (optional, recommended) |


#### clearForm(formKey)
Clear all field values in a single form, or clear multiple forms.
If no argument is supplied, clear ALL forms.
Simultaneously, each field's 'touched' flag is also set to 'false'.

**Example**: <code>f.clearForm( 'userForm' ), or f.clearForm( [ 'userForm', 'profileForm' ] ), or f.clearForm()</code>


| Param | Type | Description |
| --- | --- | --- |
| formKey | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | The formKey(s) of the form(s) to be cleared, or no arg to clear all |


#### isValid(fieldKey, [formKey]) ⇒ <code>Boolean</code>
Check a single field, or several fields, for presence of 'errors' and/or 'serverErrors'.
Unlike 'error()', cares nothing for status of 'focused' or 'touched'.

**Example**: <code>f.isValid( 'email' ), or f.isValid( [ 'email', 'password' ] )</code>

**Returns**: <code>Boolean</code> - True if any errors found, false if none  

| Param | Type | Description |
| --- | --- | --- |
| fieldKey | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | The fieldKey(s) to be cleared |
| [formKey] | <code>string</code> | The fields' formKey (optional, recommended) |


#### isFormValid(formKey) ⇒ <code>Boolean</code>
Check all fields in a single form, or in multiple forms, for presence of 'errors' and/or 'serverErrors'.
If no argument is supplied, check ALL forms.

**Example**: <code>f.isFormValid( 'userForm' ), or f.isFormValid( [ 'userForm', 'profileForm' ] ), or f.isFormValid()</code>

**Returns**: <code>Boolean</code> - True if any errors found, false if none  

| Param | Type | Description |
| --- | --- | --- |
| formKey | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | The formKey(s) of the form(s) to be checked, or no arg to check all |


#### isFormDirty(formKey) ⇒ <code>Boolean</code>
Check if any fields within a single form, or within multiple forms, were modified from their 'pristine' state.
If no argument is supplied, check ALL forms.
To check a single field, use the 'props()' method, keying in for 'dirty'.

**Example**: <code>f.isFormDirty( 'userForm' ), or f.isFormDirty( [ 'userForm', 'profileForm' ] ), or f.isFormDirty()</code>

**Returns**: <code>Boolean</code> - True if any field(s) modified, false if none  

| Param | Type | Description |
| --- | --- | --- |
| formKey | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | The formKey(s) of the form(s) to be checked, or no arg to check all |


#### setPristine(fieldKey, [formKey])
Set a single field, or several fields, as 'pristine' per their current values.
Both 'touched' and 'dirty' are reset; from here on, 'dirty' and 'reset()' will be referencing the current values.

**Example**: <code>f.setPristine( 'email' ), or f.setPristine( [ 'email', 'password' ] )</code>


| Param | Type | Description |
| --- | --- | --- |
| fieldKey | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | The fieldKey(s) to be set as 'pristine'. |
| [formKey] | <code>string</code> | The fields' formKey (optional, recommended) |


#### setFormPristine(formKey)
Set all fields in a single form, or in multiple forms, as 'pristine' per their current values.
Both 'touched' and 'dirty' are reset; from here on, 'dirty' and 'reset()' will be referencing the current values.
If no argument is supplied, set fields across ALL forms as 'pristine'.

**Example**: <code>f.setFormPristine( 'userForm' ), or f.setFormPristine( [ 'userForm', 'profileForm' ] ), or f.setFormPristine()</code>


| Param | Type | Description |
| --- | --- | --- |
| formKey | <code>string</code> &#124; <code>Array.&lt;string&gt;</code> | The formKey(s) of the form(s) to be cleared, or no arg to clear all |


#### setServerErrors(setData, [formKey])
Set "external" error message(s), e.g., from a server response, into field(s).
Server errors get cleared automatically, as soon as the field value changes.
The error() method checks for presence of server errors before fetching validation errors.

**Example**: <code>f.setErrors( { email: 'Email taken', phone: 'Invalid phone number' }, 'userForm' )</code>


| Param | Type | Description |
| --- | --- | --- |
| setData | <code>Object</code> | Key-value pairs for all fields to receive error messages |
| [formKey] | <code>string</code> | The formKey of the form containing the fields in setData (optional, recommended) |
