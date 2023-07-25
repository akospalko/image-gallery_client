// STATUS MESSAGES
// TODO: merge with data statusMesages.jsx 
export const statusMessages = {
  // DEFAULT
  EMPTY: '',
  // AXIOS
  AXIOS_NO_SERVER_RESPONSE: 'No server response',
}
// NAVIGATION 
// navigation elements visible for unauthenticated users
export const navElementsUnauthenticated = [
  {
    id: 0,
    name: 'home',
    path: '/'
  }, {
    id: 1,
    name: 'about',
    path: '/about'
  }
]
// navigation elements visible for authenticated users with 'user' role
export const navElementsUser = [
  {
    id: 0,
    name: 'home',
    path: '/'
  }, {
    id: 1,
    name: 'about',
    path: '/about'
  }, {
    id: 2,
    name: 'gallery',
    path: function(username) { return `${ username }/gallery` }
  }, { 
    id: 3,
    name: 'collection',
    path: function(username) { return `${ username }/collection` }
  }, {
    id: 4,
    name: 'map overview',
    path: function(username) { return `${ username }/mapoverview` }
  }
]
// navigation elements visible for authenticated users with 'admin' role
export const navElementsAdmin = [
  {
    id: 0,
    name: 'about',
    path: '/about'
  }, {
    id: 1,
    name: 'home',
    path: '/admin/home'
  }, {
    id: 2,
    name: 'gallery',
    path: function(username) { return `/admin/${ username }/gallery`}
  }, {
    id: 3,
    name: 'map overview',
    path: '/admin/mapoverview'
  }
]
export const profileNavElements = [
  {
    id: 0,
    name: 'settings',
    path: '/settings'
  },
  // {
  //   id: 1,
  //   name: 'log out',
  //   // path: '/settings'
  // }
]

export const COLLECTIONS = {
  HOME: 'home', 
  GALLERY: 'gallery'
}

// title for each modal
export const MODAL_TITLES = {
  FULLSCREEN_VIEW: 'View',
  MAP_VIEW: 'Map',
  PHOTO_INFO_VIEW: 'Info',
  CREATE_PHOTO:'Create Photo Entry',
  UPDATE_PHOTO:'Update Photo Entry',

}

// operation constants 
export const OPERATIONS = {
  // PHOTO ENTRY
  FULLSCREEN_VIEW: 'FULLSCREEN_VIEW',
  MAP_VIEW: 'MAP_VIEW',
  PHOTO_INFO_VIEW: 'PHOTO_INFO_VIEW',
  CREATE_PHOTO:'CREATE_PHOTO',
  UPDATE_PHOTO:'UPDATE_PHOTO',
  // AUTH
  REGISTER: 'REGISTER',
  LOGIN: 'LOGIN',
  PASSWORD_RESET_SEND_EMAIL_LINK: 'PASSWORD_RESET_SEND_EMAIL_LINK',
  PASSWORD_RESET_SAVE_NEW_PASSWORD: 'PASSWORD_RESET_SAVE_NEW_PASSWORD',
  // NAV
  HEADER_AUTH: 'HEADER_AUTH',
  HEADER_NAV: 'HEADER_NAV'
}

// LOADER STATE INTIIALIZER
export const LOADER = {
  PHOTO_ENTRY_MODAL: false, // full pg loader, when opening modal (when opening update photo entry modal)
  PHOTO_ENTRY_SUBMIT: false, // display loader inside the submit button
  PHOTO_ENTRY_EDIT: {}, // edit photo entry button loader 
  PHOTO_ENTRY_DELETE: {}, // delete photo entry button loader 
  PHOTO_ENTRY_LIKE: {}, // { photoID1: false, photoID2: true } - loader state of photo entry like toggle
  PHOTO_ENTRY_COLLECTION: {}, // add/remove photo item to/from collection
  PHOTO_ENTRY_DOWNLOAD: {}, // download photo 
  MAP_FETCH_DATA: false, // loader shown in map box while fetching data / switching content
  BACKGROUND: true // show loader while svg background is being loaded   
}