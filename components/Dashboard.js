
import Navbar from "./Navbar";
import Body from "./Body";
import Aside from "./Aside";
import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { useSession } from "next-auth/react";
import { playingTrackState } from "../atoms/playerAtom";
import { useRecoilState } from "recoil";


const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
  });

function Dashboard() {

  const { data: session } = useSession();
  const { accessToken } = session;

  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    setShowPlayer(true);
  }, []);

  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

    return (
      <main className="flex min-h-screen justify-between">
          <Navbar /> 
          <Body spotifyApi={spotifyApi} chooseTrack={chooseTrack} />    
          <Aside spotifyApi={spotifyApi} chooseTrack={chooseTrack} />
      </main>
    )
  }
  
  export default Dashboard;