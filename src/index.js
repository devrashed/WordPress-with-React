import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


/* var element = document.getElementById( 'react-admin' );
ReactDOM.render( <App />, document.getElementById( 'react-admin' ) ); */

document.addEventListener( 'DOMContentLoaded', function() {
  var element = document.getElementById( 'react-admin' );
  if( typeof element !== 'undefined' && element !== null ) {
      ReactDOM.render( <App />, document.getElementById( 'react-admin' ) );
  }
} )


let employee = document.getElementById('curd-admin');

if (employee) {
   ReactDOM.render(<NewEmployee />, employee);
} 




/*======= Old Code ======= */
/* document.addEventListener( 'DOMContentLoaded', function() {
  var element = document.getElementById( 'react-admin' );
  if( typeof element !== 'undefined' && element !== null ) {
      ReactDOM.render( <App />, document.getElementById( 'react-admin' ) );
  }
} ) */

/* import DisplaySettings from './components/DisplaySettings';
import NewEmployee from './components/NewEmployee';
 */

/* import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';
import App from './App'; */


/* domReady(() => {
  const root = createRoot(
    document.getElementById('react-admin-panel')
  );

  root.render(<App/>);
}); */

/* document.addEventListener( 'DOMContentLoaded', function() {
  var element = document.getElementById( 'react-admin' );
  if( typeof element !== 'undefined' && element !== null ) {
      ReactDOM.render( <App />, document.getElementById( 'react-admin' ) );
  }
} ) */

/* let settingsDiv = document.getElementById('wp-react-settings');

if (settingsDiv) {
   ReactDOM.render(<DisplaySettings />, settingsDiv);
}  */

