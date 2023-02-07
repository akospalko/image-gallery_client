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
  description: {
    field: 'textarea',
    placeholder: 'image description',
    value: '',
    label: 'description'
  },
  date: {
    type: 'text', //date???
    field: 'input',
    placeholder: 'date of taking the image',
    value: '',
    label: 'date'
  },
  coordinate: {
    type: 'text', 
    field: 'input',
    placeholder: 'geolocation of the image',
    value: '',
    label: 'coordinate'
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
  description: {
    field: 'textarea',
    placeholder: 'image description',
    value: '',
    label: 'description'
  },
  date: {
    type: 'text', //date???
    field: 'input',
    placeholder: 'date of taking the image',
    value: '',
    label: 'date'
  },
  coordinate: {
    type: 'text', //date???
    field: 'input',
    placeholder: 'geolocation of the image',
    value: '',
    label: 'coordinate'
  },
  imageName: {
    type: 'text',
    field: 'input',
    placeholder: 'image file name',
    value: '',
    disabled: true,
    label: 'image name'
  },
  imageFile: {
    type: 'file',
    field: 'file',
    value: {},
    label: ''
  }
}

// Status Message
export const statusMessages = {
  // upload input image
  EMPTY: '',
  UPLOAD_IMAGE_FILE_INITIAL: 'Select image to upload (png or jpg)',
  UPLOAD_IMAGE_FILE_NOT_SUPPORTED_FORMAT: 'Not supported file format'
} 