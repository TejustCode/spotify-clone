import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { songsData } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { playWithId } = useContext(PlayerContext);

  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); 
  };

  const filteredSongs = songsData.filter((song) =>
    song.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2">
          <img
            onClick={() => navigate(-1)}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            src={assets.arrow_left}
            alt="Go back"
          />
          <img
            onClick={() => navigate(1)}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            src={assets.arrow_right}
            alt="Go forward"
          />
        </div>

        <div className="flex-grow mx-4 hidden sm:flex ">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange} 
            placeholder="Search for a song"
            className="w-[500px] px-4 outline-none py-2 border rounded-xl text-black bg-white"
          />
        </div>

        <div className="flex items-center gap-4 justify-around md:flex">
          <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
            Explore premium
          </p>
          <p className="bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer">
            Install App
          </p>
          <p className="bg-purple-500 text-black w-7 h-7 rounded-full flex items-center justify-center text-center font-bold">
            T
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        {["All", "Music", "Podcast"].map((tab) => (
          <p
            key={tab}
            className={`text-center px-4 py-1 rounded-2xl cursor-pointer ${
              activeTab === tab ? "bg-white text-black" : "bg-black text-white"
            }`}
            onClick={() => handleTabChange(tab)}
          >
            {tab}
          </p>
        ))}
      </div>

      <div className="mt-4">
        {activeTab === "All" && (
          <div>
            {searchQuery && filteredSongs.length > 0 ? (
              filteredSongs.map((song) => (
                <div
                  key={song.id}
                  className="p-4 border rounded-lg mb-2 flex items-center gap-4 cursor-pointer"
                  onClick={() => playWithId(song.id)}
                >
                  <img
                    src={song.image}
                    alt={song.name}
                    className="w-16 h-16 rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{song.name}</h3>
                    <p className="text-gray-400">{song.desc}</p>
                    <p className="text-sm text-gray-200">{song.duration}</p>
                  </div>
                </div>
              ))
            ) : (
              searchQuery ? (
                <p className="text-center text-gray-400">No songs found.</p>
              ) : (
                <p className="text-center text-gray-400">Search for a song...</p>
              )
            )}
          </div>
        )}

        {activeTab === "Music" && (
          <div>
            {searchQuery ? (
              filteredSongs.length > 0 ? (
                filteredSongs.map((song) => (
                  <div
                    key={song.id}
                    className="p-4 border rounded-lg mb-2 flex items-center gap-4 cursor-pointer"
                    onClick={() => playWithId(song.id)}
                  >
                    <img
                      src={song.image}
                      alt={song.name}
                      className="w-16 h-16 rounded"
                    />
                    <div>
                      <h3 className="font-semibold">{song.name}</h3>
                      <p className="text-gray-400">{song.desc}</p>
                      <p className="text-sm text-gray-200">{song.duration}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400">No songs found.</p>
              )
            ) : (
              songsData.map((song) => (
                <div
                  key={song.id}
                  className="p-4 border rounded-lg mb-2 flex items-center gap-4 cursor-pointer"
                  onClick={() => playWithId(song.id)}
                >
                  <img
                    src={song.image}
                    alt={song.name}
                    className="w-16 h-16 rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{song.name}</h3>
                    <p className="text-gray-400">{song.desc}</p>
                    <p className="text-sm text-gray-200">{song.duration}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "Podcast" && (
          <p className="text-center text-gray-400 mt-4">No results found.</p>
        )}
      </div>
    </>
  );
};

export default Navbar;
