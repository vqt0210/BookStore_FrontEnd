import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation } from 'swiper/modules'
import car from '../../assets/news/cars.png'
import cure from '../../assets/news/cure.png'
import water from '../../assets/news/water.png'
import quantum from '../../assets/news/quantum.png'
import health from '../../assets/news/health.png'
import { Link } from 'react-router-dom'

const news = [
  {
    id: 1,
    title: 'Groundbreaking Advancements in Quantum Computing',
    description:
      'Researchers at leading tech institutions have made significant strides in quantum computing, unlocking potential for ultra-fast processing speeds that could transform industries like cybersecurity, logistics, and artificial intelligence.',
    image: quantum,
  },
  {
    id: 2,
    title: 'The Future of Electric Cars: Next-Gen Battery Technology Unveiled',
    description:
      'A major breakthrough in battery technology promises to extend the range of electric vehicles by 50%, reducing charging times and making them more accessible for everyday consumers.',
    image: car,
  },
  {
    id: 3,
    title: 'Revolutionary CRISPR Therapy Shows Promise for Genetic Diseases',
    description:
      'Scientists have announced promising results from a new CRISPR-based therapy that could provide a cure for genetic disorders like sickle cell anemia and cystic fibrosis, marking a milestone in precision medicine.',
    image: cure,
  },
  {
    id: 4,
    title: 'Breakthrough in Clean Water Technology Could Solve Global Crisis',
    description:
      'A new, affordable desalination technology could provide clean drinking water to millions of people in drought-stricken and water-scarce regions, potentially solving one of the world’s most pressing environmental issues.',
    image: water,
  },
  {
    id: 5,
    title: 'Virtual Reality Training Transforming Healthcare Industry',
    description:
      'Virtual reality is being used to simulate complex surgeries and medical procedures, enabling doctors to practice and refine their skills in a risk-free environment. This innovation is expected to drastically reduce errors in the operating room.',
    image: health,
  },
];


const News = () => {
  return (
    <div className="py-16 news-container">
      <h2 className="mb-6 text-3xl font-semibold">Breaking News!</h2>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {news.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center gap-12 sm:flex-row sm:justify-between">
              {/* content */}
              <div className="py-4">
                <Link to="/">
                  <h3 className="mb-4 news-title">{item.title}</h3>
                </Link>
                <div className="news-divider"></div>
                <p className="mt-3 news-description">{item.description}</p>
              </div>

              <div className="flex-shrink-0">
                <img src={item.image} alt="" className="news-image" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default News
