import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

export default function Profile2() {

    const [username, setusername] =  useState({ Name: "", Email: "" });

    var id = localStorage.getItem('userlogin');

    function fetchusername() {
        if (id) {
            axios.post("https://backendfriendsbook.onrender.com/fetchuserprofile", {
                Id :id 
            }).then((succ) => {
                // console.log(succ.data);
                setusername(succ.data);
            })
        }
    }

    useEffect(() => {
        fetchusername()
    }, [])

    return (
        <>
            <div className="row m-0 vh-100">
                <div className="col-lg-2 stylee">
                    <Sidebar />
                </div>
                <div className="col-lg-8">
                    <div className="card m-3">
                        <div className="card-body">
                            <div className="row m-0 justify-content-center">
                                <div className="col-lg-6">
                                    <div>
                                        <p>{username.Name}</p>
                                        <p>{username.Email}</p>
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