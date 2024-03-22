// noinspection JSCheckFunctionSignatures

import {createContext, useContext, useEffect, useMemo, useReducer} from "react";
import formatTime from "./formatTime";

const WorkoutContext = createContext();

const initialState = { allowSound: true, time: formatTime(new Date()) }

function reducer(state, action) {
  switch (action.type) {
    case 'setTime':
      return {...state, time: action.payload}
    case 'toggleAllowSound':
      return {...state, allowSound: !state.allowSound}
    default:
      throw new Error('NO TYPE ... !!!')
  }
}

function ProvideWorkout({children}) {
  const [{allowSound, time}, dispatch] = useReducer(reducer, initialState)

  // Will  be AM or PM
  const partOfDay = time.slice(-2);

  const workouts = useMemo(() => {
    return [
      {
        name: "Full-body workout",
        numExercises: partOfDay === "AM" ? 9 : 8,
      },
      {
        name: "Arms + Legs",
        numExercises: 6,
      },
      {
        name: "Arms only",
        numExercises: 3,
      },
      {
        name: "Legs only",
        numExercises: 4,
      },
      {
        name: "Core only",
        numExercises: partOfDay === "AM" ? 5 : 4,
      },
    ];
  },[partOfDay])

  useEffect(function () {
    const id = setInterval(function () {
      dispatch({type: 'setTime', payload: formatTime(new Date())})
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const value = useMemo(() => {
    return {
      allowSound, time, dispatch, workouts
    }
  },[allowSound,time, dispatch, workouts])

  return (
       <WorkoutContext.Provider value={value}>
         {children}
       </WorkoutContext.Provider>
  );
}
function useWorkout() {
  const context = useContext(WorkoutContext);
  if(context === undefined) throw new Error("Outside context");
  return context;
}
export {ProvideWorkout, useWorkout};