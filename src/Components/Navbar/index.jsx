import { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation, Link  } from 'react-router-dom'

import { 
    MdClose as CloseIcon
} from "react-icons/md";

import {
    AiOutlineShopping as BagIcon,
    AiOutlineUser as UserIcon
} from "react-icons/ai";

import {
    FiMenu as MenuIcon
} from "react-icons/fi"


import Cart from './Cart'
import SearchItems from './SearchItems'
import Menu from './Menu';
import './navbar.css'

import { CartContext } from '../../Context/cart';

const Navbar = () => {
    const [backgroundDisplay, setBackgroundDisplay] = useState({opacity: 0, zIndex: -1});
    const [menuDisplay, setMenuDisplay] = useState({height: 0, width: 0, opacity: 0, zIndex: -1});
    
    const {bagItemsCount, bagDisplay, setBagDisplay} = useContext(CartContext);

    const displayBag = () => {
        setBagDisplay(!bagDisplay)
    }

    const displayMenu = () => {
        setMenuDisplay({opacity: 1, zIndex: 99})
    }

    useEffect(() => {
        setBackgroundDisplay(!bagDisplay)
    }, [bagDisplay]);

    /* Não apresentar a navbar na tela de checkou e login */
    const { pathname } = useLocation();
    if (pathname === "/login" || pathname === "/checkout") {
        return (
            <header className='navbar' style={{justifyContent: 'space-evenly'}}>
                <NavLink to="/home"  className='navbar__logo'>
                    <img src="/assets/Logos/Logo_Black_Transparencia.png" alt="IMA logo" />
                </NavLink >
                <h2>IMPÉRIO DA MODA AMERICANA</h2>
            </header>
        )
    }
    
    return (
        <>
            <header className='navbar'>
                <NavLink to="/home"  className='navbar__logo'>
                    <img src="/assets/Logos/Logo_Black_Transparencia.png" alt="IMA logo" />
                </NavLink >

                <SearchItems />

                <div className='navbar__menu'>
                    <button className='navbar__menu__button menu__button__bag navbar__desktop' onClick={displayBag}>
                        <BagIcon className='navbar__button__icon'/>
                        {bagItemsCount ? <span className='bag__items-count'>{bagItemsCount}</span> : null}
                    </button>

                    <Link to="/account" style={{textDecoration: 'none'}} className='navbar__menu__button menu__button__account navbar__desktop'>
                        <UserIcon className='navbar__button__icon'/>
                    </Link>

                    <button className='navbar__menu__button menu__button__mobile' onClick={displayMenu}>
                        <MenuIcon className='navbar__button__icon'/>
                    </button>
                </div>

                <div className='navbar__pages navbar__desktop'>
                    <NavLink to="/home" className="navbar__pages__link">INÍCIO</NavLink>
                    <NavLink to="/home/Masculino" className="navbar__pages__link">MASCULINO</NavLink>
                    <NavLink to="/home/Feminino" className="navbar__pages__link">FEMININO</NavLink>
                    <NavLink to="/home/Moletom" className="navbar__pages__link">MOLETONS</NavLink>
                    <NavLink to="/home/Promoção" className="navbar__pages__link">PROMOÇÕES</NavLink>
                </div>
    
                <section 
                    className='background_hover' 
                    onClick={displayBag}
                    style={backgroundDisplay ? ({opacity: 0, zIndex: -1}) : ({opacity: 1, zIndex: 998})}>
                </section>

                <div className='cart__box' style={bagDisplay ? {right: '15px'} : {right: '-400px'}}>
                    <div className='cart_header'>
                        <button onClick={displayBag}  className='cart__button'>
                            <CloseIcon className='close__icon'/>
                        </button>

                        <p>SACOLA {bagItemsCount ? `( ${bagItemsCount} )`: ''}</p>
                    </div>
                    
                    <Cart />  
                </div>

                <div className='menu__box' style={menuDisplay}>
                   <Menu setMenuDisplay={setMenuDisplay} displayBag={displayBag} />
                </div>

            </header>
        </>
    )
}

export default Navbar