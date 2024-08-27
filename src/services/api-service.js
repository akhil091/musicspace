const BASE_URL = "https://cms.samespace.com";

export const fetchSongs = async (searchInput) => {
  try {
    const url = `${BASE_URL}/items/songs?search=${encodeURIComponent(
      searchInput
    )}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching songs", error);
    throw error;
  }
};

export const getSongCoverUrl = (coverPath) => {
  return `${BASE_URL}/assets/${coverPath}`;
};
