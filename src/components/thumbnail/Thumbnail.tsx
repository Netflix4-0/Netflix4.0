import './Thumbnail.css';

interface IThumbnail {
  thumbnail: string;
  title: string;
  releaseYear: number;
  rating: string;
}

export const Thumbnail = ({
  thumbnail,
  title,
  releaseYear,
  rating,
}: IThumbnail) => {
  return (
    <div className='thumbnailContainer'>
      <h3>{title}</h3>
      <div className='thumbnail'>
        <div className='subTitle'>
          <h4>{releaseYear}</h4>
          <h4>{rating}</h4>
        </div>
        <img
          src={thumbnail}
          onError={event => {
            const target = event.target as HTMLImageElement;
            target.src =
              'https://github.com/Netflix4-0/Netflix4.0/assets/117076586/0628211e-81a5-482f-84c9-b4cf936ef61b';
          }}
        />
      </div>
    </div>
  );
};
