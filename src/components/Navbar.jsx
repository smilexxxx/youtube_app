import { Stack, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { logo } from "../utils/constants";
import { SearchBar } from "./";

const Navbar = () => (
  <Stack
    direction="row"
    alignItems="center"
    p={2}
    sx={{
      position: "sticky",
      background:
        "linear-gradient(90deg, rgba(3,10,30,0.96), rgba(8,18,60,0.95))",
      borderBottom: "1px solid rgba(255,255,255,0.12)",
      top: 0,
      justifyContent: "space-between",
      zIndex: 40,
      width: "100%",
    }}
  >
    <Link to="/" style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <img src={logo} alt="logo" height={45} />
      <Typography sx={{ fontWeight: 800, letterSpacing: 0.3, color: "#fff" }}>
        PipeTube
      </Typography>
    </Link>
    <Stack direction="row" alignItems="center" gap={1}>
      <SearchBar />
      <Button
        size="small"
        sx={{
          textTransform: "none",
          background: "linear-gradient(90deg, #FC1503, #F57C00)",
          color: "#fff",
          "&:hover": { opacity: 0.9 },
        }}
      >
        Upgrade
      </Button>
    </Stack>
  </Stack>
);

export default Navbar;
