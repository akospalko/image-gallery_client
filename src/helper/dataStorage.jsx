// FORM INITIALIZERS
export const createPhoto = {
  title: {
    type: 'text',
    field: 'input', // custom type used for conditional rendering of input fields
    placeholder: 'title',
    value: '',
    label: 'title'
  },
  author: {
    type: 'text',
    field: 'input',
    placeholder: 'author',
    value: '',
    label: 'author'
  },
  gpsLatitude: {
    type: 'number',
    field: 'input',
    placeholder: 'latitude coordinate of the photo',
    value: '',
    label: 'gps latitude'
  },
  gpsLongitude: {
    type: 'number',
    field: 'input',
    placeholder: 'longitude coordinate of the photo',
    value: '',
    label: 'gps longitude'
  },
  description: {
    field: 'textarea',
    placeholder: 'description',
    value: '',
    label: 'description'
  },
  captureDate: {
    type: 'date',
    field: 'date',
    placeholder: 'capture date',
    value: '',
    label: 'capture date'
  },
  photoFile: {
    type: 'file',
    field: 'file',
    value: {},
    label: ''
  }
}
export const updatePhoto = {
  _id : {
    type: 'text',
    field: 'input',
    placeholder: 'photo entry id',
    value: '',
    disabled: true,
    label: 'id'
  },
  photoName: {
    type: 'text',
    field: 'input',
    placeholder: 'file name',
    value: '',
    disabled: true,
    label: 'file name'
  },
  title: {
    type: 'text',
    field: 'input',
    placeholder: 'title',
    value: '',
    label: 'title'
    //min-max length
    // label: ''
  },
  author: {
    type: 'text',
    field: 'input',
    placeholder: 'author',
    value: '',
    label: 'author'
  },
  gpsLatitude: {
    type: 'number',
    field: 'input',
    placeholder: 'latitude coordinate of the photo',
    value: '',
    label: 'gps latitude'
  },
  gpsLongitude: {
    type: 'number',
    field: 'input',
    placeholder: 'latitude coordinate of the photo',
    value: '',
    label: 'gps longitude'
  },
  description: {
    field: 'textarea',
    placeholder: 'description',
    value: '',
    label: 'description'
  },
  captureDate: {
    type: 'date',
    field: 'date',
    placeholder: 'capture date',
    value: '',
    label: 'capture date'
  },
  photoFile: {
    type: 'file',
    field: 'file',
    value: {},
    label: ''
  }
}
// AUTHENTICATION
export const login = {
  username: {
    type: 'text',
    field: 'input',
    placeholder: 'Username',
    value: '',
    label: 'username'
  },
  password: {
    type: 'password',
    field: 'password',
    placeholder: 'Password',
    value: '',
    label: 'password'
  }
}
export const register = {
  username: {
    type: 'text',
    field: 'input',
    placeholder: 'Username',
    value: '',
    label: 'username'
  },
  email: {
    type: 'email',
    field: 'email',
    placeholder: 'Email',
    value: '',
    label: 'e-mail'
  },
  password: {
    type: 'password',
    field: 'password',
    placeholder: 'Password',
    value: '',
    label: 'password'
  },
  passwordConfirm: {
    type: 'password',
    field: 'password',
    placeholder: 'Password Confirm',
    value: '',
    label: 'password'
  }
}
// STATUS MESSAGES
export const statusMessages = {
  // DEFAULT
  EMPTY: '',
  // UPLOAD PHOTO
  UPLOAD_PHOTO_FILE_INITIAL: 'Select photo to upload (png or jpg)',
  UPLOAD_PHOTO_FILE_NOT_SUPPORTED_FORMAT: 'Not supported file format',
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
    path: '/gallery'
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
    path: '/admin/'
  }, {
    id: 1,
    name: 'gallery',
    path: '/admin/gallery'
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
  // NAV
  HEADER_AUTH: 'HEADER_AUTH',
  HEADER_NAV: 'HEADER_NAV'
}