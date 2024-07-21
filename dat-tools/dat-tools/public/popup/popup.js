import React from 'react';
import ReactDOM from 'react-dom/client';
import root from '../../src/index'
import App from '../../src/App';

// Your React component for the popup
const root = ReactDOM.createRoot(document.getElementById('root'));

const Popup = () => {
    return (
        <div>
            <App />
        </div>
    );
};

// Render the React component to the DOM element with ID "root"
ReactDOM.render(<Popup />, document.getElementById('root'));