import React from "react";

export default function SpaceVideoBackground() {
    // Path to the uploaded video (use this while testing here)
    const videoSrc = "https://fg6ae0196omuyqcy.public.blob.vercel-storage.com/vedio.mp4";

    // Recommended production path (uncomment to use after you copy the file to public/)
    // const videoSrc = "/videos/space-bg.mp4";

    return (
        <div className="space-video-wrapper" aria-hidden="true">
            <video
                className="space-video"
                src={videoSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
            // poster can be a small JPG/PNG fallback placed in public/
            // poster="/images/space-poster.jpg"
            />
            {/* subtle dark overlay so text stays readable */}
            <div className="space-video-overlay" />
        </div>
    );
}
