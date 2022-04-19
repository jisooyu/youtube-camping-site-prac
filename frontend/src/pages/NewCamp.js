import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { createFormData, reset } from '../features/camps/campSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

// to fix buffer error
window.Buffer = window.Buffer || require('buffer').Buffer;

const NewCamp = () => {
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.camps
  );
  const [campName, setCampName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      dispatch(reset());
      navigate('/new-camp');
    }
    // eslint-disable-next-line
  }, [dispatch, isError, isSuccess, navigate]);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('imageFile', imageFile);
    formData.append('campName', campName);
    formData.append('description', description);
    dispatch(createFormData(formData));
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <BackButton url='/' />
      <section className='heading'>
        <h1>Create New Camp</h1>
        <p>Please fill out the form below</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='campName'>Camp PIC Name</label>
            <input
              name='campName'
              type='text'
              className='form-control'
              id='campName'
              value={campName}
              onChange={(e) => setCampName(e.target.value)}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='description'>캠핑장 소개</label>
            <textarea
              name='description'
              id='description'
              className='form-control'
              value={description}
              placeholder='description'
              onChange={(e) => {
                setDescription(e.target.value);
              }}></textarea>
          </div>

          <div className='form-group'>
            <label htmlFor='imageFile'>Upload Images</label>
            <input
              type='file'
              name='imageFile'
              id='imageFile'
              className='form-control'
              accept='image/jpeg, image/jp, image/png'
              onChange={handleImage}
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default NewCamp;
