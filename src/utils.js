/*
 * Check if object has no keys (is empty)
 */
export function isEmpty( obj ) {
  return !Object.keys( obj ).length;
}


/*
 * Recursive function to clone an object
 */
export function cloneObject( obj ) {
  if ( !obj || typeof obj !== 'object' ) { return obj; }

  const temp = obj.constructor();
  for ( var key in obj ) {
    temp[ key ] = cloneObject( obj[ key ] );
  }

  return temp;
}


/*
 * Return a copy of the supplied object, containing only the whitelisted props
 */
export function pick( obj, ...keys ) {
  const clonedObj = cloneObject( obj );
  const newObj    = {};
  keys.forEach( ( key ) => {
    if ( key in clonedObj ) { newObj[ key ] = clonedObj[ key ]; }
  });
  return newObj;
}


/*
 * Check if array is indeed a valid Array and contains a given value
 */
export function contains( array, value ) {
  return Array.isArray( array ) && array.includes( value );
}


/*
 * Return a copy of the supplied array, with one or more values removed
 */
export function without( array, ...values ) {
  let newArray = [ ...array ];
  values.forEach( ( value ) => {
    const index = newArray.indexOf( value );
    if ( index > -1 ) { newArray.splice( index, 1 ); }
    // TODO: make it remove all instances of value, currently nixes only the first one!
  });
  return newArray;
}


/*
 * Add or remove value to/from an array, depending if present
 */
export function toggle( array, value ) {
  contains( array, value ) ? array = without( array, value ) : array.push( value );
  return array;
}


/*
 * Check if two arrays have identical contents
 */
export function isEqualArrays( a1, a2 ) {
  const diff1 = a1.filter( val => !a2.includes( val ) );
  const diff2 = a2.filter( val => !a1.includes( val ) );
  return ![ ...diff1, ...diff2 ].length;
}


/*
 * Return the passed-in value as a new array.
 * If value is not an array, make it a single elem array.
 */
export function toArray( value ) {
  return Array.isArray( value ) ? [ ...value ] : [ value ];
}
