import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Inbox from './components/Inbox';
import Config from './components/ConfigPage';

const App = () => {
    return (
        <Router>
            <div className='bg-custom-bg min-h-screen text-white'>
                <div className='bg-blue-700 p-4 flex justify-center items-center'>
                    <h1 className='text-4xl font-bold'>Tokki Mail</h1>
                </div>
                <div className='block px-60 bg-nav-bg'>
                    <nav className='flex space-x-8  p-4'>
                        <Link to='/' className='text-gray-300 hover:text-white'>
                            Inbox
                        </Link>
                        <Link
                            to='/config'
                            className='text-gray-300 hover:text-white'
                        >
                            Config
                        </Link>
                    </nav>
                </div>

                <Routes>
                    <Route path='/' element={<Inbox />} />
                    <Route path='/config' element={<Config />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
