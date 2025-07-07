import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { CardMedia } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function Friendss() {

    var { id } = useParams();

    const navi = useNavigate();

    const [friendlist, setfriendlist] = useState([]);

    var uid = localStorage.getItem('userlogin');

    function fetchfriendlist() {
        if (uid) {
            axios.post("https://backendfriendsbook.onrender.com/fetchfriendlist", {
                Id: uid
            }).then((succ) => {
                setfriendlist(succ.data);
            })
        }
    }

    useEffect(() => {
        fetchfriendlist();
    }, [uid])

    const [pic, setpic] = useState({ Url: "" });
    const [friends, setfriends] = useState({
        Name: "", Email: "", Profile: ""
    })
    const [posts, setposts] = useState([]);

    function view() {
        if (id) {
            axios.post("https://backendfriendsbook.onrender.com/viewprofile", {
                Id: id
            }).then((succ) => {
                console.log(succ.data);
                setfriends(succ.data);
            })

            // axios.post("https://backendfriendsbook.onrender.com/fetchpic", {
            //     Id: id
            // }).then((succ) => {
            //     setpic(succ.data[0]);
            // })

            axios.post("https://backendfriendsbook.onrender.com/fetchfriendspost", {
                Id: id
            }).then((succ) => {
                // console.log(succ.data);
                setposts(succ.data);
            })
        }
    }

    useEffect(() => {
        setTimeout(() => {
            view();
        }, 500);
    }, [id])

    function deleteee(friendId) {
        axios.post("https://backendfriendsbook.onrender.com/deletefriend", {
            senderId: friendId,
            receiverId: uid
        }).then((response) => {
            if (response.data === "okk") {
                alert("Friend removed successfully");
                fetchfriendlist();
                navi("/Friendss");
            }
        });
    }

    return (
        <>
            <div className="row m-0 vh-100">
                <div className="col-lg-2">
                    <Sidebar />
                </div>
                <div className="col-lg-2 p-2 offset-lg-2 style2">
                    <h5 className="fw-bold">
                        Friends
                    </h5>
                    {friendlist.map((row) => (
                        <div className="card mb-2">
                            <div className="card-body">
                                <div className="d-flex w-100 align-items-center">
                                    <img src={row.Profile} className="bg-light widthhhview rounded-circle" />
                                    <div className="float-start ms-2">
                                        <p className="mt-3 me-3">{row.Name}</p>
                                    </div>
                                    <div>
                                        <button className="btn text-primary ms-3 p-0 w-100" onClick={() => navi(`/Friendss/${row._id}`)}>View</button>
                                        <button className="btn text-danger ms-2 p-0 w-100" onClick={() => deleteee(row._id)}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-lg-8 offset-lg-2">
                    {id ? (
                        <div className="card m-3">
                            <div className="card-body">
                                <div className="row m-0 justify-content-center">
                                    <div className="col-lg-2">
                                        <img src={friends.Profile} className="img-fluid imggggg rounded-circle" />
                                    </div>
                                    <div className="col-lg-10 d-flex justify-content-between">
                                        <div className="mt-4">
                                            <p className="text-capitalize">{friends.Name}</p>
                                            <p>{friends.Email}</p>
                                        </div>
                                        <div className="d-flex justify-content-start align-items-center m-0 p-0">
                                            <div className="text-center me-5">
                                                <h6>{posts.length}</h6>
                                                <small>posts</small>
                                            </div>
                                            <div className="text-center me-5">
                                                <h6>0</h6>
                                                <small>friends</small>
                                            </div>
                                            {/* {chk ? ( */}
                                            <button className="btn btn-warning">Remove Friend</button>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="row m-0">
                                    {posts.map((row) => (
                                        <div className="col-lg-3">
                                            <div className="card mb-2">
                                                <CardMedia src={row.Url} height={250} component="img" className="w-100" />
                                                <div className="card-footer w-100">
                                                    <div>
                                                        <p className="text-center">{row.Caption.slice(0, 15)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="card m-3">
                            <div className="card-body text-center">
                                <p className="text-muted">Click on "View" to see a friend's profile</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}