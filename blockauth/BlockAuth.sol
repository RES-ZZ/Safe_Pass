// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BlockAuth {
    mapping(address => bytes32) public userPublicKeys;

    // Register a user's public key
    function registerUser(bytes32 _publicKey) public {
        userPublicKeys[msg.sender] = _publicKey;
    }

    // Verify the signature of a message
    function verifySignature(bytes32 _message, bytes memory _signature) public view returns (bool) {
        bytes32 messageHash = keccak256(abi.encodePacked(_message));
        bytes32 ethSignedMessageHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash));
        address signer = recoverSigner(ethSignedMessageHash, _signature);
        return userPublicKeys[signer] != 0;
    }

    // Helper function to recover the signer from the signature
    function recoverSigner(bytes32 _ethSignedMessageHash, bytes memory _signature) internal pure returns (address) {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);
        return ecrecover(_ethSignedMessageHash, v, r, s);
    }

    // Helper function to split the signature
    function splitSignature(bytes memory sig) internal pure returns (bytes32 r, bytes32 s, uint8 v) {
        require(sig.length == 65, "Invalid signature length");
        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }
        if (v < 27) {
            v += 27;
        }
        return (r, s, v);
    }
}