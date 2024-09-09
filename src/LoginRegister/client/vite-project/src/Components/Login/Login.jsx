import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { AuthContext } from '../../../../../../UserContexr/authContext'; 

// Import assets
import video from '../../LoginAssets/video.mp4';
import logo from '../../LoginAssets/poptimeLogo.png';

// Import icons
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';

const Login = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const [loginUserName, setLoginUserName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [statusHolder, setStatusHolder] = useState('message');

  const navigateTo = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:3002/login', {
      LoginUserName: loginUserName,
      LoginPassword: loginPassword
    }).then((response) => {
      if (response.data.message || loginUserName === '' || loginPassword === '') {
        setLoginStatus('Credentials Do Not Exist!');
        setStatusHolder('showMessage');
        setTimeout(() => {
          setStatusHolder('message'); 
        }, 4000);
      } else {
        const userId = response.data[0].id;
        const username = response.data[0].username;  
        localStorage.setItem('userId', userId); 
        localStorage.setItem('username', username); 
        alert('Welcome Back to POPTIME!');
        navigateTo('/home');
        const token = response.data.token; 
        localStorage.setItem('authToken', token);
        localStorage.setItem('username', loginUserName);
        setIsLoggedIn(true);
        
      }
    }).catch((error) => {
      console.error('Login error:', error);
    });
  };

  useEffect(() => {
    if (loginStatus !== '') {
      setStatusHolder('showMessage');
      setTimeout(() => {
        setStatusHolder('message');
      }, 4000);
    }
  }, [loginStatus]);

  const onSubmit = () => {
    setLoginUserName('');
    setLoginPassword('');
    setLoginStatus(''); 
  };

  return (
    <div className='loginPage flex'>
      <div className="container flex">

      <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>

          <div className="textDiv">
            <h2 className='title'>We are POPTIME</h2>
            <p>Find your favorites movies!</p>
          </div>

          <div className="footerDiv flex">
            <span className='text'> Do not have an account?</span>
            <Link to={'/register'}>
            <button className='btn'> Register </button>
            </Link>
          </div>
        </div> 

        <div className="fromDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Logo Image" />
            <h3>Welcome Back</h3>
          </div>

          <form action="" className='form grid' onSubmit={onSubmit}>
            <span className={statusHolder}>{loginStatus}</span>
            <div className="inputDiv">
              <label htmlFor="username"> Username</label>
              <div className="input flex">
              <FaUserShield className='icon'/>
              <input type="text" id='username' placeholder='Enter Username' value={loginUserName} onChange={(event)=>{
                setLoginUserName(event.target.value)
              }}/>
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password"> Password</label>
              <div className="input flex">
              <BsFillShieldLockFill className='icon'/>
              <input type="password" id='password' placeholder='Enter Password'onChange={(event)=>{
                setLoginPassword(event.target.value)
              }}/>
              </div>
            </div>

            <button type='submit' className='btn flex' onClick={loginUser}>
              <span>Login</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
