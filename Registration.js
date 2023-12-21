import { initializeApp } from "firebase/app";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const navigate = useNavigate()

    const firebaseConfig = {
        apiKey: "AIzaSyAKuB1YRVMu5UpzuNGi3sj3sl5EFsxti08",
        authDomain: "shoppingcart-7bccc.firebaseapp.com",
        projectId: "shoppingcart-7bccc",
        storageBucket: "shoppingcart-7bccc.appspot.com",
        messagingSenderId: "1037392763194",
        appId: "1:1037392763194:web:415da6ae20333ab7389803",
        measurementId: "G-80ZPQ58BM0"
    };


    const app = initializeApp(firebaseConfig);
    const auth = getAuth()

    const changeName = (e) => {
        setName(e.target.value)
    }
    const changeEmail = (e) => {
        setEmail(e.target.value)
    }
    const changePassword = (e) => {
        setPassword(e.target.value)
    }
    const changeConfirm = (e) => {
        setConfirm(e.target.value)
    }

    const submitData = (e) => {
        e.preventDefault()
        let obj = {
            email: email,
            password: password
        }
        createUserWithEmailAndPassword(auth, obj.email, obj.password)
            .then(() => {
                alert("successfully registered....!")
                navigate("/admin")
            })
            .catch(() => {
                alert("Error...!")
            })
    }

    return (
        <div className="item" style={{ backgroundImage:`url(http://www.pixelstalk.net/wp-content/uploads/2016/07/Free-Plain-HD-Photos.jpg`,backgroundRepeat:"no-repeat",backgroundSize:"cover",padding:"30px",minHeight:"100vh"}}>
        <div className="container" style={{ width: "500px" }}>
            <div className="card m-3">
                <div className="card-title text-center">
                    <h2>Register Form</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={submitData}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input value={name} type="text" className="form-control" onChange={changeName} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input value={email} type="email" className="form-control" onChange={changeEmail} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input value={password} type="password" className="form-control" onChange={changePassword} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Confirm Password</label>
                            <input value={confirm} type="password" className="form-control" onChange={changeConfirm} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <Link to="/admin" className="btn btn-danger">Back</Link>
                    </form>
                </div>
            </div>
        </div>
        </div >
    )
}
export default Register;