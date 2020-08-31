import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import { auth } from './firebase'
import firebase from './firebase'

function App() {
  const [signedIn, setIsSignedIn] = useState(false)
  const getData = async (endTime, accessToken) => {
    const body = {
      aggregateBy: [
        {
          dataSourceId:
            'derived:com.google.heart_minutes:com.google.android.gms:from_steps<-estimated_steps',
        },
      ],
      bucketByTime: {
        durationMillis: 86400000,
      },
      endTimeMillis: endTime,
      startTimeMillis: endTime - 7 * 86400000,
    }
    axios
      .post(
        'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate',
        body,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
          },
        }
      )
      .then(res => {
        console.log(res)
      })
      .catch(e => {
        console.error(e)
      })
  }
  const googleSignin = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope(
      'https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.location.read'
    )
    auth.signInWithPopup(provider).then(res => {
      console.log(res)
      setIsSignedIn(true)
      const token = res.credential.accessToken
      const now = new Date().getTime()
      getData(now, token)
    })
  }
  return (
    <div className='App'>
      {signedIn ? (
        <>
          <h1>You are signed in</h1>
          <button
            onClick={() => {
              auth.signOut()
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <h1>Sign in with Google</h1>
          <button onClick={googleSignin}>Google Sign in</button>
        </>
      )}
    </div>
  )
}

export default App
