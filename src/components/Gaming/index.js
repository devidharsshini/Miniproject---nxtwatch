import {useState, useContext, useEffect} from 'react'
import ThemeChanger from '../ThemeChanger'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import VideoCard from '../VideoCard'
import Cookies from 'js-cookie'
import SideBar from '../SideBar'
import './index.css'
const apiStatusLevels = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
const Gaming = () => {
  const [video, setVideo] = useState([])
  const [apiDetails, setApidetails] = useState({
    apiStatus: apiStatusLevels.initial,
    responseData: null,
    errorMsg: null,
  })
  const isDarkTheme = useContext(ThemeChanger)
  const textcolor = isDarkTheme ? 'white' : 'black'
  const bgcolor = isDarkTheme ? 'white' : 'black'
  const fetchGaming = async () => {
    setApidetails({
      apiStatus: apiStatusLevels.inprogress,
      responseData: null,
      errorMsg: null,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const fetchingData = await fetch(url, options)
    const data = await fetchingData.json()
    if (fetchingData.ok) {
      const formattedData = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        thumbnailUrl: eachVideo.thumbnail_url,
        viewCount: eachVideo.view_count,
      }))
      setVideo(formattedData)
      setApidetails({
        apiStatus: apiStatusLevels.success,
        responseData: formattedData,
        errorMsg: null,
      })
    } else {
      setApidetails({
        apiStatus: apiStatusLevels.failure,
        responseData: null,
        errorMsg: data.error_msg,
      })
    }
  }
    useEffect(() => {
      fetchGaming()
    }, [])

    const loaderView = () => (
      <div className="loader">
        <Loader type="Threedots" height={30} width={30} />
      </div>
    )
    const successView = () => (
      <div
        style={{color: textcolor, backgroundColor: bgcolor}}
        className="gaming"
      >
        {video.map(eachVideo => (
        <VideoCard video={eachVideo} id={eachVideo.id} />
      ))}
      </div>
    )

    const failureView = () => (
      <div
        className="failureView"
        style={{backgroundColor: bgcolor, color: textcolor}}
      >
        {isDarkTheme ? (
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
            className="failureimg"
          />
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
            className="failureimg"
          />
        )}
        <h1 className="failuretext">Oops! Something Went Wrong</h1>
        <p className="failuredescription">
          We are having some trouble processing your request. Please try again.
        </p>
        <button className="retybtn">Retry</button>
      </div>
    )

    const finalView = () => {
      const {apiStatus} = apiDetails
      switch (apiStatus) {
        case apiStatusLevels.inprogress:
          return loaderView()
        case apiStatusLevels.success:
          return successView()
        case apiStatusLevels.failure:
          return failureView()
        default:
         return null
      }
    }

    return (
      <>
        <Header />
        <div className="min">
          <SideBar />
          <p>{finalView()}</p>
        </div>
      </>
    )
  
}

export default Gaming
