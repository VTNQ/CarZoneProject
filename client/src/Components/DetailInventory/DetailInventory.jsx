import Menu from "../Menu/Menu";
import './DetailInventory.css';
import TinySlider from 'tiny-slider-react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRef, useState } from "react";
function DetailInventory() {
    const mapstyles = {
        height: '100vh',
        width: '100%',
    }
    const sliderRef = useRef(null);
    const slideSubRef = useRef(null);
    const gotoPrevSubRef = () => {
        if (slideSubRef.current) {
            const slickSlider = slideSubRef.current;
            const slideIndex = slickSlider.innerSlider.state.currentSlide;
            if (slideIndex != 0) {
                slideSubRef.current.slickPrev();
            }

        }
    }
    const gotoNextSubRef = () => {
        if (slideSubRef.current) {
            const slickSlider = slideSubRef.current;
            const slideIndex = slickSlider.innerSlider.state.currentSlide + 5;
            const slideCount = slickSlider.innerSlider.state.slideCount;

            // Check if slideIndex is not undefined and is not the last slide
            if (slideIndex !== undefined && slideIndex < slideCount) {
                slickSlider.slickNext(); // Go to the next slide
            }
        }
    }
    const renderTabContent = () => {
        switch (ActiveTab) {
            case 'Overview':
                return(
                    <ul className="uk-switcher uk-margin-medium-top">
                    <li className="uk-active" id="uk-tab-2">
                        <p style={{ lineHeight: '1.7', color: '#555555', fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontWeight: '400', fontSize: '16px' }}>
                            <strong style={{ color: "#555555", fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontWeight: 'bold', fontSize: '16px' }}>The seventh-generation BMW 3 Series was launched in India back in August 2019. The model is currently available in four trims that include 330i Sport, 320d Luxury Edition, 330i M Sport, and the M340i xDrive. Exterior highlights of the new BMW 3 Series include the signature kidney grille, LED headlamps, 17-inch alloy wheels.</strong>
                        </p>
                        <p style={{ lineHeight: '1.7', color: '#555555', fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontWeight: '400', fontSize: '14px' }}>This beautiful car benefits from the following equipment : AMG Carbon Fibre Trim; Reversing Camera; Blind Spot Assistant; Auto Dimming Interior & Exterior Mirrors; Electric Seats with Memory; AMG Performance Steering Wheel in Leather & Alcantara; AIRSCARF; Tyre Pressure Monitoring System; AMG Ride Control sports Suspension with Adjustable Damper System; Electric Folding Exterior Mirrors; COMAND APS with DVD Changer; Media Interface; Thermotronic Climate Control; Bi Xenon Headlamps; AMG Polished Alloy Wheels.</p>
                        <div className="su-row">
                            <div className="su-column su-column-size-1-2">
                                <div className="su-column-inner su-u-clearfix su-u-trim">
                                    <p></p>
                                    <h4 style={{ fontFamily: 'Montserrat, Arial, Helvetica, sans-serif', fontSize: '20px', lineHeight: '1.2em', textTransform: 'capitalize', fontWeight: '600' }}>Running costs</h4>
                                    <p></p>
                                    <div className="su-list" style={{ marginLeft: '0' }}>
                                        <p></p>
                                        <ul style={{ marginLeft: '-19px' }}>
                                            <li>
                                                <i className="fa fa-check-square-o" style={{ color: '#ff5400' }}></i>
                                                <div className="su-list">
                                                    18″ 5-Spoke Light-Alloy Wheels
                                                </div>
                                            </li>
                                            <li>
                                                <i className="fa fa-check-square-o" style={{ color: '#ff5400' }}></i>
                                                <div className="su-list">
                                                    4-Wheel Disc Brakes
                                                </div>
                                            </li>
                                            <li>
                                                <i className="fa fa-check-square-o" style={{ color: '#ff5400' }}></i>
                                                <div className="su-list">
                                                    ABS brakes
                                                </div>
                                            </li>
                                            <li>
                                                <i className="fa fa-check-square-o" style={{ color: '#ff5400' }}></i>
                                                <div className="su-list">

                                                    AM/FM radio: SiriusXM
                                                </div>
                                            </li>
                                            <li>
                                                <i className="fa fa-check-square-o" style={{ color: '#ff5400' }}></i>
                                                <div className="su-list">

                                                    Adaptive suspension
                                                </div>
                                            </li>
                                            <p></p>
                                            <p></p>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                            <div className="su-column su-column-size-1-2">
                                <div className="su-column-inner su-u-clearfix su-u-trim">
                                    <p></p>
                                    <h4 style={{ fontFamily: 'Montserrat, Arial, Helvetica, sans-serif', fontSize: '20px', lineHeight: '1.2em', textTransform: 'capitalize', fontWeight: '600' }}>Performance</h4>
                                    <div className="su-list" style={{ marginLeft: '0' }}>
                                        <p></p>
                                        <ul style={{ marginLeft: '-19px' }}>
                                            <li>
                                                <i className="fa fa-check-square-o" style={{ color: '#ff5400' }}></i>
                                                <div className="su-list">
                                                    Auto tilt-away steering wheel
                                                </div>
                                            </li>
                                            <li>
                                                <i className="fa fa-check-square-o" style={{ color: '#ff5400' }}></i>
                                                <div className="su-list">
                                                    Auto-dimming Rear-View mirror
                                                </div>
                                            </li>
                                            <li>
                                                <i className="fa fa-check-square-o" style={{ color: '#ff5400' }}></i>
                                                <div className="su-list">
                                                    Auto-dimming door mirrors
                                                </div>
                                            </li>
                                            <li>
                                                <i className="fa fa-check-square-o" style={{ color: '#ff5400' }}></i>
                                                <div className="su-list">

                                                    Auto-leveling suspension
                                                </div>
                                            </li>
                                            <li>
                                                <i className="fa fa-check-square-o" style={{ color: '#ff5400' }}></i>
                                                <div className="su-list">

                                                    Automatic temperature control
                                                </div>
                                            </li>
                                            <p></p>
                                            <p></p>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>  
                )
                case 'Featured':
                    return(
                        <ul className="uk-switcher uk-margin-medium-top">
                            <li id="uk-tab-4">
                               <h4 className="body-h2 css-1128h8c et3p2gv0" style={{fontSize:'1.22em',lineHeight:'1.2em',fontFamily:'Montserrat, Arial, Helvetica, sans-serif'}}>
                                <strong>EV Motor, Power, and Performance</strong>
                               </h4>
                               <p style={{lineHeight:'1.7',fontFamily:'Inter, Arial, Helvetica, sans-serif',fontWeight:'400',fontSize:'16px',color:'#555555'}}>A steer-by-wire system is standard, and Lexus has confirmed that a yoke-style steering wheel will be offered as an option; a regular circular wheel will be standard, so if you’re not ready for a yoke you’ll be able to opt out. The steer-by-wire system takes getting used to but once we got the hang of it, it proved to be beneficial for handling. When we get a chance to test the RZ at our test track, we’ll update this story with results.</p>
                               <h4 className="body-h2 css-1128h8c et3p2gv0" style={{fontSize:'1.22em',lineHeight:'1.2em',fontFamily:'Montserrat, Arial, Helvetica, sans-serif'}}>
                                <strong>Range, Charging, and Battery Life</strong>
                               </h4>
                               <p style={{lineHeight:'1.7',fontFamily:'Inter, Arial, Helvetica, sans-serif',fontWeight:'400',fontSize:'16px',color:'#555555'}}>The RZ450 will use the same 65.6-kWh battery pack as the bZ4X and Solterra, which should deliver around 225 miles of driving range per charge, according to Lexus. A 6.6-kW onboard charger is weaker than many rivals and the RZ’s DC fast-charging capabilities are limited to 150-kW connections. A simplicity-focused interior design in the RZ’s interior has removed many buttons and switches from the dashboard and doors and relocated those things to the large infotainment display. Similar approaches have been employed in EV models from Tesla and Polestar, with varying results. Either way, the RZ’s cabin looks spacious for a small crossover and quite upscale, with most surfaces wrapped with faux suede or synthetic leather.</p>
                               <div className="su-row">
                                <div className="su-column su-column-size-1-2">
                                    <div className="su-column-inner su-u-clearfix su-u-trim">
                                        <h4 style={{ fontFamily: 'Montserrat, Arial, Helvetica, sans-serif', fontSize: '20px', lineHeight: '1.2em', textTransform: 'capitalize', fontWeight: '600' }}>Engine</h4>
                                        <ol>
                                            <li> Engine Type 
                                                <strong>4.6L Gas V8</strong>
                                            </li>
                                            <li>  Horsepower
                                                <strong>429 @ 5250 rpm</strong>
                                            </li>
                                            <li>  Torque (lb-ft)
                                                <strong>516 @ 1800-3500 rpm</strong>
                                            </li>
                                            <li>  Fuel Capacity
                                                <strong>21.9 gal</strong>
                                            </li>
                                            <li>  Driven Wheels
                                                <strong>AWD</strong>
                                            </li>
                                        </ol>
                                        <h4 style={{ fontFamily: 'Montserrat, Arial, Helvetica, sans-serif', fontSize: '20px', lineHeight: '1.2em', textTransform: 'capitalize', fontWeight: '600' }}>Vehicle</h4>
                                        <ol>
                                            <li> Curb Weight
                                                <strong>4619.0 lbs.</strong>
                                            </li>
                                            <li>  Wheelbase
                                                <strong>116.3 in.</strong>
                                            </li>
                                            <li>  Height 
                                                <strong>55.8 in.</strong>
                                            </li>
                                           
                                        </ol>
                                    </div>
                                </div>
                                <div className="su-column su-column-size-1-2">
                                    <div className="su-column-inner su-u-clearfix su-u-trim">
                                        <h4 style={{ fontFamily: 'Montserrat, Arial, Helvetica, sans-serif', fontSize: '20px', lineHeight: '1.2em', textTransform: 'capitalize', fontWeight: '600' }}>Wheels</h4>
                                        <ol>
                                            <li> Tires 
                                                <strong>P275/45HR18</strong>
                                            </li>
                                            <li>  Rim Size
                                                <strong>18 x 9.5 in.</strong>
                                            </li>
                                            <li>  Rims
                                                <strong>Aluminum</strong>
                                            </li>
                                            <li>  Front Rims
                                                <strong>18 x 8.5</strong>
                                            </li>
                                            <li> Front Wheels
                                                <strong>P255/45HR18</strong>
                                            </li>
                                        </ol>
                                        <h4 style={{ fontFamily: 'Montserrat, Arial, Helvetica, sans-serif', fontSize: '20px', lineHeight: '1.2em', textTransform: 'capitalize', fontWeight: '600' }}>Interior Space</h4>
                                        <ol>
                                            <li> Seating Capacity
                                                <strong>4</strong>
                                            </li>
                                            <li>  Front Headroom/ Legroom
                                                <strong>36.9 in. / 42.2 in.</strong>
                                            </li>
                                            <li>   Rear Headroom/ Legroom
                                                <strong>36.4 in. / 32.2 in.</strong>
                                            </li>
                                           
                                        </ol>
                                    </div>
                                </div>
                               </div>
                            </li>
                        </ul>
                    )
                    case'Request':
                    return(
                        <ul className="uk-switcher uk-margin-medium-top">
                            <li id="uk-tab-6">
                                <div className="su-gmap su-u-responsive-media-yes">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.1485195313026!2d106.71160187480542!3d10.806689089343907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529ed00409f09%3A0x11f7708a5c77d777!2zQXB0ZWNoIENvbXB1dGVyIEVkdWNhdGlvbiAtIEjhu4cgVGjhu5FuZyDEkMOgbyB04bqhbyBM4bqtcCBUcsOsbmggVmnDqm4gUXXhu5FjIHThur8gQXB0ZWNo!5e1!3m2!1svi!2s!4v1715393973056!5m2!1svi!2s" width="600" height="450" style={mapstyles} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                </div>
                                <div className="wpforms-container wpforms-container-full" id="wpforms-10201">
                                    <form action="" className="wpforms-validate wpforms-form wpforms-ajax-form">
                                        <div className="wpforms-field-container">
                                            <div id="wpforms-10201-field_1-container" className="wpforms-field wpforms-field-text wpforms-one-half wpforms-first">
                                                <label htmlFor="" className="wpforms-field-label">Your Name
                                                <span className="wpforms-required-label">*</span>
                                                 </label>
                                            <input type="text" id="wpforms-14099-field_1" className="wpforms-field-large wpforms-field-required" placeholder="Your Name" style={{ color: '#555555', fontWeight: '400', fontFamily: 'inherit', fontSize: '0.9em', marginRight: '0', height: '50px', lineHeight: '50px', backgroundColor: '#ffffff', borderRadius: '0', border: '1px solid rgba(0, 0, 0, 0.1)', marginTop: '0', padding: '0 15px', background: '#fff', width: '100%', maxWidth: '100%' }} />
                                            </div>
                                            <div id="wpforms-10201-field_2-container" className="wpforms-field wpforms-field-text wpforms-one-half" style={{marginLeft:'5px'}}>
                                                <label htmlFor="" className="wpforms-field-label">Your Email
                                                <span className="wpforms-required-label">*</span>
                                                 </label>
                                            <input type="text" id="wpforms-14099-field_1" className="wpforms-field-large wpforms-field-required" placeholder="Your Name" style={{ color: '#555555', fontWeight: '400', fontFamily: 'inherit', fontSize: '0.9em', marginRight: '0', height: '50px', lineHeight: '50px', backgroundColor: '#ffffff', borderRadius: '0', border: '1px solid rgba(0, 0, 0, 0.1)', marginTop: '0', padding: '0 15px', background: '#fff', width: '100%', maxWidth: '100%' }} />
                                            </div>
                                            <div id="wpforms-10201-field_2-container" className="wpforms-field wpforms-field-text wpforms-one-half" style={{marginLeft:'5px',width:'100%'}}>
                                                <label htmlFor="" className="wpforms-field-label">Subject
                                               
                                                 </label>
                                            <input type="text" id="wpforms-14099-field_1" className="wpforms-field-large wpforms-field-required" placeholder="Your Name" style={{ color: '#555555', fontWeight: '400', fontFamily: 'inherit', fontSize: '0.9em', marginRight: '0', height: '50px', lineHeight: '50px', backgroundColor: '#ffffff', borderRadius: '0', border: '1px solid rgba(0, 0, 0, 0.1)', marginTop: '0', padding: '0 15px', background: '#fff', width: '100%', maxWidth: '100%' }} />
                                            </div>
                                            <div id="wpforms-10201-field_2-container" className="wpforms-field wpforms-field-text wpforms-one-half" style={{marginLeft:'5px',width:'100%'}}>
                                                <label htmlFor="" className="wpforms-field-label">Message
                                               
                                                 </label>
                                            <textarea  id="wpforms-14099-field_1" className="wpforms-field-large wpforms-field-required" placeholder="Your Message" style={{  color: '#555555', fontWeight: '400', fontFamily: 'inherit', fontSize: '0.9em', marginRight: '0', height: '50px', lineHeight: '50px', backgroundColor: '#ffffff', borderRadius: '0', border: '1px solid rgba(0, 0, 0, 0.1)', marginTop: '0', padding: '0 15px', background: '#fff', width: '100%', maxWidth: '100%', paddingTop: '10px', paddingBottom: '10px', height: '220px' }} />
                                            </div>
                                        </div>
                                        <div className="wpforms-submit-container">
                                        <button type="button" id="wpforms-submit-14099" className="wpforms-submit" style={{ backgroundColor: '#ff5400', color: '#ffffff', border: '2px solid transparent', borderRadius: '0', cursor: 'pointer', fontWeight: '700', fontSize: '14px', lineHeight: '1.5', padding: '13px 32px', textDecoration: 'none', textTransform: 'uppercase' }}>Send Message</button>
                                        </div>
                                    </form>
                                </div>
                            </li>
                        </ul>
                    )
        }
    }
    const goToPrev = () => {
        if (sliderRef.current) {
            const slickSlider = sliderRef.current;
            const slideIndex = slickSlider.innerSlider.state.currentSlide;
            if (slideIndex != 0) {
                sliderRef.current.slickPrev();
            }

        }
    };

    const goToNext = () => {
        if (sliderRef.current) {
            const slickSlider = sliderRef.current;
            const slideIndex = slickSlider.innerSlider.state.currentSlide;
            const slideCount = slickSlider.innerSlider.state.slideCount;
            console.log(slideIndex)
            if (slideIndex != undefined && slideIndex < slideCount - 1) {
                sliderRef.current.slickNext();
            }

        }

    };
    const [ActiveTab,setActiveTab]=useState('Overview');
    const handleTabChange = (tabID) => {
        setActiveTab(tabID);
    }
    
    const handleThumbnailClick = (index) => {
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(index);
        }
    }
    // Configuration for the slideshow
    const settings = {
        dots: true,

        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,

        arrows: false, // Hide arrows for navigation
    };
    const settingshow = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,

        arrows: false,
    }
    const settingSlide = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,

        arrows: false,
    }

    return (
        <div className="templaza-content">
            <div className="templaza-layout templaza-layout-wide">
                <div className="templaza-wrapper">
                    <Menu />
                    <section id="templaza-section-1715290647882813" className="templaza-section tz_custom_1715290647882813 section_heading uk-text-center tz_background_overlay ">
                        <div className="uk-container uk-container-large ">
                            <div id="templaza-row-1715290647882951" className="uk-grid templaza-row tz_custom_1715290647882951 uk-grid-stack">
                                <div id="templaza-column-1715290647883081" className="templaza-column tz_custom_1715290647883081 uk-width-expand@l uk-width-1-1 uk-width-1-1@s uk-width-expand@m uk-first-column">
                                    <div id="templaza-heading-1715290647883177" className="templaza-heading tz_custom_1715290647883177">
                                        <h1>911 CARRERA</h1>
                                    </div>
                                    <div id="templaza-breadcrumb-1715290647883533" className="templaza-breadcrumb tz_custom_1715290647883533">
                                        <div className="tzautoshowroom-breadcrumb">
                                            <ul id="breadcrumb" className="templaza-breadcrumb uk-breadcrumb">
                                                <li className="item-home">
                                                    <a href="">Home</a>
                                                </li>
                                                <li className="item-cat item-custom-post-type-ap_product">
                                                    <a href="">Inventory</a>
                                                </li>
                                                <li className="item-cat">
                                                    <a href="">Car</a>
                                                </li>
                                                <li className="item-current item-14468">
                                                    <span className="bread-current bread-14468"> Contact Us</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="templaza-section-1715333073936230" className="templaza-section tz_custom_1715333073936230">
                        <div className="uk-container uk-container-large ">
                            <div id="templaza-row-1715333073936310" className="uk-grid templaza-row tz_custom_1715333073936310 uk-grid-stack">
                                <div id="templaza-column-1715333073936401" className="templaza-column tz_custom_1715333073936401 uk-width-1-1@l uk-width-1-1 uk-width-1-1@s uk-width-1-1@m uk-first-column">
                                    <div id="templaza-content_area-1715333073936505" className="templaza-content_area tz_custom_1715333073936505">
                                        <div className="templaza-ap-single uk-article">
                                            <div id="ap-wrap-content" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '57px' }}>
                                                <div className="uk-width-expand@m ap-content uk-first-column">
                                                    <div className="ap-single-box ap-single-media">
                                                        <div className="uk-display-block uk-position-relative">
                                                            <div className="ap-media entry-image full-image  uk-container-expand">
                                                                <div className="uk-inline tz-slideshow-wrap modecarousel img-cover">
                                                                    <div className="tns-outer" id="tns1-ow">
                                                                        <div id="tns1-mw" className="tns-ovh tns-ah" style={{ height: '461px' }}>
                                                                            <div className="tns-inner" id="tns1-iw">
                                                                                <Slider {...settings} ref={sliderRef}>
                                                                                    <div>
                                                                                        <img src="https://autoshowroom.templaza.net/wp-content/uploads/2022/10/erik-mclean-M0z9ajPI3PE-unsplash.jpg" width={800} height={533} alt="Slide 1" />
                                                                                    </div>
                                                                                    <div>
                                                                                        <img src="https://autoshowroom.templaza.net/wp-content/uploads/2022/10/audi-300x200.jpg" width={800} height={533} style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                                                                            alt="Slide 2" />
                                                                                    </div>
                                                                                    <div>
                                                                                        <img src="https://autoshowroom.templaza.net/wp-content/uploads/2022/10/audi-3-300x200.jpg" width={800} height={533} alt="Slide 3" />
                                                                                    </div>
                                                                                    <div>
                                                                                        <img src="https://autoshowroom.templaza.net/wp-content/uploads/2022/10/audi-2-300x200.jpg" width={800} height={533} alt="Slide 3" />
                                                                                    </div>
                                                                                    <div>
                                                                                        <img src="https://autoshowroom.templaza.net/wp-content/uploads/2022/10/audi2-300x200.jpg" width={800} height={533} alt="Slide 3" />
                                                                                    </div>
                                                                                </Slider>

                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                    <div className="tz-slideshow-control">
                                                                        <div className="prev" style={{ opacity: '0.5' }} onClick={goToPrev}>
                                                                            <i className="fas fa-chevron-left"></i>
                                                                        </div>
                                                                        <div className="next" onClick={goToNext}>
                                                                            <i className="fas fa-chevron-right"></i>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="tz-control-wrap uk-inline modecarousel img-cover">
                                                                    <div className="tns-outer" id="tns2-ow">
                                                                        <div id="tns2-mw" className="tns-ovh">
                                                                            <div className="tz-ap-thumbnails  tns-slider tns-carousel tns-subpixel tns-calc tns-horizontal" style={{ transitionDuration: '0s', transform: 'translate3d(0%, 0px, 0px)' }}>
                                                                                <Slider {...settingshow} ref={slideSubRef}>
                                                                                    <div className="ap-tiny-slider-thumbnail tns-item tns-slide-active tns-nav-active" style={{ padding: '20px' }} onClick={() => handleThumbnailClick(0)}>
                                                                                        <div className="thumb-img-wrap">
                                                                                            <img src="https://autoshowroom.templaza.net/wp-content/uploads/2022/10/erik-mclean-M0z9ajPI3PE-unsplash-300x200.jpg" width={161} height={107} alt="" />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="ap-tiny-slider-thumbnail tns-item tns-slide-active tns-nav-active" style={{ padding: '20px' }} onClick={() => handleThumbnailClick(1)}>
                                                                                        <div className="thumb-img-wrap">
                                                                                            <img src="https://autoshowroom.templaza.net/wp-content/uploads/2022/10/audi-300x200.jpg" width={161} height={107} alt="" />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="ap-tiny-slider-thumbnail tns-item tns-slide-active tns-nav-active" style={{ padding: '20px' }} onClick={() => handleThumbnailClick(2)}>
                                                                                        <div className="thumb-img-wrap">
                                                                                            <img src="https://autoshowroom.templaza.net/wp-content/uploads/2022/10/audi-3-300x200.jpg" width={161} height={107} alt="" />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="ap-tiny-slider-thumbnail tns-item tns-slide-active tns-nav-active" style={{ padding: '20px' }} onClick={() => handleThumbnailClick(3)}>
                                                                                        <div className="thumb-img-wrap">
                                                                                            <img src="https://autoshowroom.templaza.net/wp-content/uploads/2022/10/audi-2-300x200.jpg" width={161} height={107} alt="" />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="ap-tiny-slider-thumbnail tns-item tns-slide-active tns-nav-active" style={{ padding: '20px' }} onClick={() => handleThumbnailClick(4)}>
                                                                                        <div className="thumb-img-wrap">
                                                                                            <img src="https://autoshowroom.templaza.net/wp-content/uploads/2022/10/audi2-300x200.jpg" width={161} height={107} alt="" />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="ap-tiny-slider-thumbnail tns-item tns-slide-active tns-nav-active" style={{ padding: '20px' }} onClick={() => handleThumbnailClick(4)}>
                                                                                        <div className="thumb-img-wrap">
                                                                                            <img src="https://autoshowroom.templaza.net/wp-content/uploads/2022/10/audi2-300x200.jpg" width={161} height={107} alt="" />
                                                                                        </div>
                                                                                    </div>
                                                                                </Slider>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="tz-slideshow-control-thumb1">
                                                                    <div className="prev" style={{ opacity: '1', backgroundColor: '#ff5400', color: '#ffffff', height: '30px', width: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', top: '87%', left: '4px', position: 'absolute' }} onClick={gotoPrevSubRef}>
                                                                        <i className="fas fa-chevron-left"></i>
                                                                    </div>
                                                                    <div className="next" style={{ opacity: '1', backgroundColor: '#ff5400', color: '#ffffff', height: '30px', width: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', top: '87%', right: '0', position: 'absolute' }} onClick={gotoNextSubRef}>
                                                                        <i className="fas fa-chevron-right"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="ap-single-box1 ap-single-content" style={{ height: ActiveTab === 'Overview' ? '22%' : ActiveTab === 'Featured' ? '40%' : '55%' }}>
                                                        <ul className="uk-tab">
                                                            <li className={`${ActiveTab=='Overview'?'uk-active':''}`} onClick={() => handleTabChange("Overview")}>
                                                                <a  id="uk-tab-1" style={{ textDecoration: "none" }}> Vehicle Overview </a>
                                                            </li>
                                                            <li className={`${ActiveTab=='Featured'?'uk-active':''}`} onClick={() => handleTabChange("Featured")}>
                                                                <a  style={{ textDecoration: "none" }}> Features & Options </a>
                                                            </li>
                                                            <li className={`${ActiveTab=='Request'?'uk-active':''}`} onClick={() => handleTabChange("Request")}>
                                                                <a  style={{ textDecoration: "none" }}>  Request information  </a>
                                                            </li>
                                                        </ul>
                                                        {renderTabContent()}
                                                    </div>
                                                    <div className="templaza-single-comment ap-single-box1">
                                                    <div id="comments" className="comments-area templaza-comment-form ">
                                                        <div className="CommentForm">
                                                            <div id="respond" className="comment-respond">
                                                                <h3 id="reply-title" className="comment-reply-title box-title" style={{fontFamily:'Montserrat, Arial, Helvetica, sans-serif',fontWeight:'700',color:'#222222'}}>
                                                                Leave a Comment 
                                                                </h3>
                                                                <form action="" id="commentform">
                                                                    <p className="comment-notes" style={{lineHeight:'1.7',fontFamily:'Inter, Arial, Helvetica, sans-serif',fontWeight:'400',fontSize:'16px',color:'#555555'}}>
                                                                    <span id="email-notes">Your email address will not be published.
                                                                    <span className="required-field-message">
                                                                    Required fields are marked 
                                                                    <span className="required">*</span>
                                                                    </span>
                                                                    </span>
                                                                    </p>
                                                                    <div className="comment-form-comment">
                                                                    <textarea type="tel" id="wpforms-14099-field_1" className="wpforms-field-large wpforms-field-required" placeholder="Your Comment" style={{ color: '#555555', fontWeight: '400', fontFamily: 'inherit', fontSize: '0.9em', marginRight: '0', height: '50px', lineHeight: '50px', backgroundColor: '#ffffff', borderRadius: '0', border: '1px solid rgba(0, 0, 0, 0.1)', marginTop: '0', padding: '0 15px', background: '#fff', width: '100%', maxWidth: '100%', paddingTop: '10px', paddingBottom: '10px', height: '220px' }} />
                                                                    </div>
                                                                    <div className="content-form uk-child-width-1-2@s uk-grid-small uk-grid">
                                                                        <div className="comment-form-author uk-first-column" style={{width:'50%'}}>
                                                                        <input type="text" id="wpforms-14099-field_1" className="wpforms-field-large wpforms-field-required" placeholder="Enter Your Name" style={{ color: '#555555', fontWeight: '400', fontFamily: 'inherit', fontSize: '0.9em', marginRight: '0', height: '50px', lineHeight: '50px', backgroundColor: '#ffffff', borderRadius: '0', border: '1px solid rgba(0, 0, 0, 0.1)', marginTop: '0', padding: '0 15px', background: '#fff', width: '100%', maxWidth: '100%' }} />
                                                                        </div>
                                                                        <div className="comment-form-author uk-first-column" style={{width:'50%'}}>
                                                                        <input type="email" id="wpforms-14099-field_1" className="wpforms-field-large wpforms-field-required" placeholder="Enter Your Email" style={{ color: '#555555', fontWeight: '400', fontFamily: 'inherit', fontSize: '0.9em', marginRight: '0', height: '50px', lineHeight: '50px', backgroundColor: '#ffffff', borderRadius: '0', border: '1px solid rgba(0, 0, 0, 0.1)', marginTop: '0', padding: '0 15px', background: '#fff', width: '100%', maxWidth: '100%',marginLeft:'3px' }} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="wpforms-submit-container" style={{marginTop:"10px"}}>
                                                                                <button type="button" id="wpforms-submit-14099" className="wpforms-submit" style={{ backgroundColor: '#ff5400', color: '#ffffff', border: '2px solid transparent', borderRadius: '0', cursor: 'pointer', fontWeight: '700', fontSize: '14px', lineHeight: '1.5', padding: '13px 32px', textDecoration: 'none', textTransform: 'uppercase' }}>Post Comment</button>
                                                                            </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </div>
                                                <div className="uk-width-1-3@m ap-templaza-sidebar uk-visible@m">
                                                    <div className="ap-sidebar-inner">
                                                        <div className="ap-single-price-box ap-single-side-box " style={{ width: '268%' }}>
                                                            <div className="ap-single-price">
                                                                <div className="ap-single-price uk-flex uk-flex-between uk-flex-middle">
                                                                    <div className="ap-price-label">
                                                                        <label htmlFor="" className="single-price-label" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontWeight: '400', fontSize: '16px', lineHeight: '1,7em', color: '#555555' }}>PRICE:</label>
                                                                    </div>
                                                                    <div className="ap-price-value uk-text-right">
                                                                        <span className="price"> $98,000 </span>
                                                                        <span className="price price_msrp uk-display-block uk-text-right">
                                                                            <span className="msrp_label"> MSRP: </span>
                                                                            <span>$96,500</span>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="hightlight-box uk-margin-top">
                                                                <a className="highlight uk-flex uk-flex-center uk-flex-middle deco no-underline">
                                                                    <span> MAKE AN OFFER PRICE </span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="ap-single-side-box ap-specs ap-box ap-group ap-group-auto-specifications" style={{ width: '268%' }}>
                                                            <div className="widget-content">
                                                                <h3 className="widget-title ap-group-title is-style-templaza-heading-style3">
                                                                    <span style={{ fontWeight: 'bold', fontFamily: 'Montserrat, Arial, Helvetica, sans-serif', fontSize: '18px' }}>Auto Specifications</span>
                                                                </h3>
                                                                <div className="ap-group-content">
                                                                    <div className="uk-grid-small uk-grid">
                                                                        <div className="uk-width-expand uk-leader uk-first-column">
                                                                            <span className="uk-leader-fill" data-fill="............................................................................">
                                                                                Make
                                                                            </span>
                                                                        </div>
                                                                        <div className="field-value" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.0em ', fontWeight: 'bold' }}>
                                                                            Porsche       </div>
                                                                    </div>
                                                                    <div className="uk-grid-small uk-grid">
                                                                        <div className="uk-width-expand uk-leader uk-first-column">
                                                                            <span className="uk-leader-fill" data-fill="......................................................................................">
                                                                                Model
                                                                            </span>
                                                                        </div>
                                                                        <div className="field-value" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.0em', fontWeight: 'bold' }}>
                                                                            911       </div>
                                                                    </div>
                                                                    <div className="uk-grid-small uk-grid">
                                                                        <div className="uk-width-expand uk-leader uk-first-column">
                                                                            <span className="uk-leader-fill" data-fill="................................................................">
                                                                                Registration Date
                                                                            </span>
                                                                        </div>
                                                                        <div className="field-value" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.0em', fontWeight: 'bold' }}>
                                                                            2022    </div>
                                                                    </div>
                                                                    <div className="uk-grid-small uk-grid">
                                                                        <div className="uk-width-expand uk-leader uk-first-column">
                                                                            <span className="uk-leader-fill" data-fill="..........................................................................">
                                                                                Condition
                                                                            </span>
                                                                        </div>
                                                                        <div className="field-value" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.0em', fontWeight: 'bold' }}>
                                                                            new     </div>
                                                                    </div>
                                                                    <div className="uk-grid-small uk-grid">
                                                                        <div className="uk-width-expand uk-leader uk-first-column">
                                                                            <span className="uk-leader-fill" data-fill=".............................................................">
                                                                                Transmission
                                                                            </span>
                                                                        </div>
                                                                        <div className="field-value" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.0em', fontWeight: 'bold' }}>
                                                                            Automatic
                                                                        </div>
                                                                    </div>
                                                                    <div className="uk-grid-small uk-grid">
                                                                        <div className="uk-width-expand uk-leader uk-first-column">
                                                                            <span className="uk-leader-fill" data-fill="..........................................................................................">
                                                                                Engine
                                                                            </span>
                                                                        </div>
                                                                        <div className="field-value" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.0em', fontWeight: 'bold' }}>
                                                                            9L    </div>
                                                                    </div>
                                                                    <div className="uk-grid-small uk-grid">
                                                                        <div className="uk-width-expand uk-leader uk-first-column">
                                                                            <span className="uk-leader-fill" data-fill="................................................................................">
                                                                                Drivetrain
                                                                            </span>
                                                                        </div>
                                                                        <div className="field-value" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.0em', fontWeight: 'bold' }}>
                                                                            4WD    </div>
                                                                    </div>
                                                                    <div className="uk-grid-small uk-grid">
                                                                        <div className="uk-width-expand uk-leader uk-first-column">
                                                                            <span className="uk-leader-fill" data-fill=".............................................................">
                                                                                Number of doors
                                                                            </span>
                                                                        </div>
                                                                        <div className="field-value" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.0em', fontWeight: 'bold' }}>
                                                                            4 Doors   </div>
                                                                    </div>
                                                                    <div className="uk-grid-small uk-grid">
                                                                        <div className="uk-width-expand uk-leader uk-first-column">
                                                                            <span className="uk-leader-fill" data-fill=".........................................................................">
                                                                                Fuel Type
                                                                            </span>
                                                                        </div>
                                                                        <div className="field-value" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.0em', fontWeight: 'bold' }}>
                                                                            Biodiesel  </div>
                                                                    </div>
                                                                    <div className="uk-grid-small uk-grid">
                                                                        <div className="uk-width-expand uk-leader uk-first-column">
                                                                            <span className="uk-leader-fill" data-fill="..........................................................................">
                                                                                Motor size
                                                                            </span>
                                                                        </div>
                                                                        <div className="field-value" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.0em', fontWeight: 'bold' }}>
                                                                            250CC   </div>
                                                                    </div>
                                                                    <div className="uk-grid-small uk-grid">
                                                                        <div className="uk-width-expand uk-leader uk-first-column">
                                                                            <span className="uk-leader-fill" data-fill="..........................................................................................">
                                                                                BHP
                                                                            </span>
                                                                        </div>
                                                                        <div className="field-value" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.0em', fontWeight: 'bold' }}>
                                                                            195 </div>
                                                                    </div>
                                                                    <div className="uk-grid-small uk-grid">
                                                                        <div className="uk-width-expand uk-leader uk-first-column">
                                                                            <span className="uk-leader-fill" data-fill=".......................................................................">
                                                                                Exterior Color
                                                                            </span>
                                                                        </div>
                                                                        <div className="field-value" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.0em', fontWeight: 'bold' }}>
                                                                            Red   </div>
                                                                    </div>
                                                                    <div className="uk-grid-small uk-grid">
                                                                        <div className="uk-width-expand uk-leader uk-first-column">
                                                                            <span className="uk-leader-fill" data-fill=".......................................................................">
                                                                                Interior Color
                                                                            </span>
                                                                        </div>
                                                                        <div className="field-value" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.0em', fontWeight: 'bold' }}>
                                                                            Black</div>
                                                                    </div>
                                                                    <div className="uk-grid-small uk-grid">
                                                                        <div className="uk-width-expand uk-leader uk-first-column">
                                                                            <span className="uk-leader-fill" data-fill=".......................................................................">
                                                                                Mileage
                                                                            </span>
                                                                        </div>
                                                                        <div className="field-value" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.0em', fontWeight: 'bold' }}>
                                                                            25000 mi</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="call-to-buy uk-flex uk-flex-middle" style={{ width: '268%' }}>
                                                            <i className="fas fa-headphones"></i>
                                                            <div>
                                                                <h4 className="phone uk-margin-remove"> +88 123 456 888</h4>
                                                                <p className="uk-margin-remove" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontWeight: '400' }}>Call our seller to get the best price</p>
                                                            </div>
                                                        </div>
                                                        <div className="ap-single-price-box ap-single-side-box ap-single-author-box widget" style={{ width: '268%' }}>
                                                            <h3 className="widget-title ap-group-title is-style-templaza-heading-style3">
                                                                <span style={{ fontSize: '18px', fontWeight: '700', fontFamily: 'Montserrat, Arial, Helvetica, sans-serif' }}>Vendor Profile</span>
                                                            </h3>
                                                            <div className="uk-card">
                                                                <div className="author-header">
                                                                    <div className="uk-grid-small uk-flex-middle uk-grid">
                                                                        <div className="uk-width-auto uk-first-column">
                                                                            <a style={{ color: '#222222' }}>
                                                                                <img src="https://autoshowroom.templaza.net/wp-content/uploads/2022/10/thisisengineering-raeng-QODxaQMlIYk-unsplash.jpg" width={70} height={70} alt="" />
                                                                            </a>
                                                                        </div>
                                                                        <div className="uk-width-expand" style={{ marginLeft: '15px' }}>
                                                                            <h3 className="uk-card-title uk-margin-remove-bottom">
                                                                                <a href="" style={{ color: "#222222", textDecoration: 'none', fontFamily: "Montserrat, Arial, Helvetica, sans-serif", fontWeight: '600' }}> McDonald Terry </a>
                                                                            </h3>
                                                                            <p className="uk-text-meta uk-margin-remove-top">4 Products</p>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div className="author-description" style={{ fontSize: '16px', color: '#555555', fontFamily: 'Montserrat, Arial, Helvetica, sans-serif', lineHeight: '1.7' }}>
                                                                Blogging has really changed my life.  I know that sounds a bit corny, but I have whole new set of friends.
                                                                <div className="templaza-block-author-social uk-text-meta  uk-margin-top">
                                                                    <a href="" className="uk-margin-right">
                                                                        <i className="fab fa-facebook"></i>
                                                                    </a>
                                                                    <a href="" className="uk-margin-right">
                                                                        <i className="fab fa-twitter"></i>
                                                                    </a>
                                                                    <a href="" className="uk-margin-right">
                                                                        <i className="fab fa-dribbble"></i>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="widget ap-single-side-box ap-box" style={{ width: '268%' }}>
                                                            <div className="widget-content">
                                                                <h3 className="widget-title ap-group-title is-style-templaza-heading-style3" >
                                                                    <span style={{ fontSize: '18px', fontWeight: 'bold', fontFamily: 'Montserrat, Arial, Helvetica, sans-serif' }}>Contact Vendor</span>
                                                                </h3>
                                                                <div className="ap-group-content">
                                                                    <div className="wpforms-container wpforms-container-full">
                                                                        <form id="wpforms-form-14099" className="wpforms-validate wpforms-form wpforms-ajax-form">
                                                                            <div className="wpforms-field-container">
                                                                                <div id="wpforms-14099-field_1-container" className="wpforms-field wpforms-field-name">
                                                                                    <input type="text" id="wpforms-14099-field_1" className="wpforms-field-large wpforms-field-required" placeholder="Your Name" style={{ color: '#555555', fontWeight: '400', fontFamily: 'inherit', fontSize: '0.9em', marginRight: '0', height: '50px', lineHeight: '50px', backgroundColor: '#ffffff', borderRadius: '0', border: '1px solid rgba(0, 0, 0, 0.1)', marginTop: '0', padding: '0 15px', background: '#fff', width: '100%', maxWidth: '100%' }} />
                                                                                </div>
                                                                                <div id="wpforms-14099-field_1-container" className="wpforms-field wpforms-field-name">
                                                                                    <input type="email" id="wpforms-14099-field_1" className="wpforms-field-large wpforms-field-required" placeholder="Your Email" style={{ color: '#555555', fontWeight: '400', fontFamily: 'inherit', fontSize: '0.9em', marginRight: '0', height: '50px', lineHeight: '50px', backgroundColor: '#ffffff', borderRadius: '0', border: '1px solid rgba(0, 0, 0, 0.1)', marginTop: '0', padding: '0 15px', background: '#fff', width: '100%', maxWidth: '100%' }} />
                                                                                </div>
                                                                                <div id="wpforms-14099-field_1-container" className="wpforms-field wpforms-field-name">
                                                                                    <input type="tel" id="wpforms-14099-field_1" className="wpforms-field-large wpforms-field-required" placeholder="Your Phone" style={{ color: '#555555', fontWeight: '400', fontFamily: 'inherit', fontSize: '0.9em', marginRight: '0', height: '50px', lineHeight: '50px', backgroundColor: '#ffffff', borderRadius: '0', border: '1px solid rgba(0, 0, 0, 0.1)', marginTop: '0', padding: '0 15px', background: '#fff', width: '100%', maxWidth: '100%' }} />
                                                                                </div>
                                                                                <div id="wpforms-14099-field_1-container" className="wpforms-field wpforms-field-name">
                                                                                    <textarea type="tel" id="wpforms-14099-field_1" className="wpforms-field-large wpforms-field-required" placeholder="Your Message" style={{ color: '#555555', fontWeight: '400', fontFamily: 'inherit', fontSize: '0.9em', marginRight: '0', height: '50px', lineHeight: '50px', backgroundColor: '#ffffff', borderRadius: '0', border: '1px solid rgba(0, 0, 0, 0.1)', marginTop: '0', padding: '0 15px', background: '#fff', width: '100%', maxWidth: '100%', paddingTop: '10px', paddingBottom: '10px', height: '220px' }} />
                                                                                </div>
                                                                            </div>
                                                                            <div className="wpforms-submit-container">
                                                                                <button type="button" id="wpforms-submit-14099" className="wpforms-submit" style={{ backgroundColor: '#ff5400', color: '#ffffff', border: '2px solid transparent', borderRadius: '0', cursor: 'pointer', fontWeight: '700', fontSize: '14px', lineHeight: '1.5', padding: '13px 32px', textDecoration: 'none', textTransform: 'uppercase' }}>Send Message</button>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
export default DetailInventory;