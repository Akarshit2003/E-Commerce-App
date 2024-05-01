import React, { useState ,useEffect} from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import toast from 'react-hot-toast';
import axios from "axios";
import "../../styles/AuthStyles.css";



const Profile = () => {
  //Context
  const [auth,setAuth] = useAuth();
  //State
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [phone, SetPhone] = useState("");
  const [password, SetPassword] = useState("");
  const [address, SetAddress] = useState("");

  //Get User Data
  useEffect(() =>{
    const {email,name,phone,address,password} = auth?.user;
    SetName(name);
    SetPhone(phone);
    SetEmail(email);
    SetAddress(address);
  },[auth?.user]);

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`,
        { name, email, password, phone, address }
      );
      if (data?.error) {
        toast.error(data?.error);  
      } else {
        setAuth({...auth,user:data?.updatedUser})
        let ls =localStorage.getItem("auth")
        ls = JSON.parse(ls)
        ls.user = data.updatedUser
        localStorage.setItem('auth',JSON.stringify(ls))
        toast.success('Profile Updated Successfully') 
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
          <div className="form-container ">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
          <h4 className="title">User Profile</h4>

            <input
              type="text"
              value={name}
              onChange={(e) => SetName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your Name"
            
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => SetEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your Email"
              disabled

            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => SetPhone(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your Phone"
              
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => SetPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your Password"
              
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => SetAddress(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your Address"
              
            />
          </div>
  
          <button type="submit" className="btn btn-primary">
            UPDATE
          </button>
        </form>
      </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;