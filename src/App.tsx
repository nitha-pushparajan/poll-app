import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { VerticalCarousel } from './components/organisms/VerticalCarousel';
import { getQuestions } from '../src/services/index';
import { AppState } from '../src/store/types';
import { setLoading } from '../src/store/actions';

import './App.css';
import Loader from './components//atoms/Loader/Loader';

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
          id: 100,
          isSelected: false
        },
        {
          imageUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVYCG0nML0gAjeNUVHcebvl04AHVdwuHOPNg&s',
          label: 'Very Good',
          id: 101,
          isSelected: false
        },
        {
          imageUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8goUv6Q5MaxE1l6W0yac8ZGcKz0NeclExJg&s',
          label: 'Not Good',
          id: 102,
          isSelected: false
        }
      ]
    },
    {
      id: 101,
      question: 'Sample Q2',
      options: [
        {
          imageUrl: '/svg/logo.svg',
          label: 'Label',
          id: 100,
          isSelected: false
        },
        {
          imageUrl: '/svg/grey.svg',
          label: 'Label',
          id: 101,
          isSelected: false
        },
        {
          imageUrl: '/svg/logo.svg',
          label: 'Label',
          id: 102,
          isSelected: false
        }
      ]
    }
  ];
  const questionsState = useSelector((state: AppState) => state);
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
    <div className="App">
      <header className="App-header">
        {questionsState.isLoading || questionsState.isSubmitted ? (
          <>
            {questionsState.isLoading && <Loader />}
            {questionsState.isSubmitted && (
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
      </header>
    </div>
  );
}

export default App;
