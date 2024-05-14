import React from 'react'
import { useState } from 'react'
import { useEffect,useRef } from 'react'
import Menu from '../../Menu/Menu'
import homepage from '../../assets/images/homepage/homepage-bg.jpg'
import homepage2 from '../../assets/images/homepage/homepage2-bg.jpg'
import audiLogo from '../../assets/images/logo/audi-logo.png'
import hondaLogo from '../../assets/images/logo/honda-logo.png'
import mazdaLogo from '../../assets/images/logo/mazda-logo.png'
import bmwLogo from '../../assets/images/logo/bmw-logo.png'
import landLogo from '../../assets/images/logo/landrover-logo.png'
import merLogo from '../../assets/images/logo/mer-logo.png'
import fordLogo from '../../assets/images/logo/ford-logo.png'
import lexusLogo from '../../assets/images/logo/lexus-logo.png'
import toyotaLogo from '../../assets/images/logo/toyota-logo.png'


import autoLogo from '../../assets/images/logo/auto.png'
import minivanLogo from '../../assets/images/logo/minivan.png'
import truckLogo from '../../assets/images/logo/truck.png'
import beetleLogo from '../../assets/images/logo/beetles.png'
import vanLogo from '../../assets/images/logo/van.png'
import convertibleLogo from '../../assets/images/logo/convertible.png'
import suvLogo from '../../assets/images/logo/suv.png'

import eyeIcon from '../../assets/images/icons/eye-icon.png'

import '../Homepage/Homepage.css'
import car1 from '../../assets/images/cars/mercedes-benz.jpg'
import Counter from '../../SubFeature/Counter'
import TruncateText from '../../SubFeature/TruncateText'
import Select from 'react-select';


