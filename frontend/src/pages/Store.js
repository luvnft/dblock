import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Feedback from './Feedback';
import CompilerNavbar from '../components/CompilerNavbar';
import ProductBox from '../components/ProductBox';
import { CartIcon, CoinIcon, FreeCanvaPremiumBanner, UnlimitedUdemyCourses, HeartIcon, HoodyBanner, IPadBanner, JBLHeadsetBanner, LogitechGamingMouseBanner, MechanicalKeyboardBanner, MousePadBanner, SearchIcon, StoreProfileImage } from '../assets/export';
import '../assets/styles/store.css';

const Store = ({ showFeedbackModal, setShowFeedbackModal, isFeedbackRendered, setIsFeedbackRendered, currentUser, isNewUser, claimFirstRewardModalOpen, setClaimFirstRewardModalOpen }) => {
    const [filterMaxPrice, setFilterMaxPrice] = useState(5);
    const [productDetails, setProductDetails] = useState([
        {
            name: 'iPad',
            image: IPadBanner,
            price: '70000',
            isWishlisted: false,
            link: '',
            category: 'electronics',
        },
        {
            name: 'Free Premium Courses',
            image: UnlimitedUdemyCourses,
            price: '10',
            isWishlisted: false,
            link: 'https://t.me/Coursevania',
            category: 'vouchers',
        },
        {
            name: 'FREE CANVA PREMIUM',
            image: FreeCanvaPremiumBanner,
            price: '50',
            isWishlisted: false,
            link: "https://www.canva.com/en_in/signup/?brandAccessToken=sNDIB9s7lmepJscYXfTeXg&invitationToken=sNDIB9s7lmepJscYXfTeXg&signupRedirect=%2Fbrand%2Fjoin%3Ftoken%3DsNDIB9s7lmepJscYXfTeXg%26referrer%3Dteam-invite&loginRedirect=%2Fbrand%2Fjoin%3Ftoken%3DsNDIB9s7lmepJscYXfTeXg%26referrer%3Dteam-invite",
            category: 'software',
        },
        {
            name: 'Logitech Gaming Mouse',
            image: LogitechGamingMouseBanner,
            price: '10000',
            isWishlisted: false,
            link: '',
            category: 'tech',
        },
        {
            name: 'Mechanical KeyBoard',
            image: MechanicalKeyboardBanner,
            price: '25000',
            isWishlisted: false,
            link: '',
            category: 'tech',
        },
        {
            name: 'Mouse pad',
            image: MousePadBanner,
            price: '15000',
            isWishlisted: false,
            link: '',
            category: 'tech',
        },
        {
            name: 'JBL Headset',
            image: JBLHeadsetBanner,
            price: '20000',
            isWishlisted: false,
            link: '',
            category: 'tech',
        },
        {
            name: 'Hoody',
            image: HoodyBanner,
            price: '3000',
            isWishlisted: false,
            link: '',
            category: 'merchandise',
        },
    ]);
    const [modalOpen, setModalOpen] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState(productDetails);
    const [filterDetails, setFilterDetails] = useState({ category: 'all' });

    const handleMouseLeave = () => {
        if (isFeedbackRendered === false && currentUser) {
            setIsFeedbackRendered(true);
            setTimeout(() => {
                setShowFeedbackModal(true);
            }, 10000);
        }
    }

    const handleFilter = () => {
        if (filterDetails.category !== 'all') {
            const updatedProducts = productDetails.filter((item) => item.category === filterDetails.category);
            setFilteredProducts(updatedProducts);
        }
        else {
            setFilteredProducts(productDetails);
        }
    }

    useEffect(() => {
        if (isNewUser && !claimFirstRewardModalOpen) {
            setTimeout(() => {
                setModalOpen(true);
                setClaimFirstRewardModalOpen(true);
            }, 2000);
        }
    }, [])

    return (
        <div className="store-container-wrapper">
            {showFeedbackModal && <Feedback setShowFeedbackModal={setShowFeedbackModal} />}

            <CompilerNavbar handleMouseLeave={handleMouseLeave} />
            <div className="store-container">
                {modalOpen && <div className="store-container-overlay"></div>}

                <div className="store-container-left">
                    <h2 className="store-container-left-title">Filter:</h2>

                    <div className="store-container-left-filter">
                        <h2 className="store-container-left-filter-heading">Category</h2>
                        <div className="store-container-left-filter-main">
                            <div className="store-container-left-filter-main-box">
                                <input type="radio" name="category" id="all" defaultChecked={true} onChange={() => setFilterDetails({ ...filterDetails, category: 'all' })} />
                                <label htmlFor="all">All</label>
                            </div>
                            <div className="store-container-left-filter-main-box">
                                <input type="radio" name="category" id="electronics" onChange={() => setFilterDetails({ ...filterDetails, category: 'electronics' })} />
                                <label htmlFor="electronics">Electronics & Gadgets</label>
                            </div>
                            <div className="store-container-left-filter-main-box">
                                <input type="radio" name="category" id="software" onChange={() => setFilterDetails({ ...filterDetails, category: 'software' })} />
                                <label htmlFor="software">Software & Tools</label>
                            </div>
                            <div className="store-container-left-filter-main-box">
                                <input type="radio" name="category" id="tech" onChange={() => setFilterDetails({ ...filterDetails, category: 'tech' })} />
                                <label htmlFor="tech">Tech Apparel & Accessories</label>
                            </div>
                            <div className="store-container-left-filter-main-box">
                                <input type="radio" name="category" id="merchandise" onChange={() => setFilterDetails({ ...filterDetails, category: 'merchandise' })} />
                                <label htmlFor="merchandise">Collectibles & Merchandise</label>
                            </div>
                            <div className="store-container-left-filter-main-box">
                                <input type="radio" name="category" id="vouchers" onChange={() => setFilterDetails({ ...filterDetails, category: 'vouchers' })} />
                                <label htmlFor="vouchers">Vouchers</label>
                            </div>
                        </div>
                    </div>

                    <div className="store-container-left-filter">
                        <h2 className="store-container-left-filter-heading">Brands</h2>
                        <div className="store-container-left-filter-main">
                            <div className="store-container-left-filter-main-box">
                                <input type="checkbox" name="brands" id="nike" />
                                <label htmlFor="nike">Nike</label>
                            </div>
                            <div className="store-container-left-filter-main-box">
                                <input type="checkbox" name="brands" id="apple" />
                                <label htmlFor="apple">Apple</label>
                            </div>
                            <div className="store-container-left-filter-main-box">
                                <input type="checkbox" name="brands" id="samsung" />
                                <label htmlFor="samsung">Samsung</label>
                            </div>
                            <div className="store-container-left-filter-main-box">
                                <input type="checkbox" name="brands" id="adidas" />
                                <label htmlFor="adidas">Adidas</label>
                            </div>
                            <div className="store-container-left-filter-main-box">
                                <input type="checkbox" name="brands" id="sony" />
                                <label htmlFor="sony">Sony</label>
                            </div>
                        </div>
                    </div>

                    <div className="store-container-left-filter">
                        <h2 className="store-container-left-filter-heading">Filter by Price</h2>
                        <input type="range" name="price" id="price" min={0} max={10} step={0.5} defaultValue={filterMaxPrice} onChange={(e) => setFilterMaxPrice(e.target.value)} />
                        <div className="store-container-left-filter-range">
                            <div className="store-container-left-filter-range-box">0</div>
                            <div className="store-container-left-filter-range-box">{`${filterMaxPrice}k`}</div>
                        </div>
                    </div>

                    <div className="store-container-left-btn" onClick={handleFilter}>Filter</div>
                </div>

                <div className="store-container-right">
                    <div className="store-container-right-top">
                        <div className="store-container-right-top-left">
                            <img src={CoinIcon} alt="Coin-Icon" className="store-container-right-top-left-icon" />
                            <p className="store-container-right-top-left-text">USE DC-Credits</p>
                        </div>

                        <div className="store-container-right-top-right">
                            <div className="store-container-right-top-right-search">
                                <input type="text" placeholder='What are you looking for?' />
                                <img src={SearchIcon} alt="Search-Icon" />
                            </div>

                            <div className="store-container-right-top-right-features">
                                <img src={HeartIcon} alt="Heart-Icon" className="store-container-right-top-right-features-icon" />
                                <img src={CartIcon} alt="Cart-Icon" className="store-container-right-top-right-features-icon" />
                                <img src={StoreProfileImage} alt="Profile-Icon" className="store-container-right-top-right-features-profile-icon" />
                            </div>
                        </div>
                    </div>

                    <div className="store-container-right-middle">
                        <h2 className="store-container-right-middle-heading">HOT PRODUCTS</h2>

                        <div className="store-container-right-middle-main">
                            {filteredProducts.map((item, index) => (
                                <ProductBox link={item.link} name={item.name} image={item.image} price={item.price} isWishlisted={item.isWishlisted} index={index} productDetails={productDetails} setProductDetails={setProductDetails} claimFirstRewardModalOpen={modalOpen} setClaimFirstRewardModalOpen={setModalOpen} setModalOpen={setModalOpen} key={index} />
                            ))}
                        </div>
                    </div>

                    <div className="store-container-right-bottom">
                        <div className="store-container-right-bottom-box">
                            <p className="store-container-right-bottom-box-text">Copyright © 2024 DcodeBlock</p>
                        </div>

                        <div className="store-container-right-bottom-box">
                            <NavLink className="store-container-right-bottom-box-text">Help Center</NavLink>
                            <div className="store-container-right-bottom-box-divider"></div>
                            <NavLink className="store-container-right-bottom-box-text">Terms and Conditions</NavLink>
                            <div className="store-container-right-bottom-box-divider"></div>
                            <NavLink className="store-container-right-bottom-box-text">Privacy Policy</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Store;