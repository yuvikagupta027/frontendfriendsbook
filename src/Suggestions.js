import { useEffect, useState } from "react";
import Friends from "./Friends";
import Sidebar from "./Sidebar";
import Sidebar2 from "./Sidebar2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";

export default function Suggestions() {

    const navi = useNavigate();
    const [frnd, setfrnd] = useState([]);

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
            })
        }
    }

    useEffect(() => {
        fetchotherusers();
    }, [id])

    return (
        <>
            <div className="row m-0 vh-100">
                <div className="col-lg-2">
                    <Sidebar />
                </div>
                <div className="col-lg-8 p-3">
                    <h5 className="fw-bold">
                        Suggestions
                    </h5>
                    <p>People you may know</p>
                    {frnd.map((row) => (
                        <div className="d-flex p-2 ">
                            <img src="https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png" className="bg-light widthhh rounded-circle" />
                            <div className="float-start ms-2">
                                <h6>{row.Name}</h6>
                                <div className="d-flex">
                                    <button onClick={() => navi("/Viewprofile?id=" + row._id)} className="btn btn-light">View</button>
                                    {/* <button onClick={() => navi("/Viewprofile2?id=" + row._id)} className="btn btn-light">View</button> */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}