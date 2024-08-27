//Custom hook to handle song navigation.
const useNavigateSong = (songsList, selectedSong, setSelectedSong, setBgColor) => {
  const navigateSong = (direction) => {
    const totalSongs = songsList.length;

    if (totalSongs === 0) return;

    // Find the current index of the selected song
    const currentIndex = songsList.findIndex(song => song.id === selectedSong.id);

    // Create a lookup table for index calculations
    const directionMap = {
      next: 1,
      previous: -1,
    };

    // Calculate the new index
    const newIndex = (currentIndex + directionMap[direction] + totalSongs) % totalSongs;

    // Set the new selected song and background color
    const nextSong = songsList[newIndex];
    setSelectedSong(nextSong);
    setBgColor(nextSong.accent);
  };

  return { navigateSong };
};

export default useNavigateSong;
