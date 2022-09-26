import { IconButton, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useSettings } from "../../core/contexts/SettingsProvider";

type AdminToolbarProps = {
  children?: React.ReactNode;
  title?: string;
};

const AdminToolbar = ({ children, title }: AdminToolbarProps) => {
  const { toggleDrawer } = useSettings();

  return (
    <Toolbar sx={{ px: { xs: 3, sm: 6 } }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={toggleDrawer}
        sx={{
          display: { lg: "none" },
          marginRight: 2,
        }}
      >
        <Menu />
      </IconButton>
      <Typography variant="h2" component="h1" sx={{ flexGrow: 1 }}>
        {title}
      </Typography>
      {children}
    </Toolbar>
  );
};

export default AdminToolbar;
