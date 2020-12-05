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
const provider = new firebase.auth.FacebookAuthProvider()
provider.setCustomParameters({
  prompt: 'select_account',
})

export const signInWithFacebook = () =>
  auth.signInWithPopup(provider).then(async (result) => {
    if (result) {
      console.log(result)
      const { user } = result
      db.collection('user')
        .doc(user.uid)
        .set(
          {
            userName: user.displayName,
            email: user.email,
          },
          { merge: true }
        )
        .then(() => {
          console.log(`Hi~${user.displayName}`)
          localStorage.setItem('user', JSON.stringify(user))
        })
    }
  })

//登出功能
export const signOutWithFacebook = () =>
  auth
    .signOut()
    .then(function () {
      console.log('Sign-out successful')
      localStorage.clear()
      window.location.reload()
    })
    .catch(function (error) {
      // An error happened.
    })
export default firebaseSet

//firestore資料存取
var db = firebase.firestore()
var eventRef = db.collection('event')
var joinRef = eventRef.doc().collection('member')

/*
====================================
開團
====================================
*/
//save the data of this event to event cellection
export function SetEvent(obj) {
  console.log(obj.userId)
  // let hosteventId = []
  db.collection('event')
    .add({
      title: obj.title,
      host: obj.host,
      email: obj.email,
      phone: obj.phone,
      lat: obj.lat,
      lng: obj.lng,
      startDate: obj.startDate,
      endDate: obj.endDate,
      member_limit: obj.memberLimit,
      status: 'true',
      userId: obj.userId,
    })
    .then((docRef) => {
      db.collection('event').doc(docRef.id).collection('member').doc(obj.userId).set({
        host: obj.host,
        email: obj.email,
        phone: obj.phone,
      })
      saveHostId(obj.userId, docRef)
    })
}

//save the data of host to user cellection底下的host id doc

function saveHostId(userId, docRef) {
  console.log(userId)
  db.collection('user')
    .doc(userId)
    .collection('beHost')
    .doc()
    .set({
      eventId: docRef.id,
    })
    .then(() => {
      console.log('開團的doc底下存到開團ID了')
    })
}
/*
====================================
跟團
====================================
*/
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
/*
====================================
render data 到 eventPage
====================================
*/
export function showEvent(callback) {
  let allEvent = []
  eventRef
    .get()
    .then((item) => {
      item.forEach((doc) => {
        allEvent.push({
          eventId: doc.id,
          title: doc.data().title,
          hostName: doc.data().host,
          email: doc.data().email,
          phone: doc.data().phone,
          startDate: doc.data().startDate,
          endDate: doc.data().endDate,
          memberLimit: doc.data().member_limit,
          lat: doc.data().lat,
          lng: doc.data().lng,
          status: doc.data().status,
        })
      })
      return allEvent
    })
    .then((result) => {
      callback(result)
    })
}
