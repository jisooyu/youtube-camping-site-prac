import { FaPencilAlt, FaListAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

/* 
사용자가 로그인 되었다면 캠프사이트를 추가 할 수 있거나 캠프사이트를 관람할 수 있도록 함. 
*/

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      {user ? (
        <>
          <Link to='/new-camp' className='btn btn-block'>
            <FaPencilAlt />
            캠프사이트 추가
          </Link>
          <Link to='/camps' className='btn btn-block'>
            <FaListAlt />
            캠프사이트 소개
          </Link>
        </>
      ) : (
        <>
          <section className='heading'>
            <h1>착한 캠핑 사이트에 오신 것을 환영합니다. </h1>
            <p>우선 로그인을 해주세요.</p>
          </section>
        </>
      )}
    </>
  );
};

export default Home;
