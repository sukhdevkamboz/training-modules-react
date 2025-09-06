import React from 'react';
import ReactDOM from 'react-dom/client';
import TrainingModule from './components/TrainingModule';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
    return <TrainingModule />
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

