// Import necessary Ant Design icons
import {
    AppstoreOutlined,
    ContainerOutlined,
    BookOutlined,
    LeftOutlined,
    HomeOutlined,
    HighlightOutlined,
    PieChartOutlined,
    RightOutlined,
    FolderOpenOutlined,
    CalendarOutlined
} from "@ant-design/icons";

// Import Ant Design components: Button and Menu
import { Button, Menu } from "antd";

// Import React Hooks: useState and useEffect
import { useState, useEffect } from "react";

// Import custom CSS for the Navbar component
import "../components/styles/Navbar.css";

import {motion } from "framer-motion"
import { useNavigate } from "react-router-dom";




// Define menu items and submenus for the navbar




// Navbar functional component
const Navbar = () => {
    const navigate = useNavigate();

    // Helper function to create menu items with their properties
    function getItem(label, key, icon, children, type, path, link) {
        return {
            key,
            icon,
            children,
            label,
            type,
            path,
            link
        };
    }
    const items = [
        getItem('Tableau de bord', '1', <HomeOutlined />, null, null, null, '/dashboard'),
        getItem('Cours', '2', <BookOutlined />, null, null, null, '/units'),
        getItem('Calendrier', '4', <CalendarOutlined />),
        getItem('Notes', '3', <HighlightOutlined />),
        getItem('Fichiers', '4', <FolderOpenOutlined />),
    
    ];

    useEffect(() => {
        
        const cookies = document.cookie.split("; ");
        const collapsedCookie = cookies.find(cookie => cookie.startsWith("collapsed="));
        const isCollapsed = collapsedCookie ? collapsedCookie.split("=")[1] === "true" : false;
        setCollapsed(isCollapsed);

        const pagecontent = document.querySelector('.content');

        if (isCollapsed) {
            pagecontent.style.paddingLeft = '100px';

        } else {
            pagecontent.style.paddingLeft = '17em';
        }

    }, []);


    // State for collapsed status of the navbar
    const [collapsed, setCollapsed] = useState(false);

    // Function to toggle the collapsed state of the navbar
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
        // Adjust the padding of the page content based on the collapsed state
        const pagecontent = document.querySelector('.content');
    
        if (collapsed) {

            pagecontent.style.paddingLeft = '17em';
        } else {

            pagecontent.style.paddingLeft = '100px';
        }

        // Store the collapsed state in a cookie to remember user's preference
        document.cookie = "collapsed=" + !collapsed + "; expires=" + new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
    };

    // Set the button size based on the collapsed state
    const buttonSize = collapsed ? '80px' : '100%';
    // useEffect Hook to handle the initial collapsed state and adjust the padding accordingly
 

    let navdiv = collapsed ? '0' : '15rem'
    
    // Render the Navbar component
    return (
        <motion.div
        initial={{ x:-200}}
            animate={{ x:0}}
            transition={{ duration: 1.5}}>
        <div className="navbar">
            <div className="navbar-div" style={{width:`${navdiv}`, height: '100%' }}>
                <Button
                    id="navcollapse"
                    style={{ width: buttonSize }}
                    onClick={toggleCollapsed}
                    type="primary"
                    icon=<LeftOutlined/>
                ></Button>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="light"
                    inlineCollapsed={collapsed}
                    items={items}
                    onClick={({ item, key, keyPath, domEvent }) => {
                        navigate(item.props.link);}}
            
                />
            </div>
        </div>
        </motion.div>
    );
};

// Export the Navbar component
export default Navbar;