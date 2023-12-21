import {Link, useNavigate, useParams} from "react-router-dom"
import {useEffect, useState} from "react"

function StudentEdit() {
    const [id,setid]=useState("")
    const [sid,setSid]=useState("")
    const [name,setName]=useState("")
    const [course,setCourse]=useState("")
    const [mobile,setMobile]=useState("")
    const [email,setEmail]=useState("")
    const [dateofjoining,setDateofjoining]=useState("")

    const {studentid} =useParams()  // used as Dynamic routing from App.js with the id

    const navigate= useNavigate()

    const changeSid=(e)=>{
        setSid(e.target.value)
    }
    const changeName=(e)=>{
        setName(e.target.value)
    }
    const changeCourse=(e)=>{
        setCourse(e.target.value)
    }
    const changeMobile=(e)=>{
        setMobile(e.target.value)
    }
    const changeEmail=(e)=>{
        setEmail(e.target.value)
    }
    const changeDateofjoining=(e)=>{
        setDateofjoining(e.target.value)
    }

    useEffect(()=>{
        fetch("http://localhost:3006/StudentDetail/"+studentid)
        .then((res)=>{
            return res.json()
        })
        .then((resp)=>{
            console.log(resp)
            setSid(resp.sid)
            setName(resp.name)
            setCourse(resp.course)
            setMobile(resp.mobile)
            setEmail(resp.email)
            setDateofjoining(resp.dateofjoining)
        })
        .catch((err)=>{
            alert("Error: ",err)
        })
    },[])

    const formSubmit=(e) =>{
        e.preventDefault()
        let data = {id,sid,name,course,mobile,email,dateofjoining}
        fetch("http://localhost:3006/StudentDetail/"+studentid,{
            method:"PUT",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(data)
        })
        .then((resp)=>{
            alert("Data Stored Successfully.....")
            console.log(resp)
            setSid('')
            setName('')
            setCourse('')
            setMobile('')
            setEmail('')
            setDateofjoining('')
            navigate("/home")
        })
        .catch((err)=>{
            alert("Error: ",err)
        })
    }


    return (
        <div className="container w-25">
            <div className="card px-3 mt-5">
                <div className="card-title text-center">
                    <h2>Employee Edit From</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={formSubmit}>
                    <div className="form-group">
                            <label for="exampleInputEmail1">Student ID</label>
                            <input value={sid} onChange={changeSid} type="Number" className="form-control" placeholder="Enter Student ID" required />
                        </div><br/>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Student Name</label>
                            <input value={name} onChange={changeName} type="text" className="form-control" placeholder="Enter Student Name" required />
                        </div><br/>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Student Course</label>
                            <input value={course} onChange={changeCourse} type="text" className="form-control" placeholder="Enter Student Mobile No" required />
                        </div><br/>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Student Email ID</label>
                            <input value={email} onChange={changeEmail} type="email" className="form-control" placeholder="Enter Student Email ID" required />
                        </div><br/>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Student Mobile no</label>
                            <input value={mobile} onChange={changeMobile} type="number" className="form-control" placeholder="Enter Student Mobile No" required />
                        </div><br/>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Student City</label>
                            <input value={dateofjoining} onChange={changeDateofjoining} type="date" className="form-control" placeholder="Enter Student City" required />
                        </div><br/>

                        {/* <input type="submit" className="btn btn-primary mx-1" value="Submit" /> */}
                        <button type="submit" className="btn btn-primary mx-1">Update</button>
                        <Link to="/home" className="btn btn-danger mx-1">Back to Home</Link>
                    </form>

                </div>
            </div>

        </div>
    )
}

export default StudentEdit;