import { AddBox, Home, LocalHospital, Logout, Message, NotificationAdd, Notifications, Search, VideoCameraBackOutlined, VideoLibrary } from "@mui/icons-material";
import { Drawer, Grid2, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, Typography } from "@mui/material";
import { useState } from "react";
import { BiUser, BiUserCircle } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { FaUserFriends } from "react-icons/fa";
import axios from "axios";

export default function Sidebar() {

    const [list, setlist] = useState([
        { link: "/Home", icon: <Home />, name: "Home" },
        { link: "/search", icon: <Search />, name: "Search" },
        { link: "/create", icon: <LocalHospital />, name: "Create" },
        { link: "/Message", icon: <Message />, name: "Message" },
        // { link: "/Reels", icon: <VideoLibrary />, name: "Reels" },
        { link: "/Friendss", icon: <FaUserFriends size={22} />, name: "Friends" },
        { link: "/Profile", icon: <BiUserCircle size={27} />, name: "Profile" },
    ]);

    const [open, setopen] = useState(false);

    function submitpost(e) {
        e.preventDefault();
        var data = new FormData(e.currentTarget);
        var name = data.get("name");
        var url = data.get("url");
        var caption = data.get("caption");
        var id = localStorage.getItem("userlogin")

        axios.post("http://localhost:1000/submitposts", {
            Name: name,
            Url: url,
            Caption: caption,
            Id: id
        }).then((succ) => {
            if (succ.data == "ok") {
                alert("post added");
                e.target.reset();
                e.target.url.focus();
            }
        })
    }

    var id = localStorage.getItem('userlogin');

    var navi = useNavigate();

    function logoutt() {

        if (id) {
            localStorage.removeItem('userlogin');
            navi("/");
        }
    }

    const [users, setusers] = useState([]);
    const [query, setquery] = useState("");

    function handlesearch(e) {
        const searchvalue = e.target.value;
        // console.log(searchvalue);

        if (searchvalue.length > 2) {
            axios.get(`http://localhost:1000/searchvalue?Name=${searchvalue}`
            ).then((Succc) => {
                console.log(Succc);
                setusers(Succc.data);
                // setusers(Succc.data);
            })
        } else {
            setusers([]);
        }
    }
    const [openDrawer, setOpenDrawer] = useState(false);
    const [activeButton, setActiveButton] = useState(useLocation().pathname);


    return (
        <>
            <div className="d-none d-lg-block bg-light vh-100 position-fixed px-3 py-4" style={{ width: "240px" }}>
                <List className="vh-100 position-sticky top-0">
                    <Typography variant="h5" color="primary" className="fw-bold py-1 px-0 justify-content-start py-3 px-4 mt-3 mb-2" fontFamily={"cursive"}>FriendsBook</Typography>

                    {list.map((row, index) => (
                        <>
                            {row.link == "/search" ? (
                                <>
                                    <ListItemButton onClick={() => {
                                        setopen(true);
                                    }}
                                        className={`px-2 mb-2 py-2 ms-3 me-2 my-button ${activeButton === row.link ? "active bg-primary text-white" : ""}`}>
                                        <ListItemIcon className={`${activeButton === row.link ? "text-white" : "text-dark"} my-icon`}>
                                            {row.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={row.name} />
                                    </ListItemButton>
                                </>
                            ) : row.link == "/create" ? (
                                <ListItemButton className={`px-2 mb-2 py-2 ms-3 me-2 my-button ${activeButton === row.link ? "active bg-primary text-white" : ""}`} data-bs-toggle="modal" data-bs-target="#mymod"
                                // onClick={() => setActiveButton(row.link)}
                                >
                                    <ListItemIcon className={`${activeButton === row.link ? "text-white" : "text-dark"} my-icon`}>
                                        <LocalHospital />
                                    </ListItemIcon>
                                    <ListItemText primary="Create" />
                                </ListItemButton>
                            ) : (
                                // <ListItem className="px-2 py-2 mb-2 w-100">
                                <Link className="text-decoration-none w-100  text-dark" to={row.link}>
                                    <ListItemButton
                                        // onClick={() => setActiveButton(row.link)}
                                        className={`px-2 mb-2 py-2 ms-3 me-2 my-button ${activeButton === row.link ? "active bg-primary text-white" : ""}`}>
                                        <ListItemIcon className={`${activeButton === row.link ? "text-white" : "text-dark"} my-icon`}>
                                            {row.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={row.name} />
                                    </ListItemButton>
                                </Link>
                                // </ListItem>
                            )}
                            {index == 5 && (
                                <ListItemButton className="px-2 mb-2 py-2 ms-3 me-2 mttt text-danger my-button" onClick={() => logoutt(row._id)}>
                                    <ListItemIcon className="text-danger my-icon">
                                        <Logout />
                                    </ListItemIcon>
                                    <ListItemText primary="Logout" />
                                </ListItemButton>
                            )}
                        </>
                    ))}
                </List >
            </div>


            <div className="d-lg-none">
                <IconButton className="m-2" onClick={() => setOpenDrawer(true)}>
                    <MenuIcon />
                </IconButton>
                <Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
                    <div className="p-3" style={{ width: "240px" }}>
                        <Typography variant="h5" className="fw-bold text-primary mb-4">FriendsBook</Typography>
                        <List>
                            {list.map((row, index) => (
                                <>
                                    <ListItem className="mb-2">
                                        {row.link === "/search" ? (
                                            <ListItemButton onClick={() => setopen(true)} className="my-button">
                                                <ListItemIcon className="my-icon">
                                                    {row.icon}
                                                </ListItemIcon>
                                                <ListItemText primary={row.name} />
                                            </ListItemButton>
                                        ) : row.link === "/create" ? (
                                            <ListItemButton data-bs-toggle="modal" data-bs-target="#mymod" className="my-button">
                                                <ListItemIcon className="my-icon">
                                                    <AddBox />
                                                </ListItemIcon>
                                                <ListItemText primary="Create" />
                                            </ListItemButton>
                                        ) : (
                                            <Link to={row.link} className="text-decoration-none text-dark w-100">
                                                <ListItemButton className="my-button">
                                                    <ListItemIcon className="my-icon">
                                                        {row.icon}
                                                    </ListItemIcon>
                                                    <ListItemText primary={row.name} />
                                                </ListItemButton>
                                            </Link>
                                        )}
                                    </ListItem>
                                    {index == 5 && (
                                        <ListItemButton className="px-2 mb-2 py-2 ms-3 me-2 mttt text-danger my-button" onClick={() => logoutt(row._id)}>
                                            <ListItemIcon className="text-danger my-icon">
                                                <Logout />
                                            </ListItemIcon>
                                            <ListItemText primary="Logout" />
                                        </ListItemButton>
                                    )}
                                </>
                            ))}
                        </List>
                    </div>
                </Drawer>
            </div>

            <div className="modal fade" id="mymod">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="fw-bold">Create new post</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={submitpost}>
                                <input type="name" placeholder="Add name" className="form-control mb-2" name="name" />
                                <input type="url" placeholder="Add url" className="form-control mb-2" name="url" />
                                <input type="text" placeholder="Add Caption" className="form-control mb-2" name="caption" />
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Share Post</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Drawer onClose={() => setopen(false)} open={open}>
                <Grid2 width={393} overflow={"hidden"} >
                    <Grid2 display={"flex"} >
                        <Grid2 sx={{ overflowX: "hidden", position: "sticky", top: 0, borderRight: "1px solid #ddd" }}>
                            <List>
                                {list.map((row, index) => (
                                    <>
                                        <ListItem className="px-2 py-3 mb-2 w-100">
                                            {/* <Link className='text-decoration-none text-dark' to={row.link}> */}
                                            <ListItemButton onClick={() => setopen(true)} className="w-100 p-3 py-2">
                                                <ListItemIcon className="text-dark">
                                                    {row.icon}
                                                </ListItemIcon>
                                            </ListItemButton>
                                            {/* </Link> */}
                                        </ListItem>
                                        {index == 4 && (
                                            <Grid2 marginTop={30.7} />
                                        )}
                                    </>
                                ))}
                            </List>
                        </Grid2>
                        <Grid2>
                            <Typography variant="h5" className="mt-2 ms-2">Search</Typography>
                            <form className="input-group mt-4 ms-2 w-100">
                                <input type="text" className="form-control" placeholder="Search" name="search" onChange={handlesearch} />
                                <button className="btn btn-light p-0 m-0">
                                    <IconButton type="submit" className="text-dark">
                                        <Search />
                                    </IconButton>
                                </button>
                            </form>
                            <hr className="w-100" />
                            <ul className="list-group p-0 m-0">
                                {users.map((row) => (
                                    <>
                                        <Link to={"/Viewprofile?id=" + row._id} className="text-decoration-none">
                                            <li className="list-group-item ms-2">{row.Name}</li>
                                        </Link>
                                    </>
                                ))}
                            </ul>
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Drawer>
        </>
    )
}