import { useState } from "react";
import Sidebar from "./Sidebar";
import Sidebar2 from "./Sidebar2";
import axios from "axios";

export default function Requests() {

    const [frnd, setfrnd] = useState([]);

    function deletee(x) {
        axios.post("http://localhost:1000/deleterequest", {
            Id: x
        }).then((succ) => {
            alert("request deleted");
            
        })
    }
    return (
        <>
            <div className="row m-0 vh-100">
                <div className="col-lg-2 stylee">
                    <Sidebar />
                </div>
                {/* <div className="col-lg-2 p-2 offset-lg-2 style2">
                    <Sidebar2 />
                </div> */}
                <div className="col-lg-8 p-4">
                    <h5 className="fw-bold">
                        All Requests
                    </h5>
                    {frnd.map((row) => (
                        <div className="d-flex p-2 ">
                            <img src="https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png" className="bg-light widthhh rounded-circle" />
                            <div className="float-start ms-2">
                                <h6>{row.Name}</h6>
                                <div className="d-flex">
                                    <button className="btn btn-primary me-1">Accept</button>
                                    <button onClick={() => deletee(row._id)} className="btn btn-light">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}