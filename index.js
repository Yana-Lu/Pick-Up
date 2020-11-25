var db = firebase.firestore()
var ref = db.collection('location').doc('map')

ref
  .set({
    name: 'AppWorks',
    id: '1',
    lat: '121.56490081558123',
    lng: '25.043371705709095',
  })
  .then(() => {
    console.log('set data successful')
  })
