import React, { useState } from "react";
import Menu from "../Menu/Menu";
import './Inventory.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
function Inventory() {
    
    const Producttype = [
        { value: 0, label: 'sale' },
        { value: 1, label: "Rental" },
        { value: 2, label: 'Sold' },
        { value: 3, label: 'Contact' }
    ]
    const Branch = [
        { value: 0, label: 'All Branch' },
        { value: 1, label: 'Auto' },
        { value: 2, label: 'Beetle' },
        { value: 3, label: 'Convertible' },
        { value: 4, label: 'Minivan' },
        { value: 5, label: 'Sedan' },
        { value: 6, label: 'SUV' },
        { value: 7, label: 'Truck' },
        { value: 8, label: 'Van' },

    ]
    const Make = [
        { value: 0, label: 'All Make' },
        { value: 1, label: 'Audi' },
        { value: 2, label: 'BMW' }
    ]
    const Model = [
        { value: 0, label: 'All Mode' },
        { value: 1, label: '911' }
    ]
    const Condition = [
        { value: 0, label: 'All Condition' },
        { value: 1, label: 'New' },
        { value: 2, label: 'Used' },
        { value: 3, label: 'Certified Pre-Owned' }
    ]
    const ExistColor = [
        { value: 1, label: 'Sliver' },
        { value: 2, label: 'Black' },
        { value: 3, label: 'White' },
        { value: 4, label: 'Red' }
    ]
    const [ChangeSwitch, setChangeSwitch] = useState(1);
    const handleSwitch = (switchchange) => {
        setChangeSwitch(switchchange)
    }
    const SortBy = [
        { valueL: 0, label: 'Date:Newest First' },
        { value: 1, label: 'Date:Oldest First' },
        { value: 2, label: 'Title:A-Z' },
        { value: 3, label: 'Title:Z-A' },
        { value: 4, label: 'Price:High To Low' },
        { value: 5, label: 'Price:Low To High' }
    ]
    const [filterValue, setFilterValue] = useState([0, 100]);
    const handleFilterChange = (value) => {
        setFilterValue(value)

    }
    const [open,setOpen]=useState(false)
    const handleOpen=()=>{
        setOpen(prevOpen => {
            const newOpen = !prevOpen;
            console.log(newOpen)
            document.body.style.overflowY = newOpen ? 'hidden' : 'auto';
            return newOpen;
        });
    }
    const popupContentStyle = {
        display: 'flex',
        animation: 'fadeDown 0.5s ease-out',
    };
    const closepopup = {
        display: 'none',
        animation: 'fadeUp 0.5s ease-out', // Specify the animation properties
    };
    return (
        <>
            <div className="templaza-content">
                <div className="templaza-layout templaza-layout-wide">
                    <div className="templaza-wrapper">
                        <Menu />
                        <section id="templaza-section-1715290647882813" className="templaza-section tz_custom_1715290647882813 section_heading uk-text-center tz_background_overlay ">
                            <div className="uk-container uk-container-large ">
                                <div id="templaza-row-1715290647882951" className="uk-grid templaza-row tz_custom_1715290647882951 uk-grid-stack">
                                    <div id="templaza-column-1715290647883081" className="templaza-column tz_custom_1715290647883081 uk-width-expand@l uk-width-1-1 uk-width-1-1@s uk-width-expand@m uk-first-column">
                                        <div id="templaza-heading-1715290647883177" className="templaza-heading tz_custom_1715290647883177">
                                            <h1>Inventory</h1>
                                        </div>
                                        <div id="templaza-breadcrumb-1715290647883533" className="templaza-breadcrumb tz_custom_1715290647883533">
                                            <div className="tzautoshowroom-breadcrumb">
                                                <ul id="breadcrumb" className="templaza-breadcrumb uk-breadcrumb">
                                                    <li className="item-home">
                                                        <a href="">Home</a>
                                                    </li>
                                                    <li className="item-current item-14468">
                                                        <span className="bread-current bread-14468"> Inventory</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section id="templaza-section-1715377415089181" className="templaza-section tz_custom_1715377415089181 inventory-content">
                            <div className="uk-container uk-container-large ">
                                <div id="templaza-row-1715377415089254" className="uk-grid templaza-row tz_custom_1715377415089254">
                                    <div id="templaza-column-1715377415089337" className="templaza-column tz_custom_1715377415089337 uk-width-1-4@l uk-width-1-1 uk-width-1-1@s uk-width-1-4@m hideonmd hideonsm uk-first-column">
                                        <div id="templaza-sidebar-1715377415090470" className="templaza-sidebar tz_custom_1715377415090470 uk-text-left">
                                            <aside id="widget-area-1715377415090470" className="widget-area">
                                                <div className="widget widget_block style1">
                                                    <div className="widget-content">
                                                        <div className="templaza-framework-gutenberg-adv-product-filters">
                                                            <div className="uk-position-top-right templaza-filter-closed uk-padding-small uk-hidden@m">
                                                                <i className="fas fa-times"></i>
                                                            </div>
                                                            <form action="">
                                                                <div className="ap-search-item uk-margin uk-first-column">
                                                                    <label htmlFor="" className="search-label" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', paddingBottom: '13px', paddingRight: '20vh' }}>
                                                                        Product Type
                                                                    </label>
                                                                    <div className="uk-form-controls" style={{ marginTop: '25px', marginLeft: '-4px' }}>
                                                                        <div className="acf-taxonomy-field">
                                                                            <select name="" id="acf-field-ap_branch-663e95071b87b">
                                                                                {Producttype.map(item => (
                                                                                    <option key={item.value}>{item.label}</option>
                                                                                ))}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="ap-search-item uk-margin uk-first-column" style={{ marginTop: '50px' }}>
                                                                    <label htmlFor="" className="search-label" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', paddingBottom: '13px', paddingRight: '20vh' }}>
                                                                        Branch
                                                                    </label>
                                                                    <div className="uk-form-controls" style={{ marginTop: '25px', marginLeft: '-4px' }}>
                                                                        <div className="acf-taxonomy-field">
                                                                            <select name="" id="acf-field-ap_branch-663e95071b87b">
                                                                                {Branch.map(item => (
                                                                                    <option key={item.value}>{item.label}</option>
                                                                                ))}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="ap-search-item uk-margin uk-first-column" style={{ marginTop: '50px' }}>
                                                                    <label htmlFor="" className="search-label" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', paddingBottom: '13px', paddingRight: '20vh' }}>
                                                                        Make
                                                                    </label>
                                                                    <div className="uk-form-controls" style={{ marginTop: '25px', marginLeft: '-4px' }}>
                                                                        <div className="acf-taxonomy-field">
                                                                            <select name="" id="acf-field-ap_branch-663e95071b87b">
                                                                                {Make.map(item => (
                                                                                    <option key={item.value}>{item.label}</option>
                                                                                ))}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="ap-search-item uk-margin uk-first-column" style={{ marginTop: '50px' }}>
                                                                    <label htmlFor="" className="search-label" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', paddingBottom: '13px', paddingRight: '20vh' }}>
                                                                        Model
                                                                    </label>
                                                                    <div className="uk-form-controls" style={{ marginTop: '25px', marginLeft: '-4px' }}>
                                                                        <div className="acf-taxonomy-field">
                                                                            <select name="" id="acf-field-ap_branch-663e95071b87b">
                                                                                {Model.map(item => (
                                                                                    <option key={item.value}>{item.label}</option>
                                                                                ))}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="ap-search-item uk-margin uk-first-column" style={{ marginTop: '50px' }}>
                                                                    <label htmlFor="" className="search-label" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', paddingBottom: '13px', paddingRight: '20vh' }}>
                                                                        Condition
                                                                    </label>
                                                                    <div className="uk-form-controls" style={{ marginTop: '25px', marginLeft: '-4px' }}>
                                                                        <div className="acf-taxonomy-field">
                                                                            <select name="" id="acf-field-ap_branch-663e95071b87b">
                                                                                {Condition.map(item => (
                                                                                    <option key={item.value}>{item.label}</option>
                                                                                ))}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="ap-search-item uk-margin uk-first-column" style={{ marginTop: '50px' }}>
                                                                    <label htmlFor="" className="search-label" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', paddingBottom: '13px', paddingRight: '20vh' }}>
                                                                        EXTERIOR COLOR
                                                                    </label>
                                                                    <div className="uk-form-controls" style={{ marginTop: '25px', marginLeft: '-4px' }}>
                                                                        <div className="acf-taxonomy-field">
                                                                            <select name="" id="acf-field-ap_branch-663e95071b87b">
                                                                                {ExistColor.map(item => (
                                                                                    <option key={item.value}>{item.label}</option>
                                                                                ))}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="ap-search-item uk-margin uk-first-column" style={{ marginTop: '50px' }}>
                                                                    <label htmlFor="" className="search-label" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', paddingBottom: '13px', paddingRight: '20vh' }}>
                                                                        INTERIOR COLOR
                                                                    </label>
                                                                    <div className="uk-form-controls" style={{ marginTop: '25px', marginLeft: '-4px' }}>
                                                                        <div className="acf-taxonomy-field">
                                                                            <select name="" id="acf-field-ap_branch-663e95071b87b">
                                                                                {ExistColor.map(item => (
                                                                                    <option key={item.value}>{item.label}</option>
                                                                                ))}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="ap-search-item uk-margin uk-first-column" style={{ marginTop: '50px' }}>
                                                                    <label htmlFor="" className="search-label" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)', paddingBottom: '13px', paddingRight: '20vh' }}>
                                                                        Price
                                                                    </label>
                                                                    <div className="uk-form-controls" style={{ marginTop: '25px', marginLeft: '-4px' }}>
                                                                        <div className="acf-taxonomy-field">
                                                                            <Slider range min={0} max={1000} step={10} defaultValue={filterValue} onChange={handleFilterChange} />
                                                                            <p>${filterValue[0]}-${filterValue[1]}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </aside>
                                        </div>
                                    </div>
                                    <div id="templaza-column-1715377415090687" style={{ width: '70%', marginLeft: '5vh' }} className="templaza-column tz_custom_1715377415090687 uk-width-3-4@l uk-width-1-1 uk-width-1-1@s uk-width-3-4@m">
                                        <div id="templaza-content_area-1715377415090807" className="templaza-content_area tz_custom_1715377415090807">
                                            <div className="uk-flex uk-grid-collapse uk-flex-middle uk-flex-between templaza-ap-archive-view uk-grid">
                                                <div className="uk-width-1-3@s uk-flex ap-number-product uk-first-column">
                                                    <h3 className="uk-margin-remove">
                                                        <span>24 </span>
                                                        Products available
                                                    </h3>
                                                </div>
                                                <div className="uk-width-2-3@s uk-flex uk-flex-middle uk-flex-between uk-flex-right@s">
                                                    <div className="templaza-ap-archive-sort uk-flex uk-flex-middle">
                                                        <label htmlFor="" className="uk-width-auto">Sort By</label>
                                                        <div className="uk-form-controls">
                                                            <select name="" id="">
                                                                {SortBy.map(item => (
                                                                    <option value={item.value}>{item.label}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="ap-switcher-wrap uk-flex uk-flex-right uk-text-right">
                                                        <span className={`switcher_btn grid ${ChangeSwitch == 1 ? "uk-active" : ''}  uk-icon`} onClick={() => handleSwitch(1)}>
                                                            <svg width={20} height={20}>
                                                                <rect x={2} y={2} width={3} height={3}></rect>
                                                                <rect x={8} y={2} width={3} height={3}></rect>
                                                                <rect x={14} y={2} width={3} height={3}></rect>
                                                                <rect x={2} y={8} width={3} height={3}></rect>
                                                                <rect x={8} y={8} width={3} height={3}></rect>
                                                                <rect x={14} y={8} width={3} height={3}></rect>
                                                                <rect x={2} y={14} width={3} height={3}></rect>
                                                                <rect x={8} y={14} width={3} height={3}></rect>
                                                                <rect x={14} y={14} width={3} height={3}></rect>
                                                            </svg>
                                                        </span>
                                                        <span className={`switcher_btn ${ChangeSwitch == 2 ? "uk-active" : ''} uk-visible@s list uk-icon`} onClick={() => handleSwitch(2)}>
                                                            <svg width={20} height={20}>
                                                                <rect x={6} y={4} width={12} height={1}></rect>
                                                                <rect x={6} y={9} width={12} height={1}></rect>
                                                                <rect x={6} y={14} width={12} height={1}></rect>
                                                                <rect x={2} y={4} width={2} height={1}></rect>
                                                                <rect x={2} y={9} width={2} height={1}></rect>
                                                                <rect x={2} y={14} width={2} height={1}></rect>
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            {ChangeSwitch == 1 && (
                                                <div className="templaza-ap-archive templaza-ap-grid uk-child-width-1-2@l uk-child-width-1-3@xl uk-child-width-1-2@m uk-child-width-1-2@s uk-child-width-1-1 uk-grid-default uk-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
                                                    <div className="ap-item ap-item-style4 templazaFadeInUp uk-first-column">
                                                        <div className="ap-inner" style={{ width: '97%' }}>
                                                            <div className="ap-info">
                                                                <div className="uk-inline">
                                                                    <div className="ap-ribbon sale Default">
                                                                        <span className="ap-ribbon-content">For Sale</span>
                                                                    </div>
                                                                    <div className="uk-card-media-top uk-position-relative uk-transition-toggle ">
                                                                        <a href="" style={{ color: '#222222' }}>
                                                                            <img src="https://autoshowroom.templaza.net/wp-content/uploads/2022/10/erik-mclean-M0z9ajPI3PE-unsplash-768x512.jpg" width={580} height={387} className="attachment-medium_large size-medium_large wp-post-image" alt="" />
                                                                        </a>
                                                                        <div className="uk-position-bottom-right ap-archive-btn-action uk-transition-fade">
                                                                            <a href="" className="uk-icon-button" style={{ textDecoration: 'none' }}>
                                                                                <i className="fas fa-not-equal js-ap-icon"></i>
                                                                            </a>
                                                                            <a className="uk-icon-button" style={{ textDecoration: 'none' }} onClick={handleOpen}>
                                                                                <i className="fas fa-eye"></i>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                    <div className="uk-position-bottom-left uk-padding-small tz-theme-bg-color ap-price-wrap">
                                                                        <div className="ap-price-box">
                                                                            <span className="ap-field-label">Total Price</span>
                                                                            <span className="ap-price">
                                                                                <b></b>
                                                                                $98,000 |
                                                                            </span>
                                                                            <span className="ap-price-msrp">
                                                                                <span>&nbsp; MSRP: </span>
                                                                                $96,500
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="ap-info-inner ap-info-top uk-flex uk-flex-middle uk-flex-between">
                                                                    <div className="ap-title-info">
                                                                        <h2 className="ap-title">
                                                                            <a href="" style={{ color: '#222222', textDecoration: 'none', fontSize: '16px', fontWeight: 'bold', fontFamily: 'Montserrat, Arial, Helvetica, sans-serif', textTransform: 'uppercase', lineHeight: '1.2em' }}>911 Carrera</a>
                                                                        </h2>
                                                                    </div>
                                                                </div>
                                                                <div className="ap-info-inner ap-info-desc">
                                                                    <p style={{ marginBottom: '0', lineHeight: '1.7', fontSize: '16px', fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontWeight: '400', color: '#555555' }}>With room for up to seven and a luxurious vibe, this SUV is so far the most compelling model in to wear the EQS name.</p>
                                                                </div>
                                                                <div className="ap-info-inner ap-info-bottom" style={{ padding: '2px' }}>
                                                                    <div className="ap-specification ap-specification-style4 uk-child-width-1-3 uk-grid-collapse uk-grid">
                                                                        <div className="ap-spec-item uk-flex uk-flex-column uk-first-column">
                                                                            <span className="ap-spec-value">
                                                                                <span className="ap-style4-icon">
                                                                                    <i className="far fa-registered"></i>
                                                                                </span>
                                                                                2022
                                                                            </span>
                                                                        </div>
                                                                        <div className="ap-spec-item uk-flex uk-flex-column">
                                                                            <span className="ap-spec-value">
                                                                                <span className="ap-style4-icon">
                                                                                    <i className="fas fa-car"></i>
                                                                                </span>
                                                                                New
                                                                            </span>
                                                                        </div>
                                                                        <div className="ap-spec-item uk-flex uk-flex-column">
                                                                            <span className="ap-spec-value">
                                                                                <span className="ap-style4-icon">
                                                                                    <i className="fas fa-cog"></i>
                                                                                </span>
                                                                                25000 mi
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="ap-item ap-item-style4  templazaFadeInUp">
                                                        <div className="ap-inner" style={{ width: '98%' }}>
                                                            <div className="ap-info">
                                                                <div className="uk-inline">
                                                                    <div className="ap-ribbon rental Default">
                                                                        <span className="ap-ribbon-content"> For Rent </span>
                                                                    </div>
                                                                    <div className="uk-card-media-top uk-position-relative uk-transition-toggle ">
                                                                        <a href="" style={{ color: '#222222' }}>
                                                                            <img src="https://autoshowroom.templaza.net/wp-content/uploads/2022/10/jon-koop-khYVyHiNZo0-unsplash-1-768x512.jpg" width={580} height={387} className="attachment-medium_large size-medium_large wp-post-image" alt="" />
                                                                        </a>
                                                                        <div className="uk-position-bottom-right ap-archive-btn-action uk-transition-fade">
                                                                            <a href="" className="uk-icon-button" style={{ textDecoration: 'none' }}>
                                                                                <i className="fas fa-not-equal js-ap-icon"></i>
                                                                            </a>
                                                                            <a  className="uk-icon-button" style={{ textDecoration: 'none' }}>
                                                                                <i className="fas fa-eye"></i>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                    <div className="uk-position-bottom-left uk-padding-small tz-theme-bg-color ap-price-wrap">
                                                                        <div className="ap-price-box">
                                                                            <span className="ap-field-label">Total Price</span>
                                                                            <span className="ap-price">
                                                                                <b></b>
                                                                                $500 /
                                                                            </span>
                                                                            <span className="ap-price-msrp">
                                                                                <span>&nbsp; Week </span>

                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="ap-info-inner ap-info-top uk-flex uk-flex-middle uk-flex-between">
                                                                    <div className="ap-title-info">
                                                                        <h2 className="ap-title">
                                                                            <a href="" style={{ color: '#222222', textDecoration: 'none', fontSize: '16px', fontWeight: 'bold', fontFamily: 'Montserrat, Arial, Helvetica, sans-serif', textTransform: 'uppercase', lineHeight: '1.2em' }}>HYUNDAI IONIQ 7</a>
                                                                        </h2>
                                                                    </div>
                                                                </div>
                                                                <div className="ap-info-inner ap-info-desc">
                                                                    <p style={{ marginBottom: '0', lineHeight: '1.7', fontSize: '16px', fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontWeight: '400', color: '#555555' }}>With room for up to seven and a luxurious vibe, this SUV is so far the most compelling model in to wear the EQS name.</p>
                                                                </div>
                                                                <div className="ap-info-inner ap-info-bottom" style={{ padding: '2px' }}>
                                                                    <div className="ap-specification ap-specification-style4 uk-child-width-1-3 uk-grid-collapse uk-grid">
                                                                        <div className="ap-spec-item uk-flex uk-flex-column uk-first-column">
                                                                            <span className="ap-spec-value">
                                                                                <span className="ap-style4-icon">
                                                                                    <i className="far fa-registered"></i>
                                                                                </span>
                                                                                2015
                                                                            </span>
                                                                        </div>
                                                                        <div className="ap-spec-item uk-flex uk-flex-column">
                                                                            <span className="ap-spec-value">
                                                                                <span className="ap-style4-icon">
                                                                                    <i className="fas fa-car"></i>
                                                                                </span>
                                                                                Used
                                                                            </span>
                                                                        </div>
                                                                        <div className="ap-spec-item uk-flex uk-flex-column">
                                                                            <span className="ap-spec-value">
                                                                                <span className="ap-style4-icon">
                                                                                    <i className="fas fa-cog"></i>
                                                                                </span>
                                                                                19400 mi
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="ap-item ap-item-style4 templazaFadeInUp uk-grid-margin uk-first-column">
                                                        <div className="ap-inner" style={{ width: '97%' }}>
                                                            <div className="ap-info">
                                                                <div className="uk-inline">
                                                                    <div className="ap-ribbon sale Default">
                                                                        <span className="ap-ribbon-content">For Sale</span>
                                                                    </div>
                                                                    <div className="uk-card-media-top uk-position-relative uk-transition-toggle ">
                                                                        <a href="" style={{ color: '#222222' }}>
                                                                            <img src="https://autoshowroom.templaza.net/wp-content/uploads/2022/10/hans-isaacson-MVzjpM1vgEY-unsplash2-768x512.jpg" width={580} height={387} className="attachment-medium_large size-medium_large wp-post-image" alt="" />
                                                                        </a>
                                                                        <div className="uk-position-bottom-right ap-archive-btn-action uk-transition-fade">
                                                                            <a href="" className="uk-icon-button" style={{ textDecoration: 'none' }}>
                                                                                <i className="fas fa-not-equal js-ap-icon"></i>
                                                                            </a>
                                                                            <a  className="uk-icon-button" style={{ textDecoration: 'none' }}>
                                                                                <i className="fas fa-eye"></i>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                    <div className="uk-position-bottom-left uk-padding-small tz-theme-bg-color ap-price-wrap">
                                                                        <div className="ap-price-box">
                                                                            <span className="ap-field-label">Total Price</span>
                                                                            <span className="ap-price">
                                                                                <b></b>
                                                                                $34,500 |
                                                                            </span>
                                                                            <span className="ap-price-msrp">
                                                                                <span>&nbsp; MSRP: </span>
                                                                                $33,100
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="ap-info-inner ap-info-top uk-flex uk-flex-middle uk-flex-between">
                                                                    <div className="ap-title-info">
                                                                        <h2 className="ap-title">
                                                                            <a href="" style={{ color: '#222222', textDecoration: 'none', fontSize: '16px', fontWeight: 'bold', fontFamily: 'Montserrat, Arial, Helvetica, sans-serif', textTransform: 'uppercase', lineHeight: '1.2em' }}>BMW X4 M</a>
                                                                        </h2>
                                                                    </div>
                                                                </div>
                                                                <div className="ap-info-inner ap-info-desc">
                                                                    <p style={{ marginBottom: '0', lineHeight: '1.7', fontSize: '16px', fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontWeight: '400', color: '#555555' }}>Rip-snorting engine, bonkers acceleration, handling agile enough to trick you into thinking it's a sports car.</p>
                                                                </div>
                                                                <div className="ap-info-inner ap-info-bottom" style={{ padding: '2px' }}>
                                                                    <div className="ap-specification ap-specification-style4 uk-child-width-1-3 uk-grid-collapse uk-grid">
                                                                        <div className="ap-spec-item uk-flex uk-flex-column uk-first-column">
                                                                            <span className="ap-spec-value">
                                                                                <span className="ap-style4-icon">
                                                                                    <i className="far fa-registered"></i>
                                                                                </span>
                                                                                2017
                                                                            </span>
                                                                        </div>
                                                                        <div className="ap-spec-item uk-flex uk-flex-column">
                                                                            <span className="ap-spec-value">
                                                                                <span className="ap-style4-icon">
                                                                                    <i className="fas fa-car"></i>
                                                                                </span>
                                                                                New
                                                                            </span>
                                                                        </div>
                                                                        <div className="ap-spec-item uk-flex uk-flex-column">
                                                                            <span className="ap-spec-value">
                                                                                <span className="ap-style4-icon">
                                                                                    <i className="fas fa-cog"></i>
                                                                                </span>
                                                                                25000 mi
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="ap-item ap-item-style4 templazaFadeInUp uk-grid-margin ">
                                                        <div className="ap-inner" style={{ width: '97%' }}>
                                                            <div className="ap-info">
                                                                <div className="uk-inline">
                                                                    <div className="ap-ribbon rental Default">
                                                                        <span className="ap-ribbon-content">For Rent</span>
                                                                    </div>
                                                                    <div className="uk-card-media-top uk-position-relative uk-transition-toggle ">
                                                                        <a href="" style={{ color: '#222222' }}>
                                                                            <img src="https://autoshowroom.templaza.net/wp-content/uploads/2022/10/erik-mclean-M0z9ajPI3PE-unsplash-768x512.jpg" width={580} height={387} className="attachment-medium_large size-medium_large wp-post-image" alt="" />
                                                                        </a>
                                                                        <div className="uk-position-bottom-right ap-archive-btn-action uk-transition-fade">
                                                                            <a href="" className="uk-icon-button" style={{ textDecoration: 'none' }}>
                                                                                <i className="fas fa-not-equal js-ap-icon"></i>
                                                                            </a>
                                                                            <a  className="uk-icon-button" style={{ textDecoration: 'none' }}>
                                                                                <i className="fas fa-eye"></i>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                    <div className="uk-position-bottom-left uk-padding-small tz-theme-bg-color ap-price-wrap">
                                                                        <div className="ap-price-box">
                                                                            <span className="ap-field-label">Total Price</span>
                                                                            <span className="ap-price">
                                                                                <b></b>
                                                                                $80 /
                                                                            </span>
                                                                            <span className="ap-price-msrp">
                                                                                <span>&nbsp; Day </span>

                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="ap-info-inner ap-info-top uk-flex uk-flex-middle uk-flex-between">
                                                                    <div className="ap-title-info">
                                                                        <h2 className="ap-title">
                                                                            <a href="" style={{ color: '#222222', textDecoration: 'none', fontSize: '16px', fontWeight: 'bold', fontFamily: 'Montserrat, Arial, Helvetica, sans-serif', textTransform: 'uppercase', lineHeight: '1.2em' }}>CHEVROLET BOLT EV</a>
                                                                        </h2>
                                                                    </div>
                                                                </div>
                                                                <div className="ap-info-inner ap-info-desc">
                                                                    <p style={{ marginBottom: '0', lineHeight: '1.7', fontSize: '16px', fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontWeight: '400', color: '#555555' }}>The all-electric Bolt EV’s low, low starting price makes it an attractive electrified alternative to sexier and more costly EVs.</p>
                                                                </div>
                                                                <div className="ap-info-inner ap-info-bottom" style={{ padding: '2px' }}>
                                                                    <div className="ap-specification ap-specification-style4 uk-child-width-1-3 uk-grid-collapse uk-grid">
                                                                        <div className="ap-spec-item uk-flex uk-flex-column uk-first-column">
                                                                            <span className="ap-spec-value">
                                                                                <span className="ap-style4-icon">
                                                                                    <i className="far fa-registered"></i>
                                                                                </span>
                                                                                2018
                                                                            </span>
                                                                        </div>
                                                                        <div className="ap-spec-item uk-flex uk-flex-column">
                                                                            <span className="ap-spec-value">
                                                                                <span className="ap-style4-icon">
                                                                                    <i className="fas fa-car"></i>
                                                                                </span>
                                                                                New
                                                                            </span>
                                                                        </div>
                                                                        <div className="ap-spec-item uk-flex uk-flex-column">
                                                                            <span className="ap-spec-value">
                                                                                <span className="ap-style4-icon">
                                                                                    <i className="fas fa-cog"></i>
                                                                                </span>
                                                                                18900 mi
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {ChangeSwitch == 2 && (
                                                <div className="templaza-ap-archive templaza-ap-grid uk-child-width-1-1@l uk-child-width-1-1@xl uk-child-width-1-1@m uk-child-width-1-1@s uk-child-width-1-1 uk-grid-default uk-grid uk-grid-stack">
                                                    <div className="ap-item ap-item-style5 ap-item-list templazaFadeInUp uk-first-column" style={{ animationDelay: '0ms' }}>
                                                        <div className="ap-inner">
                                                            <div className="uk-card uk-child-width-1-2@s uk-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '35px' }}>
                                                                <div className="uk-card-media-left uk-cover-container uk-width-2-5@s uk-transition-toggle uk-first-column">
                                                                    <div className="uk-position-relative uk-height-1-1">
                                                                        <div className="ap-ribbon sale Default">
                                                                            <span className="ap-ribbon-content"> For Sale </span>
                                                                        </div>
                                                                        <img src="https://autoshowroom.templaza.net/wp-content/uploads/2022/10/erik-mclean-M0z9ajPI3PE-unsplash.jpg" className="attachment-medium_large size-medium_large wp-post-image" width={580} height={387} alt="" />
                                                                        <div className="uk-position-bottom-right ap-archive-btn-action uk-transition-fade" style={{ top: '258px', right: '0' }}>
                                                                            <a href="" className="uk-icon-button" style={{ textDecoration: 'none' }}>
                                                                                <i className="fas fa-not-equal js-ap-icon"></i>
                                                                            </a>
                                                                            <a  className="uk-icon-button" style={{ textDecoration: 'none' }}>
                                                                                <i className="fas fa-eye"></i>
                                                                            </a>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <div className="ap-info uk-width-3-5@s">
                                                                    <div className="ap-info-inner ap-info-top">
                                                                        <h2 className="ap-title">
                                                                            <a href="" style={{ color: '#222222', textDecoration: 'none', fontSize: '16px', fontWeight: 'bold', fontFamily: 'Montserrat, Arial, Helvetica, sans-serif' }}>911 Carrera</a>
                                                                        </h2>
                                                                    </div>
                                                                    <div className="ap-info-inner ap-info-desc">
                                                                        <p style={{ lineHeight: '1.7', fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontWeight: '400', fontSize: '16px', color: '#555555' }}>With room for up to seven and a luxurious vibe, this SUV is so far the most compelling model in to wear the EQS name.</p>
                                                                    </div>
                                                                    <div className="ap-info-inner ap">
                                                                        <div className="ap-specification uk-grid-column-small uk-grid-row-collapse ap-specification-style5 uk-child-width-1-2 uk-grid" style={{ justifyContent: 'space-between' }}>
                                                                            <div className="ap-spec-item uk-first-column">
                                                                                <span className="ap-field-label" style={{ fontWeight: '400' }}>
                                                                                    <span className="ap-style5-icon">
                                                                                        <i className="far fa-registered"></i>
                                                                                    </span>
                                                                                    Registration Date:
                                                                                </span>
                                                                                <span className="ap-spec-value"> 2022</span>
                                                                            </div>
                                                                            <div className="ap-spec-item">
                                                                                <span className="ap-field-label" style={{ fontWeight: '400' }}>
                                                                                    <span className="ap-style5-icon">
                                                                                        <i className="fas fa-car"></i>
                                                                                    </span>
                                                                                    Condition:
                                                                                </span>
                                                                                <span className="ap-spec-value"> New</span>
                                                                            </div>
                                                                            <div className="ap-spec-item uk-grid-margin uk-first-column">
                                                                                <span className="ap-field-label" style={{ fontWeight: '400' }}>
                                                                                    <span className="ap-style5-icon">
                                                                                        <i className="fas fa-cog"></i>
                                                                                    </span>
                                                                                    Mileage:
                                                                                </span>
                                                                                <span className="ap-spec-value">
                                                                                    25000
                                                                                    <span className="custom-field-append">
                                                                                        mi
                                                                                    </span>
                                                                                </span>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                    <div className="ap-info-inner  ap-info-bottom uk-flex uk-flex-between uk-flex-middle">
                                                                        <div className="ap-price-box">
                                                                            <span className="ap-field-label" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif' }}>Total Price</span>
                                                                            <span className="ap-price" style={{ fontWeight: 'bold', fontSize: '1.2em' }}> $98,000 </span>
                                                                            <span className="ap-price-msrp">
                                                                                <span> MSRP: </span>
                                                                                $96,500
                                                                            </span>
                                                                        </div>
                                                                        <div className="ap-readmore-box">
                                                                            <a href="" className="templaza-btn">View more</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="ap-item ap-item-style5 ap-item-list templazaFadeInUp uk-first-column" style={{ animationDelay: '0ms', marginTop: '40px' }}>
                                                        <div className="ap-inner">
                                                            <div className="uk-card uk-child-width-1-2@s uk-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '35px' }}>
                                                                <div className="uk-card-media-left uk-cover-container uk-width-2-5@s uk-transition-toggle uk-first-column">
                                                                    <div className="uk-position-relative uk-height-1-1">
                                                                        <div className="ap-ribbon rental Default">
                                                                            <span className="ap-ribbon-content">  For Rent  </span>
                                                                        </div>
                                                                        <img src="https://autoshowroom.templaza.net/wp-content/uploads/2022/10/jon-koop-khYVyHiNZo0-unsplash-1-768x512.jpg" className="attachment-medium_large size-medium_large wp-post-image" width={580} height={387} alt="" />
                                                                        <div className="uk-position-bottom-right ap-archive-btn-action uk-transition-fade" style={{ top: '258px', right: '0' }}>
                                                                            <a href="" className="uk-icon-button" style={{ textDecoration: 'none' }}>
                                                                                <i className="fas fa-not-equal js-ap-icon"></i>
                                                                            </a>
                                                                            <a  className="uk-icon-button" style={{ textDecoration: 'none' }}>
                                                                                <i className="fas fa-eye"></i>
                                                                            </a>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <div className="ap-info uk-width-3-5@s">
                                                                    <div className="ap-info-inner ap-info-top">
                                                                        <h2 className="ap-title">
                                                                            <a href="" style={{ color: '#222222', textDecoration: 'none', fontSize: '16px', fontWeight: 'bold', fontFamily: 'Montserrat, Arial, Helvetica, sans-serif' }}>HYUNDAI IONIQ 7</a>
                                                                        </h2>
                                                                    </div>
                                                                    <div className="ap-info-inner ap-info-desc">
                                                                        <p style={{ lineHeight: '1.7', fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontWeight: '400', fontSize: '16px', color: '#555555' }}>Rip-snorting engine, bonkers acceleration, handling agile enough to trick you into thinking it’s a sports car.</p>
                                                                    </div>
                                                                    <div className="ap-info-inner ap">
                                                                        <div className="ap-specification uk-grid-column-small uk-grid-row-collapse ap-specification-style5 uk-child-width-1-2 uk-grid" style={{ justifyContent: 'space-between' }}>
                                                                            <div className="ap-spec-item uk-first-column">
                                                                                <span className="ap-field-label" style={{ fontWeight: '400' }}>
                                                                                    <span className="ap-style5-icon">
                                                                                        <i className="far fa-registered"></i>
                                                                                    </span>
                                                                                    Registration Date:
                                                                                </span>
                                                                                <span className="ap-spec-value"> 2015</span>
                                                                            </div>
                                                                            <div className="ap-spec-item">
                                                                                <span className="ap-field-label" style={{ fontWeight: '400' }}>
                                                                                    <span className="ap-style5-icon">
                                                                                        <i className="fas fa-car"></i>
                                                                                    </span>
                                                                                    Condition:
                                                                                </span>
                                                                                <span className="ap-spec-value">Used</span>
                                                                            </div>
                                                                            <div className="ap-spec-item uk-grid-margin uk-first-column">
                                                                                <span className="ap-field-label" style={{ fontWeight: '400' }}>
                                                                                    <span className="ap-style5-icon">
                                                                                        <i className="fas fa-cog"></i>
                                                                                    </span>
                                                                                    Mileage:
                                                                                </span>
                                                                                <span className="ap-spec-value">
                                                                                    19400
                                                                                    <span className="custom-field-append">
                                                                                        mi
                                                                                    </span>
                                                                                </span>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                    <div className="ap-info-inner  ap-info-bottom uk-flex uk-flex-between uk-flex-middle">
                                                                        <div className="ap-price-box">
                                                                            <span className="ap-field-label" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif' }}>RENTAL PRICE</span>
                                                                            <span className="ap-price" style={{ fontWeight: 'bold', fontSize: '1.2em' }}> $500 </span>
                                                                            <span className="ap-price-msrp">
                                                                                /Week
                                                                            </span>
                                                                        </div>
                                                                        <div className="ap-readmore-box">
                                                                            <a href="" className="templaza-btn">View more</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <div id="ap-product-modal__quickview" style={open ? { ...closepopup, ...popupContentStyle } : closepopup} className={`uk-modal-container uk-modal ${open==true ? 'uk-flex' :''}  ${open==true ?'uk-open':''}`}>
                <div className="uk-modal-dialog uk-flex uk-flex-center uk-flex-middle uk-margin-auto-vertical">
                    <button type="button" className="uk-modal-close-full uk-close-large uk-icon uk-close" onClick={handleOpen}>
                    <i class="fas fa-window-close" style={{fontSize:'44px'}}></i>
                    </button>
                    <div className="uk-grid-collapse uk-width-1-1 uk-child-width-1-2@s uk-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                        <div className="ap-quickview-media uk-cover-container uk-first-column">
                            <a href="">
                                <img width={1200} height={800} className="attachment-full size-full wp-post-image" style={{ objectFit: 'cover' }} src="https://autoshowroom.templaza.net/wp-content/uploads/2022/10/erik-mclean-M0z9ajPI3PE-unsplash.jpg" alt="" />
                                <canvas width={600} height={400}></canvas>
                            </a>
                            <a href="" className="product-more-infor uk-background-muted uk-text-center uk-position-bottom" style={{textDecoration:'none'}}>
                                <span className="product-more-infor__text" style={{fontFamily:'Inter, Arial, Helvetica, sans-serif',fontSize:'15px',fontWeight:'500',color:'#fff'}}>
                                More Product Info
                                </span>
                                <i className="fas fa-info-circle"></i>
                            </a>
                        </div>
                        <div className="ap-quickview-content">
                            <div className="uk-padding">
                                <h2 className="ap-quickview-product_title entry-title">
                                    <a href="" style={{ color: '#222222', fontFamily: 'Montserrat, Arial, Helvetica, sans-serif', fontWeight: 'bold', textTransform: 'uppercase', lineHeight: '1.2em', textDecoration: 'none' }}>911 Carrera</a>
                                </h2>
                                <div className="ap-price-box">
                                    <span className="ap-field-label" style={{ color: '#555555' }}>Total Price</span>
                                    <span className="ap-price">
                                        <b> </b>
                                        $98,000
                                    </span>
                                    <span className="ap-price-msrp" style={{ color: '#555555' }}>
                                        <span style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontWeight: '400', fontSize: '16px', lineHeight: '1.0em' }}> MSRP:  </span>
                                        $96,500
                                    </span>
                                </div>
                                <div className="ap-quickview-excerpt">
                                    <p style={{ lineHeight: '1.7', color: '#555555', fontFamily: 'Montserrat, Arial, Helvetica, sans-serif', textDecoration: 'none' }}>With room for up to seven and a luxurious vibe, this SUV is so far the most compelling model in to wear the EQS name.</p>
                                </div>
                                <div className="widget  ap-box ap-group ap-group-auto-specifications">
                                    <div className="widget-content">
                                        <h3 className="widget-title">
                                            <span style={{ color: '#222222', fontFamily: 'Montserrat, Arial, Helvetica, sans-serif', fontWeight: 'bold', textTransform: 'uppercase', lineHeight: '1.2em' }}>Auto Specifications</span>
                                        </h3>
                                        <div className="ap-group-content">
                                            <div className="uk-grid-small uk-grid">
                                                <div className="uk-width-expand uk-leader uk-first-column">
                                                    <span className="uk-leader-fill" data-fill=".................................................................................................................">
                                                        BHP
                                                    </span>
                                                </div>
                                                <div className="field-value" style={{fontFamily:'Inter, Arial, Helvetica, sans-serif',fontSize:'16px',lineHeight:'1.0em ',color: '#555555'}}>
                                                    195        </div>
                                            </div>
                                            <div className="uk-grid-small uk-grid">
                                                <div className="uk-width-expand uk-leader uk-first-column">
                                                    <span className="uk-leader-fill" data-fill="..........................................................................................................">
                                                    Motor size
                                                    </span>
                                                </div>
                                                <div className="field-value" style={{fontFamily:'Inter, Arial, Helvetica, sans-serif',fontSize:'16px',lineHeight:'1.0em',color: '#555555'}}>
                                                250        </div>
                                            </div>
                                            <div className="uk-grid-small uk-grid">
                                                <div className="uk-width-expand uk-leader uk-first-column">
                                                    <span className="uk-leader-fill" data-fill=".................................................................................................">
                                                    Fuel Type
                                                    </span>
                                                </div>
                                                <div className="field-value" style={{fontFamily:'Inter, Arial, Helvetica, sans-serif',fontSize:'16px',lineHeight:'1.0em',color: '#555555'}}>
                                                Biodiesel      </div>
                                            </div>
                                            <div className="uk-grid-small uk-grid">
                                                <div className="uk-width-expand uk-leader uk-first-column">
                                                    <span className="uk-leader-fill" data-fill="......................................................................................">
                                                    Number of doors
                                                    </span>
                                                </div>
                                                <div className="field-value" style={{fontFamily:'Inter, Arial, Helvetica, sans-serif',fontSize:'16px',lineHeight:'1.0em',color: '#555555'}}>
                                                4 Doors      </div>
                                            </div>
                                            <div className="uk-grid-small uk-grid">
                                                <div className="uk-width-expand uk-leader uk-first-column">
                                                    <span className="uk-leader-fill" data-fill=".......................................................................................................">
                                                    Drivetrain
                                                    </span>
                                                </div>
                                                <div className="field-value" style={{fontFamily:'Inter, Arial, Helvetica, sans-serif',fontSize:'16px',lineHeight:'1.0em',color: '#555555'}}>
                                                4WD     </div>
                                            </div>
                                            <div className="uk-grid-small uk-grid">
                                                <div className="uk-width-expand uk-leader uk-first-column">
                                                    <span className="uk-leader-fill" data-fill=".......................................................................................................">
                                                    Engine
                                                    </span>
                                                </div>
                                                <div className="field-value" style={{fontFamily:'Inter, Arial, Helvetica, sans-serif',fontSize:'16px',lineHeight:'1.0em',color: '#555555'}}>
                                                9     </div>
                                            </div>
                                            <div className="uk-grid-small uk-grid">
                                                <div className="uk-width-expand uk-leader uk-first-column">
                                                    <span className="uk-leader-fill" data-fill=".........................................................................................">
                                                    Transmission
                                                    </span>
                                                </div>
                                                <div className="field-value" style={{fontFamily:'Inter, Arial, Helvetica, sans-serif',fontSize:'16px',lineHeight:'1.0em',color: '#555555'}}>
                                                Automatic    </div>
                                            </div>
                                            <div className="uk-grid-small uk-grid">
                                                <div className="uk-width-expand uk-leader uk-first-column">
                                                    <span className="uk-leader-fill" data-fill="...............................................................................................">
                                                    Interior Color
                                                    </span>
                                                </div>
                                                <div className="field-value" style={{fontFamily:'Inter, Arial, Helvetica, sans-serif',fontSize:'16px',lineHeight:'1.0em',color: '#555555'}}>
                                                Black    </div>
                                            </div>
                                            <div className="uk-grid-small uk-grid">
                                                <div className="uk-width-expand uk-leader uk-first-column">
                                                    <span className="uk-leader-fill" data-fill=".......................................................................................................">
                                                    Exterior Color
                                                    </span>
                                                </div>
                                                <div className="field-value" style={{fontFamily:'Inter, Arial, Helvetica, sans-serif',fontSize:'16px',lineHeight:'1.0em',color: '#555555'}}>
                                                Red   </div>
                                            </div>
                                            <div className="uk-grid-small uk-grid">
                                                <div className="uk-width-expand uk-leader uk-first-column">
                                                    <span className="uk-leader-fill" data-fill=".......................................................................................................">
                                                    Condition   
                                                    </span>
                                                </div>
                                                <div className="field-value" style={{fontFamily:'Inter, Arial, Helvetica, sans-serif',fontSize:'16px',lineHeight:'1.0em',color: '#555555'}}>
                                                new    </div>
                                            </div>
                                            <div className="uk-grid-small uk-grid">
                                                <div className="uk-width-expand uk-leader uk-first-column">
                                                    <span className="uk-leader-fill" data-fill=".......................................................................................................">
                                                    Mileage
                                                    </span>
                                                </div>
                                                <div className="field-value" style={{fontFamily:'Inter, Arial, Helvetica, sans-serif',fontSize:'16px',lineHeight:'1.0em',color: '#555555'}}>
                                                25000  </div>
                                            </div>
                                            <div className="uk-grid-small uk-grid">
                                                <div className="uk-width-expand uk-leader uk-first-column">
                                                    <span className="uk-leader-fill" data-fill="..........................................................................................">
                                                    Registration Date
                                                    </span>
                                                </div>
                                                <div className="field-value" style={{fontFamily:'Inter, Arial, Helvetica, sans-serif',fontSize:'16px',lineHeight:'1.0em',color: '#555555'}}>
                                                2022   </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Inventory;