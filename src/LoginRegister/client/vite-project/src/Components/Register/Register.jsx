import { useState } from 'react';
import './Register.css';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom'; 
import Axios from 'axios';

// Import assets
import video from '../../LoginAssets/video.mp4';

// Import icons
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';

const Register = () => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState('');
  const navigateTo = useNavigate(); 

  const createUser = (e) => {
    e.preventDefault();
    setWarning('');

    if (!email || !userName || !password) {
      setWarning('Please complete all fields.');
      return;
    }

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setWarning('Please enter a valid email address');
      return;
    }

    if (password.length < 8 || password.match(/[^\w\s]/)) {
      setWarning('The password must be at least 8 characters and must not contain special characters');
      return;
    }

    Axios.post('http://localhost:3002/register', {
      Email: email,
      UserName: userName,
      Password: password
    }).then((response) => {
      console.log(response); 
      if (!response.status === 409) {
        
        setTimeout(() => {
          navigateTo('/login');
        }, 2000);
      } else {
        setWarning(response.data.message || 'Username or Email already registered.');
      }
    }).catch((error) => {
      console.error('Error registering user:', error);
      if (error.response && error.response.status === 409) {
        setWarning('Username or Email already registered.');
      } else {
        setWarning('Server error, please try again later.');
      }
    });
    
  };

  return (
    <div className='registerPage flex'>
      <div className="container flex">

        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>

          <div className="textDiv">
            <h2 className='title'>We are POPTIME</h2>
            <p>Welcome to the movie place!</p>
          </div>

          <div className="footerDiv flex">
            <span className='text'>Have an account?</span>
            <Link to='/login'>
              <button className='btn'> Login </button>
            </Link>
          </div>
        </div>

        <div className="fromDiv flex">
          <div className="headerDiv">
            <h3>Let Us Know You!</h3>
          </div>

          <form onSubmit={createUser} className='form grid'>
          {warning && <span className='warning'>{warning}</span>}
            <div className="inputDiv">
              <label htmlFor="username"> Username</label>
              <div className="input flex">
                <FaUserShield className='icon' />
                <input type="text" id='username' value={userName} placeholder='Enter Username' onChange={(event) => {
                  setUserName(event.target.value)
                }} />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="email"> Email</label>
              <div className="input flex">
                <FaUserShield className='icon' />
                <input type="email" id='email' value={email} placeholder='Enter Email' onChange={(event) => {
                  setEmail(event.target.value)
                }} />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password"> Password</label>
              <div className="input flex">
                <BsFillShieldLockFill className='icon' />
                <input type="password" id='password' value={password} placeholder='Enter Password'
                  onChange={(event) => {
                    setPassword(event.target.value)
                  }} />
              </div>
            </div>

            

            <button type='submit' className='btn flex'>
              <span>Register</span>
            </button>

          </form>
          
        </div>

      </div>
    </div>
  )
}
export default Register;
