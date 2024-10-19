import React from 'react';
import WorkoutTracker from './WorkoutTracker';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Трекер тренировок и прогулок</h1>
      <WorkoutTracker />
    </div>
  );
};

export default App;
