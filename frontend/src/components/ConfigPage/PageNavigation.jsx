import React from 'react';

const PageNavigation = ({
    currentPage,
    totalPages,
    itemsPerPage,
    accountsLength,
    handleClickPage,
}) => {
    const startIndex = (currentPage - 1) * itemsPerPage;

    const getPageNumbers = () => {
        const pages = [];
        if (currentPage > 1) pages.push(1);
        if (currentPage > 3) pages.push('...');
        if (currentPage > 2) pages.push(currentPage - 2);
        if (currentPage > 1) pages.push(currentPage - 1);
        pages.push(currentPage);
        if (currentPage < totalPages) pages.push(currentPage + 1);
        if (currentPage < totalPages - 1) pages.push(currentPage + 2);
        if (currentPage < totalPages - 2) pages.push('...');
        if (currentPage < totalPages) pages.push(totalPages);
        return [...new Set(pages)];
    };

    return (
        <nav
            className='flex items-center flex-column flex-wrap md:flex-row justify-between pt-4'
            aria-label='Table navigation'
        >
            <span className='text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto'>
                Showing{' '}
                <span className='font-semibold text-gray-900 dark:text-white'>
                    {startIndex + 1}-
                    {Math.min(startIndex + itemsPerPage, accountsLength)}
                </span>{' '}
                of{' '}
                <span className='font-semibold text-gray-900 dark:text-white'>
                    {accountsLength}
                </span>
            </span>
            <ul className='inline-flex -space-x-px rtl:space-x-reverse text-sm h-8'>
                {getPageNumbers().map((page, index) => (
                    <li key={index}>
                        {page === '...' ? (
                            <span className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400'>
                                ...
                            </span>
                        ) : (
                            <button
                                onClick={() => handleClickPage(page)}
                                className={`flex items-center justify-center px-3 h-8 leading-tight ${
                                    currentPage === page
                                        ? 'text-neutral-200 bg-blue-700'
                                        : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                                }`}
                            >
                                {page}
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default PageNavigation;
