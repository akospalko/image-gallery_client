//Form initializers
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
// Status Message
export const statusMessages = {
  // DEFAULT
  EMPTY: '',
  // UPLOAD IMAGE
  UPLOAD_IMAGE_FILE_INITIAL: 'Select image to upload (png or jpg)',
  UPLOAD_IMAGE_FILE_NOT_SUPPORTED_FORMAT: 'Not supported file format',
  // AXIOS
  AXIOS_NO_SERVER_RESPONSE: 'No server response',
}
// Navigation bar data
export const navElements = [
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
export const navElementsAdmin = [
  {
    id: 0,
    name: 'home',
    path: '/admin/'
  }, {
    id: 1,
    name: 'dashboard',
    path: '/admin/dashboard'
  }, {
    id: 2,
    name: 'map overview',
    path: '/admin/mapoverview'
  }
]
// temporary slides for home photo slider
export const temporarySlides = [
  {
    url: 'https://images.unsplash.com/photo-1676219957647-a69f861f9b27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    title:'1'
},
  {
    url: 'https://images.unsplash.com/photo-1676219957679-33f1b1520a7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    title:'2'},
  {
    url: 'https://images.unsplash.com/photo-1676219957664-b12399c38b59?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    title:'3'
  }
]
