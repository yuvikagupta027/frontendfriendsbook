import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { MdDelete } from "react-icons/md";
import { Card, CardMedia } from "@mui/material";

export default function Profile() {

    const navi = useNavigate();

    const [posts, setposts] = useState([]);

    const [username, setusername] = useState({ Name: "", Email: "", Profile: "" });

    const [userId, setuserId] = useState(localStorage.getItem("userlogin"))

    function fetchposts() {

        if (userId) {
            axios.post("https://backendfriendsbook.onrender.com/fetchposts", {
                Id: userId
            }).then((succ) => {
                setposts(succ.data);
                // console.log("abc:", succ.data);
            })
        }
    }

    useEffect(() => {
        fetchposts();
    }, [userId])

    function deletee(x) {
        // alert(x);
        axios.post("https://backendfriendsbook.onrender.com/deleteposts", {
            Id: x
        }).then((succ) => {
            fetchposts();
            alert("post deleted");
        })
    }

    function fetchusername() {
        if (userId) {
            axios.post("https://backendfriendsbook.onrender.com/fetchuserprofile", {
                Id: userId
            }).then((succ) => {
                setusername(succ.data);
                // localStorage.getItem('userlogin');
            })
        }
    }

    useEffect(() => {
        fetchusername();
    }, [userId])

    // function submitprofilepic(e) {
    //     e.preventDefault();
    //     var data = new FormData(e.currentTarget);
    //     var Url = data.get("Url");

    //     axios.post("https://backendfriendsbook.onrender.com/submitprofilepic", {
    //         Id: userId,
    //         Url: Url,
    //         Datetime: new Date(),
    //     }).then((succ) => {
    //         if (succ.data == "ok") {
    //             alert("Profile changed");
    //             e.target.reset();
    //             // e.target.url.focus();
    //         }
    //     })
    // }

    const [pic, setpic] = useState({ Url: "" });

    function fetchpic() {
        if (userId) {
            axios.post("https://backendfriendsbook.onrender.com/fetchpic", {
                Id: userId
            }).then((succ) => {
                setpic(succ.data[0]);
            })
        }
    }

    useEffect(() => {
        fetchpic();
    }, [userId])

    return (
        <>
            <div className="row m-0 vh-100">
                <div className="col-lg-2 stylee">
                    <Sidebar />
                </div>
                <div className="col-lg-8 col-md-10 col-sm-10 col-10 mx-auto ">
                    <div className="card m-3">
                        <div className="card-body">
                            <div className="row m-0 justify-content-center">
                                <div className="col-lg-2 col-md-3 col-sm-3 col-3">
                                    <img src={username.Profile} className="img-fluid rounded-circle mt-3 w--100" />
                                </div>
                                <div className="col-lg-9 col-md-8 col-sm-8 col-8">
                                    <div>
                                        <p>{username.Name}</p>
                                        <p>{username.Email}</p>
                                    </div>
                                    <div className="row m-0">
                                        <div className="text-center col-lg-4 col-md-4 col-sm-4 col-4">
                                            <h6>{posts.length}</h6>
                                            <small>posts</small>
                                        </div>
                                        <div className="text-center col-lg-4 col-md-4 col-sm-4 col-4">
                                            <h6>0</h6>
                                            <small>friends</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="row m-0">
                                {posts.map((row) => (
                                    <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                                        <div className="card mb-2">
                                            <CardMedia src={row.Url} height={250} component="img" className="w-100" />
                                            <div className="card-footer w-100">
                                                <div>
                                                    <p className="text-center">{row.Caption.slice(0, 15)}</p>
                                                    <button onClick={() => deletee(row._id)} className="btn btn-light rounded-pill start-0 text-dark position-absolute top-0">
                                                        <MdDelete />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            {/* <div className="modal fade" id="mymodd">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="fw-bold">Upload Profile</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={submitprofilepic}>
                                <input type="url" placeholder="Add url" className="form-control mb-2" name="Url" />
                                <button type="submit" className="btn btn-primary">Upload</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}