import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import getBaseUrl from '../../utils/baseURL';
import { MdIncompleteCircle } from 'react-icons/md'
import RevenueChart from './RevenueChart';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    // console.log(data)
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response =  await axios.get(`${getBaseUrl()}/api/admin`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                })

                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchData();
    }, []);

    // console.log(data)

    if(loading) return <Loading/>

  return (
    <>
     <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <div className="flex items-center p-8 bg-white rounded-lg shadow">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-16 h-16 mr-6 text-purple-600 bg-purple-100 rounded-full">
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <span className="block text-2xl font-bold">{data?.totalBooks}</span>
                  <span className="block text-gray-500">Products</span>
                </div>
              </div>
              <div className="flex items-center p-8 bg-white rounded-lg shadow">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-16 h-16 mr-6 text-green-600 bg-green-100 rounded-full">
                  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <span className="block text-2xl font-bold">${data?.totalSales}</span>
                  <span className="block text-gray-500">Total Sales</span>
                </div>
              </div>
              <div className="flex items-center p-8 bg-white rounded-lg shadow">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-16 h-16 mr-6 text-red-600 bg-red-100 rounded-full">
                  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                </div>
                <div>
                  <span className="inline-block text-2xl font-bold">{data?.trendingBooks}</span>
                  <span className="inline-block text-xl font-semibold text-gray-500">(13%)</span>
                  <span className="block text-gray-500">Trending Books in This Month</span>
                </div>
              </div>
              <div className="flex items-center p-8 bg-white rounded-lg shadow">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-16 h-16 mr-6 text-blue-600 bg-blue-100 rounded-full">
                <MdIncompleteCircle className='size-6'/>
                </div>
                <div>
                  <span className="block text-2xl font-bold">{data?.totalOrders}</span>
                  <span className="block text-gray-500">Total Orders</span>
                </div>
              </div>
            </section>
            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col">
              <div className="flex flex-col bg-white rounded-lg shadow md:col-span-2 md:row-span-2">
                <div className="px-6 py-5 font-semibold border-b border-gray-100">The number of orders per month</div>
                <div className="flex-grow p-4">
                  <div className="flex items-center justify-center h-full px-4 py-16 text-3xl font-semibold text-gray-400 bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
                  <RevenueChart />
                  </div>
                </div>
              </div>
              <div className="flex items-center p-8 bg-white rounded-lg shadow">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-16 h-16 mr-6 text-yellow-600 bg-yellow-100 rounded-full">
                  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path fill="#fff" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                </div>
                <div>
                  <span className="block text-2xl font-bold">10</span>
                  <span className="block text-gray-500">Orders left</span>
                </div>
              </div>
              <div className="flex items-center p-8 bg-white rounded-lg shadow">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-16 h-16 mr-6 text-teal-600 bg-teal-100 rounded-full">
                  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <span className="block text-2xl font-bold">12</span>
                  <span className="block text-gray-500">Website visits (last day)</span>
                </div>
              </div>
              <div className="row-span-3 bg-white rounded-lg shadow">
                <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
                  <span>Users by average order</span>
                  <button type="button" className="inline-flex justify-center px-1 -mr-1 text-sm font-medium leading-5 text-gray-500 bg-white rounded-md hover:text-gray-600" id="options-menu" aria-haspopup="true" aria-expanded="true">
                    Descending
                    <svg className="w-5 h-5 ml-1 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
    
                </div>
                <div className="overflow-y-auto" style={{maxHeight: '24rem'}}>
                  <ul className="p-6 space-y-6">
                    <li className="flex items-center">
                      <div className="w-10 h-10 mr-3 overflow-hidden bg-gray-100 rounded-full">
                        <img src="https://media.tenor.com/_ha2H2_hlhEAAAAe/wazowski-mike.png" alt="Mike Wazowski"/>
                      </div>
                      <span className="text-gray-600">Mike Wazowski</span>
                      <span className="ml-auto font-semibold">9.3</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-10 h-10 mr-3 overflow-hidden bg-gray-100 rounded-full">
                        <img src="https://www.meme-arsenal.com/memes/299a7ec8821573d2504d1920b79e9194.jpg" alt="Jerry"/>
                      </div>
                      <span className="text-gray-600">Gia Huy</span>
                      <span className="ml-auto font-semibold">8.9</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-10 h-10 mr-3 overflow-hidden bg-gray-100 rounded-full">
                        <img src="https://content.imageresizer.com/images/memes/Tom-shrug-HD-meme-6.jpg" alt="Tom"/>
                      </div>
                      <span className="text-gray-600">Tâm</span>
                      <span className="ml-auto font-semibold">8.7</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-10 h-10 mr-3 overflow-hidden bg-gray-100 rounded-full">
                        <img src="https://images.desenio.com/zoom/wb0125-8batman-portrait50x70-55544-10774.jpg" alt="Batman"/>
                      </div>
                      <span className="text-gray-600">Bruce Wayne</span>
                      <span className="ml-auto font-semibold">8.2</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-10 h-10 mr-3 overflow-hidden bg-gray-100 rounded-full">
                        <img src="https://smarthistory.org/wp-content/uploads/2022/07/moai-face-fwd-detail.jpg" alt="Boulder"/>
                      </div>
                      <span className="text-gray-600">The Rock</span>
                      <span className="ml-auto font-semibold">8.2</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-10 h-10 mr-3 overflow-hidden bg-gray-100 rounded-full">
                        <img src="https://www.shutterstock.com/image-photo/san-benedetto-del-tronto-italy-600nw-239338216.jpg" alt="Darth Vader"/>
                      </div>
                      <span className="text-gray-600">Darth Vader</span>
                      <span className="ml-auto font-semibold">8.1</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-10 h-10 mr-3 overflow-hidden bg-gray-100 rounded-full">
                        <img src="https://media1.s-nbcnews.com/i/streams/2013/August/130808/6C8558749-130808-walter-white-tease.jpg" alt="Walter White"/>
                      </div>
                      <span className="text-gray-600">Walter White</span>
                      <span className="ml-auto font-semibold">8.8</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-10 h-10 mr-3 overflow-hidden bg-gray-100 rounded-full">
                        <img src="https://uploads.dailydot.com/2024/08/mocking-spongebob-meme-.jpg?auto=compress&fm=pjpg" alt="SpongeBob"/>
                      </div>
                      <span className="text-gray-600">Sponge Bob</span>
                      <span className="ml-auto font-semibold">7.7</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col row-span-3 bg-white rounded-lg shadow">
                <div className="px-6 py-5 font-semibold border-b border-gray-100">Users by type of Books</div>
                <div className="flex-grow p-4">
                  <div className="flex items-center justify-center h-full px-4 py-24 text-3xl font-semibold text-gray-400 bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">Chart</div>
                </div>
              </div>
            </section>
            <section className="font-semibold text-right text-gray-500">
              <a href="#" className="text-purple-600 hover:underline">Recreated on Codepen</a> with <a href="https://tailwindcss.com/" className="text-teal-400 hover:underline">Tailwind CSS</a> by Azri Kahar, <a href="https://dribbble.com/shots/10711741-Free-UI-Kit-for-Figma-Online-Courses-Dashboard" className="text-purple-600 hover:underline">original design</a> made by Chili Labs
            </section>
    </>
  )
}

export default Dashboard