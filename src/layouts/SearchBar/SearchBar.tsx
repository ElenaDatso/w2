import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RxCross2 } from 'react-icons/rx';
import { TbSearch } from 'react-icons/tb';
import classes from './SearchBar.module.scss';
import Loader from '../../assets/loader.svg';
import { BsFillInboxFill } from 'react-icons/bs';
import { save } from './searchInputReducer';
// import { setSubmited } from './searchSubmitReducer';
import { fetchSeachSubmit } from './seatchData';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleLoader, removeData } from './seatchData';

const SearchBar = () => {
  const dispatch = useDispatch();
  const photodata = useAppSelector((state) => state.apiData.dataArray);
  const searchInput = useSelector((state: { searchInput: string }) => state.searchInput);
  const isLoading = useAppSelector((state) => state.apiData.loading);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(save(event.target.value.trim()));
  };
  const apiDispatch = useAppDispatch();

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchInput) return;
    // dispatch(setSubmited(searchInput));
    apiDispatch(removeData());
    apiDispatch(toggleLoader());
    await apiDispatch(fetchSeachSubmit(searchInput));
    apiDispatch(toggleLoader());
  };

  const handleReset = () => {
    dispatch(save(''));
    apiDispatch(removeData());
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <div className={classes.wrap}>
          <input
            type="text"
            value={searchInput}
            onChange={handleInputChange}
            placeholder="Search"
            className={classes.input}
          />
          <button type="submit" className={classes.submit}>
            <TbSearch></TbSearch>
          </button>
          {searchInput.length > 0 && (
            <button type="button" onClick={handleReset} className={classes.cross}>
              <RxCross2 />
            </button>
          )}
        </div>
      </form>
      {isLoading && <img className={classes.loader} src={Loader} />}
      {isLoading && <p className={classes.loading}>Loading</p>}
      {photodata.length === 0 && !isLoading && (
        <>
          <BsFillInboxFill className={classes.emptyIcon} />
          <p className={classes.emptyText}>List is empty</p>
        </>
      )}
    </>
  );
};

export default SearchBar;
