import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPenFancy } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

/*
user로 부터 이름, 이메일, 패스워드를 받아서 
authSlice/authService의 register로 dispatch
*/

function Register() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = userData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useSelector를 사용하여 어떠한 global state(e.g. user)도 component로 갖고 올 수 있음.
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // 로그인이 되었으면 root directory 즉, Home.js로 이동해서
    // 새로운 Camp를 추가하거나 기존의 Camp를 볼 수 있도록 함.
    if (isSuccess || user) {
      navigate('/');
    }
    // isLoding, isError, isSucess, message를 원상복구
    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      const userData = {
        name,
        email,
        password,
      };
      // authSlice에 있는 register에 userData를 argument 로 넣어 dispatch함.
      dispatch(register(userData));
    }
    if (isLoading) {
      return <Spinner />;
    }
  };
  return (
    <>
      <section className='heading'>
        <h3>
          <FaPenFancy />
          Register
        </h3>
        <p>Please create an account</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              name='name'
              value={name}
              onChange={onChange}
              placeholder='Enter your name'
              required
            />
            <input
              type='email'
              className='form-control'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='Enter your email'
              required
            />
            <input
              type='password'
              className='form-control'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Enter your password'
              required
            />
            <input
              type='password'
              className='form-control'
              name='password2'
              value={password2}
              onChange={onChange}
              placeholder='Enter your password2'
              required
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
