// FORM INITIALIZERS
export const createImage = {
  title: {
    type: 'text',
    field: 'input', // custom type used for conditional rendering of input fields
    placeholder: 'image title',
    value: '',
    label: 'title'
  },
  author: {
    type: 'text',
    field: 'input',
    placeholder: 'image author',
    value: '',
    label: 'author'
  },
  gpsLatitude: {
    type: 'number',
    field: 'input',
    placeholder: 'latitude coordinate of the image',
    value: '',
    label: 'gps latitude'
  },
  gpsLongitude: {
    type: 'number',
    field: 'input',
    placeholder: 'longitude coordinate of the image',
    value: '',
    label: 'gps longitude'
  },
  description: {
    field: 'textarea',
    placeholder: 'image description',
    value: '',
    label: 'description'
  },
  captureDate: {
    type: 'date',
    field: 'date',
    placeholder: 'date of capturing the image',
    value: '',
    label: 'capture date'
  },
  imageFile: {
    type: 'file',
    field: 'file',
    value: {},
    label: ''
  }
}
export const updateImage = {
  _id : {
    type: 'text',
    field: 'input',
    placeholder: 'image entry id',
    value: '',
    disabled: true,
    label: 'id'
  },
  imageName: {
    type: 'text',
    field: 'input',
    placeholder: 'image file name',
    value: '',
    disabled: true,
    label: 'image name'
  },
  title: {
    type: 'text',
    field: 'input',
    placeholder: 'image title',
    value: '',
    label: 'title'
    //min-max length
    // label: ''
  },
  author: {
    type: 'text',
    field: 'input',
    placeholder: 'image author',
    value: '',
    label: 'author'
  },
  gpsLatitude: {
    type: 'number',
    field: 'input',
    placeholder: 'latitude coordinate of the image',
    value: '',
    label: 'gps latitude'
  },
  gpsLongitude: {
    type: 'number',
    field: 'input',
    placeholder: 'latitude coordinate of the image',
    value: '',
    label: 'gps longitude'
  },
  description: {
    field: 'textarea',
    placeholder: 'image description',
    value: '',
    label: 'description'
  },
  captureDate: {
    type: 'date',
    field: 'date',
    placeholder: 'date of capturing the image',
    value: '',
    label: 'capture date'
  },
  imageFile: {
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
    placeholder: 'Luigi',
    value: '',
    label: 'username'
  },
  password: {
    type: 'password',
    field: 'password',
    placeholder: 'a very secret password',
    value: '',
    label: 'password'
  }
}
export const register = {
  username: {
    type: 'text',
    field: 'input',
    placeholder: 'Luigi',
    value: '',
    label: 'username'
  },
  email: {
    type: 'email',
    field: 'email',
    placeholder: 'luigi@email.com',
    value: '',
    label: 'e-mail'
  },
  password: {
    type: 'password',
    field: 'password',
    placeholder: 'secret password',
    value: '',
    label: 'password'
  },
  passwordConfirm: {
    type: 'password',
    field: 'password',
    placeholder: 'confirm your secret password',
    value: '',
    label: 'password'
  }
}
// STATUS MESSAGES
export const statusMessages = {
  // DEFAULT
  EMPTY: '',
  // UPLOAD IMAGE
  UPLOAD_IMAGE_FILE_INITIAL: 'Select image to upload (png or jpg)',
  UPLOAD_IMAGE_FILE_NOT_SUPPORTED_FORMAT: 'Not supported file format',
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
  home: 'home', 
  gallery: 'gallery'
}