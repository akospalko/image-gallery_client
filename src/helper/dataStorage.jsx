// FORM INITIALIZERS
export const createPhoto = {
  title: {
    type: 'text',
    placeholder: 'title',
    value: '',
    label: 'Title',
    required: true,
    minLength: 5,
    maxLength: 50
  },
  author: {
    type: 'text',
    placeholder: 'author',
    value: '',
    label: 'Author',
    required: true,
    minLength: 4,
    maxLength: 50
  },
  gpsLatitude: {
    type: 'number',
    placeholder: 'latitude coordinate of the photo',
    value: '',
    label: 'GPS latitude'
  },
  gpsLongitude: {
    type: 'number',
    placeholder: 'longitude coordinate of the photo',
    value: '',
    label: 'GPS longitude'
  },
  captureDate: {
    type: 'date',
    placeholder: 'capture date',
    value: '',
    label: 'Capture date'
  },
  description: {
    type: 'textarea',
    placeholder: 'description',
    value: '',
    label: 'Description',
    maxLength: 500
  },
  photoFile: {
    type: 'file',
    value: {},
    // label: ''
    // required: true
  }
}
export const updatePhoto = {
  _id : {
    type: 'text',
    placeholder: 'photo entry id',
    value: '',
    disabled: true,
    label: 'ID'
  },
  photoName: {
    type: 'text',
    placeholder: 'file name',
    value: '',
    disabled: true,
    label: 'File name'
  },
  title: {
    type: 'text',
    placeholder: 'title',
    value: '',
    label: 'Title',
    required: true,
    minLength: 5,
    maxLength: 50
  },
  author: {
    type: 'text',
    placeholder: 'author',
    value: '',
    label: 'Author',
    required: true,
    minLength: 4,
    maxLength: 50
  },
  gpsLatitude: {
    type: 'number',
    placeholder: 'latitude coordinate of the photo',
    value: '',
    label: 'GPS latitude'
  },
  gpsLongitude: {
    type: 'number',
    placeholder: 'latitude coordinate of the photo',
    value: '',
    label: 'GPS longitude'
  },
  captureDate: {
    type: 'date',
    placeholder: 'capture date',
    value: '',
    label: 'Capture date'
  },
  description: {
    type: 'textarea',
    placeholder: 'description',
    value: '',
    label: 'Description',
    maxLength: 500
  },
  photoFile: {
    type: 'file',
    value: {},
    // label: ''
  }
}
// AUTHENTICATION
export const login = {
  username: {
    type: 'text',
    placeholder: 'Username',
    value: 'akos',
    label: 'Username',
    required: true,
    fieldName: 'usernameLogin'
    // touched: false???
  },
  password: {
    type: 'password',
    placeholder: 'Password',
    value: '1',
    label: 'Password',
    required: true,
    minLength: 8,
    fieldName: 'passwordLogin'
  }
}
export const register = {
  username: {
    type: 'text',
    placeholder: 'Username',
    value: '',
    label: 'Username',
    required: true,
    minLength: 4,
    fieldName: 'usernameRegister'
  },
  email: {
    type: 'email',
    placeholder: 'Email',
    value: '',
    label: 'E-mail',
    required: true
  },
  password: {
    type: 'password',
    placeholder: 'Password',
    value: '',
    label: 'Password',
    required: true,
    minLength: 8,
    fieldName: 'passwordRegister'
  },
  passwordConfirm: {
    type: 'password',
    placeholder: 'Password Confirm',
    value: '',
    label: 'Password',
    required: true,
    minLength: 8,
    fieldName: 'passwordConfirmRegister'
  }
}
// form to get email where the password reset link is to be sent
export const passwordResetSendEmailLink = {
  email: {
    type: 'email',
    placeholder: 'Email',
    value: '',
    label: 'E-mail',
    required: true
  }
}
// form to get new password which are to be saved as the new password for the account
export const passwordResetSaveNewPassword = {
  email: {
    type: 'email',
    placeholder: 'Email',
    value: '',
    label: 'E-mail',
    required: true
  },
  password: {
    type: 'password',
    placeholder: 'Password',
    value: '',
    label: 'Password',
    required: true
  },
  passwordConfirm: {
    type: 'password',
    placeholder: 'Password Confirm',
    value: '',
    label: 'Password',
    required: true
  }
}
// STATUS MESSAGES

export const statusMessages = {
  // DEFAULT
  EMPTY: '',
  // FILE UPLOAD
  FILE_UPLOAD_INITIAL: function(fileSize) { return `JPEG or PNG up to ${fileSize} MB in size` },
  FILE_UPLOAD_EXTENSION_ERROR: 'Not supported file extension! (only PNG or JPEG)',
  FILE_UPLOAD_MAX_SIZE_ERROR: function(fileSize) { return `Maximum file size is ${fileSize} MB!`},
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
    name: 'info',
    path: '/info'
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
    name: 'gallery',
    path: function(username) { return `${username}/gallery`}
  }, {
    id: 2,
    name: 'map overview',
    path: '/mapoverview'
  }
]
// navigation elements visible for authenticated users with 'admin' role
export const navElementsAdmin = [
  {
    id: 0,
    name: 'home',
    path: '/admin/home'
  }, {
    id: 1,
    name: 'gallery',
    path: function(username) { return `/admin/${username}/gallery`}
  }, {
    id: 2,
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
  //...
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
  MAP_FETCH_DATA: false // loader shown in map box while fetching data / switching content
}