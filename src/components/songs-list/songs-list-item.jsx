//Component representing a single song item in the list.
import { getSongCoverUrl } from "../../services/api-service";

export const SongsListItem = ({
  song,
  onSelectSong,
  selectedSong,
  itemRef,
}) => {
  // Determine if the current song is the selected one.
  const isSelected = selectedSong?.id === song.id;

  return (
    <li
      ref={itemRef}
      style={{ backgroundColor: isSelected ? "#ffffff20" : "transparent" }}
      className="flex justify-between items-center rounded-lg py-2 md:py-4 px-3 w-full cursor-pointer hover:bg-[#ffffff10!important] transition-all duration-300"
      onClick={() => onSelectSong(song)}
    >
      <div className="flex items-center">
        <img
          src={getSongCoverUrl(song.cover)}
          alt={song.name}
          draggable={false}
          className="w-10 h-10 md:w-12 md:h-12 mr-4 rounded-[50%] select-none"
        />
        <div>
          <p className="text-white font-[inter] font-[400] text-base md:text-[18px] leading-6">
            {song.name}
          </p>
          <p className="text-[#ffffff60] font-[inter] text-xs md:text-[14px] leading-6">
            {song.artist}
          </p>
        </div>
      </div>
      <span className="text-[#ffffff60] font-[inter] font-[400] text-base md:text-[18px] leading-6">
        3:12
      </span>
    </li>
  );
};
