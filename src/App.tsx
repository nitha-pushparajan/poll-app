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
  const data = [
    {
      id: 100,
      question: 'How was your week overall?',
      options: [
        {
          imageUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqmA_K0xJxXq6VQFwJBXUmtFAvvoJJBmxYZg&s',
          label: 'Good',
          id: 1001,
          isSelected: false
        },
        {
          imageUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVYCG0nML0gAjeNUVHcebvl04AHVdwuHOPNg&s',
          label: 'Great',
          id: 1002,
          isSelected: false
        },
        {
          imageUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8goUv6Q5MaxE1l6W0yac8ZGcKz0NeclExJg&s',
          label: 'Bad',
          id: 1003,
          isSelected: false
        }
      ]
    },
    {
      id: 101,
      question: 'How are you feeling today?',
      options: [
        {
          imageUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqmA_K0xJxXq6VQFwJBXUmtFAvvoJJBmxYZg&s',
          label: 'Happy',
          id: 1001,
          isSelected: false
        },
        {
          imageUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTeladnREDXJFeEip-hI8JGYCQXBKnNt-ozg&s',
          label: 'Sad',
          id: 1002,
          isSelected: false
        },
        {
          imageUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8goUv6Q5MaxE1l6W0yac8ZGcKz0NeclExJg&s',
          label: 'Neutral',
          id: 1003,
          isSelected: false
        }
      ]
    }
  ];
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
    // fetchQuestions();
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
              <VerticalCarousel items={data} />
            )}
          </>
        )}
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
