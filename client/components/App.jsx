import React from 'react';
import ReactDOM from 'react-dom';
import Filter from './Filter.jsx';
import Landing from './Landing.jsx';

const App = () => {
  return (
    <div>
      <p>Bunch of Frooty Tooties</p>
      <div className='filter'>
        <Filter />
      </div>
      <div className="landing">
        <Landing />
      </div>
    </div>
  );
};

export default App;
ReactDOM.render(<App />, document.getElementById('app'));