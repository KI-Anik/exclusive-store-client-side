import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ProductCard from './ProductCard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const RelatedProducts = ({categoryFilter}) => {

    return (
        <div className="w-4/5 mx-auto py-10 relative bottom-20">
            <h2 className="text-3xl font-bold text-center mb-8">Related Products</h2>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                breakpoints={{
                    // when window width is >= 640px
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    // when window width is >= 768px
                    768: { slidesPerView: 3, spaceBetween: 30 },
                }}
                className="mySwiper pb-10" // Add padding-bottom for pagination dots
            >
                {categoryFilter.map(card => (
                    <SwiperSlide key={card.id}>
                        <ProductCard card={card} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default RelatedProducts;