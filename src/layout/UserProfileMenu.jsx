// User profile menu dropdown for header menus (small/large) 
import React from 'react';
import './Header.css';
import { useModalContext } from '../components/contexts/ToggleModalContext';
import { useAuthContext } from '../components/contexts/AuthenticationContext';
import useLogout from '../components/hooks/useLogout';
import { UserIcon, MailIcon, LogoutIcon }  from '../components/SVG/Icons';
import { cropStringToLength, generateDateString } from '../helper/utilities';

export default function UserProfileMenu(props) {
  // PROPS
  const { cropTextLength=25 } = props; // max allowed text char-s to be displayed, then crop 
  // CONTEXT 
  const { toggleDropdownHandler } = useModalContext();
  const { auth } = useAuthContext();
  // HOOK
  const logoutUserHandler = useLogout();
  // DATA STORAGE 
  // User profile menu info data
  const userProfileInfoData = [
    {
      name: 'username',
      value: auth?.username,
      icon: <UserIcon width='20px' height='20px' stroke='var(--text-color--high-emphasis)'/> ,  
    }, {
      name: 'email',
      value: auth?.email,
      icon: <MailIcon width='20px' height='20px' fill='var(--text-color--high-emphasis)'/> ,
    }, {
      name: 'account created',
      value: generateDateString(auth?.createdAt),
    }

  ]
  // user profile menu selectable options: logout,
  const userProfileOptionsData = [
    {
      name: 'logout',
      value: 'Logout',
      icon: <LogoutIcon width='20px' height='20px' stroke='var(--text-color--high-emphasis)' />,
      clicked: () => { // user can interact with it
        logoutUserHandler();
        toggleDropdownHandler(false); 
      }
    }, 
  ] 
  
  // RENDERED ELEMENTS
  // Display user profile info
  const userProfileInfo = (
    <div className='user-profile-menu-info-container'>
      { userProfileInfoData.map(info => (
        <div 
          key={ info.name } 
          title={ info.name } 
          onClick={ ()=> { window.alert(`${ info.name }: ${ info.value }`) } }
          className='user-profile-menu-item user-profile-menu-item--info'
        >
          <div className='user-profile-menu-item-icon'> 
            { info.icon }   
          </div>
          <div className='user-profile-menu-item-text'>
            <span> 
              { info.value && `${!info.icon ? info.name + ': ' : '' } ${ cropStringToLength(info.value, cropTextLength) }`} 
            </span>
          </div>
        </div> )) 
      }
    </div>
  )
  
  // Display user profile options
  const userProfileOptions = userProfileOptionsData.map(info => (
    <div 
      key={ info.name } 
      title={ info.name }
      className='user-profile-menu-item user-profile-menu-item--option'
      onClick={ info.clicked }
    >
      <div className='user-profile-menu-item-icon'> 
        { info.icon && info.icon }  
      </div> 
      <div className='user-profile-menu-item-text'>
        <span> { info.value && cropStringToLength(info.value, cropTextLength) } </span>
      </div>
    </div>
  ))

  return (
    <>
      { /* Backdrop */ }
      <div 
        className='header-backdrop' 
        onClick={ () => toggleDropdownHandler() }
      > </div> 
      {/* Dropdown menu */}
      <div 
        className='header-profile-menu-container'
        onClick={ e => e.stopPropagation() }
      >
        { /* menu info items */ }
        { userProfileInfo }
        { /* menu option item(s) */ }
        { userProfileOptions }
      </div>
    </>
  )
}