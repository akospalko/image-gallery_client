//Form initializers
export const newImage = {
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
    }
}

export const imageCardTestData = [
  {
    id: '01',
    fileName: 'test.jpg',
    author: 'Test Author',
    title: 'aerial photgraphy about a beautiful lake',
    date: '2023.01.29.',
    coordinate: 'lang: 111111, long: 999999',
    date: '2023.01.29.',
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