import { Avatar, Box, CardMedia, Grid2, IconButton, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import { Comment, FavoriteBorder, MoreHoriz } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function Home() {

    var ids = new URLSearchParams(useLocation().search).get("id");

    const [posts, setposts] = useState([]);

    function fetchposts() {
        axios.post("https://backendfriendsbook.onrender.com/fetchallposts").then((succ) => {
            setposts(succ.data);
            // console.log(succ.data);
        })
    }

    useEffect(() => {
        fetchposts();
    }, [])

    const navi = useNavigate();
    const [frnd, setfrnd] = useState([]);

    const [friend, setfriend] = useState([]);

    var id = localStorage.getItem('userlogin');

    function fetchotherusers() {
        if (id) {
            axios.post("https://backendfriendsbook.onrender.com/fetchotherusers").then((succ) => {
                console.log(succ.data);
                var aaa = succ.data.filter((row) => {
                    if (row._id != id) {
                        return row;
                    }
                });
                setfrnd(aaa)
                setfriend(succ.data)

            })
        }
    }

    useEffect(() => {
        fetchotherusers();
    }, [id])

    // const [pic, setpic] = useState({ Url: "" });

    // function fetchpicofusers() {
    //     // console.log();
    //     axios.post("https://backendfriendsbook.onrender.com/fetchpicofusers", {
    //         Id: ids
    //     }).then((succ) => {
    //         setpic(succ.data);
    //         console.log();
    //     })
    // }
    // useEffect(() => {
    //     fetchpicofusers();
    // }, [ids])

    return (
        <>
            <div className="row m-0">
                <div>
                    <Sidebar />
                </div>
                <div className="col-lg-8 offset-lg-2 col-md-12 col-sm-12 col-12 my-auto">
                    {posts.map((row) => (
                        <>
                            <div className="col-lg-5 col-md-8 col-sm-10 col-10 mb-3 m-auto">
                                <div className="card ">
                                    <div className="align-items-center d-flex justify-content-between card-header">
                                        <div className="align-items-center d-flex mt-2">
                                            <Avatar src={friend.find(rows => rows._id === row.Id)?.Profile} sx={{ width: 50, height: 50, border: "2px solid white" }} />&nbsp;
                                            <Typography variant="inherit" textTransform={"capitalize"}>{friend.find(rows => rows._id === row.Id)?.Name}</Typography>&nbsp;
                                        </div>
                                        <div>
                                            <IconButton>
                                                <MoreHoriz />
                                            </IconButton>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <img src={row.Url} className="img-fluid w-100 mt-2 rounded " style={{ maxHeight: "400px", objectFit: "cover" }} />
                                        <p><span className="fw-bold">{row.Name}:</span> &nbsp;{row.Caption}</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start card-footer">
                                        <IconButton>
                                            <FavoriteBorder />
                                        </IconButton>
                                        <IconButton>
                                            <Comment />
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
                <div className="col-lg-2 d-none d-lg-block p-2 bg-light position-sticky top-0 vh-100">
                    <h5 className="fw-bold">Suggestions</h5>
                    <p>People you may know</p>
                    {frnd.map((row) => (
                        <div className="d-flex p-2">
                            <img src={row.Profile} className="mt-2 bg-light widthhh rounded-circle" />
                            {/* <img src="" className="mt-2 bg-light widthhh rounded-circle" /> */}
                            <div className="d-flex ms-2 w-100 justify-content-between align-items-center">
                                <h6 className="mt-2">{row.Name}</h6>
                                <button onClick={() => navi("/Viewprofile?id=" + row._id)} className="btn btn-primary">View</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}