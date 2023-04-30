import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import BookFormData from '../../interfaces/BookFormData';
import classes from './Form.module.scss';
import Modal from '../Modal/Modal';

type Props = {
  onNewData: (data: BookFormData) => void;
};

const BookForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<BookFormData>();
  const [coverUrl, setCoverUrl] = useState('');

  const onSubmit = (data: BookFormData) => {
    data.cover = coverUrl;
    setCoverUrl('');
    props.onNewData(data);
    reset();
  };

  const [showConfirm, setShowControl] = useState(false);

  const handleCoverUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCoverUrl(url);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      setShowControl(true);
      setTimeout(() => {
        setShowControl(false);
      }, 1300);
    }
  }, [isSubmitSuccessful]);

  return (
    <div className={classes.wrap}>
      <h2 className={classes.h2}>Add new book</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <div className={classes.formFields}>
          <div className={classes.formFeildCol}>
            <div className={classes.formRow}>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                {...register('title', { required: 'Title field is required' })}
              />
              <p className={classes.fieldError}>{errors.title?.message}</p>
            </div>

            <div className={classes.formRow}>
              <label htmlFor="author">Author:</label>
              <input
                type="text"
                id="author"
                {...register('author', { required: 'Author field is required' })}
              />
              <p className={classes.fieldError}>{errors.author?.message}</p>
            </div>

            <div className={classes.formRow}>
              <label htmlFor="dateArrived">Date Arrived:</label>
              <input
                type="date"
                id="dateArrived"
                {...register('dateArrived', { required: 'Date when book arrived is required' })}
              />
              <p className={classes.fieldError}>{errors.dateArrived?.message}</p>
            </div>
          </div>

          <div className={classes.formFeildCol}>
            <div className={classes.formRow}>
              <label htmlFor="type">Type:</label>
              <div>
                <label>
                  <input
                    type="checkbox"
                    value="fantasy"
                    {...register('type', { required: true })}
                  />
                  Fantasy
                </label>
              </div>
              <div>
                <label>
                  <input type="checkbox" value="comedy" {...register('type', { required: true })} />
                  Comedy
                </label>
              </div>
              <div>
                <label>
                  <input type="checkbox" value="family" {...register('type', { required: true })} />
                  Family
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    value="lovestory"
                    {...register('type', { required: true })}
                  />
                  Love Story
                </label>
              </div>
              <p className={classes.fieldError}>
                {errors.type && <span>Please choose atleast one</span>}
              </p>
            </div>

            <div className={classes.formRow}>
              <label htmlFor="isUsed">Is Used:</label>
              <label>
                <input type="radio" value="true" {...register('isUsed', { required: true })} />
                Yes
              </label>
              <label>
                <input type="radio" value="false" {...register('isUsed', { required: true })} />
                No
              </label>
              <p className={classes.fieldError}>
                {errors.isUsed && <span>Please choose an option</span>}
              </p>
            </div>

            <div className={classes.formRow}>
              <label htmlFor="reading">Reading Now:</label>
              <Controller
                name="reading"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <select {...field}>
                    <option value="">Select the reader</option>
                    <option value="Nobody">Nobody</option>
                    <option value="Smith">Smith</option>
                    <option value="Johnson">Johnson</option>
                    <option value="Williams">Williams</option>
                    <option value="Jones">Jones</option>
                    <option value="Brown">Brown</option>
                  </select>
                )}
              />
              <p className={classes.fieldError}>
                {errors.reading && <span>Is somebody reading a book now?</span>}
              </p>
            </div>

            <div className={classes.formRow}>
              <label htmlFor="cover">Cover:</label>
              <input
                type="file"
                id="cover"
                {...register('cover', {
                  required: 'Please upload the cover-image',
                  onChange: (e) => {
                    handleCoverUpload(e);
                  },
                })}
              />
              <p className={classes.fieldError}>{errors.cover?.message}</p>
            </div>
          </div>
        </div>

        <button type="submit" className={classes.formSubmit}>
          Submit
        </button>
        <div>{showConfirm && <Modal>Success!</Modal>}</div>
      </form>
    </div>
  );
};

export default BookForm;
