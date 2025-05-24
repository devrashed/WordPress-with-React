import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Settings from './components/Settings';
import ViewEmployee from './components/ViewEmployee';
import NewEmployee from './components/NewEmployee';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li> <Link to="/">Settings</Link> </li>
            <li> <Link to="/new-employee">New Employee</Link> </li>
            <li> <Link to="/view-employee">View Employee</Link> </li>
          </ul>
        </nav>
        
        <Routes>
          <Route path="/" element={<Settings />} />
          <Route path="/new-employee" element={<NewEmployee />} />
          <Route path="/view-employee" element={<ViewEmployee />} />
        </Routes>
        
        <Toaster />
      </div>
    </Router>
  );
}

export default App;








/* import Settings from './components/Settings';
import React, { useState } from 'react';
import ViewEmployee from './components/ViewEmployee';
import toast, { Toaster } from 'react-hot-toast';
import NewEmployee from './components/NewEmployee';
function App() {
   const [page, Setpage] = useState(1);

  return (
    <React.Fragment>
            <Settings />
            <button onClick={()=>Setpage(2)}> New</button>
            <button onClick={()=>Setpage(3)}> Show</button>
            {page === 1 && <Settings/> }
            {page === 2 && <NewEmployee/>}
            {page === 3 && <ViewEmployee/>}
             <Toaster />
            
        </React.Fragment>              
  );
}

export default App; */








/* import React from 'react';
const { BrowserRouter, Routes, Route, Link } = window.ReactRouterDOM;

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function NotFound() {
    return <h2>404 Page Not Found</h2>;
}

function App() {
    return (
        <BrowserRouter>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App; */
// Render React app into a specific element in your WordPress plugin page
/* document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('my-react-app');
    if (appContainer) {
        ReactDOM.render(<App />, appContainer);
    }
}); */
