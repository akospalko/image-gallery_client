//Form initializers
export const createImage = {
    title: {
      type: 'text',
      placeholder: 'image title',
      value: '',
      //min-max length
      // label: ''
    },
    author: {
      type: 'text',
      placeholder: 'image author',
      value: '',
    },
    description: {
      placeholder: 'image description',
      value: '',
    },
    date: {
      type: 'text', //date???
      placeholder: 'date of taking the image',
      value: ''
    },
    coordinate: {
      type: 'text', 
      placeholder: 'geolocation of the image',
      value: ''
    },
    imageName: {
      type: 'text', 
      placeholder: 'image name',
      value: ''
    }
}
export const updateImage = {
  id : { 
    type: 'text',
    disabled: 'true',
    placeholder: 'image entry id',
    value: ''
  },
  file: {
    type: 'text',
    placeholder: 'image file name',
    value: '',
    //min-max length
    // label: ''
  },
  title: {
    type: 'text',
    placeholder: 'image title',
    value: '',
    //min-max length
    // label: ''
  },
  author: {
    type: 'text',
    placeholder: 'image author',
    value: '',
  },
  description: {
    placeholder: 'image description',
    value: '',
  },
  date: {
    type: 'text', //date???
    placeholder: 'date of taking the image',
    value: ''
  },
  coordinate: {
    type: 'text', //date???
    placeholder: 'geolocation of the image',
    value: ''
  }
  //entry created at: date
}

export const imageCardTestData = [
  {
    id: '01',
    fileName: 'test.jpg',
    author: 'Test Author',
    title: 'aerial photgraphy about a beautiful lake',
    date: '2023.01.29.',
    coordinate: 'lang: 111111, long: 999999',
    description: 'a beautiful lake with spectecular scenery, made by a beautiful lake'
  }, {
    id: '02',
    fileName: 'test2.jpg',
    author: 'Test Author2',
    title: '2aerial photgraphy about a beautiful lake',
    date: '2023.01.30.',
    coordinate: '2lang: 111111, long: 999999',
    description: '2a beautiful lake with spectecular scenery, made by a beautiful lake'
  }
]