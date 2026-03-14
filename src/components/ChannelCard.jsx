import React from "react";
import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";
import { demoProfilePicture } from "../utils/constants";

const ChannelCard = ({ channelDetail, marginTop }) => (
  <Box
    sx={{
      boxShadow: "0 10px 26px rgba(0,0,0,0.28)",
      borderRadius: "20px",
      justifyContent: "center",
      alignItems: "center",
      width: { xs: "100%", sm: "320px" },
      margin: "auto",
      marginTop,
      background: "rgba(15,19,48,0.8)",
      border: "1px solid rgba(255,255,255,0.08)",
      p: 1,
    }}
  >
    <Link
      to={`/channel/${
        channelDetail?.channelId ||
        channelDetail?.id ||
        channelDetail?.channel?.id ||
        channelDetail?.author?.channelId ||
        ""
      }`}
      style={{ textDecoration: "none" }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <CardMedia
          image={
            channelDetail?.avatar?.[0]?.url ||
            channelDetail?.thumbnails?.[0]?.url ||
            channelDetail?.thumbnail?.[0]?.url ||
            channelDetail?.profilePicture?.url ||
            channelDetail?.bestAvatar?.url ||
            channelDetail?.thumbnails?.[0]?.url ||
            channelDetail?.channel?.avatar?.[0]?.url ||
            channelDetail?.channel?.thumbnail?.[0]?.url ||
            demoProfilePicture
          }
          alt={
            channelDetail?.title ||
            channelDetail?.name ||
            channelDetail?.channel?.title ||
            "Channel"
          }
          sx={{
            borderRadius: "50%",
            height: "140px",
            width: "140px",
            mb: 2,
            border: "2px solid #FC1503",
            margin: "0 auto",
          }}
        />
        <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700 }}>
          {channelDetail?.title || channelDetail?.name || "Channel"}{" "}
          <CheckCircleIcon
            sx={{ fontSize: "14px", color: "#FC1503", ml: "5px" }}
          />
        </Typography>
        {(channelDetail?.stats?.subscribers ||
          channelDetail?.subscriberCount) && (
          <Typography
            sx={{ fontSize: "14px", fontWeight: 500, color: "#b8b8d2", mt: 1 }}
          >
            {parseInt(
              channelDetail?.stats?.subscribers ||
                channelDetail?.subscriberCount ||
                0,
            ).toLocaleString("en-US")}{" "}
            subscribers
          </Typography>
        )}
      </CardContent>
    </Link>
  </Box>
);

export default ChannelCard;
