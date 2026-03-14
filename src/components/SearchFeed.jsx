import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos } from "./";

const SearchFeed = () => {
  const [videos, setVideos] = useState(null);
  const { searchTerm } = useParams();

  useEffect(() => {
    setVideos(null);
    if (!searchTerm) return;
    fetchFromAPI(`search/?q=${searchTerm}`)
      .then((data) => setVideos(data.contents?.map((item) => item.video) || []))
      .catch(() => setVideos([]));
  }, [searchTerm]);

  return (
    <Box p={2} minHeight="95vh" className="fade-in">
      <Box
        sx={{
          background: "rgba(10,15,36,0.7)",
          borderRadius: 3,
          p: 2,
          border: "1px solid rgba(255,255,255,0.08)",
          mb: 2,
        }}
      >
        <Typography variant="h4" fontWeight={900} color="white" mb={1}>
          Search Results
        </Typography>
        <Typography sx={{ color: "#c8d1ff" }}>
          Showing videos for{" "}
          <span style={{ color: "#FC1503" }}>{searchTerm}</span>
        </Typography>
      </Box>
      <Videos videos={videos} />
    </Box>
  );
};

export default SearchFeed;
