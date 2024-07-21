import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Your React component for the popup

// const Popup = () => {
//     return (
//         <div>
//             <App />
//         </div>
//     );
// };

// Render the React component to the DOM element with ID "root"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
)
export default root