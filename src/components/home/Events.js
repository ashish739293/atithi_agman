"use client";

import { SwiperSlide } from 'swiper/react'; // Import SwiperSlide normally
import { Pagination, Autoplay } from 'swiper/modules'; // Import Autoplay module
import 'swiper/css';
import 'swiper/css/pagination';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const Swiper = dynamic(() => import('swiper/react').then(mod => mod.Swiper), { ssr: false }); // Dynamically import Swiper

export default function Events() {
    return (
        <>
            <section className="py-16 px-4 md:px-16 text-center bg-[#DEAB55]" id="event">
                <div className="ml-4 md:ml-16">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center max-w-7xl w-full">
                        <div className="col-span-1 md:col-span-4 text-center md:text-left">
                            <h2 className="font-script text-[32px] md:text-[40px] font-normal leading-[40px] md:leading-[50px] mb-8 text-black">Types of Events</h2>
                            <p className="mb-8 text-sm md:text-base">
                                Every moment deserves to be celebrated, and every celebration deserves to be unforgettable. Let us craft memories that last a lifetime, one event at a time.
                            </p>
                        </div>

                        <div className="ml-4 md:ml-16 col-span-1 md:col-span-8">
                            <Swiper
                                modules={[Pagination, Autoplay]} // Add Autoplay module
                                spaceBetween={20}
                                slidesPerView={1}
                                pagination={{ clickable: true }}
                                autoplay={{
                                    delay: 3000, // Delay in ms between auto-scrolls
                                    disableOnInteraction: false, // Keeps autoplay running after user interaction
                                }}
                                className="p-5 text-black"
                            >
                                <SwiperSlide className="flex flex-col items-center justify-center">
                                    <div className="mb-4 text-white px-3 py-2 text-xl sm:text-2xl font-bold bg-black rounded">
                                        Wedding Function
                                    </div>
                                    <div className="relative flex items-center justify-center rounded-full overflow-hidden w-full sm:w-[450px] md:w-[600px] h-[200px] border-2 border-[#020202]">
                                        <Image src="/wedding.jpeg" alt="Wedding Function" width={500} height={300} className="w-full h-full object-cover rounded-full" />
                                    </div>
                                </SwiperSlide>

                                <SwiperSlide className="flex flex-col items-center justify-center">
                                    <div className="mb-4 text-white px-3 py-2 text-xl sm:text-2xl font-bold bg-black rounded">
                                        Wedding Function
                                    </div>
                                    <div className="relative flex items-center justify-center rounded-full overflow-hidden w-full sm:w-[450px] md:w-[600px] h-[200px] border-2 border-[#020202]">
                                        <Image src="/wedding.jpeg" alt="Wedding Function" width={500} height={300} className="w-full h-full object-cover rounded-full" />
                                    </div>
                                </SwiperSlide>

                                <SwiperSlide className="flex flex-col items-center justify-center">
                                    <div className="mb-4 text-white px-3 py-2 text-xl sm:text-2xl font-bold bg-black rounded">
                                        Wedding Function
                                    </div>
                                    <div className="relative flex items-center justify-center rounded-full overflow-hidden w-full sm:w-[450px] md:w-[600px] h-[200px] border-2 border-[#020202]">
                                        <Image src="/wedding.jpeg" alt="Wedding Function" width={500} height={300} className="w-full h-full object-cover rounded-full" />
                                    </div>
                                </SwiperSlide>

                                <SwiperSlide className="flex flex-col items-center justify-center">
                                    <div className="mb-4 text-white px-3 py-2 text-xl sm:text-2xl font-bold bg-black rounded">
                                        Wedding Function
                                    </div>
                                    <div className="relative flex items-center justify-center rounded-full overflow-hidden w-full sm:w-[450px] md:w-[600px] h-[200px] border-2 border-[#020202]">
                                        <Image src="/wedding.jpeg" alt="Wedding Function" width={500} height={300} className="w-full h-full object-cover rounded-full" />
                                    </div>
                                </SwiperSlide>
                                {/* Add more SwiperSlides here if needed */}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
