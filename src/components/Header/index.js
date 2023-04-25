import { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdClose } from 'react-icons/md'
import { IoLogOutOutline } from 'react-icons/io5';
import { AuthContext } from '../../contexts/auth'; 
import './header.css';

export default function Header(){
    const [ showSidebar, setShowSidebar ] = useState(false);
    const { logout } = useContext(AuthContext);
    const path = ''

    async function handleLogout(){
      await logout();
    }

    function toggleSidebar(){
      if(!showSidebar){
        setShowSidebar(true);
      }else{
        setShowSidebar(false);
      }
    }


    return(       
      <header className='header' id='header'>
        <button onClick={toggleSidebar} className='btn-header'><GiHamburgerMenu/></button>
        <div className='logo'>
          Verity
        </div>
        <div className='navigation' id='navigation' style={{marginLeft: showSidebar ? '-10vw' : '-100vw', animationName: showSidebar ? 'showSidebar' : ''}}>
            <button className='btn-header' onClick={toggleSidebar}><MdClose/></button>
            <NavLink to={'/home'}  className={path === '/home' ? 'active' : 'link'}>Home</NavLink>
            <NavLink to={'/perfil'} className={path === '/perfil' ? 'active' : 'link'}>Perfil</NavLink>
            <NavLink to={'/learn'} className={path === '/learn' ? 'active' : 'link'}>Learn</NavLink>
            <button className='btn-logout' onClick={handleLogout}><IoLogOutOutline size='1.5em'/>Sair</button>
        </div>
      </header>
    )
}
