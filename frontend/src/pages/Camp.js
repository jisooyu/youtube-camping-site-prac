const Camp = ({ campName, description, s3ImageUrl }) => {
  return (
    <div>
      <li>캠프장: {campName}</li>
      <li>소개: {description}</li>
      <li>
        <img className='camp-image' src={s3ImageUrl} alt='none' />
      </li>
    </div>
  );
};

export default Camp;
