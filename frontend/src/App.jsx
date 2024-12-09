import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Inbox from './components/Inbox';
import Config from './components/Config';

const App = () => {
    return (
        <Router>
            <div className='bg-custom-bg min-h-screen text-white'>
                <div className='bg-blue-700 p-4 flex justify-center items-center'>
                    <h1 className='text-4xl font-bold'>Tokki Mail</h1>
                </div>

                <nav className='flex space-x-4 bg-nav-bg p-4'>
                    <Link to='/' className='hover:text-blue-700'>
                        Inbox
                    </Link>
                    <Link to='/config' className='hover:text-blue-700'>
                        Config
                    </Link>
                </nav>

                <Routes>
                    <Route path='/' element={<Inbox />} />
                    <Route path='/config' element={<Config />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
