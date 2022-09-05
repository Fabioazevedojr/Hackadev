import { useContext, useEffect } from 'react';
import { NavLink, Link  } from 'react-router-dom'

import { UserContext } from '../../../Context/user';
import { CartContext } from '../../../Context/cart';

import './menu.css';

import { 
  MdClose as CloseIcon
} from "react-icons/md";

import {
    AiOutlineShopping as BagIcon,
    AiOutlineUser as UserIcon
} from "react-icons/ai";

import {
  GiClothes as ClothesIcons
} from "react-icons/gi"

const Menu = ({setMenuDisplay, displayBag}) => {
  const {isLoggedIn, user} = useContext(UserContext);
  const {bagItemsCount} = useContext(CartContext);

  /* useEffect responsavel por atribuir a função de remover o menu ao onClick a todos os filhos da classe menu */
  useEffect(() => {
    var childs = document.getElementsByClassName('close_menu');
    for (var i = 0; i < childs?.length; i++) {
      childs[i].onclick = function () {
          setMenuDisplay({height: 0, width: 0, opacity: 0, zIndex: -1});
      }
    }
  });

  return (
    <aside className='menu'>
       <button className='cart__button close_menu'>
            <CloseIcon className='close__icon'/>
        </button>
        
        <div className='menu__buttons'>
            <button className='menu__button close_menu' onClick={displayBag} >
                <BagIcon className='menu__icon'/>
                <p>
                    Sacola
                    {bagItemsCount ? <span style={{color: 'var(--MetallicRed)'}}> {bagItemsCount} items</span> : null}
                </p>
            </button>

            <Link to="/account" style={{textDecoration: 'none'}} className='menu__button close_menu'>
                <UserIcon className='menu__icon'/>
                {isLoggedIn ? user.nome.split(' ')[0] : 'Logar ou Registrar'}
            </Link>
        </div>

        <div className='menu__topics__title'>
            <hr />
            <h3><ClothesIcons />Topicos<ClothesIcons /></h3>
        </div>

        <NavLink to="/home/Masculino" className="menu__link close_menu">MASCULINO</NavLink>
        <NavLink to="/home/Feminino" className="menu__link close_menu">FEMININO</NavLink>
        <NavLink to="/home/Moletom" className="menu__link close_menu">MOLETONS</NavLink>
        <NavLink to="/home/Promoção" className="menu__link close_menu">PROMOÇÕES</NavLink>       
    </aside>
  );
}

export default Menu