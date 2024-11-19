import React from 'react'
import { useDeleteBookMutation, useFetchAllBooksQuery } from '../../../redux/features/books/booksApi';
import { Link, useNavigate } from 'react-router-dom';

const ManageBooks = () => {
    const navigate = useNavigate();

    const { data: books, refetch } = useFetchAllBooksQuery()

    const [deleteBook] = useDeleteBookMutation()

    // Handle deleting a book
    const handleDeleteBook = async (id) => {
        try {
            await deleteBook(id).unwrap();
            alert('Book deleted successfully!');
            refetch();

        } catch (error) {
            console.error('Failed to delete book:', error.message);
            alert('Failed to delete book. Please try again.');
        }
    };

    // Handle navigating to Edit Book page
    const handleEditClick = (id) => {
        navigate(`dashboard/edit-book/${id}`);
    };
    return (
        <section className="py-8 bg-gray-50">
            <div className="w-full px-4 mx-auto mt-16 mb-12 xl:w-10/12 xl:mb-0">
                <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white border border-gray-200 rounded-lg shadow-lg">
                    <div className="px-4 py-3 mb-0 border-b-2 border-gray-200 rounded-t">
                        <div className="flex flex-wrap items-center">
                            <div className="relative flex-1 flex-grow w-full max-w-full px-4">
                                <h3 className="text-xl font-semibold text-gray-800">All Books</h3>
                            </div>
                            <div className="relative flex-1 flex-grow w-full max-w-full px-4 text-right">
                                <button className="px-4 py-2 text-xs font-bold text-white uppercase transition duration-300 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 hover:bg-indigo-700">
                                    See all
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="block w-full overflow-x-auto">
                        <table className="items-center w-full bg-transparent border-collapse">
                            <thead>
                                <tr className="bg-indigo-50">
                                    <th className="px-6 py-3 text-xs font-semibold text-left text-indigo-600 uppercase align-middle border-b-2 border-gray-200">
                                        #
                                    </th>
                                    <th className="px-6 py-3 text-xs font-semibold text-left text-indigo-600 uppercase align-middle border-b-2 border-gray-200">
                                        Book Title
                                    </th>
                                    <th className="px-6 py-3 text-xs font-semibold text-center text-indigo-600 uppercase align-middle border-b-2 border-gray-200">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-xs font-semibold text-left text-indigo-600 uppercase align-middle border-b-2 border-gray-200">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-xs font-semibold text-left text-indigo-600 uppercase align-middle border-b-2 border-gray-200">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    books && books.map((book, index) => (
                                        <tr key={index} className={`transition duration-300 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}>
                                            <th className="px-6 py-4 text-xs text-left text-gray-700 align-middle whitespace-nowrap">
                                                {index + 1}
                                            </th>
                                            <td className="px-6 py-4 text-xs text-gray-700 capitalize align-middle whitespace-nowrap">
                                                {book.title}
                                            </td>
                                            <td className="px-6 py-4 text-xs text-center text-gray-700 capitalize align-middle whitespace-nowrap">
                                                {book.category}
                                            </td>
                                            <td className="px-6 py-4 text-xs text-gray-700 align-middle whitespace-nowrap">
                                                ${book.newPrice}
                                            </td>
                                            <td className="px-6 py-4 text-xs text-gray-700 align-middle whitespace-nowrap">
                                                <Link to={`/dashboard/edit-book/${book._id}`} className="mr-4 font-medium text-indigo-600 hover:text-indigo-700 hover:underline">
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteBook(book._id)}
                                                    className="px-4 py-2 font-medium text-white transition duration-300 bg-red-600 rounded-lg hover:bg-red-700 hover:shadow-md">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>





    )
}

export default ManageBooks