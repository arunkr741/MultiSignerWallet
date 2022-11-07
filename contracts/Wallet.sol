//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract MultiSignerWallet {
    address[] public owners;
    uint public threshold;

    struct Transfer{
        uint id;
        uint ammount;
        address payable to;
        uint approvals;
        bool sent;
    }

    mapping(address => mapping(uint => bool)) public approvals;

    Transfer[] public transfers;

    constructor(address[] memory _owners, uint _threshold) {
        owners = _owners;
        threshold = _threshold;
    }

    function getOwners() external view returns (address[] memory){
        return owners;
    }
    function createTransfer( uint ammount, address payable to) external {
        transfers.push(Transfer(
            transfers.length,
            ammount,
            to,
            0,
            false
        ));
    }

    function getTransfers() external view returns (Transfer[] memory){
        return transfers;
    }

    function approveTransfer(uint id ) external{
        require(transfers[id].sent == false, 'transfer has already been sent');
        require(approvals[msg.sender][id] == false, 'cannot approve transfer twice');
        require(transfers[id].approvals < threshold, 'transfer has already been approved');

        approvals[msg.sender][id] = true;
        transfers[id].approvals++;

        if(transfers[id].approvals >= threshold){
            transfers[id].sent = true;
            address payable to = transfers[id].to;
            uint ammount = transfers[id].ammount;
            to.transfer(ammount);
        }
    }

    function deposit() external payable {
        
    }

}