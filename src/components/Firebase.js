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

const firebaseSet = firebase.initializeApp(firebaseConfig)
export const auth = firebaseSet.auth()
export const firestore = firebaseSet.firestore()
firebase.analytics()

const provider = new firebase.auth.FacebookAuthProvider()
provider.setCustomParameters({
  prompt: 'select_account',
})

export const signInWithFacebook = () =>
  auth.signInWithPopup(provider).then(async (result) => {
    if (result) {
      const { user } = result
      db.collection('user').doc(user.uid).set(
        {
          userId: user.uid,
          userName: user.displayName,
          email: user.email,
          beHost: [],
          beMember: [],
        },
        { merge: true }
      )
    }
  })

export const signOutWithFacebook = () =>
  auth
    .signOut()
    .then(function () {
      window.location.reload()
    })
    .catch(function () {
      window.alert('登入失敗')
    })
export default firebaseSet

const db = firebase.firestore()

/*
====================================
開團
====================================
*/
export function SetEvent(obj) {
  db.collection('event')
    .add({
      title: obj.title,
      host: obj.host,
      email: obj.email,
      phone: obj.phone,
      lat: obj.lat,
      lng: obj.lng,
      startTime: obj.startTime,
      endTime: obj.endTime,
      member_limit: obj.memberLimit,
      status: 'true',
      userId: obj.userId,
      memberId: [],
      members: [],
      results: [],
    })
    .then((docRef) => {
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

function saveHostId(userId, docRef) {
  db.collection('user')
    .doc(userId)
    .update({
      beHost: firebase.firestore.FieldValue.arrayUnion(docRef.id),
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
  db.collection('event')
    .doc(obj.eventId)
    .update({
      members: firebase.firestore.FieldValue.arrayUnion({
        name: obj.name,
        phone: obj.phone,
        email: obj.email,
        memberId: obj.userId,
      }),
    })
    .then(() => {
      db.collection('event')
        .doc(obj.eventId)
        .update({
          memberId: firebase.firestore.FieldValue.arrayUnion(obj.userId),
        })
    })
    .then(saveMemberId(obj.userId, obj.eventId))
    .catch(function (error) {
      console.error('Error setting document: ', error)
    })
}

function saveMemberId(userId, eventId) {
  db.collection('user')
    .doc(userId)
    .update({
      beMember: firebase.firestore.FieldValue.arrayUnion(eventId),
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
  db.collection('event')
    .where('status', '==', 'true')
    .onSnapshot((querySnapshot) => {
      const allEvent = []
      querySnapshot.forEach((doc) => {
        allEvent.push({
          eventId: doc.id,
          hostId: doc.data().userId,
          title: doc.data().title,
          hostName: doc.data().host,
          email: doc.data().email,
          phone: doc.data().phone,
          startTime: doc.data().startTime,
          endTime: doc.data().endTime,
          memberLimit: doc.data().member_limit,
          memberId: doc.data().memberId,
          members: doc.data().members,
          lat: doc.data().lat,
          lng: doc.data().lng,
          status: doc.data().status,
        })
      })
      callback(allEvent)
    })
}
/*
====================================
render data 到 ProfilePage
====================================
*/

export function showBeHostEvents(userId, callback) {
  db.collection('event')
    .where('userId', '==', userId)
    .orderBy('startTime', 'asc')
    .onSnapshot((item) => {
      const beHostEventList = []
      item.forEach((doc) => {
        beHostEventList.push({
          title: doc.data().title,
          lat: doc.data().lat,
          lng: doc.data().lng,
          startTime: doc.data().startTime,
          endTime: doc.data().endTime,
          member_limit: doc.data().member_limit,
          members: doc.data().members,
          eventId: doc.data().eventId,
          status: doc.data().status,
          hostId: doc.data().userId,
          results: doc.data().results,
        })
      })
      callback(beHostEventList)
    })
}

export function showBeMemberEvents(userId, callback) {
  db.collection('event')
    .where('memberId', 'array-contains', userId)
    // .orderBy('startTime', 'asc')
    .onSnapshot((item) => {
      const beMemberEventList = []
      item.forEach((doc) => {
        beMemberEventList.push({
          title: doc.data().title,
          host: doc.data().host,
          email: doc.data().email,
          phone: doc.data().phone,
          lat: doc.data().lat,
          lng: doc.data().lng,
          startTime: doc.data().startTime,
          endTime: doc.data().endTime,
          member_limit: doc.data().member_limit,
          members: doc.data().members,
          eventId: doc.data().eventId,
          status: doc.data().status,
          hostId: doc.data().userId,
          results: doc.data().results,
        })
      })
      callback(beMemberEventList)
    })
}
/*
====================================
上傳淨灘成果到 Firebase
====================================
*/
export function SaveResult(obj) {
  db.collection('event')
    .doc(obj.eventId)
    .update({
      results: firebase.firestore.FieldValue.arrayUnion({
        bottle: obj.bottle,
        bottleCap: obj.bottleCap,
        foodContainer: obj.foodContainer,
        noFoodContainer: obj.noFoodContainer,
        PlasticBag: obj.PlasticBag,
        foodPackage: obj.foodPackage,
        straw: obj.straw,
        drinkCup: obj.drinkCup,
        tableware: obj.tableware,
        can: obj.can,
        aluminumFoilBag: obj.aluminumFoilBag,
        glassBottle: obj.glassBottle,
        fishingGear: obj.fishingGear,
        fishingTool: obj.fishingTool,
        fishingNet: obj.fishingNet,
        cigaretteButt: obj.cigaretteButt,
        toothbrush: obj.toothbrush,
        syringeneedle: obj.syringeneedle,
        lighter: obj.lighter,
        metal: obj.metal,
        hook: obj.hook,
      }),
    })
    .then(() => {
      db.collection('event').doc(obj.eventId).update({
        status: 'done',
      })
    })
    .catch(function (error) {
      console.error('Error adding document: ', error)
    })
}
/*
====================================
render 淨灘成果到 ProfilePage
====================================
*/
export function showResults(callback) {
  db.collection('event')
    .where('status', '==', 'done')
    .onSnapshot((item) => {
      const allResults = []
      item.forEach((doc) => {
        allResults.push({
          title: doc.data().title,
          lat: doc.data().lat,
          lng: doc.data().lng,
          startTime: doc.data().startTime,
          endTime: doc.data().endTime,
          member_limit: doc.data().member_limit,
          members: doc.data().members,
          eventId: doc.data().eventId,
          status: doc.data().status,
          hostId: doc.data().userId,
          results: doc.data().results,
        })
      })
      callback(allResults)
    })
}
