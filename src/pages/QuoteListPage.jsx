import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

function QuoteListPage() {
    const [quotes, setQuotes] = useState([]);
    const [limit] = useState(20);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadMore, setLoadMore] = useState(true);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const fetchQuotes = useCallback(async () => {
        if (loading) return;
        setLoading(true);
        setError(false);
        try {
            const token = localStorage.getItem('tokenLogin');
            const response = await axios.get(`https://assignment.stage.crafto.app/getQuotes?limit=${limit}&offset=${offset}`, {
                headers: { Authorization: token },
            });
            if (response.data.data.length === 0) {
                setLoadMore(false);
            } else {
                setQuotes((prevQuotes) => [...prevQuotes, ...response.data.data]);
            }
        } catch (error) {
            console.error('Failed to fetch quotes', error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }, [loading, limit, offset])

    const handleScroll = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop + 100 >= document.documentElement.offsetHeight && loadMore && !loading) {
            setOffset((prevOffset) => prevOffset + limit);
        }
    }, [limit, loadMore, loading])

    useEffect(() => {
        fetchQuotes();
    }, [fetchQuotes, offset]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll, loadMore, loading]);

    return (
        <div className='px-2 py-2'>
            {/*<img src="" />*/}
            <button className='lg:p-5 p-3 rounded-xl bg-gray-200 z-20 text-black fixed bottom-2 right-2' onClick={() => navigate('/create-quote')}>
                <IoMdAdd className='text-lg' />
            </button>
            <div className='grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4'>
                {quotes.length === 0 && loading ? (
                    <div className='flex justify-center absolute top-[50%] left-[50%]'>
                    </div>
                ) : quotes.map((quote) => (
                    <div key={quote.id} className='relative flex flex-col border border-gray-300 shadow-lg rounded-xl h-full'>
                        <div className='relative h-64'>
                            {quote.mediaUrl ? (
                                <img
                                    src={quote.mediaUrl}
                                    alt="Quote"
                                    loading="lazy"
                                    className='w-full h-full object-cover rounded-t-xl cursor-pointer'
                                />
                            ) : (
                                <img
                                    src="noimageavailablevector.png"
                                    alt="No image"
                                    loading="lazy"
                                    className='w-full h-full object-cover rounded-t-xl cursor-pointer'
                                />
                            )}
                            <div className='absolute left-0 bottom-0 right-0 h-1/5 bg-black bg-opacity-40 flex items-center justify-center rounded-t-xl'>
                                <p className='text-white text-center text-xl font-semibold px-4 capitalize'>{quote.text}</p>
                            </div>
                        </div>
                        <div className='flex flex-col justify-between p-2 xl:p-4 bg-gray-100 rounded-b-xl h-full'>
                            <p className='font-semibold text-gray-800 capitalize'>{quote.username}</p>
                            <p className='text-sm font-semibold text-gray-600'>{new Date(quote.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>
            {loading && <div className='text-center py-4'><span className="loader"></span></div>}
            {error && (
                <div className='text-center py-4'>
                    <button onClick={() => setOffset(offset + limit)} className='bg-black text-white px-3 py-1.5 rounded-xl'>
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
}

export default QuoteListPage;
