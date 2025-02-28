import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { forgotPassword,clearAuthError } from "../../actions/userActions";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const { error, message } = useSelector(state => state.authState);

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        dispatch(forgotPassword(formData))
    }

    useEffect(()=>{
        if(message) {
            toast(message, {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER
            })
            setEmail("");
            return;
        }

        if(error)  {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: ()=> { dispatch(clearAuthError) }
            })
            return
        }
    }, [message, error, dispatch])


    return (
       <>
       <Header />
        <div className="forget">
            <div className="forgetinner">
                <form onSubmit={submitHandler} className="forbjh">
                    <h1 className="foegetpass">Forgot Password</h1>
                    <div className="form-group">
                        <label className="hyfyvb" htmlFor="email_field">Enter Email</label>
                        <input
                            type="email"
                            id="email_field"
                            className="form-control"
                            value={email}
                            onChange={e=>setEmail(e.target.value)}
                        />
                    </div>

                    <button
                        id="forgot_password_button"
                        type="submit"
                        className="updagvyghv">
                        Send Email
                </button>

                </form>
            </div>
        </div>
        <Footer />
       </>
    )
}