import * as __ from './utils';

export function trimLength( length ) {
  return ( val ) => {
    let str = typeof val === 'string' ? val : String( val );
    return str.substring( 0, length );
  };
}

export function toCurrency( val ) {
  return val ? '$' + toInt( val ) : '';
}

// Parse all numbers from a string, deliver as integer
export function toInt( val ) {
  const str = typeof( val ) === 'string' ? val : String( val ); 
  return parseInt( ( str.match( /\d/g ) || [] ).join( '' ), 10 ) || '';
}

// TODO: refactor it..
export function toPhone( val ) {
  let str = typeof val === 'string' ? val : String( val );
  let result   = '';
  
  const digits = str.replace(/\D/g, '').substring(0,10).split( '' );
  const part1  = digits.slice(0,3).join('');
  const part2  = digits.slice(3,6).join('');
  const part3  = digits.slice(6).join('');
  
  if ( str.charAt( 0 ) === '(' ) { result += '('; }
  if ( digits.length ) { result += result ? part1 : `(${ part1 }`; } 
    
  if ( str.charAt( 4 ) === ')' ) { result += ')'; }
  if ( str.charAt( 5 ) === ' ' ) { result += ' '; }
  if ( digits.length > 3 && str.length > 4 ) { result += result.charAt( 5 ) === ' ' ? part2 : `) ${ part2 }`; }
  
  if ( str.charAt( 9 ) === '-' ) { result += '-'; }
  if ( digits.length > 6 ) { result += result.charAt( 9 ) === '-' ? part3 : `-${ part3 }`; }
  
  return result;
}
