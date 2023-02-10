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
// Status Message
export const statusMessages = {
  // upload input image
  EMPTY: '',
  UPLOAD_IMAGE_FILE_INITIAL: 'Select image to upload (png or jpg)',
  UPLOAD_IMAGE_FILE_NOT_SUPPORTED_FORMAT: 'Not supported file format'
} 