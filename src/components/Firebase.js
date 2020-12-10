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
      startDate: obj.startDate.toUTCString(),
      endDate: obj.endDate.toUTCString(),
      member_limit: obj.memberLimit,
      status: 'true',
      userId: obj.userId,
    })
    .then((docRef) => {
      //存eventId到這個doc裡
      db.collection('event').doc(docRef.id).set(
        {
          eventId: docRef.id,
        },
        { merge: 'true' }
      )
      db.collection('event').doc(docRef.id).collection('member').doc(obj.userId).set({
        host: obj.host,
        email: obj.email,
        phone: obj.phone,
        userId: obj.userId,
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
export function JoinEvent(obj) {
  console.log(obj.eventId)
  console.log(obj.userId)
  console.log(obj.name)
  console.log(obj.phone)
  db.collection('event')
    .doc(obj.eventId)
    .collection('member')
    .doc(obj.userId)
    .set({
      name: obj.name,
      phone: obj.phone,
      email: obj.email,
      userId: obj.userId,
    })
    .then(saveMemberId(obj.userId, obj.eventId))
}
//save the data of host to user cellection底下的host id doc

function saveMemberId(userId, eventId) {
  console.log(userId)
  db.collection('user')
    .doc(userId)
    .collection('beMember')
    .doc()
    .set({
      eventId: eventId,
    })
    .then(() => {
      console.log('跟團的doc底下存到開團ID了')
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
/*
====================================
render data 到 ProfilePage
====================================
*/
export function showBeHost(Id, callback) {
  console.log(Id)
  let beHostEventId = []
  db.collection('user')
    .doc(Id)
    .collection('beHost')
    .get()
    .then((item) => {
      item.forEach((doc) => {
        beHostEventId.push({
          eventId: doc.data().eventId,
        })
      })
      return beHostEventId
    })
    .then((result) => {
      callback(result)
    })
}

export function showBeHostEvent(Id, callback, array) {
  let beHostEventList = []
  db.collection('event')
    .where('eventId', '==', Id)
    .get()
    .then((item) => {
      console.log(item)
      item.forEach((doc) => {
        beHostEventList.push({
          title: doc.data().title,
          lat: doc.data().lat,
          lng: doc.data().lng,
          startDate: doc.data().startDate,
          endDate: doc.data().endDate,
          member_limit: doc.data().memberLimit,
          status: doc.data().status,
        })
      })
      return beHostEventList
    })
    .then((result) => {
      if (array !== undefined) {
        console.log(array)
        console.log(result)
        let newArray = [...array, result]
        // array = [...array, newArray]
        console.log(newArray)
        callback(newArray)
      } else {
        callback(result)
      }
    })
    .catch((error) => {
      console.log(error)
    })
}
