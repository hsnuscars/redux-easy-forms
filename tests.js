// set up React and Chai as globals for convenience
var React          = require( 'react' );
var ReactDOM       = require( 'react-dom' );
var ReactTestUtils = require( 'react-addons-test-utils' );
var chai           = require( 'chai' );

global.React       = React;
global.ReactDOM    = ReactDOM;
global.TestUtils   = ReactTestUtils;
global.expect      = chai.expect;
global.should      = chai.should;
global.assert      = chai.assert;

// create a Webpack context to match all files matching the pattern: ./test/*.test.js
var context = require.context( './test/', true, /.+\.test\.js$/ );
context.keys().forEach( context );
