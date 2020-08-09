import React, { useState } from 'react';
import  Gameplay from './components/Gameplay';

function App() {

  const [gameplayKey, setGamplaykey] = useState(1);

  const reloadComponent = () => {
    setGamplaykey(prevKey => prevKey + 1)
  }

  return (
    <div>
      <h1 className="text-center h1">
        Quint of diamonds
      </h1>

      <Gameplay key={gameplayKey}
        onReplayGame={reloadComponent}
      ></Gameplay>
    </div>
  );
}

export default App;
