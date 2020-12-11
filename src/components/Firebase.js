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

//native登入功能
//google登入功能

//fb登入功能
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
            userId: user.uid,
            userName: user.displayName,
            email: user.email,
            beHost: [],
            beMember: [],
          },
          { merge: true }
        )
        .then(() => {
          console.log(`Hi~${user.displayName}`)
        })
    }
  })

//fb登出功能
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
      // memberId: [], //建立memberId array
      members: [], //建立member清單
    })
    .then((docRef) => {
      //存eventId到這個doc裡
      db.collection('event').doc(docRef.id).set(
        {
          eventId: docRef.id,
        },
        { merge: 'true' }
      )
      saveHostId(obj.userId, docRef)
    })
    .catch(function (error) {
      console.error('Error adding document: ', error)
    })
}

//save the data of host to user cellection底下的host id doc

function saveHostId(userId, docRef) {
  console.log(userId)
  db.collection('user')
    .doc(userId)
    .update({
      beHost: firebase.firestore.FieldValue.arrayUnion(docRef.id),
    })
    .then(() => {
      console.log('開團者ID存到user集合中beHost的array')
    })
    .catch(function (error) {
      console.error('Error setting document: ', error)
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
    // .collection('member')
    // .doc(obj.userId)
    .update({
      members: firebase.firestore.FieldValue.arrayUnion({
        name: obj.name,
        phone: obj.phone,
        email: obj.email,
        memberId: obj.userId,
      }),
    })
    // .then(() => {
    //   db.collection('event')
    //     .doc(obj.eventId)
    //     .update({
    //       memberId: firebase.firestore.FieldValue.arrayUnion(obj.userId),
    //     })
    // })
    .then(saveMemberId(obj.userId, obj.eventId))
    .catch(function (error) {
      console.error('Error setting document: ', error)
    })
}
//save the data of host to user cellection底下的host id doc

function saveMemberId(userId, eventId) {
  console.log(userId)
  db.collection('user')
    .doc(userId)
    .update({
      beMember: firebase.firestore.FieldValue.arrayUnion(eventId),
    })
    .then(() => {
      console.log('把跟團者Id存到開團ID了')
    })
    .catch(function (error) {
      console.error('Error setting document: ', error)
    })
}
/*
====================================
render data 到 eventPage
====================================
*/
export function showEvent(callback) {
  let allEvent = []
  db.collection('event')
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
    .catch(function (error) {
      console.error('Error getting document: ', error)
    })
}
/*
====================================
render data 到 ProfilePage
====================================
*/
// export function showBeHost(Id, callback) {
//   console.log(Id)
//   let beHostEventId = []
//   db.collection('user')
//     .where('userId', '==', Id)
//     .get()
//     .then((item) => {
//       item.forEach((doc) => {
//         beHostEventId.push({
//           beHost: doc.data().beHost,
//         })
//       })
//       return beHostEventId
//     })
//     .then((result) => {
//       callback(result)
//     })
//     .catch(function (error) {
//       console.error('Error getting document: ', error)
//     })
// }

export function showBeHostEvents(userId, callback) {
  let beHostEventList = []
  db.collection('event')
    .doc()
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
          member_limit: doc.data().member_limit,
          memberId: doc.data().memberId,
          eventId: doc.data().eventId,
          status: doc.data().status,
        })
      })
      return beHostEventList
    })
    .then((result) => {
      callback(result)
    })
    // .then((result) => {
    //   if (array !== undefined) {
    //     console.log(array)
    //     console.log(result)
    //     let newArray = [...array, result]
    //     // array = [...array, newArray]
    //     console.log(newArray)
    //     callback(newArray)
    //   } else {
    //     callback(result)
    //   }
    // })
    .catch((error) => {
      console.log(error)
    })
}

// export function showMember(userId, callback) {
//   console.log(userId)
//   let eventMember = []
//   db.collection('event')
//     .doc(userId)
//     .collection('member')
//     .get()
//     .then((item) => {
//       item.forEach((doc) => {
//         eventMember.push({
//           email: doc.data().email,
//           name: doc.data().name,
//           phone: doc.data().phone,
//         })
//       })
//       return eventMember
//     })
//     .then((result) => {
//       callback(result)
//     })
//     .catch(function (error) {
//       console.error('Error getting document: ', error)
//     })
// }
