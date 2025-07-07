import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Sidebar2 from "./Sidebar2";
import { ImCross } from "react-icons/im";
import { dark } from "@mui/material/styles/createPalette";
import { CardMedia } from "@mui/material";

export default function Viewprofile() {

    var id = localStorage.getItem('userlogin');

    const [frnd, setfrnd] = useState({
        _id: "", Name: "", Contact: "", Email: "", Password: "", Profile: ""
    });

    // const [sentrequests, setsentrequests] = useState([]);

    const [senderId, setsenderId] = useState("")

    var ids = new URLSearchParams(useLocation().search).get("id");

    function fetchuser() {
        axios.post("https://backendfriendsbook.onrender.com/fetchuserprofile", {
            Id: ids
        }).then((succ) => {
            // console.log(succ.data);
            setsenderId(succ.data._id)
            setfrnd(succ.data);
        })
    }

    useEffect(() => {
        fetchuser();
    }, [ids]);

    const [chk, setchk] = useState(false);
    const [chk_data, setchk_data] = useState();
    const [chk_data2, setchk_data2] = useState(false);
    const [chk_data3, setchk_data3] = useState(false);


    function sendfriendrequest(friendId) {
        if (id) {
            axios.post("https://backendfriendsbook.onrender.com/send-request", {
                senderId: id,
                receiverId: friendId
            }).then((succ) => {
                if (succ.data) {
                    // console.log(succ.data);
                    checkfriendrequest();
                }
            })
        }
    }

    function checkfriendrequest() {
        if (ids && id) {
            axios.post("https://backendfriendsbook.onrender.com/checkusersrequest", {
                senderId: id,
                receiverId: ids,
            }).then((succ) => {
                // console.log(succ.data);
                if (succ.data.Message == "Request already sent") {
                    setchk(true);
                    // console.log(succ.data.RequestDetails);
                    setchk_data(succ.data.RequestDetails._id);
                    if (succ.data.RequestDetails.senderId == id) {
                        setchk_data2(true);
                    } else {
                        setchk_data2(false);
                    }
                    if (succ.data.RequestDetails.status == "approved") {
                        setchk_data3(true);
                    } else {
                        setchk_data3(false);
                    }
                } else {
                    setchk(false);
                }
            })
        }
    }
    useEffect(() => {
        checkfriendrequest();
    }, [id, ids])

    function cancelfriendrequest(x) {
        if (id) {
            axios.post("https://backendfriendsbook.onrender.com/cancelfriendrequest", {
                Id: x,
            }).then((succ) => {
                if (succ.data == "okk") {
                    alert("Friend request cancelled successfully");
                    checkfriendrequest();
                }
            });
        }
    }

    function acceptfriendrequest(x) {
        // console.log(x);
        axios.post("https://backendfriendsbook.onrender.com/acceptfriendrequest", {
            Id: x,
        }).then((succ) => {
            if (succ.data == "okk") {
                alert("Friend request Accepted");
                checkfriendrequest();
            }
        })
    }

    const [pic, setpic] = useState({ Url: "" });

    // const [friendid, setfriendid] = useState(localStorage.getItem("userlogin"))

    function fetchpic() {
        if (ids) {
            console.log(ids);
            axios.post("https://backendfriendsbook.onrender.com/fetchpic", {
                Id: ids
            }).then((succ) => {
                setpic(succ.data[0]);
                // console.log(succ.data[0]);
            })
        }
    }

    useEffect(() => {
        fetchpic();
    }, [ids])

    const [posts, setposts] = useState([])

    function fetchfriendspost() {
        axios.post("https://backendfriendsbook.onrender.com/fetchfriendspost", {
            Id: ids
        }).then((succ) => {
            // console.log(succ.data);
            setposts(succ.data);
        })
    }
    useEffect(() => {
        fetchfriendspost();
    }, [ids])

    return (
        <>
            <div className="row m-0">
                <div>
                    <Sidebar />
                </div>
                <div className="col-lg-11 offset-lg-1 mt-2 col-md-12 col-sm-12 col-10 justify-content-center d-flex">
                    <div className="col-lg-9 col-md-10 col-sm-10 col-10 card p-3">
                        <div className="d-flex w-100">
                            <img src={frnd.Profile} className="bg-light w--25 rounded-circle" />
                            <div className="float-start ms-3 p-2 flex-grow-1">
                                <div>
                                    <p>{frnd.Name}</p>
                                    <p>{frnd.Email}</p>
                                </div>
                                <div className="d-flex justify-content-start align-items-center px-3">
                                    <div className="text-center">
                                        <h6>{posts.length}</h6>
                                        <small>posts</small>
                                    </div>
                                    <div className="ms-5 text-center">
                                        <h6>0</h6>
                                        <small>friends</small>
                                    </div>
                                </div>
                                <div className="d-flex float-end">
                                    {chk ? (
                                        <>
                                            {chk_data3 ? (
                                                <>
                                                    <button onClick={() => cancelfriendrequest(chk_data)} className="btn btn-warning">Remove Friend</button>
                                                </>
                                            ) : chk_data2 ? (
                                                <>
                                                    <button className="btn btn-secondary" disabled>
                                                        Request sent
                                                    </button>
                                                    <button onClick={() => cancelfriendrequest(chk_data)} className="btn btn-secondary ms-1" title="Cancel Request">
                                                        <ImCross />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <>
                                                        <button onClick={() => acceptfriendrequest(chk_data)} className="btn btn-success ms-1">Accept</button>
                                                        <button onClick={() => cancelfriendrequest(chk_data)} className="btn btn-secondary ms-1">Cancel</button>
                                                    </>
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <button onClick={() => sendfriendrequest(frnd._id)} className="btn btn-primary">Add friend</button>
                                    )}
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row m-0 mt-5">
                            {posts.map((row) => (
                                <div className="col-lg-3 col-md-6 col-sm-6 col-12 ">
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
            </div >
        </>
    )
}