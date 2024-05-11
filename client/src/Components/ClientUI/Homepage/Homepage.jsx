import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Menu from '../../Menu/Menu'
import homepage from '../../assets/images/homepage/homepage-bg.jpg'
import homepage2 from '../../assets/images/homepage/homepage2-bg.jpg'
import '../Homepage/Homepage.css'
export const Homepage = () => {
    const cards = [
        { id: 1, title: "Card 1", description: "Description for Card 1" },
        { id: 2, title: "Card 2", description: "Description for Card 2" },
        { id: 3, title: "Card 3dcsdjcnskdc", description: "Description for Card 3" },
        { id: 4, title: "Card 4", description: "Description for Card 4" },
        { id: 5, title: "Card 5", description: "Description for Card 5" },
        { id: 6, title: "Card 6", description: "Description for Card 5" },
        { id: 7, title: "Card 7", description: "Description for Card 5" },
       
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const cardsPerSlide = 3; // Số card mỗi slide
    const totalSlides = Math.ceil(cards.length / cardsPerSlide);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex >= totalSlides - 1 ? 0 : prevIndex + 1
            );
        }, 4000); // Change card every 4 seconds

        return () => clearInterval(interval);
    }, [totalSlides]);

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };
  return (
    
    <>
        <Menu/>
        <div className='section1 w-full h-[100vh]  relative'>
            <img src={homepage} alt="" />
            <div className='absolute h-[111.5vh] overlay inset-0 bg-black  opacity-50 z-[1]'></div>
            <div className='w-full h-[300px] absolute  top-[40%]  left-[50px] z-[2]'>
                <a href="" className='newProduct'>New Product</a>
                <div className='card-homepage flex gap-2 mr-[60%] h-[100px] mt-9  '>
                    <div className='verical-line'></div>
                    <h1 className='text-banner-homepage'>2016 Lamborgini is 200t fsport</h1>

                </div>
                <h1 className='text-banner'>base mspr from <b>$450,870*</b></h1>
            </div>
        </div>
        <div className='section2 w-full mt-[86px] bg-[#FF5500] h-[30vh] bg-yellow-400 grid grid-cols-3 px-9 gap-3'>
            <div className='card-infomation flex  py-[50px] pl-4'>
                <div className='circle-icon'>
                <i class='bx bxs-user-circle text-[3rem]' style={{color:'#f6f0f0'}}  ></i>
                </div>
                <div className=' max-w-full ml-6'>
                    <h1 className='title-text'>Highly -trained staff</h1>
                    <h1 className='title-text1'>Support is always our highest priority. With support members spread across the world</h1>
                </div>
            </div>
            <div className='card-infomation flex  py-[50px] pl-4'>
                <div className='circle-icon'>
                <i class='bx bx-cog text-[3rem]' style={{color:'#f4eded'}}  ></i>                

                    </div>
                <div className=' max-w-full ml-6'>
                    <h1 className='title-text'>FAST & EFFECTIVE SERVICE</h1>
                    <h1 className='title-text1'>Default is 6 months Update & Support. Furthermore, you can extend support to 12 months</h1>
                </div>
            </div>
            <div className='card-infomation flex  py-[50px] pl-4'>
                <div className='circle-icon'>
                <i class='bx bx-phone-call text-[3rem]' style={{color:'#f4eded'}} ></i>                </div>
                <div className=' max-w-full ml-6'>
                    <h1 className='title-text'>SUPPORT 24/7</h1>
                    <h1 className='title-text1'>Support is always our highest priority. With support members spread across the world</h1>
                </div>
            </div>
            
            
        </div>
        <div className='section3 bg-pink-400 w-full h-[130vh] relative'>
            <img className='h-[130vh] object-cover' src={homepage2} alt="" />
            <div className='absolute h-[111.5vh] overlay inset-0 bg-black  opacity-40 z-[1]'></div>
            <div className='con1  w-full h-[100px] absolute top-[8%]'>
                <div className='con2'>
                    <h1 className='text-featured'>FEATURED VEHICLES</h1>
                    <div className='flex justify-center mt-3'>
                    <div className='vertical-x-parallel'>
                        <div className='line-x'></div>
                        <div className='line-x mt-1'></div>                   
                    </div>
                    </div>
                    <h1 className='text-descr mt-4'>We are working hard to brings new advanced design interfaces to Joomla and WordPress that both beginners and experts will fall in love</h1>

                </div>
                
            </div>
            <div className='slider absolute top-[30%] w-full pr-[10%] pl-[4%]'>
            {cards.slice(currentIndex * cardsPerSlide, (currentIndex + 1) * cardsPerSlide).map((card) => (
                    <div key={card.id} className="card">
                        <div className='relative'>
                        <img className='img-slider' src={homepage} alt="" />
                        <div className='absolute container-mini'>
                                <h1 className='text-card'>${card.title}</h1>
                        </div>
                        </div>
                        <div className='absolute top-[60%] bg-green-500 w-full h-[150px]'>
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
        {/* <div className="slider">
                {cards.slice(currentIndex * cardsPerSlide, (currentIndex + 1) * cardsPerSlide).map((card) => (
                    <div key={card.id} className="card">
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                    </div>
                ))}
            </div>
            <div className="dots">
                {[0, 1, 2].map((dotIndex) => (
                    <span key={dotIndex} onClick={() => handleDotClick(dotIndex)}
                          className={currentIndex === dotIndex ? 'dot active' : 'dot'}></span>
                ))}
            </div> */}
    </>
  )
}
