//Form initializers
export const createImage = {
  title: {
    type: 'text',
    field: 'input', // custom type used for conditional rendering of input fields
    placeholder: 'image title',
    value: '',
    //min-max length
    // label: ''
  },
  author: {
    type: 'text',
    field: 'input',
    placeholder: 'image author',
    value: '',
  },
  description: {
    field: 'textarea',
    placeholder: 'image description',
    value: '',
  },
  date: {
    type: 'text', //date???
    field: 'input',
    placeholder: 'date of taking the image',
    value: ''
  },
  coordinate: {
    type: 'text', 
    field: 'input',
    placeholder: 'geolocation of the image',
    value: ''
  },
  imageFile: {
    type: 'text', 
    field: 'file',
    value: ''
  }
}
export const updateImage = {
  id : { 
    type: 'text',
    field: 'input',
    placeholder: 'image entry id',
    value: '',
    disabled: true
  },
  title: {
    type: 'text',
    field: 'input',
    placeholder: 'image title',
    value: '',
    //min-max length
    // label: ''
  },
  author: {
    type: 'text',
    field: 'input',
    placeholder: 'image author',
    value: '',
  },
  description: {
    field: 'textarea',
    placeholder: 'image description',
    value: '',
  },
  date: {
    type: 'text', //date???
    field: 'input',
    placeholder: 'date of taking the image',
    value: ''
  },
  coordinate: {
    type: 'text', //date???
    field: 'input',
    placeholder: 'geolocation of the image',
    value: ''
  },
  imageName: {
    type: 'text',
    field: 'input',
    placeholder: 'image file name',
    value: '',
    disabled: true
  },
  imageFile: {
    type: 'file',
    field: 'file',
    value: {},
  }
}