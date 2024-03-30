import React, { useState } from 'react';

const Videoplayer = () => {

  const videoID = "lSoq4-Cfp6g";
  const [selectedSubtitle, setSelectedSubtitle] = useState(null);

  // Function to play video from a specific timestamp
  const playVideoFromTimestamp = (timestamp) => {
    const player = document.getElementById('youtube-player');
    if (player) {
      // Convert timestamp to seconds
      const timeParts = timestamp.split(':');
      const seconds = parseInt(timeParts[0]) * 60 + parseInt(timeParts[1]);

      // Set iframe source with the start parameter
      player.src = `https://www.youtube.com/embed/${videoID}?start=${seconds}&autoplay=1`;
    }
  };

  return (
    <div className="flex justify-center items-center mx-auto w-4/5 h-auto gap-6 bg-slate-900 p-5">
      <div className="w-3/5 ">
        {/* Video Player Component */}
        <iframe
          id="youtube-player"
          className="w-full h-[30rem]"
          src={`https://www.youtube.com/embed/${videoID}`}
          title="YouTube Video Player"
          allowFullScreen
        ></iframe>
      </div>
      <div className="w-1/5 h-[30rem] border-[1px] border-yellow-600 rounded-md">
        <h1 className='ml-4 text-lg font-bold text-white'> Timestamp </h1>
        {/* Subtitles Component */}
        <div className="overflow-y-auto">
          {/* Sample Subtitles List */}
          <ul className="p-4 text-white">
            <li
              className={`cursor-pointer py-2 ${selectedSubtitle === '00:00' ? 'text-yellow-200' : ''}`}
              onClick={() => {
                playVideoFromTimestamp('00:00');
                setSelectedSubtitle('00:00');
              }}
            >
              Subtitle 1 (00:00)
            </li>
            <li
              className={`cursor-pointer py-2 ${selectedSubtitle === '03:12' ? 'text-yellow-200' : ''}`}
              onClick={() => {
                playVideoFromTimestamp('03:12');
                setSelectedSubtitle('03:12');
              }}
            >
              Subtitle 2 (03:12)
            </li>
            <li
              className={`cursor-pointer py-2 ${selectedSubtitle === '06:25' ? 'text-yellow-200' : ''}`}
              onClick={() => {
                playVideoFromTimestamp('06:25');
                setSelectedSubtitle('06:25');
              }}
            >
              Subtitle 3 (06:25)
            </li>
            {/* Add more subtitles as needed */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Videoplayer;
