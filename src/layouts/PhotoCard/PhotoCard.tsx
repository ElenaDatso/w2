import React from 'react';
import { useState } from 'react';
import classes from './PhotoCard.module.scss';
import PhotoData from '../../interfaces/PhotoData';
import CardModal from '../CardModal/CardModal';
import FullPhotoCard from '../FullPhotoCard/FullPhotoCard';
import Loader from '../../assets/loader.svg';
import getApi from '../../api/flickr';
import PhotoInfo from '../../interfaces/PhotoInfo';
import Lost from '../../assets/lost.jpg';

const PhotoCard: React.FC<PhotoData> = ({
  farm,
  title,
  id,
  isfamily,
  isfriend,
  ispublic,
  owner,
  secret,
  server,
}) => {
  const [ifShowCard, setIfShowCard] = useState(false);
  const [isLaoding, setIsLoading] = useState(false);
  const [photoInfo, setPhotoInfo] = useState<PhotoInfo | null>(null);
  const [isLost, setIsLost] = useState(false);

  async function cardOpenHandler() {
    setIfShowCard(true);
    setIsLoading(true);
    const response = await getApi().getPhotoInfo(id);
    const photoInfo = response.data.photo as PhotoInfo;
    if (photoInfo) setPhotoInfo(photoInfo);
    setIsLoading(false);
  }

  function onCloseHandler() {
    setIfShowCard(false);
  }

  fetch(`https://live.staticflickr.com/${server}/${id}_${secret}.jpg`)
    .then((data) => (data.status === 500 ? setIsLost(true) : setIsLost(false)))
    .catch(() => {
      throw Error;
    });

  return (
    <>
      {ifShowCard && (
        <CardModal onClose={onCloseHandler}>
          {isLaoding && <img src={Loader} />}
          {!isLaoding && photoInfo && (
            <FullPhotoCard
              farm={farm}
              id={id}
              isfamily={isfamily}
              isfriend={isfriend}
              ispublic={ispublic}
              owner={owner}
              secret={secret}
              server={server}
              title={title}
              info={photoInfo}
            ></FullPhotoCard>
          )}
        </CardModal>
      )}
      <div className={classes.cardStyle} onClick={cardOpenHandler}>
        <img
          src={isLost ? Lost : `https://live.staticflickr.com/${server}/${id}_${secret}.jpg`}
          alt={title}
          className={classes.cover}
        />
        <h2 className={classes.h2}>{title}</h2>
      </div>
    </>
  );
};

export default PhotoCard;
