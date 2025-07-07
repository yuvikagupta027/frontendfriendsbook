import { useState } from "react"
import { IoIosArrowDroprightCircle } from "react-icons/io"
import { Link } from "react-router-dom"

export default function Sidebar2() {
    const [listt, setlistt] = useState([
        { link: "/Friendslist", name: "Friends" },
        // { link: "/Requests", name: "Requests" },
        { link: "/Suggestions", name: "Suggestions" },
    ])
    return (
        <>
            <div className="container">
                <h4 className="fw-bold mt-2 mb-2">Friends</h4>
                <ul className="list-group">
                    {listt.map((row) => (
                        <Link to={row.link} className="text-decoration-none">
                            <li className="list-group-item d-flex align-items-center border-0 w-100 justify-content-between">
                                {row.name}
                                <button className="btn">
                                    <IoIosArrowDroprightCircle />
                                </button>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </>
    )
}