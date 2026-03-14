import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos, Sidebar } from "./";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    setVideos(null);

    fetchFromAPI(`search/?q=${selectedCategory}`).then((data) =>
      setVideos(data.contents?.map((item) => item.video) || []),
    );
  }, [selectedCategory]);

  return (
    <Stack
      sx={{
        flexDirection: { sx: "column", md: "row" },
        p: 1,
        width: "100%",
        overflow: "hidden",
      }}
      className="fade-in"
    >
      <Box
        sx={{
          width: { xs: "100%", md: "280px" },
          minWidth: { md: "230px" },
          height: { sx: "auto", md: "92vh" },
          borderRight: { md: "1px solid rgba(255, 255, 255, 0.08)" },
          px: { sx: 0, md: 2 },
          background: "rgba(10,15,36,0.56)",
          borderRadius: { xs: 2, md: "20px" },
          m: { xs: 0, md: 2 },
        }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ color: "#fff", mb: 1 }}
          >
            Trending Tags
          </Typography>
        </Box>
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "#fff", px: 2 }}
        >
          Copyright © 2022 pipe-tube
        </Typography>
      </Box>

      <Box
        p={2}
        sx={{ overflowY: "auto", height: "90vh", flex: 2, m: { xs: 1, md: 0 } }}
      >
        <Box
          sx={{
            mb: 2,
            p: 3,
            borderRadius: 3,
            background:
              "linear-gradient(120deg, rgba(6, 8, 23, 0.9), rgba(12, 27, 81, 0.8))",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 10px 24px rgba(0,0,0,0.35)",
          }}
        >
          <Typography variant="h4" fontWeight="bold" sx={{ color: "#fff" }}>
            Discover{" "}
            <span style={{ color: "#FC1503" }}>{selectedCategory}</span> videos
          </Typography>
          <Typography sx={{ color: "#ccc", mt: 1 }}>
            Curated results with smooth scrolling and sleek card hover
            animation.
          </Typography>
        </Box>

        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
