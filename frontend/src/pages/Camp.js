import background from '../images/green-forest-background.jpeg';
const Camp = ({ campName, description, s3ImageUrl }) => {
  return (
    <div className='camp-displaying'>
      <div className='camp-name'>
        <p>캠프장: {campName}</p>
      </div>
      <div className='camp-intro'>
        <p>소개: {description}</p>
      </div>
      <img className='camp-picture' src={s3ImageUrl} alt='none' />
      <img className='camp-background' src={background} alt='none' />
    </div>
  );
};

export default Camp;
