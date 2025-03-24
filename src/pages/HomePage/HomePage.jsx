import { Grid } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import HomeRight from "../../components/HomeRight/HomeRight";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const HomePage = () => {
  const location = useLocation();
  const { auth } = useSelector((store) => store);

  // Xác định khi nào hiển thị HomeRight
  const showHomeRight = useMemo(() => {
    return location.pathname.startsWith("/home") && !location.pathname.includes("/profile");
  }, [location.pathname]);

  return (
    <div className="px-20 h-screen flex flex-col">
      <Grid container spacing={2} className="h-full">
        {/* Sidebar (Chỉ hiển thị trên màn hình lớn) */}
        <Grid item xs={0} lg={3} className="hidden lg:block">
          <div className="sticky top-0 h-screen overflow-y-auto">
            <Sidebar />
          </div>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} lg={6} className="px-5 flex justify-center">
          <Outlet />
        </Grid>

        {/* HomeRight chỉ hiển thị nếu điều kiện đúng */}
        {showHomeRight && (
          <Grid item xs={0} lg={3} className="hidden lg:block">
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
