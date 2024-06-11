import Menu from "../Menu/Menu";
import './DetailInventory.css';
import Select from "react-select"
import Swal from 'sweetalert2';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Pagination from 'react-paginate';
import Footer from "../Footer/Footer";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { keyframes } from "@emotion/react";
function DetailInventory() {
    
    const mapstyles = {
        height: '100vh',
        width: '100%',
    }
    const[SelectCity,setSelectcity]=useState(null);
    const handleSelectCity=(SelectCity)=>{
     setSelectcity(SelectCity)
    }
    const [isPopupVisible, setPopupVisibility] = useState(false);
    const [IsClosingPopup, setIsClosingPopup] = useState(false);
    const closingAnimation = {
        animation: 'flipright 0.5s forwards',
    };
    const handlePopup = (ID) => {
        const SelectCar = DetailCar.find(Detail => Detail.id == ID);
        console.log(SelectCar)
        if (SelectCar) {
            FromData.Image = SelectCar.picture.pictureLink;
            FromData.name = SelectCar.name;
            FromData.Price = SelectCar.price;
            FromData.BHP = SelectCar.bhp;
            FromData.motorSize = SelectCar.motorSize;
            FromData.fueType = SelectCar.fuetype;
            FromData.driveTrain = SelectCar.driveTrain;
            FromData.engine = SelectCar.engine;
            FromData.transmission = SelectCar.transmission;
            FromData.numberSeat = SelectCar.numberofSeat;
            FromData.condition = SelectCar.condition;
            FromData.mileage = SelectCar.mileage;
            FromData.dateAccept = SelectCar.dateAccept;
            FromData.model = SelectCar.model;
        }

        setPopupVisibility(true)
    }
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
    const [District,setDistrict]=useState([]);
   
    useEffect(()=>{
        const fetchdata=async()=>{
            try{
                const response=await axios.get(`http://localhost:5278/api/Request/ShowDistrict/${SelectCity?.value}`);
                setDistrict(response.data.result)
            }catch(error){
                console.log(error)
            }
        }
        fetchdata();
    },[SelectCity?.value])
    const navigate = useNavigate();
    const location = useLocation();
    const ID = location.state?.ID || '';
    const Name = location.state?.Name || '';
    const [LatestCar, setLatestCar] = useState([]);
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://localhost:5278/api/WareHouse/ShowLatestCar");
                setLatestCar(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [])
    useEffect(()=>{
        const fetchdata=async()=>{
            try{
                const response=await axios.get("http://localhost:5278/api/City/showCity");
                setcity(response.data)
            }catch(error){
                console.log(error)
            }
        }
        fetchdata();
    },[])
    const SendRequest=async()=>{
        if(SelectWareHouse?.label==null || FromData.NameRequest=='' || FromData.CommentRequest=='' ){
            Swal.fire({
                icon: 'error',
                title: 'Please enter complete information',
                showConfirmButton: false,
                timer: 1500,
            })
        }else{
            try{
                setloading(true)
                const response=await fetch("http://localhost:5278/api/Request/AddRequest",{
                    method: 'Post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ to: SelectWareHouse?.label, from: FromData.NameRequest, type: true, description: FromData.CommentRequest })
                })
                if(response.ok){
                    Swal.fire({
                        icon: 'success',
                        title: 'Add success',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    setloading(false)
                    setSelectWareHouse(null)
                    setFromData({
                        NameRequest:'',
                        CommentRequest:''
                    })
                    setSelectDistrict(null)
                    setSelectcity(null)
                }
            }catch(error){
                console.log(error)
            }
        }
        
    }
    const handleSubmit = async () => {

        try {
            setloading(true)
            const response = await fetch("http://localhost:5278/api/WareHouse/SendMessage", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: FromData.Name,
                    message: FromData.Message,
                    email: FromData.Email,
                    car: Name,
                })
            })
            if (response.ok) {
                setloading(false)
                Swal.fire({
                    icon: 'success',
                    title: 'Send Success',
                    showConfirmButton: false,
                    timer: 1500,
                });
                setFromData({
                    Email: '',
                    Name: '',
                    Message: ''
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    const [Car, setCar] = useState([])

    const [DetailCar, setDetailCar] = useState([]);
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:5278/api/WareHouse/CompareCar/${ID}`);
                setDetailCar(response.data.result)
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [])

    const [ShowImage, setShowImage] = useState([]);
    const [FirstImage, setFirtImage] = useState('');
    const handleClosepopup = () => {
        setIsClosingPopup(true);
        setTimeout(() => {

            setFromData({
                name: '',
                Image: '',
                Price: '',
                BHP: '',
                motorSize: '',
                fueType: '',
                driveTrain: '',
                engine: '',
                transmission: '',
                numberSeat: '',
                condition: '',
                mileage: '',
                dateAccept: '',
                model: ''
            })

            setPopupVisibility(false)
            setIsClosingPopup(false)
        }, 500);
    }
    const [FromData, setFromData] = useState({
        Email: '',
        Name: '',
        name: '',
        Message: '',
        Image: '',
        Price: '',
        BHP: '',
        motorSize: '',
        fueType: '',
        driveTrain: '',
        engine: '',
        transmission: '',
        numberSeat: '',
        condition: '',
        mileage: '',
        dateAccept: '',
        model: '',
        NameRequest:'',
        CommentRequest:'',

    })
    const [ShowRoom, setShowRoom] = useState([]);
    const [SelectDistrict,setSelectDistrict]=useState(null);
    const handleSelectDistrict=(SelectDistrict)=>{
        setSelectDistrict(SelectDistrict)
    }
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:5278/api/Request/ShowShowRoom/${SelectDistrict?.value}`);
                setShowRoom(response.data.result)
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [SelectDistrict?.value])
    const [loading, setloading] = useState(true);
    const [Image,setImage]=useState([]);
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:5278/api/WareHouse/ShowListPicture/${ID}`)
               setImage(response.data)
            } catch (error) {
                console.log(error)
            } finally {
                setloading(false)
            }
        }
        fetchdata();
    }, [])
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:5278/api/WareHouse/ShowListPicture/${ID}`)
                const images = response.data;
                if (images.length > 0) {
                    
                    setShowImage(images.slice(1));
                } else {
                    setShowImage([]);
                }
                setFirtImage(response.data[0].link)
            } catch (error) {
                console.log(error)
            } finally {
                setloading(false)
            }
        }
        fetchdata();
    }, [])
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:5278/api/WareHouse/DetailCar/${ID}`)
                setCar(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [])

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
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
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
        zIndex: '1000',
    };
    const closepopup = {
        display: 'none',
        animation: 'fadeUp 0.5s ease-out', // Specify the animation properties
    };
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
    const[city,setcity]=useState([]);
    useEffect(()=>{
        const fetchdata=async()=>{
            try{
                const response=await axios.get(`http://localhost:5278/api/City/showCity`);
                setcity(response.data)
            }catch(error){
                console.log(error)
            }
        }
        fetchdata();
    },[])
    const renderTabContent = () => {
        switch (ActiveTab) {
            case 'Overview':
                return (
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
                return (
                    <ul className="uk-switcher uk-margin-medium-top">
                        <li id="uk-tab-4">
                            <h4 className="body-h2 css-1128h8c et3p2gv0" style={{ fontSize: '1.22em', lineHeight: '1.2em', fontFamily: 'Montserrat, Arial, Helvetica, sans-serif' }}>
                                <strong>EV Motor, Power, and Performance</strong>
                            </h4>
                            <p style={{ lineHeight: '1.7', fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontWeight: '400', fontSize: '16px', color: '#555555' }}>A steer-by-wire system is standard, and Lexus has confirmed that a yoke-style steering wheel will be offered as an option; a regular circular wheel will be standard, so if you’re not ready for a yoke you’ll be able to opt out. The steer-by-wire system takes getting used to but once we got the hang of it, it proved to be beneficial for handling. When we get a chance to test the RZ at our test track, we’ll update this story with results.</p>
                            <h4 className="body-h2 css-1128h8c et3p2gv0" style={{ fontSize: '1.22em', lineHeight: '1.2em', fontFamily: 'Montserrat, Arial, Helvetica, sans-serif' }}>
                                <strong>Range, Charging, and Battery Life</strong>
                            </h4>
                            <p style={{ lineHeight: '1.7', fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontWeight: '400', fontSize: '16px', color: '#555555' }}>The RZ450 will use the same 65.6-kWh battery pack as the bZ4X and Solterra, which should deliver around 225 miles of driving range per charge, according to Lexus. A 6.6-kW onboard charger is weaker than many rivals and the RZ’s DC fast-charging capabilities are limited to 150-kW connections. A simplicity-focused interior design in the RZ’s interior has removed many buttons and switches from the dashboard and doors and relocated those things to the large infotainment display. Similar approaches have been employed in EV models from Tesla and Polestar, with varying results. Either way, the RZ’s cabin looks spacious for a small crossover and quite upscale, with most surfaces wrapped with faux suede or synthetic leather.</p>
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
            // case 'Request':
            //     return (
            //         <ul className="uk-switcher uk-margin-medium-top">
            //             <li id="uk-tab-6">
            //                 <div className="su-gmap su-u-responsive-media-yes">
            //                     <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.1485195313026!2d106.71160187480542!3d10.806689089343907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529ed00409f09%3A0x11f7708a5c77d777!2zQXB0ZWNoIENvbXB1dGVyIEVkdWNhdGlvbiAtIEjhu4cgVGjhu5FuZyDEkMOgbyB04bqhbyBM4bqtcCBUcsOsbmggVmnDqm4gUXXhu5FjIHThur8gQXB0ZWNo!5e1!3m2!1svi!2s!4v1715393973056!5m2!1svi!2s" width="600" height="450" style={mapstyles} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            //                 </div>
            //                 <div className="wpforms-container wpforms-container-full" id="wpforms-10201">
            //                     <form className="wpforms-validate wpforms-form wpforms-ajax-form">
            //                         <div className="wpforms-field-container">
            //                             <div id="wpforms-10201-field_1-container" className="wpforms-field wpforms-field-text wpforms-one-half wpforms-first">
            //                                 <label htmlFor="" className="wpforms-field-label">Your Name
            //                                     <span className="wpforms-required-label">*</span>
            //                                 </label>
            //                                 <input type="text" id="wpforms-14099-field_1" value={FromData.Name} onChange={(e) => setFromData({ ...FromData, Name: e.target.value })} className="wpforms-field-large wpforms-field-required" placeholder="Your Name" style={{ color: '#555555', fontWeight: '400', fontFamily: 'inherit', fontSize: '0.9em', marginRight: '0', height: '50px', lineHeight: '50px', backgroundColor: '#ffffff', borderRadius: '0', border: '1px solid rgba(0, 0, 0, 0.1)', marginTop: '0', padding: '0 15px', background: '#fff', width: '100%', maxWidth: '100%' }} />
            //                             </div>
            //                             <div id="wpforms-10201-field_2-container" className="wpforms-field wpforms-field-text wpforms-one-half" style={{ marginLeft: '5px' }}>
            //                                 <label htmlFor="" className="wpforms-field-label">Your Email
            //                                     <span className="wpforms-required-label">*</span>
            //                                 </label>
            //                                 <input type="text" id="wpforms-14099-field_1" value={FromData.Email} onChange={(e) => setFromData({ ...FromData, Email: e.target.value })} className="wpforms-field-large wpforms-field-required" placeholder="Your Name" style={{ color: '#555555', fontWeight: '400', fontFamily: 'inherit', fontSize: '0.9em', marginRight: '0', height: '50px', lineHeight: '50px', backgroundColor: '#ffffff', borderRadius: '0', border: '1px solid rgba(0, 0, 0, 0.1)', marginTop: '0', padding: '0 15px', background: '#fff', width: '100%', maxWidth: '100%' }} />
            //                             </div>
            //                             {/* <div id="wpforms-10201-field_2-container" className="wpforms-field wpforms-field-text wpforms-one-half" style={{ marginLeft: '5px', width: '100%' }}>
            //                                 <label htmlFor="" className="wpforms-field-label">Subject

            //                                 </label>
            //                                 <input type="text" id="wpforms-14099-field_1" className="wpforms-field-large wpforms-field-required" placeholder="Your Name" style={{ color: '#555555', fontWeight: '400', fontFamily: 'inherit', fontSize: '0.9em', marginRight: '0', height: '50px', lineHeight: '50px', backgroundColor: '#ffffff', borderRadius: '0', border: '1px solid rgba(0, 0, 0, 0.1)', marginTop: '0', padding: '0 15px', background: '#fff', width: '100%', maxWidth: '100%' }} />
            //                             </div> */}
            //                             <div id="wpforms-10201-field_2-container" className="wpforms-field wpforms-field-text wpforms-one-half" style={{ marginLeft: '5px', width: '100%' }}>
            //                                 <label htmlFor="" className="wpforms-field-label">Message

            //                                 </label>
            //                                 <textarea id="wpforms-14099-field_1" value={FromData.Message} onChange={(e) => setFromData({ ...FromData, Message: e.target.value })} className="wpforms-field-large wpforms-field-required" placeholder="Your Message" style={{ color: '#555555', fontWeight: '400', fontFamily: 'inherit', fontSize: '0.9em', marginRight: '0', height: '89px', lineHeight: '50px', backgroundColor: '#ffffff', borderRadius: '0', border: '1px solid rgba(0, 0, 0, 0.1)', marginTop: '0', padding: '0 15px', background: '#fff', width: '100%', maxWidth: '100%', paddingTop: '10px', paddingBottom: '10px' }} />
            //                             </div>
            //                         </div>
            //                         <div className="wpforms-submit-container">
            //                             <button type="button" id="wpforms-submit-14099" onClick={handleSubmit} className="wpforms-submit" style={{ backgroundColor: '#ff5400', color: '#ffffff', border: '2px solid transparent', borderRadius: '0', cursor: 'pointer', fontWeight: '700', fontSize: '14px', lineHeight: '1.5', padding: '13px 32px', textDecoration: 'none', textTransform: 'uppercase' }}>Send Message</button>
            //                         </div>
            //                     </form>
            //                 </div>
            //             </li>
            //         </ul>
            //     )
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
    const [SelectWareHouse, setSelectWareHouse] = useState(null)
    const handleSelectWareHouse = (SelectWareHouse) => {
        setSelectWareHouse(SelectWareHouse);
    }
    const [ActiveTab, setActiveTab] = useState('Overview');
    const handleTabChange = (tabID) => {
        setActiveTab(tabID);
    }

    const handleThumbnailClick = (index) => {
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(index);
        }
    }
    const [perPage, setperPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const indexOfLastCar = (currentPage + 1) * perPage;
    const indexOfFirstCar = indexOfLastCar - perPage;
    const currentCars = DetailCar.slice(indexOfFirstCar, indexOfLastCar);
    // Configuration for the slideshow
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,// Hide arrows for navigation
    };
    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(0); // Go to the first slide
        }
    }, []);
    const settingshow = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: Image.length < 5 ? Image.length : 5,
        slidesToScroll: 1,

        arrows: false,
    }
    const settingSlide = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: LatestCar.length < 3 ? LatestCar.length : 3,
        slidesToScroll: 1,

        arrows: false,
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
                                                                                    <div style={{ display:'none' }}>
                                                                                            <img src={FirstImage} width={800} height={533} alt="Slide 1" />
                                                                                        </div>
                                                                                        {ShowImage.map((image, index) => (
                                                                                            <div key={index}>
                                                                                                <img src={image.link} width={800} height={533} alt={`Slide ${index + 1}`} />
                                                                                            </div>
                                                                                        ))}
                                                                                       

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
                                                                                        {Image.map((Image, index) => (
                                                                                            <div className="ap-tiny-slider-thumbnail tns-item tns-slide-active tns-nav-active" style={{ padding: '20px' }} onClick={() => handleThumbnailClick(index)}>
                                                                                                <div className="thumb-img-wrap">
                                                                                                    <img src={Image.link} width={161} height={107} alt="" />
                                                                                                </div>
                                                                                            </div>
                                                                                        ))}


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
                                                        <div className="ap-single-box1 ap-single-content" style={{ height: ActiveTab === 'Overview' ? '24%' : ActiveTab === 'Featured' ? '40%' : '55%' }}>
                                                            <ul className="uk-tab">
                                                                <li className={`${ActiveTab == 'Overview' ? 'uk-active' : ''}`} onClick={() => handleTabChange("Overview")}>
                                                                    <a id="uk-tab-1" style={{ textDecoration: "none" }}> Vehicle Overview </a>
                                                                </li>
                                                                <li className={`${ActiveTab == 'Featured' ? 'uk-active' : ''}`} onClick={() => handleTabChange("Featured")}>
                                                                    <a style={{ textDecoration: "none" }}> Features & Options </a>
                                                                </li>
                                                                {/* <li className={`${ActiveTab == 'Request' ? 'uk-active' : ''}`} onClick={() => handleTabChange("Request")}>
                                                                    <a style={{ textDecoration: "none" }}>  Request information  </a>
                                                                </li> */}
                                                            </ul>
                                                            {renderTabContent()}
                                                        </div>
                                                        <div className="templaza-single-comment ap-single-box1">
                                                            <div id="comments" className="comments-area templaza-comment-form ">
                                                                <div className="CommentForm">
                                                                    <div id="respond" className="comment-respond">
                                                                        <h3 id="reply-title" className="comment-reply-title box-title" style={{ fontFamily: 'Montserrat, Arial, Helvetica, sans-serif', fontWeight: '700', color: '#222222' }}>
                                                                            Leave a Comment
                                                                        </h3>
                                                                        <form action="" id="commentform">
                                                                            <p className="comment-notes" style={{ lineHeight: '1.7', fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontWeight: '400', fontSize: '16px', color: '#555555' }}>
                                                                                <span id="email-notes">Your email address will not be published.
                                                                                    <span className="required-field-message">
                                                                                        Required fields are marked
                                                                                        <span className="required">*</span>
                                                                                    </span>
                                                                                </span>
                                                                            </p>
                                                                            <div className="comment-form-comment">
                                                                            <label for="exampleInputUsername1">City </label>
                                                <Select options={city.map(ware => ({ value: ware.id, label: ware.name }))}
                                                    value={SelectCity}
                                                    onChange={(SelectedOption) => handleSelectCity(SelectedOption)}
                                                />
                                                                            </div>
                                                                            <br />
                                                                            <div className="comment-form-comment">
                                                                            <label for="exampleInputUsername1">District </label>
                                                <Select options={District.map(ware => ({ value: ware.id, label: ware.name }))}
                                                    value={SelectDistrict}
                                                    onChange={(SelectedOption) => handleSelectDistrict(SelectedOption)}
                                                />
                                                                            </div>
                                                                            <div className="comment-form-comment">
                                                                            <label for="exampleInputUsername1">Showroom </label>
                                                <Select options={ShowRoom.map(ware => ({ value: ware.name, label: ware.name }))}
                                                    value={SelectWareHouse}
                                                    onChange={(SelectedOption) => handleSelectWareHouse(SelectedOption)}
                                                />
                                                                            </div>
                                                                            <br />
                                                                            <div className="content-form uk-child-width-1-2@s uk-grid-small uk-grid">
                                                                                <div className="comment-form-author uk-first-column" style={{ width: '100%' }}>
                                                                                    <input type="text" id="wpforms-14099-field_1" value={FromData.NameRequest} onChange={(e) => setFromData({ ...FromData, NameRequest: e.target.value })} className="wpforms-field-large wpforms-field-required" placeholder="Enter Your Name" style={{ color: '#555555', fontWeight: '400', fontFamily: 'inherit', fontSize: '0.9em', marginRight: '0', height: '50px', lineHeight: '50px', backgroundColor: '#ffffff', borderRadius: '0', border: '1px solid rgba(0, 0, 0, 0.1)', marginTop: '0', padding: '0 15px', background: '#fff', width: '100%', maxWidth: '100%' }} />
                                                                                </div>
                                                                              
                                                                            </div>
                                                                            <br />
                                                                            <div className="comment-form-comment">
                                                                                <textarea type="tel" id="wpforms-14099-field_1" className="wpforms-field-large wpforms-field-required" value={FromData.CommentRequest} onChange={(e) => setFromData({ ...FromData, CommentRequest: e.target.value })}  placeholder="Your Comment" style={{ color: '#555555', fontWeight: '400', fontFamily: 'inherit', fontSize: '0.9em', marginRight: '0', height: '89px', lineHeight: '50px', backgroundColor: '#ffffff', borderRadius: '0', border: '1px solid rgba(0, 0, 0, 0.1)', marginTop: '0', padding: '0 15px', background: '#fff', width: '100%', maxWidth: '100%', paddingTop: '10px', paddingBottom: '10px', marginBottom: '14px' }} />
                                                                            </div>
                                                                           
                                                                            <div className="wpforms-submit-container" style={{ marginTop: "10px" }}>
                                                                                <button type="button" id="wpforms-submit-14099" className="wpforms-submit" style={{ backgroundColor: '#ff5400', color: '#ffffff', border: '2px solid transparent', borderRadius: '0', cursor: 'pointer', fontWeight: '700', fontSize: '14px', lineHeight: '1.5', padding: '13px 32px', textDecoration: 'none', textTransform: 'uppercase' }} onClick={()=>SendRequest()}>Post Comment</button>
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
                                                                            <span className="price"> ${Car.price} </span>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="hightlight-box uk-margin-top">
                                                                    <a className="highlight uk-flex uk-flex-center uk-flex-middle deco no-underline">
                                                                        <span> MAKE AN OFFER PRICE </span>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="ap-single-price-box ap-single-side-box " style={{ width: '268%' }}>
                                                                <div className="ap-single-price">
                                                                    <div className="ap-single-price  uk-flex-between uk-flex-middle" style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
                                                                        {currentCars.map((car, index) => (
                                                                            <div className="car-details">
                                                                                <h3 className="car-name">{car.name}</h3>
                                                                                <img src={car.picture.pictureLink} alt="Car Image" className="car-image" />
                                                                                <button className="compare-button" onClick={() => handlePopup(car.id)}>Compare</button>
                                                                            </div>
                                                                        ))}
                                                                        <Pagination
                                                                            previousLabel={'previous'}
                                                                            nextLabel={'next'}
                                                                            breakLabel={'...'}
                                                                            pageCount={Math.ceil(currentCars.length / perPage)}
                                                                            marginPagesDisplayed={2}
                                                                            pageRangeDisplayed={5}
                                                                            onPageChange={handlePageclick}
                                                                            containerClassName={'pagination'}
                                                                            activeClassName={'active'}
                                                                            previousClassName={'page-item'}
                                                                            previousLinkClassName={'page-link'}
                                                                            nextClassName={'page-item'}
                                                                            nextLinkClassName={'page-link'}
                                                                            breakClassName={'page-item'}
                                                                            breakLinkClassName={'page-link'}
                                                                            pageClassName={'page-item'}
                                                                            pageLinkClassName={'page-link'}

                                                                        />
                                                                    </div>
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
                                                                                <span className="uk-leader-fill" data-fill="...............................................................................">
                                                                                    Model
                                                                                </span>
                                                                            </div>
                                                                            <div className="field-value" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.0em', fontWeight: 'bold' }}>
                                                                                {Car.model}      </div>
                                                                        </div>
                                                                        <div className="uk-grid-small uk-grid">
                                                                            <div className="uk-width-expand uk-leader uk-first-column">
                                                                                <span className="uk-leader-fill" data-fill="................................................................">
                                                                                    Registration Date
                                                                                </span>
                                                                            </div>
                                                                            <div className="field-value" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.0em', fontWeight: 'bold' }}>
                                                                                {Car.dateAccept}    </div>
                                                                        </div>
                                                                        <div className="uk-grid-small uk-grid">
                                                                            <div className="uk-width-expand uk-leader uk-first-column">
                                                                                <span className="uk-leader-fill" data-fill="..........................................................................">
                                                                                    Condition
                                                                                </span>
                                                                            </div>
                                                                            <div className="field-value" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.0em', fontWeight: 'bold' }}>
                                                                                {Car.condition}   </div>
                                                                        </div>
                                                                        <div className="uk-grid-small uk-grid">
                                                                            <div className="uk-width-expand uk-leader uk-first-column">
                                                                                <span className="uk-leader-fill" data-fill=".....................................................">
                                                                                    Transmission
                                                                                </span>
                                                                            </div>
                                                                            <div className="field-value" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.0em', fontWeight: 'bold' }}>
                                                                                {Car.transmission}
                                                                            </div>
                                                                        </div>
                                                                        <div className="uk-grid-small uk-grid">
                                                                            <div className="uk-width-expand uk-leader uk-first-column">
                                                                                <span className="uk-leader-fill" data-fill="..............................................................................">
                                                                                    Engine
                                                                                </span>
                                                                            </div>
                                                                            <div className="field-value" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.0em', fontWeight: 'bold' }}>
                                                                                {Car.engine}    </div>
                                                                        </div>
                                                                        <div className="uk-grid-small uk-grid">
                                                                            <div className="uk-width-expand uk-leader uk-first-column">
                                                                                <span className="uk-leader-fill" data-fill=".............................................................">
                                                                                    Drivetrain
                                                                                </span>
                                                                            </div>
                                                                            <div className="field-value" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.0em', fontWeight: 'bold' }}>
                                                                                {Car.driveTrain}    </div>
                                                                        </div>
                                                                        <div className="uk-grid-small uk-grid">
                                                                            <div className="uk-width-expand uk-leader uk-first-column">
                                                                                <span className="uk-leader-fill" data-fill=".............................................................">
                                                                                    Number of doors
                                                                                </span>
                                                                            </div>
                                                                            <div className="field-value" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.0em', fontWeight: 'bold' }}>
                                                                                {Car.numberSeat} Doors   </div>
                                                                        </div>
                                                                        <div className="uk-grid-small uk-grid">
                                                                            <div className="uk-width-expand uk-leader uk-first-column">
                                                                                <span className="uk-leader-fill" data-fill=".....................................................................">
                                                                                    Fuel Type
                                                                                </span>
                                                                            </div>
                                                                            <div className="field-value" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.0em', fontWeight: 'bold' }}>
                                                                                {Car.fueType} </div>
                                                                        </div>
                                                                        <div className="uk-grid-small uk-grid">
                                                                            <div className="uk-width-expand uk-leader uk-first-column">
                                                                                <span className="uk-leader-fill" data-fill="...............................................................">
                                                                                    Motor size
                                                                                </span>
                                                                            </div>
                                                                            <div className="field-value" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.0em', fontWeight: 'bold' }}>
                                                                                {Car.motorSize}  </div>
                                                                        </div>
                                                                        <div className="uk-grid-small uk-grid">
                                                                            <div className="uk-width-expand uk-leader uk-first-column">
                                                                                <span className="uk-leader-fill" data-fill="..........................................................................................">
                                                                                    BHP
                                                                                </span>
                                                                            </div>
                                                                            <div className="field-value" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.0em', fontWeight: 'bold' }}>
                                                                                {Car.bhp} </div>
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
                                                                                {Car.mileage} mi</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                     
                                                          
                                                           
                                                        </div>
                                                    </div>
                                                </div>
                                                {LatestCar.lengt == 3 && (
                                                    <div className="ap-related-product uk-margin-large-top">
                                                        <h3 className="box-title">
                                                            Related Products
                                                        </h3>
                                                        <div className="uk-slider">
                                                            <div className="uk-position-relative">
                                                                <Slider {...settingSlide} >
                                                                    {LatestCar.map((latest, index) => (
                                                                        <div className="ap-item ap-item-style4 templazaFadeInUp uk-slide-active uk-active">
                                                                            <div className="ap-inner" style={{ width: '95%' }}>
                                                                                <div className="ap-info">
                                                                                    <div className="uk-inline">
                                                                                        <div className="ap-ribbon rental Default">
                                                                                            <span className="ap-ribbon-content"> For Rent </span>
                                                                                        </div>
                                                                                        <div className="uk-card-media-top uk-position-relative uk-transition-toggle ">
                                                                                            <a href="">
                                                                                                <img src={latest.picture.pictureLink} width={444} height={296} style={{ width: '444px', height: '296px' }} alt="" />
                                                                                            </a>
                                                                                            <div className="uk-position-bottom-right ap-archive-btn-action uk-transition-fade">
                                                                                                <a className="uk-icon-button" style={{ textDecoration: 'none' }}>
                                                                                                    <i className="fas fa-not-equal js-ap-icon" ></i>
                                                                                                </a>
                                                                                                <a className="uk-icon-button" style={{ textDecoration: 'none' }} onClick={handleOpen}>
                                                                                                    <i className="fas fa-eye" ></i>
                                                                                                </a>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="uk-position-bottom-left uk-padding-small tz-theme-bg-color ap-price-wrap">
                                                                                            <div className="ap-price-box">
                                                                                                <span className="ap-field-label">Rental price</span>
                                                                                                <span className="ap-price ap-price-rental uk-display-inline-block">${latest.price}</span>

                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="ap-info-inner ap-info-top uk-flex uk-flex-middle uk-flex-between">
                                                                                        <div className="ap-title-info">
                                                                                            <h2 className="ap-title">
                                                                                                <a style={{ color: '#222222', fontSize: '16px', fontWeight: '700', fontFamily: 'Montserrat, Arial, Helvetica, sans-serif' }}>
                                                                                                    {latest.name}
                                                                                                </a>
                                                                                            </h2>
                                                                                        </div>

                                                                                    </div>

                                                                                </div>
                                                                                <div className="ap-info-inner ap-info-desc">
                                                                                    <p style={{ lineHeight: '1.7', fontSize: '16px', wordWrap: 'break-word', color: '#555555' }}>Rip-snorting engine, bonkers acceleration, handling agile enough to trick you into thinking it's a sports car.</p>
                                                                                </div>
                                                                                <div className="ap-info-inner ap-info-bottom" style={{ padding: '30px 11px 1px 1px' }}>
                                                                                    <div className="ap-specification ap-specification-style4 uk-child-width-1-3 uk-grid-collapse uk-grid">
                                                                                        <div className="ap-spec-item uk-flex uk-flex-column uk-first-column" style={{ padding: '10px 37px' }}>
                                                                                            <span className="ap-spec-value">
                                                                                                <span className="ap-style4-icon">
                                                                                                    <i className="far fa-registered"></i>
                                                                                                </span>
                                                                                                2015
                                                                                            </span>
                                                                                        </div>
                                                                                        <div className="ap-spec-item uk-flex uk-flex-column uk-first-column" style={{ padding: '10px 37px' }}>
                                                                                            <span className="ap-spec-value">
                                                                                                <span className="ap-style4-icon">
                                                                                                    <i className="far fa-registered"></i>
                                                                                                </span>
                                                                                                19400
                                                                                                <span className="custom-field-append">mi</span>
                                                                                            </span>
                                                                                        </div>
                                                                                        <div className="ap-spec-item uk-flex uk-flex-column uk-first-column" style={{ padding: '10px 42px' }}>
                                                                                            <span className="ap-spec-value">
                                                                                                <span className="ap-style4-icon">
                                                                                                    <i className="far fa-registered"></i>
                                                                                                </span>
                                                                                                Used

                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}


                                                                </Slider>
                                                                <div className="uk-slider-container">
                                                                    <div className="templaza-ap-archive uk-position-relative uk-slider-items uk-child-width-1-1 uk-grid-medium uk-child-width-1-3@l uk-child-width-1-3@m uk-child-width-1-2@s uk-grid" style={{ transform: 'translate3d(0px, 0px, 0px)', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>

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
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <div id="ap-product-modal__quickview" style={open ? { ...closepopup, ...popupContentStyle } : closepopup} className={`uk-modal-container uk-modal ${open == true ? 'uk-flex' : ''}  ${open == true ? 'uk-open' : ''}`}>
                <div className="uk-modal-dialog uk-flex uk-flex-center uk-flex-middle uk-margin-auto-vertical">
                    <button type="button" className="uk-modal-close-full uk-close-large uk-icon uk-close" onClick={handleOpen}>
                        <i class="fas fa-window-close" style={{ fontSize: '44px' }}></i>
                    </button>
                    <div className="uk-grid-collapse uk-width-1-1 uk-child-width-1-2@s uk-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                        <div className="ap-quickview-media uk-cover-container uk-first-column">
                            <a href="">
                                <img width={1200} height={800} className="attachment-full size-full wp-post-image" style={{ objectFit: 'cover' }} src="https://autoshowroom.templaza.net/wp-content/uploads/2022/10/erik-mclean-M0z9ajPI3PE-unsplash.jpg" alt="" />
                                <canvas width={600} height={400}></canvas>
                            </a>
                            <a href="" className="product-more-infor uk-background-muted uk-text-center uk-position-bottom" style={{ textDecoration: 'none' }}>
                                <span className="product-more-infor__text" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontSize: '15px', fontWeight: '500', color: '#fff' }}>
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
                                                <div className="field-value" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.0em ', color: '#555555' }}>
                                                    195        </div>
                                            </div>
                                            <div className="uk-grid-small uk-grid">
                                                <div className="uk-width-expand uk-leader uk-first-column">
                                                    <span className="uk-leader-fill" data-fill="..........................................................................................................">
                                                        Motor size
                                                    </span>
                                                </div>
                                                <div className="field-value" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.0em', color: '#555555' }}>
                                                    250        </div>
                                            </div>
                                            <div className="uk-grid-small uk-grid">
                                                <div className="uk-width-expand uk-leader uk-first-column">
                                                    <span className="uk-leader-fill" data-fill=".................................................................................................">
                                                        Fuel Type
                                                    </span>
                                                </div>
                                                <div className="field-value" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.0em', color: '#555555' }}>
                                                    Biodiesel      </div>
                                            </div>
                                            <div className="uk-grid-small uk-grid">
                                                <div className="uk-width-expand uk-leader uk-first-column">
                                                    <span className="uk-leader-fill" data-fill="......................................................................................">
                                                        Number of doors
                                                    </span>
                                                </div>
                                                <div className="field-value" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.0em', color: '#555555' }}>
                                                    4 Doors      </div>
                                            </div>
                                            <div className="uk-grid-small uk-grid">
                                                <div className="uk-width-expand uk-leader uk-first-column">
                                                    <span className="uk-leader-fill" data-fill=".......................................................................................................">
                                                        Drivetrain
                                                    </span>
                                                </div>
                                                <div className="field-value" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.0em', color: '#555555' }}>
                                                    4WD     </div>
                                            </div>
                                            <div className="uk-grid-small uk-grid">
                                                <div className="uk-width-expand uk-leader uk-first-column">
                                                    <span className="uk-leader-fill" data-fill=".......................................................................................................">
                                                        Engine
                                                    </span>
                                                </div>
                                                <div className="field-value" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.0em', color: '#555555' }}>
                                                    9     </div>
                                            </div>
                                            <div className="uk-grid-small uk-grid">
                                                <div className="uk-width-expand uk-leader uk-first-column">
                                                    <span className="uk-leader-fill" data-fill=".........................................................................................">
                                                        Transmission
                                                    </span>
                                                </div>
                                                <div className="field-value" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.0em', color: '#555555' }}>
                                                    Automatic    </div>
                                            </div>
                                            <div className="uk-grid-small uk-grid">
                                                <div className="uk-width-expand uk-leader uk-first-column">
                                                    <span className="uk-leader-fill" data-fill="...............................................................................................">
                                                        Interior Color
                                                    </span>
                                                </div>
                                                <div className="field-value" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.0em', color: '#555555' }}>
                                                    Black    </div>
                                            </div>
                                            <div className="uk-grid-small uk-grid">
                                                <div className="uk-width-expand uk-leader uk-first-column">
                                                    <span className="uk-leader-fill" data-fill=".......................................................................................................">
                                                        Exterior Color
                                                    </span>
                                                </div>
                                                <div className="field-value" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.0em', color: '#555555' }}>
                                                    Red   </div>
                                            </div>
                                            <div className="uk-grid-small uk-grid">
                                                <div className="uk-width-expand uk-leader uk-first-column">
                                                    <span className="uk-leader-fill" data-fill=".......................................................................................................">
                                                        Condition
                                                    </span>
                                                </div>
                                                <div className="field-value" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.0em', color: '#555555' }}>
                                                    new    </div>
                                            </div>
                                            <div className="uk-grid-small uk-grid">
                                                <div className="uk-width-expand uk-leader uk-first-column">
                                                    <span className="uk-leader-fill" data-fill=".......................................................................................................">
                                                        Mileage
                                                    </span>
                                                </div>
                                                <div className="field-value" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.0em', color: '#555555' }}>
                                                    25000  </div>
                                            </div>
                                            <div className="uk-grid-small uk-grid">
                                                <div className="uk-width-expand uk-leader uk-first-column">
                                                    <span className="uk-leader-fill" data-fill="..........................................................................................">
                                                        Registration Date
                                                    </span>
                                                </div>
                                                <div className="field-value" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.0em', color: '#555555' }}>
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
            {isPopupVisible && (
                <div id="popup" class="popup " style={IsClosingPopup ? { ...popupContentStyle, ...closepopup } : popupContentStyle}>
                    <div class="popup-content">
                        <span id="closeButton" class="close" onClick={handleClosepopup}>&times;</span>
                        <h2>Compare Car</h2>
                        <div class="product-container">
                            <table class="product-table">
                                <thead>
                                    <tr>
                                        <th>Feature</th>
                                        <th>{Car.name}</th>
                                        <th>{FromData.name}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Image</td>
                                        <td><img src={Car.picture.pictureLink} alt="" style={{ width: '50%' }} /></td>
                                        <td><img src={FromData.Image} style={{ width: '50%' }} alt="" /></td>
                                    </tr>
                                    <tr>
                                        <td>Price</td>
                                        <td>{Car.price}$</td>
                                        <td>{FromData.Price}$</td>
                                    </tr>
                                    <tr>
                                        <td>BHP</td>
                                        <td>{Car.bhp}</td>
                                        <td>{FromData.BHP}</td>
                                    </tr>
                                    <tr>
                                        <td>MotorSize</td>
                                        <td>{Car.motorSize}</td>
                                        <td>{FromData.motorSize}</td>
                                    </tr>
                                    <tr>
                                        <td>Fuetype</td>
                                        <td>{Car.fueType}</td>
                                        <td>{FromData.fueType}</td>
                                    </tr>
                                    <tr>
                                        <td>Engine</td>
                                        <td>{Car.engine}</td>
                                        <td>{FromData.engine}</td>
                                    </tr>
                                    <tr>
                                        <td>Number Seat</td>
                                        <td>{Car.numberSeat}</td>
                                        <td>{FromData.numberSeat}</td>
                                    </tr>
                                    <tr>
                                        <td>Condition</td>
                                        <td>{Car.condition}</td>
                                        <td>{FromData.condition}</td>
                                    </tr>
                                    <tr>
                                        <td>Mileage</td>
                                        <td>{Car.mileage} mil</td>
                                        <td>{FromData.mileage} mil</td>
                                    </tr>
                                    <tr>
                                        <td>Year Accept</td>
                                        <td>{Car.dateAccept}</td>
                                        <td>{FromData.dateAccept}</td>
                                    </tr>
                                    <tr>
                                        <td>Model</td>
                                        <td>{Car.model}</td>
                                        <td>{FromData.model}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
            <Footer/>
        </>

    )
}
export default DetailInventory;