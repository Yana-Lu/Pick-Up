import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCGnUEwUEFGeIYkKWsgz9Okg1AV7vzR8sI',
  authDomain: 'pick-up-test-ba782.firebaseapp.com',
  databaseURL: 'https://pick-up-test-ba782.firebaseio.com',
  projectId: 'pick-up-test-ba782',
  storageBucket: 'pick-up-test-ba782.appspot.com',
  messagingSenderId: '959486632936',
  appId: '1:959486632936:web:7c9a07fba63669b9277a5d',
  measurementId: 'G-1194R79V9K',
}

// Initialize Firebase
const firebaseSet = firebase.initializeApp(firebaseConfig)
export const auth = firebaseSet.auth()
export const firestore = firebaseSet.firestore()
firebase.analytics()

//登入功能
const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({
  prompt: 'select_account',
})

export const signInWithGoogle = () => auth.signInWithPopup(provider)
export default firebaseSet

//firestore資料存取
var db = firebase.firestore()
var enentRef = db.collection('event')
var joinRef = enentRef.doc().collection('member')

export function SetEvent(title, host, email, phone, date, time, memberLimit) {
  enentRef
    .doc()
    .set({
      title: title,
      host: host,
      email: email,
      phone: phone,
      lat: '',
      lng: '',
      date: date,
      time: time,
      member_limit: memberLimit - 1,
    })
    .then(() => {
      console.log(enentRef)
    })
}

export function JoinEvent(name, phone, email) {
  joinRef
    .doc()
    .set({
      name: name,
      phone: phone,
      email: email,
    })
    .then(() => {
      console.log('join this evnet!')
    })
}

export function showEvent(callback) {
  let allEvent = []
  enentRef
    .get()
    .then((item) => {
      item.forEach((doc) => {
        allEvent.push({
          eventId: doc.id,
          title: doc.data().title,
          hostName: doc.data().host,
          email: doc.data().email,
          phone: doc.data().phone,
          date: doc.data().date,
          time: doc.data().time,
          memberLimit: doc.data().member_limit,
          lat: doc.data().lat,
          lng: doc.data().lng,
        })
      })
      return allEvent
    })
    .then((result) => {
      callback(result)
    })
}
