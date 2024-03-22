import {useWorkout} from "./WorkoutContext";
import {memo} from "react";

function ToggleSounds() {
  const { allowSound, dispatch } = useWorkout();

  return (
    <button
      className="btn-sound"
      onClick={() => dispatch({type:'toggleAllowSound'})}
    >
      { allowSound ? "🔈" : "🔇"}
    </button>
  );
}

export default memo(ToggleSounds);
