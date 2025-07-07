import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ImCross } from "react-icons/im";

export default function Viewprofile2() {

    var id = localStorage.getItem('userlogin');

    const [frnd, setfrnd] = useState({
        _id: "", Name: "", Contact: "", Email: "", Password: ""
    });

    var ids = new URLSearchParams(useLocation().search).get("id");

    function fetchuser() {
        axios.post("https://backendfriendsbook.onrender.com/fetchuserprofile", {
            Id: ids
        }).then((succ) => {
            console.log(succ.data);
            // setsenderId(succ.data._id)
            setfrnd(succ.data);
        })
    }

    useEffect(() => {
        fetchuser();
    }, [ids]);

    const [chk, setchk] = useState(false);
    const [chk_data, setchk_data] = useState();
    const [chk_data2, setchk_data2] = useState(false);

    function sendfriendrequest(friendId) {
        if (id) {
            axios.post("https://backendfriendsbook.onrender.com/send-request", {
                senderId: id,
                receiverId: friendId
            }).then((succ) => {
                if (succ.data) {
                    console.log(succ.data);
                    
                }
            })
        }
    }

    useEffect(() => {
        sendfriendrequest();
    }, [])

    function checkfriendrequest() {
        if (ids && id) {
            axios.post("https://backendfriendsbook.onrender.com/checkusersrequest", {
                senderId: id,
                receiverId: ids
            }).then((succ) => {
                console.log(succ.data);
                if (succ.data.Message == "Request already sent") {
                    setchk(true);
                    console.log(succ.data.RequestDetails);
                    setchk_data(succ.data.RequestDetails._id);
                    if (succ.data.RequestDetails.senderId == id) {
                        setchk_data2(true);
                    } else {
                        setchk_data2(false);
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
        if(id) {
            axios.post("https://backendfriendsbook.onrender.com/cancelfriendrequest", {
                Id: x,
            }).then((succ) => {
                if (succ.data == "okk") {
                    alert("Friend request cancelled successfully");
                    checkfriendrequest();
                }
            })
        }
    }

    useEffect(() => {
        cancelfriendrequest();
    }, [])

    return (
        <>
            <div className="row m-0 vh-100">
                <div className="col-lg-2 stylee">
                    <Sidebar />
                </div>
                <div className="col-lg-10 p-2 justify-content-center align-items-center">
                    <div className="col-lg-8 card p-3">
                        <div className="d-flex w-100">
                            <img src="https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png" className="bg-light widthhhview rounded-circle" />
                            <div className="float-start ms-3 p-2 flex-grow-1">
                                <div>
                                    <p>{frnd.Name}</p>
                                    <p>{frnd.Email}</p>
                                </div>
                                <div className="d-flex justify-content-between align-items-center px-3">
                                    <div className="text-center">
                                        <h6>0</h6>
                                        <small>posts</small>
                                    </div>
                                    <div className="text-center">
                                        <h6>0</h6>
                                        <small>friends</small>
                                    </div>
                                    <div className="text-center">
                                        <h6>0</h6>
                                        <small>followers</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex mt-2">
                            {chk ? (
                                <>
                                {chk_data2 ? (
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
                                        <button className="btn btn-success ms-1">Accept</button>
                                        <button onClick={() => cancelfriendrequest(chk_data)} className="btn btn-secondary ms-1">Cancel</button>
                                    </>
                                )}
                            </>
                            ) : (
                                <button className="btn btn-primary" onClick={() => sendfriendrequest(frnd._id)}>Add Friend</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}