export const Homepage = () => {
    const cards = [
        { id: 1, title: "Card 1", description: "Description for Card 1" },
        { id: 2, title: "Card 2", description: "Description for Card 2 Descriptiovdfvfdn for Card 2 Dedsjskscscription for Card 2 Description for Card 2" },
        { id: 3, title: "Card 3dcsdjcnskdc", description: "Description for Card 3" },
        { id: 4, title: "Card 4", description: "Description for Card 4" },
        { id: 5, title: "Card 5", description: "Description for Card 5" },
        { id: 6, title: "Card 6", description: "Description for Card 5" },       
    ];
    const blogs = [
        {id: 1,author: "jony Doe", avatar: homepage2, category: "Automotive, Blog", title: " Toyota cuts production plan again on ongoing chip shortage", description: "As ordinary motorists filed past the broken-down exotic supercar – stopped on the road and drawing attention not just for its looks but also for its immobility."},
        {id: 2,author: "Kyos kao", avatar: homepage2, category: "Automotive, Blog", title: " Toyota cuts production plan again on ongoing chip shortage", description: "As ordinary motorists filed past the broken-down exotic supercar – stopped on the road and drawing attention not just for its looks but also for its immobility."},
        {id: 3,author: "Iha Kalia", avatar: homepage2, category: "Automotive, Blog", title: " Toyota cuts production plan again on ongoing chip shortage", description: "As ordinary motorists filed past the broken-down exotic supercar – stopped on the road and drawing attention not just for its looks but also for its immobility."},
        {id: 4,author: "abcded", avatar: homepage2, category: "Automotive, Blog", title: " Toyota cuts production plan again on ongoing chip shortage", description: "As ordinary motorists filed past the broken-down exotic supercar – stopped on the road and drawing attention not just for its looks but also for its immobility."},
        
    ]

    const [currentIndex, setCurrentIndex] = useState(0);
    const cardsPerSlide = 3; // Số card mỗi slide
    const totalCards = cards.length;
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => {
                return (prevIndex + 1) % totalCards; // Luôn luôn quay lại đầu sau khi đạt tới card cuối
            });
        }, 4000); // Change card every 4 seconds

        return () => clearInterval(interval);
    }, []);

    const [currentIndex1, setCurrentIndex1] = useState(0);
    const cardsPerSlide1 = 3; // Số card mỗi slide
    const totalCards1 = blogs.length;
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex1(prevIndex => {
                return (prevIndex + 1) % totalCards1; // Luôn luôn quay lại đầu sau khi đạt tới card cuối
            });
        }, 4000); // Change card every 4 seconds

        return () => clearInterval(interval);
    }, []);

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };
    const handleDotClick1 = (index) => {
        setCurrentIndex(index);
    };

    //count start end
    const options = [
        { value: 'all', label: 'All Make' },
        { value: 'audi', label: 'Audi' },
        { value: 'bmw', label: 'BMW' },
        { value: 'chevrolet', label: 'Chevrolet' },
        // Thêm các tùy chọn khác
      ];
    
      const customStyles = {
        option: (provided, state) => ({
          ...provided,
          height: '100px',  // Tăng chiều cao của từng tùy chọn
          padding: '10px', // Thêm padding để văn bản không dính vào cạnh
          alignItems: 'center', // Căn giữa nội dung tùy chọn theo chiều dọc
          display: 'flex'
        }),
      };

      const text = "As ordinary motorists filed past the broken-down exotic supercar – stopped on the road and drawing attention not just for its looks but also for its immobility.";

  return (
    
    <>
        <Menu/>
        <div className='section1 w-full h-[100vh]  relative'>
            <img src={homepage} alt="" />
            <div className='absolute h-[111.5vh] overlay inset-0 bg-black  opacity-50 z-[1]'></div>
            <div className='max-w-[100%] h-[300px] absolute  top-[40%]  left-[50px] z-[2]'>
                <a href="" className='newProduct'>New Product</a>
                <div className='card-homepage flex gap-2 mr-[40%] h-[100px] mt-9  '>
                    <div className='verical-line'></div>
                    <h1 className='text-banner-homepage'>2016 Lamborgini is 200t fsport</h1>

                </div>
                <h1 className='text-banner'>base mspr from <b>$450,870*</b></h1>
            </div>
        </div>
        <div className='section2 w-full mt-[86px] bg-[#FF5500] h-[30vh] grid grid-cols-3 px-9 gap-3'>
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
        <div className='section3 bg-pink-400 w-full h-[145vh] relative'>
            <img className='h-[145vh] object-cover' src={car1} alt="" />
            <div className='absolute h-[125vh] overlay inset-0  bg-black opacity-40 z-[1]' ></div>
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
            <div className='slider absolute top-[22%] w-full pr-[10%] pl-[4%]'>
            {cards.slice(currentIndex, currentIndex + cardsPerSlide).concat(
        cards.slice(0, Math.max(0, cardsPerSlide - (cards.length - currentIndex)))
    ).map(card => (
                    <div key={card.id} className="card">
                        <div className='relative'>
                        <img className='img-slider' src={car1} alt="" />
                        <div className='absolute container-mini'>
                                <h1 className='text-card'>${card.title}</h1>
                                
                        </div>
                        </div>
                        <div className='absolute top-[63%]  w-full h-[140px] px-4'>
                            <h1 className='title-section3'>{card.title}</h1>
                            <h1 className='title1-section3'>{card.description}</h1>
                        </div>
                        <div className='absolute bottom-0 w-full  grid grid-cols-3 gap-1'>
                            <div className='w-full h-[50px] bg-[#F1F1F1]'>
                                <div className='flex justify-center h-full items-center mt-1'>
                                    <div className='flex justify-center gap-1'>
                                    <i class='bx bx-registered text-[1rem]' style={{color:'#ff5500'}}  ></i>
                                    <h1 className='title3-section3 '>{card.title} mi</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full h-[50px] bg-[#F1F1F1]'>
                                <div className='flex justify-center h-full items-center mt-1'>
                                    <div className='flex justify-center gap-1'>
                                    <i class='bx bx-cog text-[1rem]' style={{color:'#ff5500'}}  ></i>
                                    <h1 className='title3-section3 '>{card.title} mi</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full h-[50px] bg-[#F1F1F1]'>
                                <div className='flex justify-center h-full items-center mt-1'>
                                    <div className='flex justify-center gap-1'>
                                    <i class='bx bx-car text-[1rem]' style={{color:'#ff5500'}}  ></i>
                                    <h1 className='title3-section3 '>{card.title} mi</h1>
                                    </div>
                                </div>
                            </div>
                           
                            
                        </div>
                    </div>
                ))}
            </div>
            <div className="dots absolute bottom-[20%] left-[50%]">
                {[0, 1, 2,3,4,5].map((dotIndex) => (
                    <span key={dotIndex} onClick={() => handleDotClick(dotIndex)}
                          className={currentIndex === dotIndex ? 'dot active' : 'dot'}></span>
                ))}
            </div>
            <div className='absolute bottom-0 w-full h-[150px]  px-[5%] z-[2]'>
                    <form className='w-full h-full  pr-[12%] grid grid-cols-4 gap-3 items-center justify-center'>
                    <Select  styles={customStyles} placeholder='All Branch' menuPosition='fixed' className='' options={options} />
                    <Select placeholder='All Make' menuPosition='fixed' className='' options={options} />
                    <Select placeholder='All Model' menuPosition='fixed' className='' options={options} />
                    <Select placeholder='All Registration Date' menuPosition='fixed' className='' options={options} />
                    
                    </form>
                    <button className='buttonSearch absolute top-[37%] right-[76px] px-[38px] py-[10px] text-white  bg-[#FF5500]'>Search</button>
            </div>
            
            <div className='absolute h-[20vh] top-[86.2%] overlay inset-0  opacity-30 z-[1]' style={{backgroundImage: 'linear-gradient(to top, #FF5400 70%, #222222 100%)'}}></div>

        </div>
        <div className='section3.5 w-full h-[50vh]   bg-white flex gap-3'>
                    <div className=' w-[50%] h-full pl-10 '>
                        <div className='flex mt-[70px] gap-3'>
                            <p className='text-browse'>Browse by make</p>
                            <p className='text-show'>/ Show all make</p>
                        </div>
                        <div className='vertical-x-parallel mt-2'>
                        <div className='line-x'></div>
                        <div className='line-x mt-1'></div>                   
                    </div>
                    <div className='w-full h-full grid grid-cols-3 gap-2 mt-7'>
                        <div className='w-full h-full '>
                            <div className='flex  gap-2 py-3 items-center'>
                                <div className='w-[50px]'>
                                    <img className='h-[20px]' src={audiLogo} alt="" />
                                </div>
                                <p className='nameLogo m-0'>Audi <b className='quantityCar '>(3)</b></p>
                            </div>
                            <div className='flex gap-2 py-3 items-center'>
                                <div className='w-[50px]'>
                                    <img className='h-[20px]' src={hondaLogo} alt="" />
                                </div>
                                <p className='nameLogo m-0'>Honda <b className='quantityCar'>(3)</b></p>                            </div>
                            <div className='flex gap-2 py-3 items-center'>
                                <div className='w-[50px]'>
                                    <img className='h-[20px]' src={mazdaLogo} alt="" />
                                </div>
                                <p className='nameLogo m-0'>Mazda <b className='quantityCar'>(3)</b></p>                            </div>
                           
                        </div>
                        <div className='w-full h-full '>
                            <div className='flex  gap-2 py-3 items-center'>
                                <div className='w-[50px]'>
                                    <img className='h-[20px]' src={bmwLogo} alt="" />
                                </div>
                                <p className='nameLogo m-0'>BMW <b className='quantityCar '>(3)</b></p>
                            </div>
                            <div className='flex gap-2 py-3 items-center'>
                                <div className='w-[50px]'>
                                    <img className='h-[20px]' src={landLogo} alt="" />
                                </div>
                                <p className='nameLogo m-0'>Land Rover <b className='quantityCar'>(3)</b></p>                            </div>
                            <div className='flex gap-2 py-3 items-center'>
                                <div className='w-[50px]'>
                                    <img className='h-[20px]' src={merLogo} alt="" />
                                </div>
                                <p className='nameLogo m-0'>Mercesdes <b className='quantityCar'>(3)</b></p>                            </div>
                           
                        </div>
                        <div className='w-full h-full '>
                            <div className='flex  gap-2 py-3 items-center'>
                                <div className='w-[50px]'>
                                    <img className='h-[20px]' src={fordLogo} alt="" />
                                </div>
                                <p className='nameLogo m-0'>Ford <b className='quantityCar '>(3)</b></p>
                            </div>
                            <div className='flex gap-2 py-3 items-center'>
                                <div className='w-[50px]'>
                                    <img className='h-[20px]' src={lexusLogo} alt="" />
                                </div>
                                <p className='nameLogo m-0'>Lexus <b className='quantityCar'>(3)</b></p>                            </div>
                            <div className='flex gap-2 py-3 items-center'>
                                <div className='w-[50px]'>
                                    <img className='h-[20px]' src={toyotaLogo} alt="" />
                                </div>
                                <p className='nameLogo m-0'>Toyots <b className='quantityCar'>(3)</b></p>                            </div>
                           
                        </div>
                        
                    </div>
                    </div>
                    <div className=' w-[50%] h-full pr-10'>
                        <div className='flex mt-[70px] gap-3'>
                            <p className='text-browse'>Browse by type</p>
                            <p className='text-show'>/ Show all type</p>
                        </div>
                        <div className='vertical-x-parallel mt-2'>
                        <div className='line-x'></div>
                        <div className='line-x mt-1'></div>                   
                    </div>
                    <div className='w-full h-full grid grid-cols-3 gap-2 mt-7'>
                        <div className='w-full h-full '>
                            <div className='flex  gap-2 py-3 items-center'>
                                <div className='w-[50px]'>
                                    <img className='h-[20px]' src={autoLogo} alt="" />
                                </div>
                                <p className='nameLogo m-0'>Auto <b className='quantityCar '>(3)</b></p>
                            </div>
                            <div className='flex gap-2 py-3 items-center'>
                                <div className='w-[50px]'>
                                    <img className='h-[20px]' src={minivanLogo} alt="" />
                                </div>
                                <p className='nameLogo m-0'>Minivan <b className='quantityCar'>(3)</b></p>                            </div>
                            <div className='flex gap-2 py-3 items-center'>
                                <div className='w-[50px]'>
                                    <img className='h-[20px]' src={truckLogo} alt="" />
                                </div>
                                <p className='nameLogo m-0'>Truck <b className='quantityCar'>(3)</b></p>                            </div>
                           
                        </div>
                        <div className='w-full h-full'>
                            <div className='flex  gap-2 py-3 items-center'>
                                <div className='w-[50px]'>
                                    <img className='h-[20px]' src={beetleLogo} alt="" />
                                </div>
                                <p className='nameLogo m-0'>Beetle <b className='quantityCar '>(3)</b></p>
                            </div>
                            <div className='flex gap-2 py-3 items-center'>
                                <div className='w-[50px]'>
                                    <img className='h-[20px]' src={autoLogo} alt="" />
                                </div>
                                <p className='nameLogo m-0'>Sedan <b className='quantityCar'>(3)</b></p>                            </div>
                            <div className='flex gap-2 py-3 items-center'>
                                <div className='w-[50px]'>
                                    <img className='h-[20px]' src={vanLogo} alt="" />
                                </div>
                                <p className='nameLogo m-0'>Van <b className='quantityCar'>(3)</b></p>                            </div>
                           
                        </div>
                        <div className='w-full h-full '>
                            <div className='flex  gap-2 py-3 items-center'>
                                <div className='w-[50px]'>
                                    <img className='h-[20px]' src={convertibleLogo} alt="" />
                                </div>
                                <p className='nameLogo m-0'>Convertible <b className='quantityCar '>(3)</b></p>
                            </div>
                            <div className='flex gap-2 py-3 items-center'>
                                <div className='w-[50px]'>
                                    <img className='h-[20px]' src={suvLogo} alt="" />
                                </div>
                                <p className='nameLogo m-0'>SUV <b className='quantityCar'>(3)</b></p>                            </div>
                            
                           
                        </div>
                        
                    </div>
                    </div>
                    
        </div>
        <div className='section4 w-full relative h-[50vh] bg-pink-500'>
            <img className='w-full h-[50vh] object-cover object-center' src={homepage} alt="" />
            <div className='absolute h-[50vh] overlay inset-0 bg-black  opacity-50 z-[1]'></div>
            <div className='counter-container w-full h-full px-5  gap-2 absolute grid grid-cols-4 top-0'>
                    <div className=' flex justify-center items-center relative'>
                    <i class='bx bx-user-voice text-[8rem] absolute top-[22%] opacity-40' style={{color:'#fff'}}  ></i>
                    <div className='absolute bottom-[29%] z-[3]'>
                    <Counter  className='numbercount text-center' target={829} />
                    <h1 className='titleCount text-center'>Happy clients</h1>
                    </div>
                    </div>
                    <div className=' flex justify-center items-center relative'>
                    <i class='bx bx-car text-[8rem] absolute top-[22%] opacity-40' style={{color:'#fff'}}  ></i>
                    <div className='absolute bottom-[29%] z-[3]'>
                    <Counter  className='numbercount text-center' target={1024} />
                    <h1 className='titleCount text-center'>Vehicles in stock</h1>
                    </div>
                    </div>
                    <div className=' flex justify-center items-center relative'>
                    <i class='bx bx-award text-[8rem] absolute top-[22%] opacity-40' style={{color:'#fff'}}  ></i>
                    <div className='absolute bottom-[29%] z-[3]'>
                    <Counter  className='numbercount text-center' target={912} />
                    <h1 className='titleCount text-center'>awards</h1>
                    </div>
                    </div>
                    <div className=' flex justify-center items-center relative'>
                    <i class='bx bx-group text-[8rem] absolute top-[22%] opacity-40' style={{color:'#fff'}}  ></i>
                    <div className='absolute bottom-[29%] z-[3]'>
                    <Counter  className='numbercount text-center' target={829} />
                    <h1 className='titleCount text-center'>dealer branches</h1>
                    </div>
                    </div>
                    
            </div>

        {/* <Counter target={829} /> */}
        </div>
        <div className='section5 relative w-full h-[120VH] '>
        <div className='con1  w-full h-[100px] absolute top-[10%]'>
                <div className='con2'>
                    <h1 className='text-featured1 '>auto world magazine</h1>
                    <div className='flex justify-center mt-3'>
                    <div className='vertical-x-parallel'>
                        <div className='line-x'></div>
                        <div className='line-x mt-1'></div>                   
                    </div>
                    </div>
                    <h1 className='text-descr1 mt-4'>Hundreds of clients are thrilled by the service that we deliver and are happy to tell us. Read about what some have said about us here.</h1>

                </div>
                <div className='slider1 absolute w-full overflow-hidden h-[60vh] top-[185%]  px-[5%] gap-[30px] grid grid-cols-3'>
                   
                   
            {blogs.slice(currentIndex1, currentIndex1 + cardsPerSlide1).concat(
        blogs.slice(0, Math.max(0, cardsPerSlide1 - (blogs.length - currentIndex1)))
    ).map(blog => (
        <div key={blog.id} className='container-cardInfo w-full h-full relative '>
        <img className='h-[60%]' src={blog.avatar} alt="" />
        <div className='w-full h-[40%] bg-purple-300'>
            <div className='bg-[#f3f3f3] w-[20%] h-full grid grid-rows-2 gap-[1px]'>
                <div className='w-full h-full bg-white'>
                    <div className='flex h-full flex-col justify-center items-center '>
                    <i class='bx bx-chat text-[1.5rem]' style={{color:'#ff5500'}}  ></i>
                        <p className='text-[#A1A1A1]'>0</p>
                    </div>
                </div>
                <div className='w-full h-full bg-white'>
                    <div className='flex h-full flex-col justify-center items-center '>
                    <img src={eyeIcon} className='w-[25px]' alt="" />
                        <p className='text-[#A1A1A1]'>0</p>
                    </div>
                </div>
                
            </div>
            <div className='cardInfo w-[80%] h-[70%] right-0 top-[220px] absolute px-[7%]'>
                <div className='circle-avatar-author absolute top-[-30px] left-[30px]'>
                    <img src={homepage} className='w-[60px] h-[60px] object-cover' alt="" />
                </div>
                <div className='w-full  h-full mt-[18%]'>
                    <div className='flex w-full gap-4'>
                        <p className='text-[#A1A1A1] font-[400] text-[14px]'> By {blog.author}</p>
                        <div className='flex gap-1'>
                        <i class='bx bx-folder-open text-[1.2rem]' style={{color:'#FF5400'}}  ></i> 
                        <p className='text-[#A1A1A1] font-[400] text-[14px]'>{blog.category}</p>                                      
                        </div>
                    </div>
                    <h1 className='title-blog mt-1 mb-2'>
                    {blog.title}
                    </h1>
                    <TruncateText text={blog.description}  maxLength={90} />
                    <a href="" className='readMore absolute bottom-[17px]'>Read More</a>
                </div>
            </div>
        </div>
        <div className=' flex h-[40px] bg-[#ff5500] top-0 right-0 absolute'>
            <div className='flex w-[40px] bg-white justify-center'>
            <i class='bx bx-calendar text-[1.5rem] p-2' style={{color:'#ff5500'}} ></i>
            </div>
            <div className='flex items-center'>
                <h1 className='calendar'>September 26, 2023</h1>
            </div>
        </div>
    </div>
                ))}
           
                </div>
                <div className="dots absolute w-full justify-center bottom-[-600px]">
                {[0, 1, 2,3].map((dotIndex) => (
                    <span key={dotIndex} onClick={() => handleDotClick1(dotIndex)}
                          className={currentIndex === dotIndex ? 'dot active' : 'dot'}></span>
                ))}
            </div>
                
            </div>
        </div>
        <div className='section3 bg-pink-400 w-full h-[145vh] relative'>
            <img className='h-[145vh] object-cover' src={car1} alt="" />
            <div className='absolute h-[125vh] overlay inset-0  bg-black opacity-40 z-[1]' ></div>
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
            <div className='slider absolute top-[22%] w-full pr-[10%] pl-[4%]'>
            {cards.slice(currentIndex, currentIndex + cardsPerSlide).concat(
        cards.slice(0, Math.max(0, cardsPerSlide - (cards.length - currentIndex)))
    ).map(card => (
                    <div key={card.id} className="card">
                        <div className='relative'>
                        <img className='img-slider' src={car1} alt="" />
                        <div className='absolute container-mini'>
                                <h1 className='text-card'>${card.title}</h1>
                                
                        </div>
                        </div>
                        <div className='absolute top-[63%]  w-full h-[140px] px-4'>
                            <h1 className='title-section3'>{card.title}</h1>
                            <h1 className='title1-section3'>{card.description}</h1>
                        </div>
                        <div className='absolute bottom-0 w-full  grid grid-cols-3 gap-1'>
                            <div className='w-full h-[50px] bg-[#F1F1F1]'>
                                <div className='flex justify-center h-full items-center mt-1'>
                                    <div className='flex justify-center gap-1'>
                                    <i class='bx bx-registered text-[1rem]' style={{color:'#ff5500'}}  ></i>
                                    <h1 className='title3-section3 '>{card.title} mi</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full h-[50px] bg-[#F1F1F1]'>
                                <div className='flex justify-center h-full items-center mt-1'>
                                    <div className='flex justify-center gap-1'>
                                    <i class='bx bx-cog text-[1rem]' style={{color:'#ff5500'}}  ></i>
                                    <h1 className='title3-section3 '>{card.title} mi</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full h-[50px] bg-[#F1F1F1]'>
                                <div className='flex justify-center h-full items-center mt-1'>
                                    <div className='flex justify-center gap-1'>
                                    <i class='bx bx-car text-[1rem]' style={{color:'#ff5500'}}  ></i>
                                    <h1 className='title3-section3 '>{card.title} mi</h1>
                                    </div>
                                </div>
                            </div>
                           
                            
                        </div>
                    </div>
                ))}
            </div>
            <div className="dots absolute bottom-[20%] left-[50%]">
                {[0, 1, 2,3,4,5].map((dotIndex) => (
                    <span key={dotIndex} onClick={() => handleDotClick(dotIndex)}
                          className={currentIndex === dotIndex ? 'dot active' : 'dot'}></span>
                ))}
            </div>
            <div className='absolute bottom-0 w-full h-[150px]  px-[5%] z-[2]'>
                    <form className='w-full h-full  pr-[12%] grid grid-cols-4 gap-3 items-center justify-center'>
                    <Select  styles={customStyles} placeholder='All Branch' menuPosition='fixed' className='' options={options} />
                    <Select placeholder='All Make' menuPosition='fixed' className='' options={options} />
                    <Select placeholder='All Model' menuPosition='fixed' className='' options={options} />
                    <Select placeholder='All Registration Date' menuPosition='fixed' className='' options={options} />
                    
                    </form>
                    <button className='buttonSearch absolute top-[37%] right-[76px] px-[38px] py-[10px] text-white  bg-[#FF5500]'>Search</button>
            </div>
            
            <div className='absolute h-[20vh] top-[86.2%] overlay inset-0  opacity-30 z-[1]' style={{backgroundImage: 'linear-gradient(to top, #FF5400 70%, #222222 100%)'}}></div>

        </div>
        
    </>
  )
}
