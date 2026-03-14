import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";

import {
  ChannelDetail,
  VideoDetail,
  SearchFeed,
  Navbar,
  Feed,
} from "./components";

const MobileBottomNav = () => {
  const [value, setValue] = useState("home");
  const navigate = useNavigate();

  const onChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === "home") navigate("/");
    if (newValue === "search") navigate("/search/react");
    if (newValue === "feed") navigate("/");
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: { xs: "block", md: "none" },
        zIndex: 999,
      }}
      elevation={8}
    >
      <BottomNavigation value={value} onChange={onChange} showLabels>
        <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} />
        <BottomNavigationAction
          label="Search"
          value="search"
          icon={<SearchIcon />}
        />
        <BottomNavigationAction
          label="Browse"
          value="feed"
          icon={<VideoLibraryIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};

const App = () => (
  <BrowserRouter>
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #070A16 0%, #0D1D44 45%, #090f2d 100%)",
        pb: { xs: 7, md: 0 },
      }}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/video/:id" element={<VideoDetail />} />
        <Route path="/channel/:id" element={<ChannelDetail />} />
        <Route path="/search/:searchTerm" element={<SearchFeed />} />
      </Routes>
      <MobileBottomNav />
    </Box>
  </BrowserRouter>
);

export default App;
