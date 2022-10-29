// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.14;

contract Lottery {
    address private owner;              // Smart Contract Owner Address
    address payable[] private players;  // Current Players Address Array
    string[] private ids;               // Current Players id Array
    uint256 private currentRound;
    uint32 private currentNumberOfPlayers;
    uint32 private maxNumberOfPlayers;
    uint32 private nextRoundMaxNumOfPlayers;
    uint256 private currentFee;
    uint256 private nextRoundFee;

    /*
        //LotteryInfo struct
        //winner : winner Wallet address
        //id : winner ID
        //amount : winner prize amount
    */
    struct LotteryInfo {
        address winner;
        string id;
        uint256 amount;
    }

    // Lotter History to look up.
    mapping (uint256 => LotteryInfo) lotteryHistory;

    constructor() {
        owner = msg.sender;
        currentRound = 1;
        currentFee = .01 ether;         /* Round Fee: 0.01 ETH (Default) */
        nextRoundFee = .01 ether;
        maxNumberOfPlayers = 10;        /* Maximum number of players: 10 (Default) */
        nextRoundMaxNumOfPlayers = 10;
    }

    // get the winner address by a lottery round number.
    function getWinnerByLottery(uint lottery) public view returns (address payable) {
        require(lottery < currentRound, "The input lotter number is bigger than the current round.");
        return payable(lotteryHistory[lottery].winner);
    }

    // get the ID by a lottery round number.
    function getIDByLottery(uint lottery) public view returns (string memory) {
        require(lottery < currentRound, "The input lotter number is bigger than the current round.");
        return lotteryHistory[lottery].id;
    }

    // get the winner prize amount by a lottery round number.
    function getAmountByLottery(uint lottery) public view returns (uint256) {
        require(lottery < currentRound, "The input lotter number is bigger than the current round.");
        return lotteryHistory[lottery].amount;
    }

    // get the current prize money.
    function getBalance() public view returns (uint) {
        return address(this).balance; 
    }

    // get the current players' addresses.
    function getPlayers() public view returns (address payable[] memory){
        return players;
    }

    // get the current round number.
    function getCurrentRound() public view returns (uint256){
        return currentRound;
    }

    // get the current player number.
    function getCurrentNumberOfPlayers() public view returns (uint32){
        return currentNumberOfPlayers;
    }

    // get the maximum player number.
    function getMaxNumberOfPlayers() public view returns (uint32){
        return maxNumberOfPlayers;
    }

    // get the current fee.
    function getCurrentFee() public view returns (uint256){
        return currentFee;
    }

    // join the game without id. In this case, the address is used as id.
    function enter() public payable{
        require(msg.value == currentFee, "The fee is incorrect. Check the fee.");
        setPlayerInfos(payable(msg.sender), toString(msg.sender));
    }

    // join the game with id.
    function enter(string memory id) public payable{
        require(msg.value == currentFee, "The fee is incorrect. Check the fee.");
        setPlayerInfos(payable(msg.sender), id);
    }

    // convert to address to string.
    function toString(address x) internal pure returns (string memory) {
        bytes memory s = new bytes(40);
        for (uint i = 0; i < 20; i++) {
            bytes1 b = bytes1(uint8(uint(uint160(x)) / (2**(8*(19 - i)))));
            bytes1 hi = bytes1(uint8(b) / 16);
            bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
            s[2*i] = char(hi);
            s[2*i+1] = char(lo);            
        }
        return string(s);
    }

    function char(bytes1 b) internal pure returns (bytes1 c) {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
    }

    // set joined players' information. If the number of players is full, play the game.
    function setPlayerInfos(address payable add, string memory id) private {
        players.push(add);
        ids.push(id);
        if (++currentNumberOfPlayers == maxNumberOfPlayers){
            pickWinner();
            setNextRound();
        }
    }

    // get a random number to pick up a winner.
    function getRandomNumber() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(owner, block.timestamp)));
    }

    // pick a winner with a random number and transfer the prize money to the winner.
    function pickWinner() private {
        uint index = getRandomNumber() % maxNumberOfPlayers;
        address payable winner = payable(players[index]);
        uint amount = address(this).balance;
        winner.transfer(amount);

        lotteryHistory[currentRound] = LotteryInfo(winner, ids[index], amount);
    }

    // set a next round.
    function setNextRound() private {
        currentRound++;
        delete players;
        players = new address payable[](0);
        delete ids;
        ids = new string[](0);
        currentNumberOfPlayers = 0;
        currentFee = nextRoundFee;
        maxNumberOfPlayers = nextRoundMaxNumOfPlayers;
    }

    // set a maximum number of plyers on the next round. Only owner can do it.
    function setMaximumNumberOfPlayers(uint32 pNextRoundMaxNumOfPlayers) public onlyOwner {
        nextRoundMaxNumOfPlayers = pNextRoundMaxNumOfPlayers;
        if(currentNumberOfPlayers == 0)
            maxNumberOfPlayers = pNextRoundMaxNumOfPlayers;
    }

    // set a maximum number of plyers on the next round. Only owner can do it.
    function setRoundFee(uint256 pNextRoundFee) public onlyOwner {
        currentFee = pNextRoundFee;
        if(currentNumberOfPlayers == 0)
            currentFee = pNextRoundFee;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner can execute this function");
        _;
    }
}