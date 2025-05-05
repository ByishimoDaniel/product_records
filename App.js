import React from 'react';
import ProductForm from './components/ProductForm';
import Users from './components/Users';
import Adimin from './components/Adimin';

const App = () => {
    return (
        <div>
            <h1>Product Entry Form</h1>
            <ProductForm />
            <Users/>
            <Adimin/>
        </div>
    );
};

export default App;
