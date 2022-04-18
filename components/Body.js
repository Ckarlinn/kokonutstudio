import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Poster from "./Poster";
import Search from "./Search";
import Track from "./Track";


function Body({ chooseTrack, spotifyApi }) {
  const { data: session } = useSession();
  const { accessToken } = session;
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [newReleases, setNewReleases] = useState([]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  // Searching...
  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;

    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.album.images[0].url,
            popularity: track.popularity,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  // New Releases...
  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.getNewReleases().then((res) => {
      setNewReleases(
        res.body.albums.items.map((track) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.images[0].url,
          };
        })
      );
    });
  }, [accessToken]);

    return (
      <section className="bg-[#161728] ml-24 py-4 space-y-6 md:max-w-6xl flex-grow md:mr-2.5">
        <Search search={ search } setSearch={ setSearch }/>

        <ul className="grid scrollbar-hide overflow-y-scroll h-80 py-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-4  p-3  justify-around">
        {searchResults.length === 0
          ? newReleases
              .slice(0, 4)
              .map((track) => (
                <Poster
                  key={track.id}
                  track={track}
                  chooseTrack={chooseTrack}
                />
              ))
          : searchResults
              .slice(0, 4)
              .map((track) => (
                <Poster
                  key={track.id}
                  track={track}
                  chooseTrack={chooseTrack}
                />
              ))}
        </ul>
        
        <div className="flex gap-x-8 absolute min-w-full md:relative ml-6">
        {/* Genres */}
        <div className="hidden xl:inline max-w-[370px]">
          <h2 className="text-white font-bold mb-3 text-[2rem]">Your LovelyPlaylist</h2>
          <div className="flex gap-x-2 gap-y-2.5 flex-wrap mb-3 justify-around">
            <div className="genre w-[150px] h-[150px] bg-[#23263d] rounded-[15px] flex justify-center items-center text-white  flex-col">
              <ul className="flex items-center justify-around w-full block">
                <li className="w-7 h-7 rounded-[5px] list"></li>
                <li className="w-7 h-7 rounded-[5px] list"></li>
                <li className="w-7 h-7 rounded-[5px] list"></li>
              </ul>
              <p className="text-[1.1rem] truncate mt-5">July, 6th 2021</p>
              <p className="text-xs text-gray-500 truncate">Nadin Amizah, Santa</p> 
              </div>
              <div className="genre w-[150px] h-[150px] bg-[#23263d] rounded-[15px] flex justify-center items-center text-white  flex-col">
              <ul className="flex items-center justify-around w-full block">
                <li className="w-7 h-7 rounded-[5px] list"></li>
                <li className="w-7 h-7 rounded-[5px] list"></li>
                <li className="w-7 h-7 rounded-[5px] list"></li>
              </ul>
              <p className="text-[1.1rem] truncate mt-5">July, 6th 2021</p>
              <p className="text-xs text-gray-500 truncate">Nadin Amizah, Santa</p> 
              </div>
              <div className="genre w-[150px] h-[150px] bg-[#23263d] rounded-[15px] flex justify-center items-center text-white  flex-col">
              <ul className="flex items-center justify-around w-full block">
                <li className="w-7 h-7 rounded-[5px] list"></li>
                <li className="w-7 h-7 rounded-[5px] list"></li>
                <li className="w-7 h-7 rounded-[5px] list"></li>
              </ul>
              <p className="text-[1.1rem] truncate mt-5">July, 6th 2021</p>
              <p className="text-xs text-gray-500 truncate">Nadin Amizah, Santa</p> 
              </div>
              <div className="genre w-[150px] h-[150px] bg-[#23263d] rounded-[15px] flex justify-center items-center text-white  flex-col">
              <ul className="flex items-center justify-around w-full block">
                <li className="w-7 h-7 rounded-[5px] list"></li>
                <li className="w-7 h-7 rounded-[5px] list"></li>
                <li className="w-7 h-7 rounded-[5px] list"></li>
              </ul>
              <p className="text-[1.1rem] truncate mt-5">July, 6th 2021</p>
              <p className="text-xs text-gray-500 truncate">Nadin Amizah, Santa</p> 
              </div>
          </div>
          <button className="text-[#CECECE] bg-[#23263d] text-[15px] py-3.5 px-4 rounded-[10px] w-full font-bold bg-opacity-80 hover:bg-opacity-100 transition ease-out">
            All Playlists
          </button>
        </div>

        {/* Tracks */}
        <div className="w-full pr-11">
          <h2 className="text-white font-bold mb-3 text-[2rem]">
            {searchResults.length === 0 ? "New Releases" : "New Releases"}
          </h2>
          <ul className="space-y-3 rounded-2xl p-3 overflow-y-scroll h-[1000px] md:h-96 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500 w-[730px]">
            {searchResults.length === 0
              ? newReleases
                  .slice(4, newReleases.length)
                  .map((track) => (
                    <Track
                      key={track.id}
                      track={track}
                      chooseTrack={chooseTrack}
                    />
                  ))
              : searchResults
                  .slice(4, searchResults.length)
                  .map((track) => (
                    <Track
                      key={track.id}
                      track={track}
                      chooseTrack={chooseTrack}
                    />
                  ))}
          </ul>
        </div>
      </div>

      </section>
    )
  }
  
  export default Body;