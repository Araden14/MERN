import { React, useState } from "react"
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "components/Navbar";
import { useGetUserQuery } from "state/api";
import TopNav from "components/styles/TopNav";

const GlobalM = () => {


    return (
        <Box width="100%" height="100%">
            <Navbar/>
            <Box>
                <TopNav/>
                <div className="content">
            <Outlet/>
            </div>
            </Box>
        </Box>
    )
}

export default GlobalM;