import React from 'react';
import SearchBar from '../../layouts/SearchBar/SearchBar';
import classes from './Main.module.scss';
import PhotoCard from '../../layouts/PhotoCard/PhotoCard';
import { useAppSelector } from '../../hooks';

function Main() {
  const dataCards = useAppSelector((state) => state.apiData.dataArray);

  return (
    <div>
      <SearchBar></SearchBar>
      <div className={classes.cardsWrap}>
        {dataCards.length > 0 &&
          dataCards.map((card) => (
            <PhotoCard
              key={card.id}
              title={card.title}
              farm={card.farm}
              id={card.id}
              isfamily={card.isfamily}
              isfriend={card.isfriend}
              ispublic={card.ispublic}
              owner={card.owner}
              secret={card.secret}
              server={card.server}
            />
          ))}
      </div>
    </div>
  );
}

export default Main;
