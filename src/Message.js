import { Badge, Box, Chip, Grid2, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import { BiSearch } from "react-icons/bi";
import { HiDotsHorizontal } from "react-icons/hi";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Delete, MessageOutlined } from "@mui/icons-material";
import { IoIosSend } from "react-icons/io";

export default function Message() {

    var { id } = useParams();

    var uri = "https://backendfriendsbook.onrender.com";

    // console.log(id);

    const [users, setusers] = useState([]);

    const [input, setinput] = useState(0);

    function handlesearch(e) {
        const searchvalue = e.target.value;
        // console.log(searchvalue);

        if (searchvalue.length > 2) {
            setinput(true)
            axios.get(`${uri}/searchvalue?Name=${id}`
            ).then((Succc) => {
                // console.log(Succc);
                setusers(Succc.data);
                // setusers(Succc.data);
            })
        } else {
            setusers([]);
            setinput(false);
        }
    }

    const [friendlist, setfriendlist] = useState([]);
    const [friend, setfriend] = useState({
        Name: "", Profile: ""
    });
    const [myfriend, setmyfriend] = useState({});

    const [loginuser, setloginuser] = useState({});

    const navi = useNavigate();

    var myid = localStorage.getItem('userlogin');

    function loginusers() {
        if (myid) {
            axios.post(uri + "/fetchloginuser", {
                Id: myid
            }).then((succ) => {
                setloginuser(succ.data);
                console.log(succ.data);;

            })
        }
    }

    useEffect(() => {
        loginusers();
    }, [myid])

    function fetchfriendlist() {
        if (myid) {
            axios.post(uri + "/fetchfriendlist", {
                Id: myid
            }).then((succ) => {
                setfriendlist(succ.data);
                // console.log(succ.data);                
            })
        }
    }

    useEffect(() => {
        fetchfriendlist();
    }, [myid])

    const [request, setrequest] = useState()

    function view() {
        if (id) {
            axios.post(uri + "/viewmessageprofile", {
                senderId: myid,
                receiverId: id,
            }).then((succ) => {
                // console.log(succ.data);
                setrequest(succ.data);
                setfriend(succ.data);
                // console.log(friend);
            })
        }
    }
    useEffect(() => {
        // setTimeout(() => {
        view();
        // }, 500);
    }, [id])


    function sendmessage(e) {
        e.preventDefault();
        var data = new FormData(e.currentTarget);
        var rid = request._id;
        var ob = {
            MainId: rid,
            senderId: myid,
            receiverId: id,
            Message: data.get("message"),
            Datetime: new Date(),
        }
        axios.post(uri + "/sendmessage", ob).then((succ) => {
            // console.log(succ);
            e.target.reset();
        })
        fetchmessage();
    }

    const [mess, setmess] = useState([]);

    function fetchmessage() {
        if (request) {
            var iddd = request._id;
            var ob = {
                MainId: iddd
            }
            axios.post(uri + "/getmessage", ob).then((succ) => {
                // console.log(succ);
                setmess(succ.data);
            })
            if (friendlist.length > 0) {
                // console.log(friendlist.length)
                // console.log(friendlist)
                var aaa = friendlist.filter((row) => {
                    // console.log(id);
                    // console.log(row._id);
                    // console.log(id === row._id);

                    if (id === row._id) {
                        return row;
                    }
                })
                if (aaa[0]) {
                    setmyfriend(aaa[0]);
                } else {
                    setmyfriend({ "_id": "", "Name": "", "Contact": "", "Email": "", "Password": "", "Profile": "" })
                }
                // console.log(JSON.stringify(aaa));
            }

        }
    }

    useEffect(() => {
        setTimeout(() => {
            fetchmessage();
        }, 500);
    }, [request])


    var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    const [dtt, setdtt] = useState(new Date().getDate() + " " + mS[new Date().getMonth()])


    return (
        <>
            <div className="row m-0 vh-100">
                <div className="col-lg-2 stylee">
                    <Sidebar />
                </div>
                <div className="col-lg-2 offset-lg-2 p-2 mb-2 style2">
                    <div className="d-flex justify-content-between">
                        <h4 className="fw-bold">Chats</h4>
                        <button className="btn btn-light mb-2">
                            <HiDotsHorizontal />
                        </button>
                    </div>
                    <form className="input-group mb-2">
                        <button className="btn btn-light">
                            <BiSearch />
                        </button>
                        <input type="text" placeholder="Search" name="search" className="form-control" onChange={handlesearch} />
                    </form>
                    {input ? (
                        <div className="list-group p-0 m-0">
                            {users.map((row) => (
                                <div className="d-flex w-100 justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <img
                                            src="https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png"
                                            className="bg-light widthhhview rounded-circle"
                                            alt="User"
                                        />
                                        <p className="ms-2 mt-3">{row.Name}</p>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <button className="btn text-dark float-end p-0 w-100" title="Message" onClick={() => navi(`/Message/${row._id}`)}>
                                            <MessageOutlined />
                                        </button>
                                        {/* <button className="btn text-danger ms-2 p-0 w-100 mb-1" title="Delete chat">
                                            <Delete />
                                        </button> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>
                            {friendlist.map((row) => (
                                <div className="card mb-2">
                                    <div className="card-body">
                                        <div className="d-flex w-100 justify-content-between align-items-center">
                                            <div className="d-flex align-items-center">
                                                <img src={row.Profile} className="bg-light widthhhview rounded-circle" alt="User" />
                                                <p className="ms-2 mt-3">{row.Name}</p>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <button onClick={() => navi(`/Message/${row._id}`)} className="btn text-dark float-end p-0 w-100" title="Message">
                                                    <MessageOutlined />
                                                </button>
                                                {/* <button className="btn text-danger ms-2 p-0 w-100 mb-1" title="Delete chat">
                                                    <Delete />
                                                </button> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="col-lg-8 offset-lg-2 px-0">
                    {id ? (
                        <div className="card">
                            <div className="card-header position-sticky">
                                <div className="row m-0 justify-content-start">
                                    <div className="col-lg-1">
                                        <img src={myfriend.Profile} className="iamgee rounded-circle" />
                                    </div>
                                    <div className="col-lg-10 d-flex">
                                        <div className="mt-4">
                                            <p className="text-capitalize">{myfriend.Name}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body heighttt">
                                <div className="justify-content-center w-100 d-flex">
                                    <Chip label={"Today, " + dtt} sx={{ width: "15%" }} variant="filled" className="bg-dark text-white" />
                                </div>
                                {mess.map((row) => (
                                    <>
                                        {row.senderId == myid ? (
                                            <div className="d-flex justify-content-end mb-2">
                                                <div className="text-end">
                                                    <small>You</small>
                                                    <div className="card p-2 bg-primary text-white">{row.Message}</div>
                                                </div>&nbsp;
                                                <div>
                                                    <img
                                                        src={loginuser.Profile ? loginuser.Profile : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                                                        className="bg-light widthhhview rounded-circle" /> &nbsp;
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="d-flex mb-2">
                                                <img
                                                    src={myfriend.Profile ? myfriend.Profile : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                                                    className="bg-light widthhhview rounded-circle me-2"
                                                />
                                                <div>
                                                    <small>{myfriend.Name}</small>
                                                    <div className="card p-2">{row.Message}</div>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ))}
                            </div>
                            <div className="card-footer position-sticky">
                                <form onSubmit={sendmessage} className="input-group">
                                    <input type="text" name="message" placeholder="type a message.." className="form-control" />
                                    <button type="submit" className="btn btn-primary d-flex align-items-center">
                                        <IoIosSend size={20} className="m-1" />&nbsp;
                                        <Typography variant="inherit">Send</Typography>
                                    </button>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <div className="card m-3">
                            <div className="card-body text-center">
                                <p className="text-muted">Click on Message icon to start the chat</p>
                            </div>
                        </div>
                    )}
                </div >
            </div >
        </>
    );
}