import React, { useEffect, useState } from "react";
import './Menu.css'
import { useNavigate } from "react-router-dom";
function Menu() {
    const [Active, setActive] = useState(false);
    const ShowOpen = () => {
        setActive(!Active)
    }
    const navigate = useNavigate();
    const isInventoryPage = window.location.href === 'http://localhost:3000/Inventory';
    const isContactPage=window.location.href==='http://localhost:3000/contact';
        const isAboutpage=window.location.href==='http://localhost:3000/AboutUs';
    const [backgroundColor,setbackgroundColor]=useState('transparent');
    const [color,setcolor]=useState('#fff')
    useEffect(() => {
       
        const isInventoryPage = window.location.href === 'http://localhost:3000/Inventory';

        const isContactPage=window.location.href==='http://localhost:3000/contact';
        const isAboutpage=window.location.href==='http://localhost:3000/AboutUs';
     
    }, []);
    useEffect(() => {
        const handleScroll = () => {
            // Lấy chiều cao của cửa sổ trình duyệt
            const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            // Lấy chiều cao của toàn bộ tài liệu
            const documentHeight = document.body.scrollHeight;
            // Lấy vị trí cuộn hiện tại của trang
            const scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

            // Tính toán phần trăm cuộn
            const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;
        
            // Kiểm tra nếu phần trăm cuộn lớn hơn hoặc bằng 30%, đặt màu nền là #fff, ngược lại đặt là transparent
            if (scrollPercentage >= 1) {
                setbackgroundColor('#fff');
                setcolor('#222222')
            } else if(scrollPercentage<30) {
                setbackgroundColor('transparent');
                setcolor('white')
            }else{
                setbackgroundColor('#fff');
                setcolor('#222222')
            }
        };

        // Gắn sự kiện cuộn
        window.addEventListener('scroll', handleScroll);

        // Xóa sự kiện khi component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const customStyle = isInventoryPage ? { backgroundColor: '#fff' } : {};
    return (
        <>
            <section id="templaza-section-1715287020348770" className=" templaza-header-section header-absolute templaza-section tz_custom_1715287020348770">
                <div className="uk-container uk-container-large ">
                    <div id="templaza-row-1715287020348901" className="templaza-row tz_custom_1715287020348901 uk-container uk-container-large uk-padding-remove-horizontal">
                        <div className="uk-grid uk-grid-row-collapse uk-grid-stack">
                            <div id="templaza-column-1715287020349039" className="templaza-column tz_custom_1715287020349039 uk-width-1-1@l uk-width-1-1 uk-first-column">
                                <div id="templaza-header-1715287020349175" className="templaza-header tz_custom_1715287020349175 templaza-header__autoshowroom-header-absolute">
                                    <header className="templaza-header templaza-horizontal-header templaza-horizontal-right-header megamenu-trigger-hover">
                                        <div className="uk-flex uk-flex-row uk-flex-between header-show-icon">
                                            <div className="uk-flex uk-hidden@m uk-flex-left uk-flex-middle">
                                                <div className="header-mobilemenu-trigger burger-menu-button">
                                                    <button className="button">
                                                        <span className="box"></span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </header> 
                                    <div id="templaza-sticky-header" className="templaza-header templaza-header-sticky header-sticky-desktop header-static-mobile header-static-tablet tz-sticky" style={{backgroundColor}}>
                                        <div className="templaza-sticky-inner megamenu-trigger-hover">
                                            <div className="uk-width uk-flex uk-flex-row uk-flex-between uk-flex-middle">
                                                <div className="uk-flex uk-flex-left uk-hidden@m uk-flex-middle">
                                                    <div className="header-mobilemenu-trigger burger-menu-button uk-hidden@m">
                                                        <button className="button">
                                                            <span className="box">
                                                                <span className="inner"></span>
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="header-left-section uk-flex uk-flex-between uk-flex-middle">
                                                    <a onClick={()=>navigate('/')} className="logo-text templaza-logo templaza-logo-image uk-flex uk-flex-middle mr-0 mr-lg-4">
                                                        {/* <img src="https://autoshowroom.templaza.net/wp-content/uploads/2022/08/Auto-Showroom-White.svg" alt="" /> */}
                                                        car <b className="logo-sub">zone</b>
                                                    </a>
                                                </div>
                                                <div className="header-right-section uk-flex uk-flex-right uk-flex-middle">
                                                    <div className="templaza-nav-wraper uk-visible@m px-2 uk-margin-auto-left">
                                                        <ul id="menu-main-menu-1" className="nav navbar-nav templaza-nav uk-flex uk-visible@m fade-down">
                                                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-ancestor current-menu-parent current_page_parent current_page_ancestor menu-item-has-children menu-item-11244">
                                                                <a onClick={()=>navigate('/')} style={{color}} className="megamenu-item-link item-level-1 has-children cursor-pointer">
                                                                    <span className="megamenu-title">Home</span>
                                                      
                                                                </a>
                                                            </li>
                                                            
                                                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-ancestor current-menu-parent current_page_parent current_page_ancestor menu-item-has-children menu-item-11244">
                                                                <a style={{color}} onClick={()=>navigate("/Inventory")} className="megamenu-item-link item-level-1 has-children cursor-pointer">
                                                                    <span className="megamenu-title">Inventory</span>
                                                                 
                                                                </a>
                                                            </li>
                                                      
                                                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-ancestor current-menu-parent current_page_parent current_page_ancestor menu-item-has-children menu-item-11244">
                                                                <a style={{color}} onClick={()=>navigate('/contact')} className="megamenu-item-link item-level-1 has-children cursor-pointer">
                                                                    <span className="megamenu-title">Contact</span>

                                                                </a>
                                                            </li>
                                                            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-ancestor current-menu-parent current_page_parent current_page_ancestor menu-item-has-children menu-item-11244">
                                                                <a style={{color}} onClick={()=>navigate('/AboutUs')} className="megamenu-item-link item-level-1 has-children cursor-pointer">
                                                                    <span className="megamenu-title">About</span>

                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="header-icon-wrap uk-flex ">
                                                        <div className="header-search uk-position-relative header-icon" >
                                                            <span>
                                                                <i className="fas fa-search" onClick={ShowOpen}></i>
                                                            </span>
                                                            {Active == true && (
                                                                <form className="searchform active">
                                                                    <input type="text" className="field uk-input inputbox search-query uk-margin-remove-vertical" placeholder="Search...." />
                                                                    <button className="submit searchsubmit has-button-icon uk-position-right uk-icon">
                                                                        <i class="fas fa-search"></i>
                                                                    </button>

                                                                </form>
                                                            )}

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
        </>
    )
}
export default Menu;