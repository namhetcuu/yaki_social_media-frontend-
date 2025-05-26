import { Grid, Drawer, IconButton } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import HomeRight from "../../components/HomeRight/HomeRight";
import { Outlet, useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import InfoIcon from "@mui/icons-material/Info";

const HomePage = () => {
  const location = useLocation();
  const { auth } = useSelector((store) => store);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const [homeRightOpen, setHomeRightOpen] = useState(false);
  const toggleHomeRight = () => setHomeRightOpen(!homeRightOpen);

  const showHomeRight = useMemo(() => {
    return location.pathname.startsWith("/home") &&
           !location.pathname.includes("/profile");
  }, [location.pathname]);

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Sidebar toggle button - only visible on mobile & tablets */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <IconButton onClick={toggleDrawer} className="text-white bg-blue-600 hover:bg-blue-700">
          <MenuIcon />
        </IconButton>
      </div>

      {/* HomeRight toggle button - only visible if showHomeRight is true */}
      {showHomeRight && (
        <div className="lg:hidden fixed top-4 right-4 z-50">
          <IconButton
            onClick={toggleHomeRight}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            <InfoIcon />
          </IconButton>
        </div>
      )}

      {/* Drawer for Sidebar */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <div className="w-72 p-4">
          <Sidebar />
        </div>
      </Drawer>

      {/* Drawer for HomeRight */}
      <Drawer anchor="right" open={homeRightOpen} onClose={toggleHomeRight}>
        <div className="w-73 p-4">
          <HomeRight />
        </div>
      </Drawer>

      <Grid container spacing={0} className="h-full">
        {/* Sidebar - hidden on screens <1024px */}
        <Grid item
          xs={0}
          sm={0}
          md={0}
          lg={3}
          xl={2}
          className="hidden lg:block"
        >
          <div className="sticky top-0 h-screen overflow-y-auto">
            <Sidebar />
          </div>
        </Grid>

        {/* Main Content */}
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={showHomeRight ? 6 : 9}
          xl={showHomeRight ? 7 : 10}
          className="px-2 sm:px-4 md:px-6 flex justify-center"
        >
          <Outlet />
        </Grid>

        {/* HomeRight - only show from lg and up */}
        {showHomeRight && (
          <Grid
            item
            xs={0}
            sm={0}
            md={0}
            lg={3}
            xl={3}
            className="hidden lg:block"
          >
            <div className="sticky top-0 h-screen overflow-y-auto">
              <HomeRight />
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default HomePage;
