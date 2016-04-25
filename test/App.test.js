import React from 'react';
import App from '../App';

describe( 'App', function () {

  it( 'renders okay', function () {
    const subject = <App />;
    const renderedSubject = TestUtils.renderIntoDocument( subject );
    expect( renderedSubject ).to.not.equal( undefined );
  });

    // add more tests here..
});
