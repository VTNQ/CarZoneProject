import React, { useState } from "react";
import './Contact.css'
import Swal from 'sweetalert2';
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
function Contact() {
    const mapstyles = {
        height: '100vh',
        width: '100%',
    }
    const defaultCenter = {
        lat: 10.8231,
        lng: 106.6297
    };

    const position = {
        lat: 10.8231,
        lng: 106.6297
    };
    const [FromData, setFromData] = useState({
        name: '',
        Email: '',
        Comment: ''
    })
    const [loading, setloading] = useState(false)
    const handleSendContact = async (event) => {
        event.preventDefault();
        try {
            setloading(true)
            const response = await fetch('http://localhost:5278/api/Contact/AddContact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nameCustomer: FromData.name, emailCustomer: FromData.Email, description: FromData.Comment })
            })
            if (response.ok) {
                setloading(false)
                Swal.fire({
                    icon: 'success',
                    title: 'send success',
                    showConfirmButton: false,
                    timer: 1500,
                })
                setFromData({
                    name: '',
                    Email: '',
                    Comment: ''
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (

        <>
            {loading && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50" style={{ zIndex: '10000' }}>
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
                </div>

            )}
            <div className="templaza-content">
                <div className="templaza-layout templaza-layout-wide">
                    <div className="templaza-wrapper">
                        <Menu />
                        <section id="templaza-section-1715290647882813" className="templaza-section tz_custom_1715290647882813 section_heading uk-text-center tz_background_overlay ">
                            <div className="uk-container uk-container-large ">
                                <div id="templaza-row-1715290647882951" className="uk-grid templaza-row tz_custom_1715290647882951 uk-grid-stack">
                                    <div id="templaza-column-1715290647883081" className="templaza-column tz_custom_1715290647883081 uk-width-expand@l uk-width-1-1 uk-width-1-1@s uk-width-expand@m uk-first-column">
                                        <div id="templaza-heading-1715290647883177" className="templaza-heading tz_custom_1715290647883177">
                                            <h1>Contact Us</h1>
                                        </div>
                                        <div id="templaza-breadcrumb-1715290647883533" className="templaza-breadcrumb tz_custom_1715290647883533">
                                            <div className="tzautoshowroom-breadcrumb">
                                                <ul id="breadcrumb" className="templaza-breadcrumb uk-breadcrumb">
                                                    <li className="item-home">
                                                        <a href="">Home</a>
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
                        <section id="templaza-section-1715290647884082" style={{ maxWidth: '1400px' }} className="templaza-section tz_custom_1715290647884082">
                            <div className="elementor elementor-14468">
                                <section className="elementor-section elementor-top-section elementor-element elementor-element-6e55c4d elementor-section-boxed elementor-section-height-default elementor-section-height-default">
                                    <div className="elementor-container elementor-column-gap-no">
                                        <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-4328753">
                                            <div className="elementor-widget-wrap elementor-element-populated">
                                                <div className="elementor-element elementor-element-ebb3236 elementor-widget__width-initial elementor-widget elementor-widget-image">
                                                    <div className="elementor-widget-container">
                                                        <img src="https://autoshowroom.templaza.net/wp-content/uploads/2022/08/Auto-Showroom-White.svg" width={231} height={21} className="attachment-full size-full wp-image-16591" alt="" />
                                                    </div>
                                                </div>
                                                <div className="elementor-element elementor-element-30c0fdc elementor-widget elementor-widget-text-editor">
                                                    <div className="elementor-widget-container">
                                                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
                                                    </div>
                                                </div>
                                                <div className="elementor-element elementor-element-423d2e8 elementor-position-left elementor-mobile-position-left elementor-view-default elementor-vertical-align-top elementor-widget elementor-widget-icon-box">
                                                    <div className="elementor-widget-container">
                                                        <div className="elementor-icon-box-wrapper">
                                                            <div className="elementor-icon-box-icon">
                                                                <span className="elementor-icon elementor-animation-">
                                                                    <i className="fas fa-phone-alt"></i>
                                                                </span>
                                                            </div>
                                                            <div className="elementor-icon-box-content" style={{ marginLeft: '13px' }}>
                                                                <div className="elementor-icon-box-title">
                                                                    <span style={{ fontSize: '16px', fontFamily: '"Inter", Arial, Helvetica, sans-serif' }}> Need I help? Talk to an Expert </span>
                                                                </div>
                                                                <p className="elementor-icon-box-description"> (+88) 1900 888 666</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="elementor-element elementor-element-423d2e8 elementor-position-left elementor-mobile-position-left elementor-view-default elementor-vertical-align-top elementor-widget elementor-widget-icon-box">
                                                    <div className="elementor-widget-container">
                                                        <div className="elementor-icon-box-wrapper">
                                                            <div className="elementor-icon-box-icon">
                                                                <span className="elementor-icon elementor-animation-">
                                                                    <i className="fas fa-map-marker-alt"></i>
                                                                </span>
                                                            </div>
                                                            <div className="elementor-icon-box-content" style={{ marginLeft: '13px' }}>
                                                                <div className="elementor-icon-box-title">
                                                                    <span style={{ fontSize: '16px', fontFamily: '"Inter", Arial, Helvetica, sans-serif' }}> Address: </span>
                                                                </div>
                                                                <p className="elementor-icon-box-description"> 1095 Howard Street, San Francisco, USA</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="elementor-element elementor-element-423d2e8 elementor-position-left elementor-mobile-position-left elementor-view-default elementor-vertical-align-top elementor-widget elementor-widget-icon-box">
                                                    <div className="elementor-widget-container">
                                                        <div className="elementor-icon-box-wrapper">
                                                            <div className="elementor-icon-box-icon">
                                                                <span className="elementor-icon elementor-animation-">
                                                                    <i className="far fa-envelope-open"></i>
                                                                </span>
                                                            </div>
                                                            <div className="elementor-icon-box-content" style={{ marginLeft: '13px' }}>
                                                                <div className="elementor-icon-box-title">
                                                                    <span style={{ fontSize: '16px', fontFamily: '"Inter", Arial, Helvetica, sans-serif' }}>  Email:  </span>
                                                                </div>
                                                                <p className="elementor-icon-box-description"> info@autoshowroom.com</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="elementor-element elementor-element-65dafd3 elementor-shape-square e-grid-align-left elementor-grid-0 elementor-widget elementor-widget-social-icons">
                                                    <div className="elementor-widget-container">
                                                        <div className="elementor-social-icons-wrapper elementor-grid">
                                                            <span className="elementor-grid-item">
                                                                <a className="elementor-icon elementor-social-icon elementor-social-icon-facebook elementor-animation-pop elementor-repeater-item-5074ee8" style={{ cursor: 'pointer' }}>
                                                                    <span className="elementor-screen-only">Facebook</span>
                                                                    <i className="fab fa-facebook" style={{ position: 'relative', left: '12px', top: '11px' }}></i>
                                                                </a>
                                                            </span>
                                                            <span className="elementor-grid-item">
                                                                <a className="elementor-icon elementor-social-icon elementor-social-icon-facebook elementor-animation-pop elementor-repeater-item-5074ee8" style={{ cursor: 'pointer' }}>
                                                                    <span className="elementor-screen-only">Facebook</span>
                                                                    <i className="fab fa-twitter" style={{ position: 'relative', left: '12px', top: '11px' }}></i>
                                                                </a>
                                                            </span>
                                                            <span className="elementor-grid-item">
                                                                <a className="elementor-icon elementor-social-icon elementor-social-icon-facebook elementor-animation-pop elementor-repeater-item-5074ee8" style={{ cursor: 'pointer' }}>
                                                                    <span className="elementor-screen-only">Facebook</span>
                                                                    <i className="fab fa-linkedin" style={{ position: 'relative', left: '12px', top: '11px' }}></i>
                                                                </a>
                                                            </span>
                                                            <span className="elementor-grid-item">
                                                                <a className="elementor-icon elementor-social-icon elementor-social-icon-facebook elementor-animation-pop elementor-repeater-item-5074ee8" style={{ cursor: 'pointer' }}>
                                                                    <span className="elementor-screen-only">Facebook</span>
                                                                    <i className="fab fa-behance" style={{ position: 'relative', left: '12px', top: '11px' }}></i>
                                                                </a>
                                                            </span>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-c045b2f">
                                            <div className="elementor-widget-wrap elementor-element-populated">
                                                <div className="elementor-element elementor-element-9a34a05 elementor-widget elementor-widget-uipro-heading">
                                                    <div className="elementor-widget-container">
                                                        <div className="templaza-widget-heading template-base">
                                                            <div className="sc_heading uk-flex uk-flex-column uk-position-relative" style={{ flexDirection: 'column' }}>
                                                                <h2 className="title uk-h2 uk-margin-custom">
                                                                    <span className="heading-highlighted-wrapper">
                                                                        <span className="heading-plain-text" style={{ fontWeight: 'bold' }}>Get In touch</span>
                                                                    </span>
                                                                </h2>
                                                                <div className="line_style1 uk-flex uk-flex-middle">
                                                                    <span className="line-before"></span>
                                                                    <span className="line"></span>
                                                                    <span className="line-after"></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="elementor-element elementor-element-eb6152e elementor-widget elementor-widget-uipro-uiform">
                                                    <div className="elementor-widget-container">
                                                        <div className="templaza-widget-uiform template-base">
                                                            <div className="block">
                                                                <div className="wpforms-container wpforms-container-full">
                                                                    <form className="wpforms-validate wpforms-form wpforms-ajax-form" id="wpforms-form-10207">
                                                                        <div className="wpforms-field-container" >
                                                                            <div className="container" style={{ display: 'flex' }}>
                                                                                <div id="wpforms-10207-field_1-container" className="wpforms-field wpforms-field-name wpforms-one-half wpforms-first">
                                                                                    <input type="text" value={FromData.name} onChange={(e) => setFromData({ ...FromData, name: e.target.value })} id="wpforms-10207-field_1" className="wpforms-field-large wpforms-field-required wpforms-valid" placeholder="Your Name" style={{ padding: '18px' }} />
                                                                                </div>
                                                                                <div id="wpforms-10207-field_4-container" className="wpforms-field wpforms-field-name wpforms-one-half wpforms-first">
                                                                                    <input type="email" id="wpforms-10207-field_1" value={FromData.Email} onChange={(e) => setFromData({ ...FromData, Email: e.target.value })} className="wpforms-field-large wpforms-field-required wpforms-valid" placeholder="Your Email" style={{ marginLeft: '15px', padding: '18px' }} />
                                                                                </div>
                                                                            </div>

                                                                            <div id="wpforms-10207-field_5-container" className="wpforms-field wpforms-field-name wpforms-one-half wpforms-first">
                                                                                <textarea name="" className="wpforms-field-large" value={FromData.Comment} onChange={(e) => setFromData({ ...FromData, Comment: e.target.value })} id="wpforms-10207-field_5" placeholder="Message"></textarea>
                                                                            </div>
                                                                        </div>
                                                                        <div className="wpforms-submit-container">
                                                                            <button id="wpforms-submit-10207" className="wpforms-submit" onClick={handleSendContact} style={{ backgroundColor: '#ff5400', color: '#FFF', height: '60px', paddingLeft: '26px', paddingRight: '26px', fontWeight: 'bold' }}>Send Message</button>
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
                                </section>
                            </div>
                        </section>
                        <section className="elementor-section elementor-top-section elementor-element elementor-element-159c0d7 elementor-section-full_width elementor-section-height-default elementor-section-height-default">
                            <div className="elementor-container elementor-column-gap-no">
                                <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-1128e93">
                                    <div className="elementor-widget-wrap elementor-element-populated">
                                        <div className="elementor-element elementor-element-4b247a4 elementor-widget elementor-widget-google_maps">
                                            <div className="elementor-widget-container">
                                                <div className="elementor-custom-embed">
                                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.1485195313026!2d106.71160187480542!3d10.806689089343907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529ed00409f09%3A0x11f7708a5c77d777!2zQXB0ZWNoIENvbXB1dGVyIEVkdWNhdGlvbiAtIEjhu4cgVGjhu5FuZyDEkMOgbyB04bqhbyBM4bqtcCBUcsOsbmggVmnDqm4gUXXhu5FjIHThur8gQXB0ZWNo!5e1!3m2!1svi!2s!4v1715393973056!5m2!1svi!2s" width="600" height="450" style={mapstyles} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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
            <br />
            <Footer/>
        </>
    )
}
export default Contact;