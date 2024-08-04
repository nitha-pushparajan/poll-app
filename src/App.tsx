import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { VerticalCarousel } from 'src/components/organisms/VerticalCarousel';
import Loader from 'src/components/atoms/Loader/Loader';
import logo from './logo.svg';
import { getQuestions } from 'src/lib/services';
import { AppState } from 'src/lib/store/types';
import { setLoading } from 'src/lib/store/actions';

import './App.css';

function App() {
  const isLoading = useSelector((state: AppState) => state.isLoading);
  const isSubmitted = useSelector((state: AppState) => state.isSubmitted);

  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    dispatch(setLoading(true));

    await getQuestions()
      .then((res: any) => {
        setQuestions(res?.record?.questions);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <header className="fixed top-0 left-0 z-10 p-[10px] md:p-[40px]">
        <img src={logo} className="w-[50px]" alt="App logo" />
      </header>
      <div className="app-body">
        {isLoading || isSubmitted ? (
          <>
            {isLoading && <Loader />}
            {isSubmitted && (
              <div className="w-full h-full absolute flex justify-center items-center text-[#fff]">
                You have successfully submitted your answers.
              </div>
            )}
          </>
        ) : (
          <>
            {error ? (
              <div className="w-full h-full absolute flex justify-center items-center text-[#fff]">
                An error occured. Please try again after some time.
              </div>
            ) : (
              <VerticalCarousel items={questions} />
            )}
          </>
        )}
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
