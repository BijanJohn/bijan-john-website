import * as React from "react";

type Props = {
  /** Path without extension, e.g. "/videos/my-clip" */
  srcBase: string;
  posterExt?: string;          // default ".jpg"
  className?: string;
  /** Show controls (off by default for GIF-like behavior) */
  controls?: boolean;
  /** Autoplay/loop/muted/playsInline default to true for GIF-like feel */
};

export default function SmartVideo({
  srcBase,
  posterExt = ".jpg",
  className,
  controls = false,
}: Props) {
  const poster = `${srcBase}${posterExt}`;
  return (
    <video
      className={className}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      controls={controls}
      style={{ maxWidth: "100%", display: "block", margin: "0 auto" }}
    >
      <source src={`${srcBase}.webm`} type="video/webm" />
      <source src={`${srcBase}.mp4`} type="video/mp4" />
      {/* Optional fallback text */}
      Sorry, your browser doesn’t support embedded videos.
    </video>
  );
}