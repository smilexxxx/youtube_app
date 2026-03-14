import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Stack, Typography, Button } from "@mui/material";

import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [filter, setFilter] = useState("videos");

  const { id } = useParams();

  useEffect(() => {
    const fetchResults = async () => {
      const data = await fetchFromAPI(`channel/details/?id=${id}`);
      const channel = data?.channel || data?.author || data?.owner || data;
      setChannelDetail(channel);

      const channelTitle =
        channel?.title || channel?.name || channel?.metadata?.title || "";
      const channelId =
        channel?.channelId || channel?.id || channel?.channel?.id || "";

      const videosData = await fetchFromAPI(`channel/videos/?id=${id}`);
      const items = videosData?.contents || [];
      const normalizedVideos = items
        .map((item) => item.video || item)
        .filter(Boolean)
        .map((video) => ({
          ...video,
          channelTitle:
            video?.channelTitle ||
            video?.author?.title ||
            video?.snippet?.channelTitle ||
            channelTitle ||
            "Unknown Channel",
          author: {
            ...(video?.author || {}),
            title:
              video?.author?.title ||
              video?.snippet?.channelTitle ||
              channelTitle,
            channelId:
              video?.author?.channelId ||
              video?.snippet?.channelId ||
              video?.channelId ||
              channelId,
          },
          channelId: video?.channelId || channelId,
        }));
      setVideos(normalizedVideos);
    };

    fetchResults();
  }, [id]);

  const channel =
    channelDetail?.channel ||
    channelDetail?.author ||
    channelDetail?.owner ||
    channelDetail;

  const description =
    channel?.description ||
    channelDetail?.description ||
    "No channel details available.";

  const isLiveVideo = (video) => {
    return (
      video?.isLiveNow ||
      video?.video?.isLiveNow ||
      video?.isLive ||
      video?.video?.isLive ||
      video?.liveBroadcastContent === "live" ||
      video?.video?.liveBroadcastContent === "live" ||
      video?.badges?.some((badge) => /live/i.test(badge?.text || "")) ||
      video?.video?.badges?.some((badge) => /live/i.test(badge?.text || "")) ||
      false
    );
  };

  const filteredVideos = videos?.filter((video) => {
    if (filter === "live") {
      return isLiveVideo(video);
    }
    return true;
  });

  return (
    <Box minHeight="95vh" p={1}>
      <Box
        className="glass-card fade-in"
        sx={{
          borderRadius: 3,
          border: "1px solid rgba(255,255,255,0.12)",
          p: 2,
          background:
            "linear-gradient(120deg, rgba(1,7,25,0.96), rgba(8,24,60,0.9))",
        }}
      >
        <Stack
          spacing={2}
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
        >
          <ChannelCard channelDetail={channel} marginTop="0" />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" sx={{ color: "#fff", fontWeight: 700 }}>
              {channel?.title || channel?.name || "Unnamed Channel"}
            </Typography>
            <Typography variant="body2" sx={{ color: "#9da9ce", mt: 1 }}>
              {channel?.statistics?.subscribers
                ? `${parseInt(channel.statistics.subscribers).toLocaleString()} subscribers`
                : channel?.subscriberCount
                  ? `${parseInt(channel.subscriberCount).toLocaleString()} subscribers`
                  : "Subscriber count unavailable"}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#c6d0f0", mt: 1, whiteSpace: "pre-wrap" }}
            >
              {showMore
                ? description
                : description.slice(0, 220) +
                  (description.length > 220 ? "..." : "")}
            </Typography>
            {description.length > 220 && (
              <Button
                size="small"
                onClick={() => setShowMore((prev) => !prev)}
                sx={{ mt: 1, textTransform: "none", color: "#FC1503" }}
              >
                {showMore ? "Show less" : "Show more"}
              </Button>
            )}
          </Box>
        </Stack>
      </Box>

      <Box sx={{ mt: 2, p: 1 }}>
        <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 1 }}>
          <Typography variant="h5" sx={{ color: "#fff", fontWeight: 700 }}>
            Latest videos
          </Typography>
          <Button
            variant={filter === "videos" ? "contained" : "outlined"}
            size="small"
            onClick={() => setFilter("videos")}
            sx={{
              textTransform: "none",
              bgcolor: filter === "videos" ? "#FC1503" : "transparent",
            }}
          >
            Videos
          </Button>
          <Button
            variant={filter === "live" ? "contained" : "outlined"}
            size="small"
            onClick={() => setFilter("live")}
            sx={{
              textTransform: "none",
              bgcolor: filter === "live" ? "#FC1503" : "transparent",
            }}
          >
            Live
          </Button>
        </Stack>
        <Videos videos={filteredVideos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
