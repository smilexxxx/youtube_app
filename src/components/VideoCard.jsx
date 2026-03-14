import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
} from "../utils/constants";

const VideoCard = ({ video }) => {
  const videoId =
    video?.videoId || video?.id?.videoId || video?.id || video?.video?.id;
  const title =
    video?.title ||
    video?.video?.title ||
    video?.snippet?.title ||
    video?.video?.snippet?.title;
  const channelTitle =
    video?.author?.title ||
    video?.author?.name ||
    video?.channelTitle ||
    video?.owner?.title ||
    video?.owner?.name ||
    video?.video?.author?.title ||
    video?.video?.author?.name ||
    video?.snippet?.channelTitle ||
    video?.video?.snippet?.channelTitle ||
    video?.channel?.name ||
    video?.video?.channelName ||
    video?.channel?.title ||
    video?.video?.channel?.title ||
    video?.author?.channelName ||
    "Unknown Channel";
  const channelId =
    video?.author?.channelId ||
    video?.channelId ||
    video?.channel?.id ||
    video?.owner?.channelId ||
    video?.video?.author?.channelId ||
    video?.snippet?.channelId ||
    video?.video?.snippet?.channelId ||
    video?.video?.channelId ||
    video?.author?.id ||
    video?.video?.channel?.id ||
    "";

  const thumbnail =
    video?.thumbnails?.[0]?.url ||
    video?.thumbnails?.[0]?.thumbnails?.[0]?.url ||
    video?.videoThumbnails?.[0]?.url ||
    video?.video?.thumbnails?.[0]?.url ||
    video?.snippet?.thumbnails?.[0]?.url ||
    video?.video?.snippet?.thumbnails?.[0]?.url ||
    video?.author?.avatar?.[0]?.url ||
    demoThumbnailUrl;

  const onImgError = (event) => {
    event.target.src = demoThumbnailUrl;
  };

  const isLive =
    video?.isLiveNow ||
    video?.video?.isLiveNow ||
    video?.video?.isLive ||
    false;

  const publishedTime =
    video?.publishedTimeText ||
    video?.video?.publishedTimeText ||
    video?.publishedTime ||
    "";

  return (
    <Card
      sx={{
        width: { xs: "100%", sm: "358px", md: "320px" },
        boxShadow: "0 8px 20px rgba(0,0,0,0.24)",
        borderRadius: 3,
        overflow: "hidden",
        position: "relative",
      }}
      className="glow-hover fade-in"
    >
      <Link to={videoId ? `/video/${videoId}` : `/video/cV2gBU6hKfY`}>
        <CardMedia
          component="img"
          src={thumbnail}
          alt={title}
          onError={onImgError}
          sx={{ width: "100%", height: 200, objectFit: "cover" }}
        />
      </Link>
      {isLive && (
        <Box
          sx={{
            position: "absolute",
            bottom: 10,
            right: 10,
            bgcolor: "rgba(0,0,0,0.75)",
            color: "white",
            px: 1,
            py: 0.3,
            borderRadius: 0.7,
            fontSize: "0.65rem",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 0.25,
            zIndex: 2,
          }}
        >
          <Box
            sx={{ width: 6, height: 6, bgcolor: "#f00", borderRadius: "50%" }}
          />
          LIVE
        </Box>
      )}
      <CardContent sx={{ backgroundColor: "#101828", minHeight: 120 }}>
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color="#fff"
            sx={{ fontSize: "0.95rem", mb: 0.5 }}
          >
            {title?.slice(0, 55) || demoVideoTitle?.slice(0, 55)}
          </Typography>
        </Link>
        <Link to={channelId ? `/channel/${channelId}` : demoChannelUrl}>
          <Typography
            variant="subtitle2"
            color="#b8b8d2"
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
          >
            {channelTitle || "Unknown Channel"}
            <CheckCircleIcon sx={{ fontSize: 13, color: "#FC1503" }} />
          </Typography>
        </Link>
        {publishedTime && (
          <Typography variant="caption" color="#94a3b8" sx={{ mt: 0.5 }}>
            {publishedTime}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoCard;
