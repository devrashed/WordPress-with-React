import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import DisplaySettings from './components/DisplaySettings';
import NewEmployee from './components/NewEmployee';

/* import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';
import App from './App'; */


/* domReady(() => {
  const root = createRoot(
    document.getElementById('react-admin-panel')
  );

  root.render(<App/>);
}); */

document.addEventListener( 'DOMContentLoaded', function() {
  var element = document.getElementById( 'react-admin' );
  if( typeof element !== 'undefined' && element !== null ) {
      ReactDOM.render( <App />, document.getElementById( 'react-admin' ) );
  }
} )

let settingsDiv = document.getElementById('wp-react-settings');

if (settingsDiv) {
   ReactDOM.render(<DisplaySettings />, settingsDiv);
} 

let employee = document.getElementById('curd-admin');

if (employee) {
   ReactDOM.render(<NewEmployee />, employee);
} 