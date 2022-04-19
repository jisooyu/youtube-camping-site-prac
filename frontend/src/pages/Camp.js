const Camp = ({ campName, description, s3ImageUrl }) => {
  return (
    // <div className='camp-details'>
    <div>
      <li>캠프장: {campName}</li>
      <li>소개: {description}</li>
      <li>
        <img className='campImage' src={s3ImageUrl} alt='none' />
      </li>
    </div>
  );
};

export default Camp;
