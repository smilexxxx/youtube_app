import React from "react";
import { Stack, Box, Typography } from "@mui/material";

import { ChannelCard, Loader, VideoCard } from "./";

const Videos = ({ videos, direction }) => {
  if (videos === null) return <Loader />;
  if (!videos?.length)
    return (
      <Box sx={{ mt: 2, px: 1 }}>
        <Typography variant="body1" color="#b8b8d2">
          No videos found.
        </Typography>
      </Box>
    );

  return (
    <Stack
      direction={direction || "row"}
      flexWrap="wrap"
      justifyContent="flex-start"
      alignItems="flex-start"
      gap={2}
    >
      {videos.map((item, idx) => {
        const videoId = item?.id?.videoId || item?.videoId;
        const channelId = item?.id?.channelId || item?.author?.channelId;

        return (
          <Box
            key={idx}
            sx={{ minWidth: direction === "column" ? "100%" : "280px" }}
          >
            {videoId && <VideoCard video={item} />}
            {!videoId && channelId && <ChannelCard channelDetail={item} />}
          </Box>
        );
      })}
    </Stack>
  );
};

export default Videos;
