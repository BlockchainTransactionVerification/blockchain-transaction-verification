//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.4;

error addBlockFailure();
error deleteBlockFailure();
error grantAccessFailure();
error removeAccessFailure();

contract ptvAcl {

    struct FileData {
        address owner;
        mapping(address => bool) access;
        address[] allowedAddresses;
    }
    mapping(string => FileData) public fileMapping;

    function addBlock(string memory _fileChunkHash) public {
        if ((bytes(_fileChunkHash).length > 0) && (fileMapping[_fileChunkHash].owner == address(0))) {
            fileMapping[_fileChunkHash].owner = msg.sender;
        } else if (fileMapping[_fileChunkHash].owner == msg.sender) {
            fileMapping[_fileChunkHash].owner = msg.sender;
        } else {
            revert addBlockFailure();
        }
    }

    function addBlockMultiple(string[] calldata _fileChunkHashes) public {
        uint i;

        for (i = 0; i < _fileChunkHashes.length; i++) {
            addBlock(_fileChunkHashes[i]);
        }
    }

    function amIOwner(string memory _fileChunkHash) public view returns(bool) {
        if ((bytes(_fileChunkHash).length == 0) || (fileMapping[_fileChunkHash].owner != msg.sender)) {
            return false;
        } else {
            return true;
        }
    }

    function amIOwnerMultiple(string[] calldata _fileChunkHashes) public view returns (bool[] memory) {
        uint i;
        bool[] memory filesOwned = new bool[](_fileChunkHashes.length);

        for(i = 0; i < _fileChunkHashes.length; i++) {
            filesOwned[i] = amIOwner(_fileChunkHashes[i]);
        }

        return filesOwned;
    }

    function checkAccess(address _checkAddress, string memory _fileChunkHash) public view returns (bool) {
        if((bytes(_fileChunkHash).length == 0) || (_checkAddress == address(0))) {
            return false;
        } else {
            if((_checkAddress == fileMapping[_fileChunkHash].owner) || (fileMapping[_fileChunkHash].access[_checkAddress] == true)){
                return true;
            }
        }

        return false;
    }

    function checkAccessMultiple(address _checkAddress, string[] calldata _fileChunkHashes) public view returns (bool[] memory){
        uint i;
        bool[] memory filesAccess = new bool[](_fileChunkHashes.length);

        for(i = 0; i < _fileChunkHashes.length; i++) {
            filesAccess[i] = checkAccess(_checkAddress, _fileChunkHashes[i]);
        }

        return filesAccess;
    }

    function checkMessageSender() public view returns (address) {
        return msg.sender;
    }

    function deleteBlock(string memory _fileChunkHash) public {
        uint i;
        
        if((bytes(_fileChunkHash).length == 0) || (fileMapping[_fileChunkHash].owner != msg.sender)) {
            revert deleteBlockFailure();
        }

        if (fileMapping[_fileChunkHash].allowedAddresses.length > 0) {
            for(i = fileMapping[_fileChunkHash].allowedAddresses.length - 1; i >= 0; i--) {
                fileMapping[_fileChunkHash].access[fileMapping[_fileChunkHash].allowedAddresses[i]] = false;
                fileMapping[_fileChunkHash].allowedAddresses.pop(); // There may be a more efficient way to do this
             }
        }

        fileMapping[_fileChunkHash].owner = address(0);
    }

    function deleteBlockMultiple(string[] calldata _fileChunkHashes) public {
        uint i;
        for(i=0; i < _fileChunkHashes.length; i++)
            deleteBlock(_fileChunkHashes[i]);
    }

    function grantAccess(address _inputAddress, string memory _fileChunkHash) public {
        if((bytes(_fileChunkHash).length == 0) || (_inputAddress == address(0))) {
            revert grantAccessFailure();
        } else {
            if(fileMapping[_fileChunkHash].owner != msg.sender) {
                revert grantAccessFailure();
            } else {
                fileMapping[_fileChunkHash].access[_inputAddress] = true;
                fileMapping[_fileChunkHash].allowedAddresses.push(_inputAddress);
            }
        }
    }

    function grantAccessMultiple(address _inputAddress, string[] calldata _fileChunkHashes) public  {
        uint i;
        for(i = 0; i < _fileChunkHashes.length; i++)
            grantAccess(_inputAddress, _fileChunkHashes[i]);
    }

    function inspectSender() public view returns(address) {
        return msg.sender;
    }

    function removeAccess(address _inputAddress, string memory _fileChunkHash) public {
        if((bytes(_fileChunkHash).length == 0) || (_inputAddress == address(0))) {
            revert removeAccessFailure();
        } else {
            if(fileMapping[_fileChunkHash].owner != msg.sender) {
                revert removeAccessFailure();
            } else {
                fileMapping[_fileChunkHash].access[_inputAddress] = false;
                fileMapping[_fileChunkHash].allowedAddresses.push(_inputAddress);
            }
        }
    }

    function removeAccessMultiple(address _inputAddress, string[] calldata _fileChunkHashes) public {
        uint i;
        for(i = 0; i < _fileChunkHashes.length; i++)
            removeAccess(_inputAddress, _fileChunkHashes[i]);
    }
}