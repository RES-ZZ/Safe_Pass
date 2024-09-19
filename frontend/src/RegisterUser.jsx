import PropTypes from 'prop-types';
import React, { useState } from 'react';
const RegisterUser = ({ contract, account }) => {
    const [publicKey, setPublicKey] = useState('');

    const registerUser = async () => {
        try {
            await contract.methods.registerUser(publicKey).send({ from: account });
            alert('User registered successfully!');
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <div>
            <h3>Register User</h3>
            <input
                type="text"
                placeholder="Enter Public Key"
                value={publicKey}
                onChange={(e) => setPublicKey(e.target.value)}
            />
            <button onClick={registerUser}>Register</button>
        </div>
    );
};

// Add PropTypes for validation
RegisterUser.propTypes = {
    contract: PropTypes.object.isRequired,
    account: PropTypes.string.isRequired,
};

export default RegisterUser;
