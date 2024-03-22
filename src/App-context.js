// noinspection JSCheckFunctionSignatures
import Calculator from "./Calculator";
import ToggleSounds from "./ToggleSounds";
import {useWorkout} from "./WorkoutContext";

function App() {
  const {time} = useWorkout();
  return (
       <main>
         <h1>Workout timer</h1>
         <time>For your workout on {time}</time>
         <ToggleSounds/>
         <Calculator/>
       </main>
  );
}

export default App;
