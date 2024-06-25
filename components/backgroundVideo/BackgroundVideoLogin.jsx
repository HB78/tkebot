"use client";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const BackgroundVideoLogin = () => {
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
            "https://res.cloudinary.com/di1r1dipb/video/upload/v1708371721/login_zcxe3a.mp4"
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

export default BackgroundVideoLogin;
