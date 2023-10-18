import '../App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';




function Login() {
  const CLIENT_ID = '5317c4cfb0fe43448183a30a0ad065e6'
  const REDIRECT_URI = 'http://localhost:3000/'
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
  const RESPONSE_TYPE = 'token'
  const [token, setToken] = useState("")

  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState([])

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem('token')

    if (!token && hash) {
      token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1]
      window.location.hash = ''
      window.localStorage.setItem('token', token)
    }

    setToken(token)
  }, [])

  const searchArtists = async (e) => {
    e.preventDefault()
    const { data } = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: searchKey,
        type: 'artist'
      }
    })
    setArtists(data.artists.items)
  }

  const renderArtists = () => {
    return artists.map(artist => (
      <div key={artist.id}>
        {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt="" /> : <div> No Image </div>}
        {artist.name}
        </div>
    ))
  }

  const logout = () => {
    window.localStorage.removeItem('token')
    setToken('')
  } 

  return (
    <div className="App">
      <header className="App-header">
        <h1>MoodList</h1>
        {token && <button onClick={logout}>Logout</button>}
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
          Login to Spotify
        </a>
        <form onSubmit={searchArtists}>
          <input type="text" value={searchKey} onChange={e => setSearchKey(e.target.value)} />
          <button type="submit">Search</button>
        </form>
        {renderArtists()}
      </header>
    </div>
  );
}

export default Login;
