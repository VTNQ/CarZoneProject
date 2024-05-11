import React, { useState } from "react";
import Menu from "../Menu/Menu";
import './Inventory.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
function Inventory(){
    const Producttype=[
        {value:0,label:'sale'},
        {value:1,label:"Rental"},
        {value:2,label:'Sold'},
        {value:3,label:'Contact'}
    ]
    const Branch=[
        {value:0,label:'All Branch'},
        {value:1,label:'Auto'},
        {value:2,label:'Beetle'},
        {value:3,label:'Convertible'},
        {value:4,label:'Minivan'},
        {value:5,label:'Sedan'},
        {value:6,label:'SUV'},
        {value:7,label:'Truck'},
        {value:8,label:'Van'},

    ]
    const Make=[
        {value:0,label:'All Make'},
        {value:1,label:'Audi'},
        {value:2,label:'BMW'}
    ]
    const Model=[
        {value:0,label:'All Mode'},
        {value:1,label:'911'}
    ]
    const Condition=[
        {value:0,label:'All Condition'},
        {value:1,label:'New'},
        {value:2,label:'Used'},
        {value:3,label:'Certified Pre-Owned'}
    ]
    const ExistColor=[
        {value:1,label:'Sliver'},
        {value:2,label:'Black'},
        {value:3,label:'White'},
        {value:4,label:'Red'}
    ]
    const SortBy=[
        {valueL:0,label:'Date:Newest First'},
        {value:1,label:'Date:Oldest First'},
        {value:2,label:'Title:A-Z'},
        {value:3,label:'Title:Z-A'},
        {value:4,label:'Price:High To Low'},
        {value:5,label:'Price:Low To High'}
    ]
    const [filterValue,setFilterValue]=useState([0,100]);
    const handleFilterChange=(value)=>{
        setFilterValue(value)
    }
return(
    <div className="templaza-content">
        <div className="templaza-layout templaza-layout-wide">
            <div className="templaza-wrapper">
                <Menu/>
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
                                                                <label htmlFor="" className="search-label" style={{borderBottom:'1px solid rgba(0, 0, 0, 0.1)',paddingBottom:'13px',paddingRight:'20vh'}}>
                                                                    Product Type
                                                                </label>
                                                                <div className="uk-form-controls" style={{marginTop:'25px',marginLeft:'-4px'}}>
                                                                    <div className="acf-taxonomy-field">
                                                                        <select name="" id="acf-field-ap_branch-663e95071b87b">
                                                                            {Producttype.map(item=>(
                                                                                <option key={item.value}>{item.label}</option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="ap-search-item uk-margin uk-first-column" style={{marginTop:'50px'}}>
                                                                <label htmlFor="" className="search-label" style={{borderBottom:'1px solid rgba(0, 0, 0, 0.1)',paddingBottom:'13px',paddingRight:'20vh'}}>
                                                                    Branch
                                                                </label>
                                                                <div className="uk-form-controls" style={{marginTop:'25px',marginLeft:'-4px'}}>
                                                                    <div className="acf-taxonomy-field">
                                                                        <select name="" id="acf-field-ap_branch-663e95071b87b">
                                                                            {Branch.map(item=>(
                                                                                <option key={item.value}>{item.label}</option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="ap-search-item uk-margin uk-first-column" style={{marginTop:'50px'}}>
                                                                <label htmlFor="" className="search-label" style={{borderBottom:'1px solid rgba(0, 0, 0, 0.1)',paddingBottom:'13px',paddingRight:'20vh'}}>
                                                                    Make
                                                                </label>
                                                                <div className="uk-form-controls" style={{marginTop:'25px',marginLeft:'-4px'}}>
                                                                    <div className="acf-taxonomy-field">
                                                                        <select name="" id="acf-field-ap_branch-663e95071b87b">
                                                                            {Make.map(item=>(
                                                                                <option key={item.value}>{item.label}</option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="ap-search-item uk-margin uk-first-column" style={{marginTop:'50px'}}>
                                                                <label htmlFor="" className="search-label" style={{borderBottom:'1px solid rgba(0, 0, 0, 0.1)',paddingBottom:'13px',paddingRight:'20vh'}}>
                                                                    Model
                                                                </label>
                                                                <div className="uk-form-controls" style={{marginTop:'25px',marginLeft:'-4px'}}>
                                                                    <div className="acf-taxonomy-field">
                                                                        <select name="" id="acf-field-ap_branch-663e95071b87b">
                                                                            {Model.map(item=>(
                                                                                <option key={item.value}>{item.label}</option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="ap-search-item uk-margin uk-first-column" style={{marginTop:'50px'}}>
                                                                <label htmlFor="" className="search-label" style={{borderBottom:'1px solid rgba(0, 0, 0, 0.1)',paddingBottom:'13px',paddingRight:'20vh'}}>
                                                                    Condition
                                                                </label>
                                                                <div className="uk-form-controls" style={{marginTop:'25px',marginLeft:'-4px'}}>
                                                                    <div className="acf-taxonomy-field">
                                                                        <select name="" id="acf-field-ap_branch-663e95071b87b">
                                                                            {Condition.map(item=>(
                                                                                <option key={item.value}>{item.label}</option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="ap-search-item uk-margin uk-first-column" style={{marginTop:'50px'}}>
                                                                <label htmlFor="" className="search-label" style={{borderBottom:'1px solid rgba(0, 0, 0, 0.1)',paddingBottom:'13px',paddingRight:'20vh'}}>
                                                                EXTERIOR COLOR
                                                                </label>
                                                                <div className="uk-form-controls" style={{marginTop:'25px',marginLeft:'-4px'}}>
                                                                    <div className="acf-taxonomy-field">
                                                                        <select name="" id="acf-field-ap_branch-663e95071b87b">
                                                                            {ExistColor.map(item=>(
                                                                                <option key={item.value}>{item.label}</option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="ap-search-item uk-margin uk-first-column" style={{marginTop:'50px'}}>
                                                                <label htmlFor="" className="search-label" style={{borderBottom:'1px solid rgba(0, 0, 0, 0.1)',paddingBottom:'13px',paddingRight:'20vh'}}>
                                                                INTERIOR COLOR
                                                                </label>
                                                                <div className="uk-form-controls" style={{marginTop:'25px',marginLeft:'-4px'}}>
                                                                    <div className="acf-taxonomy-field">
                                                                        <select name="" id="acf-field-ap_branch-663e95071b87b">
                                                                            {ExistColor.map(item=>(
                                                                                <option key={item.value}>{item.label}</option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="ap-search-item uk-margin uk-first-column" style={{marginTop:'50px'}}>
                                                                <label htmlFor="" className="search-label" style={{borderBottom:'1px solid rgba(0, 0, 0, 0.1)',paddingBottom:'13px',paddingRight:'20vh'}}>
                                                                Price
                                                                </label>
                                                                <div className="uk-form-controls" style={{marginTop:'25px',marginLeft:'-4px'}}>
                                                                    <div className="acf-taxonomy-field">
                                                                     <Slider range min={0} max={1000} step={10} defaultValue={filterValue} onChange={handleFilterChange}/>
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
                                <div id="templaza-column-1715377415090687" style={{width:'70%',marginLeft:'5vh'}} className="templaza-column tz_custom_1715377415090687 uk-width-3-4@l uk-width-1-1 uk-width-1-1@s uk-width-3-4@m">
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
                                                           {SortBy.map(item=>(
                                                            <option value={item.value}>{item.label}</option>
                                                           ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="ap-switcher-wrap uk-flex uk-flex-right uk-text-right">
                                                    <span className="switcher_btn grid uk-active uk-icon">
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
                                                    <span className="switcher_btn uk-visible@s list uk-icon">
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
                                        <div className="templaza-ap-archive templaza-ap-grid uk-child-width-1-2@l uk-child-width-1-3@xl uk-child-width-1-2@m uk-child-width-1-2@s uk-child-width-1-1 uk-grid-default uk-grid">
                                            <div className="ap-item ap-item-style4 templazaFadeInUp uk-first-column"></div>
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
export default Inventory;