import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from './formReducer';
import BookForm from '../../layouts/Form/FormL';
import BookCard from '../../layouts/Card/Card';
import BookFormData from '../../interfaces/BookFormData';
import classes from './Form.module.scss';

function Form() {
  // const [cards, setCards] = useState<BookFormData[]>([]);
  const dispatch = useDispatch();
  const forms = useSelector((state: { form: BookFormData[] }) => state.form);
  function newDataHandler(data: BookFormData) {
    dispatch(push(data));
    console.log(forms);
  }

  return (
    <div className={classes.wrap}>
      <BookForm onNewData={newDataHandler} />
      <div className={classes.cardsWrap}>
        {forms.map((card: BookFormData) => (
          <BookCard
            key={Math.random()}
            cover={card.cover}
            title={card.title}
            author={card.author}
            type={card.type}
            dateArrived={card.dateArrived}
            isUsed={card.isUsed}
            reading={card.reading}
          />
        ))}
      </div>
    </div>
  );
}

export default Form;
