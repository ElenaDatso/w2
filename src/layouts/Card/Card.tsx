import React from 'react';
import BookFormData from '../../interfaces/BookFormData';
import classes from './Card.module.scss';

const BookCard: React.FC<BookFormData> = ({
  cover,
  title,
  author,
  type,
  dateArrived,
  isUsed,
  reading,
}) => {
  return (
    <div className={classes.cardStyle}>
      <img src={cover} alt={title} className={classes.cover} />
      <h2 className={classes.h2}>{title}</h2>
      <p className={`${classes.p} ${classes.author}`}>by {author}</p>
      <p className={`${classes.p} ${classes.type}`}>{type.join(', ')}</p>
      <h6>Additional info</h6>
      <p className={`${classes.p} ${classes.date}`}>Arrived: {dateArrived}</p>
      <p className={`${classes.p} ${classes.condition}`}>
        Condition: {isUsed === 'true' ? 'Used' : 'New'}
      </p>
      <p className={`${classes.p} ${classes.reader}`}>Now reading: {reading}</p>
    </div>
  );
};

export default BookCard;
