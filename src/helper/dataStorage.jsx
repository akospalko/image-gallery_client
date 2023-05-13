// FORM INITIALIZERS
export const createPhoto = {
  title: {
    type: 'text',
    field: 'input', // custom type used for conditional rendering of input fields
    placeholder: 'title',
    value: '',
    label: 'Title'
  },
  author: {
    type: 'text',
    field: 'input',
    placeholder: 'author',
    value: '',
    label: 'Author'
  },
  gpsLatitude: {
    type: 'number',
    field: 'input',
    placeholder: 'latitude coordinate of the photo',
    value: '',
    label: 'GPS latitude'
  },
  gpsLongitude: {
    type: 'number',
    field: 'input',
    placeholder: 'longitude coordinate of the photo',
    value: '',
    label: 'GPS longitude'
  },
  captureDate: {
    type: 'date',
    field: 'date',
    placeholder: 'capture date',
    value: '',
    label: 'Capture date'
  },
  description: {
    field: 'textarea',
    placeholder: 'description',
    value: '',
    label: 'Description'
  },
  photoFile: {
    type: 'file',
    field: 'file',
    value: {},
    // label: ''
  }
}
export const updatePhoto = {
  _id : {
    type: 'text',
    field: 'input',
    placeholder: 'photo entry id',
    value: '',
    disabled: true,
    label: 'ID'
  },
  photoName: {
    type: 'text',
    field: 'input',
    placeholder: 'file name',
    value: '',
    disabled: true,
    label: 'File name'
  },
  title: {
    type: 'text',
    field: 'input',
    placeholder: 'title',
    value: '',
    label: 'Title'
  },
  author: {
    type: 'text',
    field: 'input',
    placeholder: 'author',
    value: '',
    label: 'Author'
  },
  gpsLatitude: {
    type: 'number',
    field: 'input',
    placeholder: 'latitude coordinate of the photo',
    value: '',
    label: 'GPS latitude'
  },
  gpsLongitude: {
    type: 'number',
    field: 'input',
    placeholder: 'latitude coordinate of the photo',
    value: '',
    label: 'GPS longitude'
  },
  captureDate: {
    type: 'date',
    field: 'date',
    placeholder: 'capture date',
    value: '',
    label: 'Capture date'
  },
  description: {
    field: 'textarea',
    placeholder: 'description',
    value: '',
    label: 'Description'
  },
  photoFile: {
    type: 'file',
    field: 'file',
    value: {},
    // label: ''
  }
}
// AUTHENTICATION
export const login = {
  username: {
    type: 'text',
    field: 'input',
    placeholder: 'Username',
    value: '1',
    label: 'Username'
  },
  password: {
    type: 'password',
    field: 'password',
    placeholder: 'Password',
    value: '111',
    label: 'Password'
  }
}
export const register = {
  username: {
    type: 'text',
    field: 'input',
    placeholder: 'Username',
    value: '',
    label: 'Username'
  },
  email: {
    type: 'email',
    field: 'email',
    placeholder: 'Email',
    value: '',
    label: 'E-mail'
  },
  password: {
    type: 'password',
    field: 'password',
    placeholder: 'Password',
    value: '',
    label: 'Password'
  },
  passwordConfirm: {
    type: 'password',
    field: 'password',
    placeholder: 'Password Confirm',
    value: '',
    label: 'Password'
  }
}
// form to get email where the password reset link is to be sent
export const passwordResetSendEmailLink = {
  email: {
    type: 'email',
    field: 'email',
    placeholder: 'Email',
    value: '',
    label: 'E-mail'
  }
}
// form to get new password which are to be saved as the new password for the account
export const passwordResetSaveNewPassword = {
  email: {
    type: 'email',
    field: 'email',
    placeholder: 'Email',
    value: '',
    label: 'E-mail'
  },
  password: {
    type: 'password',
    field: 'password',
    placeholder: 'Password',
    value: '',
    label: 'Password'
  },
  passwordConfirm: {
    type: 'password',
    field: 'password',
    placeholder: 'Password Confirm',
    value: '',
    label: 'Password'
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
  PHOTO_ENTRY_COLLECTION: {} // add/remove photo item to/from collection
}