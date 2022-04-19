import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <header className='header'>
      <>
        <Link to='/'>캠핑사이트</Link>
      </>
      <ul>
        {user ? (
          <li>
            <div className='btn' onClick={onLogout}>
              <FaSignOutAlt /> 로그아웃
            </div>
          </li>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt />
                로그인
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser />
                신규멤버등록
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
