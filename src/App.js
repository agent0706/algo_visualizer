import {useState} from 'react';
import './App.css';
import * as Algos from './views';

function App() {

  const [currentAlgo, updateCurrentAlgo] = useState('selectionSort');

  const availableAlgos = [
    {name: 'Selection Sort', value: 'selectionSort'},
    {name: 'Bubble Sort', value: 'bubbleSort'},
  ]

  const renderAlgoView = () => {
    switch(currentAlgo) {
      case 'bubbleSort':
      case 'selectionSort':
        return <Algos.Sort sortingAlgo={currentAlgo} />
      default:
        return <Algos.SelectAlgo />
    }
  };

  return (
    <div>
      <div className="title_container">
        <h3>Algo Visualizer</h3>
      </div>
      <div className="selection_container">
        <select name="algorithms" className="algo_selection" onChange={(event) => updateCurrentAlgo(event.target.value)}>
          {availableAlgos.map((option) => <option value={option.value} key={option.value}>{option.name}</option>)}
        </select>
      </div>
      {renderAlgoView()}
    </div>
  );
}

export default App;
