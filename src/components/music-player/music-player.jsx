import "react-h5-audio-player/lib/styles.css";
import AudioPlayer from "react-h5-audio-player";
import { FaEllipsisH, FaCompactDisc } from "react-icons/fa";
import { HiMiniPlay, HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { IoPlayBack, IoPlayForward } from "react-icons/io5";
import { TbPlayerPauseFilled, TbLayoutSidebarLeftExpand } from "react-icons/tb";

import { getSongCoverUrl } from "../../services/api-service";
import "./music-player.scss";

// Component to wrap custom icons for the audio player controls
const CustomIcon = ({ IconComponent, containerClass, iconClass, ...props }) => (
  <div className={`rounded-[50%] h-10 w-10 flex justify-center items-center ${containerClass}`} {...props}>
    <IconComponent className={iconClass} />
  </div>
);

export const MusicPlayer = ({
  selectedSong,
  onClickNext,
  onClickPrevious,
  setShowSideBar,
}) => (
  <div className="player-container">
    <button className="sidebar-toggle" onClick={() => setShowSideBar(true)}>
      <TbLayoutSidebarLeftExpand className="text-white text-3xl" />
    </button>
    {selectedSong ? (
      <div className="song-info">
        <h1>{selectedSong.name}</h1>
        <p>{selectedSong.artist}</p>
        <img
          src={getSongCoverUrl(selectedSong.cover)}
          alt={selectedSong.name}
          draggable={false}
        />
        <AudioPlayer
          src={selectedSong.url}
          customIcons={{
            play: (
              <CustomIcon
                IconComponent={HiMiniPlay}
                containerClass="bg-white"
                iconClass="text-black text-[20px]"
              />
            ),
            pause: (
              <CustomIcon
                IconComponent={TbPlayerPauseFilled}
                containerClass="bg-white"
                iconClass="text-black text-[20px]"
              />
            ),
            previous: (
              <IoPlayBack className="text-[#ffffff90] text-[22px] hover:text-white" />
            ),
            next: (
              <IoPlayForward className="text-[#ffffff90] text-[22px] hover:text-white" />
            ),
            volume: (
              <CustomIcon
                IconComponent={HiSpeakerWave}
                containerClass="bg-[#ffffff20] hover:bg-[#ffffff30]"
                iconClass="text-white text-[18px]"
              />
            ),
            volumeMute: (
              <CustomIcon
                IconComponent={HiSpeakerXMark}
                containerClass="bg-[#ffffff20] hover:bg-[#ffffff30]"
                iconClass="text-white text-[18px]"
              />
            ),
            loopOff: (
              <CustomIcon
                IconComponent={FaEllipsisH}
                containerClass="bg-[#ffffff20] hover:bg-[#ffffff30] mt-[-7px]"
                iconClass="text-white text-[18px]"
              />
            ),
            loop: (
              <CustomIcon
                IconComponent={FaEllipsisH}
                containerClass="bg-[#ffffff20] hover:bg-[#ffffff30] mt-[-7px]"
                iconClass="text-white text-[18px]"
              />
            ),
          }}
          loop
          showSkipControls
          autoPlayAfterSrcChange
          showJumpControls={false}
          showDownloadProgress={false}
          showFilledVolume={false}
          onClickPrevious={onClickPrevious}
          onClickNext={onClickNext}
        />
      </div>
    ) : (
      <div className="empty-state">
        <FaCompactDisc className="compact-disc" />
        <p>Select a song to play</p>
      </div>
    )}
  </div>
);
