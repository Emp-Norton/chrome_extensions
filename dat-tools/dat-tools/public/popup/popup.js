import React from 'react';
import ReactDOM from 'react-dom';

// Your React component for the popup
const Popup = () => {
    return (
        <div>
            <h1>Hello from React Chrome Extension Popup!</h1>
            {/* Add more content here */}
        </div>
    );
};

// Render the React component to the DOM element with ID "root"
ReactDOM.render(<Popup />, document.getElementById('root'));