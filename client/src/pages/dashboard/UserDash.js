import React, { useState, useEffect } from 'react';
import './style.css';
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent, } from "react-pro-sidebar";
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import LastUpdated from '../lastUpdated';
import LastUpdPref from '../lastUpdPref';
import RndmMeal from '../RandomMeals';
import { Link } from 'react-router-dom';

const Dashboard = (props) => {

    const [menuCollapse, setMenuCollapse] = useState(false);
    // const [authenticated, setAuthenticated] = useState(false);
    const menuIconClick = () => {
        // switching menu collapse between true or false depending on state
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    const logout = () => {
        // Log user out
        // Remove token from local storage
        localStorage.removeItem("decodedTokenID");
        props.history.push("/Signin");
    }

    useEffect(() => {
        const userInfo = localStorage.getItem("decodedTokenID");
        if (userInfo) {
            // setAuthenticated(true);
        } else if (!userInfo) {
            // setAuthenticated(false);
            props.history.push("/Signin");
        }
        console.log(userInfo);
    })

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-2">
                        <div id="header" className="sidebar">
                            <ProSidebar collapsed={menuCollapse}>
                                <SidebarHeader >
                                    <div className="logo-text">
                                        Menu
                                    </div>
                                    <div className="closemenu" onClick={menuIconClick}>
                                        {/* changing menu collapse icon on click */}
                                        {menuCollapse ? (
                                            <FiArrowRightCircle />
                                        ) : (
                                                <FiArrowLeftCircle />
                                            )}
                                    </div>
                                </SidebarHeader>
                                <SidebarContent>
                                    <Menu iconShape="square">
                                        <MenuItem active={true} icon={<FaUser />}>
                                            Profile
                                        </MenuItem>
                                        <hr></hr>
                                        <MenuItem icon={<FaList />}><Link to={"/Meal"}>Get Daily Meal Plan</Link></MenuItem>
                                        <hr></hr>
                                        <MenuItem icon={<FaRegHeart />}>Favourites</MenuItem>
                                        <hr></hr>
                                        <MenuItem icon={<RiPencilLine />}><Link to={"/bmi"} >Update Stats </Link></MenuItem>
                                        <hr></hr>
                                        <MenuItem icon={<BiCog />}><Link to={"/DietPref"} >Update Dietary Preferences </Link></MenuItem>
                                        <hr></hr>
                                    </Menu>
                                </SidebarContent>
                                <SidebarFooter>
                                    <Menu iconShape="square">
                                        <MenuItem icon={<FiLogOut />} onClick={logout}>Logout</MenuItem>
                                    </Menu>
                                </SidebarFooter>
                            </ProSidebar>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div className="dashboard">
                            <div className="stats">
                                <h1 className="head"> Latest Stats</h1>
                                {/* <div> <LastUpdated />
                                    <LastUpdPref /></div>
                            </div> */}
                            <div className="todays-plan">
                                <div className="meals">
                                    breakfast
                                         </div>
                            </div>
                            <div className="upcoming">
                                <div className="upcoming">
                                    <h1>Upcoming meals</h1>
                                </div>
                            </div>
                            <div className="favorites">
                                <div className="favorites">
                                    <h1>Best meals</h1>
                                    <div>
                                        <RndmMeal />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;

