import {useContext} from 'react'
import ThemeChanger from '../ThemeChanger'
import {Link} from 'react-router-dom'
import './index.css'
const SideBar = () => {
  const {isDarkTheme} = useContext(ThemeChanger)
  const txtcolor = isDarkTheme ? 'white' : 'black'
  const bgcolor = isDarkTheme ? 'black' : 'white'

  return (
    <div
      className="siderBar"
      style={{backgroundColor: bgcolor, color: txtcolor}}
    >
      <div className="sideBarUpper">
        <div className="navigate">
          <Link to="/">
            <p>Home</p>
          </Link>
          <Link to="/trending">
            <p>Trending</p>
          </Link>
          <Link to="/gaming">
            <p>Gaming</p>
          </Link>
          <Link to="/saveVideo">
            <p>Saved Videos</p>
          </Link>
        </div>
      </div>

      <div className="sideBarLower">
        <p>
          <b> CONTACT US</b>
        </p>
        <div className="lowerIcons">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png "
            alt="facebook logo"
            className="icon"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png "
            alt="twitter logo"
            className="icon"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png "
            alt="linkedin logo"
            className="icon"
          />
        </div>
        <p>Enjoy! Now you can see your recommendations!</p>
      </div>
    </div>
  )
}
export default SideBar
