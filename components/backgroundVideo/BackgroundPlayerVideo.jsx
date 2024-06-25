"use client";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
const BackgroundPlayerVideo = () => {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <>
      {client ? (
        <ReactPlayer
          width={"100%"}
          height={"100vh"}
          url={
            "https://res.cloudinary.com/di1r1dipb/video/upload/v1708371649/tke_tqsqzs.mp4"
          }
          controls={false}
          playing={true}
          playsinline={true}
          pip={true}
          loop={true}
          muted={true}
        />
      ) : null}
    </>
  );
};

export default BackgroundPlayerVideo;
