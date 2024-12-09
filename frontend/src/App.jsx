const App = () => {
    return (
        <div className='bg-custom-bg min-h-screen text-white'>
            <div className='bg-blue-700 p-4 justify-center'>
                <h1 className='text-4xl font-bold'>Tokki Mail</h1>
            </div>

            <nav className='flex space-x-4 bg-nav-bg p-4'>
                <a href='#inbox' className=' hover:text-blue-700'>
                    Inbox
                </a>
                <a href='#config' className=' hover:text-blue-700'>
                    Config
                </a>
            </nav>
        </div>
    );
};

export default App;
