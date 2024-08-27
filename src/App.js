/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { SongsList } from "./components/songs-list/songs-list";
import { MusicPlayer } from "./components/music-player/music-player";

import useNavigateSong from "./custom-hooks/useNavigateSong";
import { ApiStatus, Tabs } from "./enums/enums.js";
import { fetchSongs } from "./services/api-service.js";
import "./App.scss";

const colorMap = {
  primary: "#0B565B",
  black: "#000000",
};

const App = () => {
  // Refs to be used for the animation and item scrolling
  const ref = useRef(null);
  const itemRef = useRef(null);

  const initialSearchInput = new URLSearchParams(window.location.search).get("search") || "";
  const [searchInput, setSearchInput] = useState(initialSearchInput);
  const [songsList, setSongsList] = useState([]);
  const [apiStatus, setApiStatus] = useState(ApiStatus.INITIAL);
  const [showSideBar, setShowSideBar] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [bgColor, setBgColor] = useState(colorMap.primary);
  const queryTab = new URLSearchParams(window.location.search).get("track");
  const initialSongId = parseInt(new URLSearchParams(window.location.search).get("songId")) || null;
  const initialTab = [Tabs.TOP_TRACKS, Tabs.FOR_YOU].includes(queryTab) ? queryTab : Tabs.FOR_YOU;
  const [activeTab, setActiveTab] = useState(initialTab);

  // Custom hook for song navigation
  const { navigateSong } = useNavigateSong(
    songsList,
    selectedSong,
    setSelectedSong,
    setBgColor
  );

  // Update URL query parameters when search input, active tab, or selected song changes
  useEffect(() => {
    window.history.replaceState(
      null,
      null,
      `?track=${activeTab}&songId=${selectedSong ? selectedSong.id : ""}${
        searchInput ? `&search=${searchInput}` : ""
      }`
    );
  }, [activeTab, selectedSong, searchInput]);

  // Fetch songs based on search input with debounce
  useEffect(() => {
    setApiStatus(ApiStatus.IN_PROGRESS);
    const delayDebounceFn = setTimeout(async () => {
      try {
        const data = await fetchSongs(searchInput);
        setSongsList(data);
        if (data.length > 0) {
          // Set the selected song and background color based on the fetched data
          const song = data.find((song) => song.id === initialSongId) || data[0];
          setSelectedSong(song);
          setBgColor(song.accent);
        }
        setApiStatus(ApiStatus.SUCCESS);
      } catch {
        setApiStatus(ApiStatus.FAILURE);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchInput]);

  // Animate background gradient based on background color
  useEffect(() => {
    anime({
      targets: ref.current,
      backgroundPosition: ["0% 50%", "100% 50%"],
      duration: 20000,
      loop: true,
      easing: "linear",
      direction: "alternate",
    });
  }, [bgColor]);

  // Handle song selection and scroll to the selected song
  const onSelectSong = (song) => {
    setSelectedSong(song);
    setBgColor(song.accent);
    itemRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  return (
    <div
      ref={ref}
      className="flex justify-between items-start relative"
      style={{
        backgroundImage: `linear-gradient(270deg, ${bgColor}30, ${colorMap.black}, ${bgColor}30, ${colorMap.black})`,
        backgroundColor: `${bgColor}`,
        backgroundPosition: "0% 50%",
        backgroundSize: "600% 600%",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <SongsList
        onSelectSong={onSelectSong}
        selectedSong={selectedSong}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        songsList={songsList}
        apiStatus={apiStatus}
        fetchSongs={fetchSongs}
        showSideBar={showSideBar}
        setShowSideBar={setShowSideBar}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        itemRef={itemRef}
      />
      <MusicPlayer
        selectedSong={selectedSong}
        onClickNext={() => navigateSong("next")}
        onClickPrevious={() => navigateSong("previous")}
        setShowSideBar={setShowSideBar}
      />
    </div>
  );
};

export default App;
