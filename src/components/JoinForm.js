import { JoinEvent } from './Firebase'
import React, { useState } from 'react'
// import { Maps } from './Maps'

export function JoinForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  function handleChange(e) {
    console.log(e.target.id)
    console.log(e.target.value)
    if (e.target.id === 'memeber-name-input') {
      setName(e.target.value)
    } else if (e.target.id === 'memeber-phone-input') {
      setPhone(e.target.value)
    } else {
      setEmail(e.target.value)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log(name, phone, email)
    JoinEvent(name, phone, email)
  }

  function closePopup() {
    let closePopup = document.getElementById('joinForm')
    closePopup.style.display = 'none'
  }

  return (
    <div className="joinForm" id="joinForm">
      <form onSubmit={handleSubmit}>
        <h3>姓名</h3>
        <input type="text" id="memeber-name-input" value={name} onChange={handleChange} />
        <h3>手機</h3>
        <input type="text" id="memeber-phone-input" onChange={handleChange} />
        <h3>email</h3>
        <input type="text" id="memeber-email-input" onChange={handleChange} />
        <div>
          <button type="submit">跟團</button>
        </div>
      </form>
      <button id="closePopup" onClick={closePopup}>
        關閉
      </button>
    </div>
  )
}
