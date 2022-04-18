


import { playingTrackState } from "../atoms/playerAtom";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { MdOutlineSettings } from "react-icons/md";
import { BiBell } from "react-icons/bi";
import { ViewGridIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import RecentlyPlayed from "./RecentlyPlayed";

import Player from "./Player";
import { useRecoilState } from "recoil";

function Aside({ chooseTrack, spotifyApi }) {

  const { data: session } = useSession();
  const { accessToken } = session;
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);


  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  const [showPlayer, setShowPlayer] = useState(false);

  // Recently Played Tracks...
  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.getMyRecentlyPlayedTracks({ limit: 20 }).then((res) => {
      setRecentlyPlayed(
        res.body.items.map(({ track }) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.album.images[0].url,
          };
        })
      );
    });
  }, [accessToken]);

  return (

    <section className="p-4 space-y-8 bg-[#23263d] w-[265px] relative">
      <div className="flex space-x-2 items-center justify-center w-full">
        {/* Icons */}
        <div className="flex items-center space-x-4 rounded-2xl py-3 px-4 justify-center">
          <HiOutlineShieldCheck className="text-[#CCCCCC] text-xl" />
          <MdOutlineSettings className="text-[#CCCCCC] text-xl" />
          <div>
            <BiBell className="text-[#CCCCCC] text-xl" />
          </div>
        </div>
      </div>

      {/* Reproductor */}
      <div className="w-full h-[200px]">
         
     
          <Player accessToken={accessToken} trackUri={playingTrack.uri} className="flex flex-col-reverse"/>
        
      </div>


      {/* Recently Played Tracks */}
     <div className="p-4 space-y-4 border-t-[1px] border-t-[#2e314c]">
        <div className="flex items-center justify-between">
          <h4 className="text-white font-semibold text-[1.2rem]">Recently Played</h4>
          <ViewGridIcon className="text-[#686868] h-6" />
        </div>

        <div className="space-y-4 overflow-y-scroll overflow-x-hidden h-[450px] md:h-[600px] scrollbar-hide">
          {recentlyPlayed.map((track, index) => (
            <RecentlyPlayed
              key={index}
              track={track}
              chooseTrack={chooseTrack}
            />
          ))}
        </div>
        <button className="text-[#CECECE] bg-[#1A1A1A] text-[13px] py-3.5 px-4 rounded-2xl w-full font-bold bg-opacity-80 hover:bg-opacity-100 transition ease-out">
          View All
        </button>
      </div>
    </section>
  );
}
  
  export default Aside;