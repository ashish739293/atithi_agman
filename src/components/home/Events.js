"use client";

import { SwiperSlide } from 'swiper/react'; // Import SwiperSlide normally
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import dynamic from 'next/dynamic';

const Swiper = dynamic(() => import('swiper/react').then(mod => mod.Swiper), { ssr: false }); // Dynamically import Swiper

export default function Events() {
    return (
        <>
            <section className="py-16 px-16 text-center bg-[#DEAB55]" id="event">
                <div className="ml-16">
                    <div className="grid grid-cols-12 gap-4 items-center max-w-7xl w-full">
                        <div className="col-span-12 md:col-span-4 text-center md:text-left">
                            <h2 className="font-script text-[40px] font-normal leading-[50px] mb-8 text-black">Types of Events</h2>
                            <p className="mb-8">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                            </p>
                        </div>

                        <div className="ml-16 col-span-12 md:col-span-8">
                            <Swiper
                                modules={[Pagination]}
                                spaceBetween={50}
                                slidesPerView={1}
                                pagination={{ clickable: true, }}
                                className="p-5 text-black "
                            >
                                <SwiperSlide className="flex items-center justify-center">
                                    <div className="relative flex items-center justify-center rounded-full overflow-hidden w-[600px] h-[200px] border-2 border-[#020202]">
                                        <img src="wedding.jpeg" alt="Wedding Function" className="w-full h-full object-cover rounded-full" />
                                        <div className="absolute left-1/2 transform -translate-x-1/2 text-white px-3 py-2 text-2xl font-bold z-20">
                                            Wedding Function
                                        </div>
                                    </div>
                                </SwiperSlide>

                                <SwiperSlide className="flex items-center justify-center">
                                    <div className="relative flex items-center justify-center rounded-full overflow-hidden w-[600px] h-[200px] border-2 border-[#020202]">
                                        <img src="wedding.jpeg" alt="Wedding Function" className="w-full h-full object-cover rounded-full" />
                                        <div className="absolute left-1/2 transform -translate-x-1/2 text-white px-3 py-2 text-2xl font-bold z-20">
                                            Wedding Function
                                        </div>
                                    </div>
                                </SwiperSlide>

                                <SwiperSlide className="flex items-center justify-center">
                                    <div className="relative flex items-center justify-center rounded-full overflow-hidden w-[600px] h-[200px] border-2 border-[#020202]">
                                        <img src="wedding.jpeg" alt="Wedding Function" className="w-full h-full object-cover rounded-full" />
                                        <div className="absolute left-1/2 transform -translate-x-1/2 text-white px-3 py-2 text-2xl font-bold z-20">
                                            Wedding Function
                                        </div>
                                    </div>
                                </SwiperSlide>

                                <SwiperSlide className="flex items-center justify-center">
                                    <div className="relative flex items-center justify-center rounded-full overflow-hidden w-[600px] h-[200px] border-2 border-[#020202]">
                                        <img src="wedding.jpeg" alt="Wedding Function" className="w-full h-full object-cover rounded-full" />
                                        <div className="absolute left-1/2 transform -translate-x-1/2 text-white px-3 py-2 text-2xl font-bold z-20">
                                            Wedding Function
                                        </div>
                                    </div>
                                </SwiperSlide>

                                {/* Add more SwiperSlides here if needed */}
                            </Swiper>
{/* 
                            <div className="swiper-pagination flex justify-center mt-32 space-x-2 z-20">
                                <span className="bg-black rounded-full w-3 h-3 opacity-100 z-20"></span>
                                <span className="bg-black rounded-full w-3 h-3 opacity-100"></span>
                                <span className="bg-black rounded-full w-3 h-3 opacity-100"></span>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}