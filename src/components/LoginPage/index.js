import {useState} from 'react'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import './index.css'
const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [dispErr, setDispErr] = useState(false)
  const navigate = useNavigate()
  const onTypingUsername = event => {
    setUsername(event.target.value)
  }
  const onTypingPassword = event => {
    setPassword(event.target.value)
  }

  const showingPass = () => {
    setShowPass(prevState => !prevState)
  }
  const onSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    navigate('/')
  }
  const onFailure = error => {
    setDispErr(error)
    setErrorMsg(error)
  }

  const onSubmitForm = async event => {
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const fetchingData = await fetch(url, options)
    const response = await fetchingData.json()
    if (fetchingData.ok === true) {
      onSuccess(response.jwt_token)
    } else {
      onFailure(response.error_msg)
    }
  }
    return (
      <div className="container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="website logo"
          className="website-logo"
        />
        <div className="login-form">
          <form className="box" onSubmit={onSubmitForm}>
            <label className="u" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              className="username"
              id="username"
              placeholder="Username"
              onChange={onTypingUsername}
            />

            <label className="p" htmlFor="pass">
              Password
            </label>
            <input
              type={showPass ? 'text' : 'password'}
              className="pass"
              id="pass"
              placeholder="Password"
              onChange={onTypingPassword}
            />
            <div>
              <input
                type="checkbox"
                onClick={showingPass}
                id="check"
                value={showPass}
              />
              <label className="showpass" htmlFor="check">
                show password
              </label>
            </div>
            <button type="submit" className="btn">
              Login
            </button>
          </form>

          {dispErr && <p> *{errorMsg}</p>}
        </div>
      </div>
    )
  
}
export default LoginPage
