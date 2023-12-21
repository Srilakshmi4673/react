import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./App.css"

import axios from "axios";

function StudentData() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [value, setValue] = useState("")
    const [sort, setSort] = useState("")

    let options = ['sid', 'name', 'course', 'mobile', 'email', 'dateofjoining']

    useEffect(() => {
        fetch(`http://localhost:3006/StudentDetail?_order=asc`)
            .then((res) => res.json())
            .then((resp) => {
                setData(resp);
            })
            .catch((err) => {
                console.log("Error: ", err);
            });
    }, []);

    const changeEdit = (id) => {
        navigate("/studentedit/" + id);
    };

    const changeDelete = (id) => {
        fetch("http://localhost:3006/StudentDetail/" + id, {
            method: "DELETE",
        })
            .then(() => {
                alert("Data has been Deleted Successfully...!");
                window.location.reload();
            })
            .catch((err) => {
                console.log("Error: ", err);
                alert("Error: " + err);
            });
    };

    const handleSearch = () => {
        return axios.get(`http://localhost:3006/StudentDetail?q=${value}`)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleInputChange = (e) => {
        setValue(e.target.value);
    };

    const handleInputChangeKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const sortData = async (e) => {
        e.preventDefault();
        let value = e.target.value;
        setSort(value);
        return await axios.get(`http://localhost:3006/StudentDetail?_sort=${value}&_order=asc`) //desc
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const logout = () => {
        alert("Successfully Logout...!");
        navigate("/admin");
    };

    return (
        <div className="item" style={{ backgroundImage:`url(https://www.wallpapertip.com/wmimgs/66-666819_website-design-background-creative-background-image-for-website.jpg`,backgroundRepeat:"no-repeat",backgroundSize:"cover",padding:"30px",minHeight:"100vh"}}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    {/* <a className="navbar-brand" href="#">&nbsp;
                        <img src="/image/Logo.jpg" width="30" height="30" className="d-inline-block align-top" alt="" />&nbsp;
                        GTyde Technologies</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button> */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link " aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Contact</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <span className="">
                                <input type="button" className="btn btn-outline-danger" onClick={logout} value="Logout" />
                            </span>
                        </form>
                    </div>
                </div>
            </nav>

            <br />
            <div className="container-fluid-md p-5" >
                <div className="card px-3 card-table">
                    <div className="card-title text-center">
                        <h2>
                            <u> Student Management System</u>
                        </h2>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12 col-sm m-2">
                                <Link to="/studentForm" className="btn btn-outline-primary m-2">
                                    Add (+)
                                </Link>
                            </div>
                            <div className="col-12 col-md-5 m-2">
                                <label className="mt-1">Select Table Header</label> &nbsp;
                                <select value={sort} onChange={sortData} className="form-select-sm">
                                    <option>Choose-one</option>
                                    {options.map((item) => (
                                        <option>{item}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-12 col-md-5">
                                <div className="float-end">
                                    <label className="mt-1">Search</label>&nbsp;
                                    <input value={value} type="text" className="form-control-sm mx-2" onChange={handleInputChange} onKeyPress={handleInputChangeKeyPress} placeholder="Filter Records..." />
                                </div>
                            </div>
                        </div>

                        <div className="table-responsive">
                        <table className="table table-bordered table-striped text-center">
                            <thead>
                                <tr>
                                    <th>S.Id</th>
                                    <th>Student ID</th>
                                    <th>Name</th>
                                    <th>Course</th>
                                    <th>Mobile</th>
                                    <th>Email</th>
                                    <th>Date of Joining<br/>
                                        <small>dd-mm-yyy</small>
                                    </th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length > 0 ? (
                                    data.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.sid}</td>
                                            <td>{item.name}</td>
                                            <td>{item.course}</td>
                                            <td>{item.mobile}</td>
                                            <td>{item.email}</td>
                                            <td>{item.dateofjoining}</td>
                                            <td>
                                                <button onClick={() => { changeEdit(item.id) }} className="btn btn-primary px-4 m-1">Edit</button>
                                                <button onClick={() => { changeDelete(item.id) }} className="btn btn-danger px-3 m-1">Delete </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8">No Data Avaible</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentData;
