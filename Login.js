import { initializeApp } from "firebase/app";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
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


    const changeEmail = (e) => {
        setEmail(e.target.value)
    }
    const changePassword = (e) => {
        setPassword(e.target.value)
    }


    const submitData = (e) => {
        e.preventDefault()
        let obj = {
            email: email,
            password: password
        }
        signInWithEmailAndPassword(auth, obj.email, obj.password)
            .then(() => {
                alert("successfully loggedin....!")
                navigate("/home")
            })
            .catch(() => {
                alert("Error...!")
            })
    }

    return (
        <div className="item" style={{ backgroundImage:`url(https://www.wallpapertip.com/wmimgs/66-666819_website-design-background-creative-background-image-for-website.jpg`,backgroundRepeat:"no-repeat",backgroundSize:"cover",padding:"30px",minHeight:"100vh"}}>
            <div className="container" style={{ width: "500px" }}>
                <div className="card m-3">
                    <div className="card-title text-center">
                        <h2>Login Form</h2>
                    </div>
                    <div className="card-body">
                        <form onSubmit={submitData}>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input value={email} type="email" className="form-control" onChange={changeEmail} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input value={password} type="password" className="form-control" onChange={changePassword} required />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <Link to="/Home" className="btn btn-danger">Back</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;