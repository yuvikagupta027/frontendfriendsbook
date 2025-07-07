import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "particles.js";

export default function Login() {

    useEffect(() => {
        if (window.particlesJS) {
            window.particlesJS("particles-js", {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 600 } },
                    color: { value: "#000000" },
                    shape: { type: "circle" },
                    opacity: { value: 0.8 },
                    size: { value: 3 },
                    line_linked: { enable: true, distance: 150, color: "#000000", opacity: 0.4, width: 1 },
                    move: { enable: true, speed: 2, direction: "none", out_mode: "out" }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: true, mode: "repulse" },
                        onclick: { enable: true, mode: "push" },
                        resize: true
                    },
                    modes: {
                        repulse: { distance: 100, duration: 0.4 },
                        push: { particles_nb: 4 }
                    }
                },
                retina_detect: true
            });
        }
    }, []);

    const [tab, settab] = useState(0)

    var navi = useNavigate();

    function registerform(e) {
        e.preventDefault();
        var data = new FormData(e.currentTarget);
        var name = data.get("name");
        var contact = data.get("contact");
        var email = data.get("email");
        var password = data.get("password");
        var profile = data.get("profile");

        axios.post("https://backendfriendsbook.onrender.com/addnewuser", {
            Name: name,
            Contact: contact,
            Email: email,
            Password: password,
            Profile: profile
        }).then((succ) => {
            console.log(succ.data);
            localStorage.setItem('userlogin', succ.data.insertedId);
            navi("/Home");
        })
    }

    function loginform(e) {
        e.preventDefault();
        var data = new FormData(e.currentTarget);
        var email2 = data.get("email2");
        var password2 = data.get("password2");

        axios.post("https://backendfriendsbook.onrender.com/login", {
            Email: email2,
            Password: password2,
        }).then((succ) => {
            console.log(succ.data);
            if (succ.data) {
                localStorage.setItem('userlogin', succ.data._id);
                navi("/Home");
            } else {
                alert("Wrong Id or Password");
                e.target.email2.focus();
            }
        })
    }

    function checkuser() {
        var id = localStorage.getItem("userlogin");
        if (id) {
            axios.post("https://backendfriendsbook.onrender.com/logincheck", { Id: id }).then((succ) => {
                // console.log(succ.data);
                if (succ.data) {
                    navi("/Home");
                }
            })
        }
    }

    useEffect(() => {
        checkuser();
    }, []);

    return (
        <>
            <div className="row m-0 justify-content-center align-items-center vh-100 backgrounddd">
                <div id="particles-js"></div>
                <div className="col-lg-4 card glass p-3 content-container">
                    <ul className="nav nav-tabs nav-justified">
                        <li className="nav-item cur" onClick={() => settab(0)}>
                            <a className={tab == 0 ? "nav-link text-dark fw-bold active" : "nav-link text-dark fw-bold"}>Sign up</a>
                        </li>
                        <li className="nav-item cur" onClick={() => settab(1)}>
                            <a className={tab == 1 ? "nav-link text-dark fw-bold active" : "nav-link text-dark fw-bold"}>Login</a>
                        </li>
                    </ul>
                    {tab == 0 && (
                        <form className="text-center" onSubmit={registerform}>
                            <div className="card-body p-4">
                                <input type="text" placeholder="Fill your Name" name="name" className="bg-light form-control mb-2" required />
                                <input type="tel" placeholder="Fill your Contact No." name="contact" className="bg-light form-control mb-2" required />
                                <input type="url" placeholder="Set your Profile picture" name="profile" className="bg-light form-control mb-2" required />
                                <input type="email" placeholder="Fill your Email" name="email" className="bg-light form-control mb-2" required />
                                <input type="password" placeholder="Fill your Password" name="password" className="bg-light form-control mb-2" required />
                                <button type="submit" className="form-control btn btn-primary w-75 mt-2">Submit</button>
                                <p className="text-center text-light">Have an account? <button onClick={() => settab(1)} className="btn text-light mb-1 my-0 p-0">Login</button> </p>
                            </div>
                        </form>
                    )}
                    {tab == 1 && (
                        <form className="text-center" onSubmit={loginform}>
                            <div className="card-body p-4">
                                <Typography variant="h4" className="text-dark mb-3">Welcome Back</Typography>
                                <input type="email" placeholder="Fill your Email" name="email2" className="bg-light form-control mb-2" required />
                                <input type="password" placeholder="Fill your Password" name="password2" className="bg-light form-control mb-2" required />
                                <button type="submit" className="form-control btn btn-primary w-75 mt-4">Submit</button>
                                <div className="d-flex align-items-center justify-content-center mt-2">
                                    <p className="text-center text-light">Dont have an account? <button onClick={() => settab(0)} className="btn text-light mb-1 my-0 p-0">SignUp</button> </p>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
                <marquee direction="right" className="bg-light py-3 w-100 position-absolute bottom-0">
                    <Typography variant="h5" color="primary" fontFamily={"cursive"}>Welcome To FriendsBook: Application where you find your close ones..</Typography>
                </marquee>
            </div>
        </>
    )
}