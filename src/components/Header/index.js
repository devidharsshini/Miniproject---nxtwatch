import {useState, useContext} from 'react'
import ThemeChanger from '../ThemeChanger'
import Cookies from 'js-cookie'
import {useNavigate, Link} from 'react-router-dom'
import './index.css'
import {BsMoon, BsBrightnessHigh} from 'react-icons/bs'
const Header = () => {
  const [popup, setPopup] = useState(false)
  const navigate = useNavigate()
  const {isDarkTheme, toggleTheme} = useContext(ThemeChanger)
  const bgColor = isDarkTheme ? 'black' : 'white'
  const txtColor = isDarkTheme ? 'white' : 'black'

  const confirmLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login')
  }

  const cancelLogout = () => {
    setPopup(false)
  }
  const clickLogout = () => {
    setPopup(prevState => !prevState)
  }

  const onChangeTheme = () => {
    toggleTheme()
  }
  return (
    <nav className="nav-header" style={{backgroundColor: bgColor}}>
      <div className="HeaderLeft">
        <Link to="/">
          <img
            src={
              isDarkTheme
                ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png '
            }
            className="mainlogo"
            alt="website logo"
          />
        </Link>
      </div>

      <div className="headerRight">
        <button className="theme-toggle" onClick={onChangeTheme}>
          {isDarkTheme ? <BsBrightnessHigh size={25} /> : <BsMoon size={25} />}
        </button>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
          alt="profile"
          className="profile"
        />
        <button type="logoutbtn" onClick={clickLogout}>
          Logout
        </button>
        {popup && (
          <div
            className="logoutConfirm"
            style={{backgroundColor: bgColor, color: txtColor}}
          >
            <p>ARE YOU SURE</p>
            <section className="buttons">
              <button className="out1" onClick={confirmLogout}>
                CONFIRM
              </button>
              <button className="out2" onClick={cancelLogout}>
                CANCEL
              </button>
            </section>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Header
