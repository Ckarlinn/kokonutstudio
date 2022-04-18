import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { playingTrackState, playState } from "../atoms/playerAtom";

function Poster({track, chooseTrack}) {

    const [play, setPlay] = useRecoilState(playState);
    const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  
    const handlePlay = () => {
      chooseTrack(track);
  
      if (track.uri === playingTrack.uri) {
        setPlay(!play);
      }
    };
  
    return (
        
        <li className="card w-[260px] h-[260px] rounded-[10px] overflow-hidden relative text-white cursor-pointer transition duration-200 ease-out group mx-auto hover:scale-105 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 hover:z-10" onClick={handlePlay}>
            <img className=" w-full h-full absolute object-cover inset-0" src={track.albumUrl} alt="" />
            <div className="absolute bottom-5 inset-x-0 mr-4 flex items-center space-x-3 justify-end">
                <ul className=" absolute left-5">
                    <li>{track.title}</li>
                    <li>{track.artist}</li>
                </ul>
                <span className="h-10 w-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    
                    {track.uri === playingTrack.uri && play ? (
                        <BsFillPauseFill className="text-lg text-[#161728]"/>
                    ):(
                        <BsFillPlayFill className="text-lg ml-[1px] text-[#161728]"/>
                    )}
                  
                </span>

            </div>
        </li>
        
    )
  }
  
  export default Poster;