import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Typography,
  Box,
  Stack,
  Button,
  IconButton,
  Paper,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ShareIcon from "@mui/icons-material/Share";
import EmailIcon from "@mui/icons-material/Email";
import RedditIcon from "@mui/icons-material/Reddit";

import { Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setVideoDetail(null);
    setVideos(null);
    if (!id) return;

    fetchFromAPI(`video/details/?id=${id}`)
      .then((data) => {
        const videoData = data?.video || data;
        setVideoDetail(videoData);
      })
      .catch(() => setVideoDetail(null));
  }, [id]);

  useEffect(() => {
    if (!videoDetail?.title) return;
    const currentVideoId =
      id ||
      videoDetail?.videoId ||
      videoDetail?.id?.videoId ||
      videoDetail?.id ||
      videoDetail?.video?.videoId ||
      "";

    fetchFromAPI(`search/?q=${encodeURIComponent(videoDetail.title)}`)
      .then((data) => {
        const nextVideos =
          data.contents
            ?.map((item) => item.video)
            .filter(
              (video) =>
                (video?.videoId || video?.id?.videoId || video?.id || "") !==
                currentVideoId,
            ) || [];
        setVideos(nextVideos);
      })
      .catch(() => setVideos([]));
  }, [
    videoDetail?.title,
    videoDetail?.videoId,
    videoDetail?.id?.videoId,
    videoDetail?.id,
    videoDetail?.video?.videoId,
    id,
  ]);

  const resolvedVideoId =
    id ||
    videoDetail?.videoId ||
    videoDetail?.id?.videoId ||
    videoDetail?.id ||
    videoDetail?.video?.videoId ||
    "";

  const title =
    videoDetail?.title ||
    videoDetail?.video?.title ||
    videoDetail?.videoTitle ||
    "Untitled video";
  const author =
    videoDetail?.author || videoDetail?.video?.author || videoDetail?.channel;
  const description =
    videoDetail?.description ||
    videoDetail?.video?.description ||
    videoDetail?.shortDescription ||
    "No description available.";
  const viewCount =
    videoDetail?.viewCount ||
    videoDetail?.stats?.views ||
    videoDetail?.video?.stats?.views ||
    videoDetail?.video?.viewCount ||
    0;
  const likeCount =
    videoDetail?.stats?.likes ||
    videoDetail?.video?.stats?.likes ||
    videoDetail?.likeCount ||
    0;

  const publishedTime =
    videoDetail?.publishedTimeText ||
    videoDetail?.video?.publishedTimeText ||
    videoDetail?.publishedTime ||
    videoDetail?.publishedAt ||
    videoDetail?.video?.publishedAt ||
    videoDetail?.snippet?.publishedAt ||
    videoDetail?.video?.snippet?.publishedAt ||
    videoDetail?.published?.timeText ||
    videoDetail?.video?.published?.timeText ||
    videoDetail?.datePublished ||
    "";

  const isLive =
    videoDetail?.isLiveNow ||
    videoDetail?.video?.isLiveNow ||
    videoDetail?.isLive ||
    false;

  const channelId = author?.channelId || author?.id;
  const channelTitle = author?.title || author?.name || "Unknown Channel";

  if (!resolvedVideoId) {
    return (
      <Box minHeight="95vh" p={2}>
        <Typography variant="h5" color="error">
          Video ID unavailable. Please retry from home.
        </Typography>
      </Box>
    );
  }

  const shortDescription = description
    ? description.slice(0, 190)
    : "No description available.";

  const shareLink = window.location.href;
  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
    } catch (err) {
      // ignore clipboard errors
    }
  };

  return (
    <Box minHeight="95vh" p={1} sx={{ height: "calc(100vh - 16px)" }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        gap={2}
        alignItems="stretch"
        sx={{ height: "100%" }}
      >
        <Box
          flex={2}
          className="glass-card fade-in"
          sx={{
            p: 1,
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          <Box
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
              position: "relative",
              paddingTop: "56.25%",
            }}
          >
            <iframe
              title={title}
              src={`https://www.youtube.com/embed/${resolvedVideoId}?rel=0&modestbranding=1&iv_load_policy=3&controls=1&showinfo=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "0",
              }}
            />
            <Button
              onClick={() => setOpenShare((prev) => !prev)}
              sx={{
                position: "absolute",
                bottom: 12,
                left: 12,
                zIndex: 10,
                minWidth: 0,
                p: 0.5,
                borderRadius: 2,
                backgroundColor: "rgba(0,0,0,0.5)",
                color: "#fff",
                "&:hover": { backgroundColor: "rgba(0,0,0,0.65)" },
                display: "flex",
                alignItems: "center",
                gap: 0.3,
              }}
              size="small"
            >
              <ShareIcon fontSize="small" />
              <Typography
                variant="caption"
                sx={{ color: "#fff", fontWeight: 700 }}
              >
                Share
              </Typography>
            </Button>
            {openShare && (
              <Paper
                elevation={10}
                sx={{
                  position: "absolute",
                  top: 42,
                  right: 12,
                  zIndex: 11,
                  width: 260,
                  bgcolor: "#fff",
                  color: "#000",
                  p: 1.25,
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ mb: 0.75, fontWeight: 700 }}
                >
                  Share
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "#f0f4ff",
                    borderRadius: 1,
                    p: 0.5,
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#111",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      flex: 1,
                    }}
                  >
                    {`https://youtu.be/${resolvedVideoId}`}
                  </Typography>
                  <IconButton
                    onClick={copyShareLink}
                    size="small"
                    sx={{ color: "#0f1f67" }}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}
                >
                  <Button
                    variant="text"
                    startIcon={<WhatsAppIcon fontSize="small" />}
                    sx={{
                      justifyContent: "flex-start",
                      textTransform: "none",
                      color: "#111",
                    }}
                    onClick={() =>
                      window.open(
                        `https://api.whatsapp.com/send?text=${encodeURIComponent(shareLink)}`,
                        "_blank",
                      )
                    }
                  >
                    WhatsApp
                  </Button>
                  <Button
                    variant="text"
                    startIcon={<FacebookIcon fontSize="small" />}
                    sx={{
                      justifyContent: "flex-start",
                      textTransform: "none",
                      color: "#111",
                    }}
                    onClick={() =>
                      window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`,
                        "_blank",
                      )
                    }
                  >
                    Facebook
                  </Button>
                  <Button
                    variant="text"
                    startIcon={<TwitterIcon fontSize="small" />}
                    sx={{
                      justifyContent: "flex-start",
                      textTransform: "none",
                      color: "#111",
                    }}
                    onClick={() =>
                      window.open(
                        `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareLink)}`,
                        "_blank",
                      )
                    }
                  >
                    X
                  </Button>
                  <Button
                    variant="text"
                    startIcon={<EmailIcon fontSize="small" />}
                    sx={{
                      justifyContent: "flex-start",
                      textTransform: "none",
                      color: "#111",
                    }}
                    onClick={() =>
                      window.open(
                        `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareLink)}`,
                        "_blank",
                      )
                    }
                  >
                    Email
                  </Button>
                  <Button
                    variant="text"
                    startIcon={<RedditIcon fontSize="small" />}
                    sx={{
                      justifyContent: "flex-start",
                      textTransform: "none",
                      color: "#111",
                    }}
                    onClick={() =>
                      window.open(
                        `https://www.reddit.com/submit?url=${encodeURIComponent(shareLink)}&title=${encodeURIComponent(title)}`,
                        "_blank",
                      )
                    }
                  >
                    Reddit
                  </Button>
                </Box>
              </Paper>
            )}
          </Box>

          <Box sx={{ p: 2, flex: 1, minHeight: 0, overflowY: "auto" }}>
            <Stack direction="row" alignItems="center" gap={1}>
              <Typography variant="h5" fontWeight="bold" color="#fff" mb={1}>
                {title}
              </Typography>
              {isLive && (
                <Box
                  sx={{
                    color: "#fff",
                    bgcolor: "#e50914",
                    px: 1,
                    py: 0.4,
                    borderRadius: 1,
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    ml: 1,
                  }}
                >
                  LIVE
                </Box>
              )}
            </Stack>
            {publishedTime && (
              <Typography variant="body2" sx={{ color: "#9ca4cc", mb: 1 }}>
                {publishedTime}
              </Typography>
            )}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              sx={{ color: "#e8e8f1" }}
              gap={1}
            >
              <Link
                to={`/channel/${channelId}`}
                style={{ textDecoration: "none" }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "#fff",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  {channelTitle}
                  <CheckCircleIcon
                    sx={{ fontSize: "14px", color: "#FC1503" }}
                  />
                </Typography>
              </Link>
              <Typography variant="body2" sx={{ color: "#b6b6d3" }}>
                {(Number(viewCount) || 0).toLocaleString()} views •{" "}
                {(Number(likeCount) || 0).toLocaleString()} likes
              </Typography>
            </Stack>
            <Box sx={{ mt: 2, background: "#0e1335", p: 2, borderRadius: 2 }}>
              {publishedTime && (
                <Typography
                  variant="caption"
                  sx={{ color: "#9ca4cc", display: "block", mb: 1 }}
                >
                  Posted: {publishedTime}
                </Typography>
              )}
              <Typography
                variant="body2"
                sx={{ color: "#cfd1e5", whiteSpace: "pre-wrap" }}
              >
                {showMore ? description : shortDescription}
                {description && description.length > 190 ? "..." : ""}
              </Typography>
              {description && description.length > 190 && (
                <Typography
                  color="#FC1503"
                  sx={{ cursor: "pointer", mt: 1 }}
                  onClick={() => setShowMore((prev) => !prev)}
                >
                  {showMore ? "Show less" : "Show more"}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>

        <Box
          flex={1}
          className="glass-card fade-in"
          sx={{
            p: 2,
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          <Typography
            variant="h6"
            sx={{ mb: 1, color: "#fff", fontWeight: 700 }}
          >
            Up Next
          </Typography>
          <Box
            sx={{ flex: 1, minHeight: 0, overflowY: "auto", maxHeight: "100%" }}
          >
            <Videos videos={videos} direction="column" />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
