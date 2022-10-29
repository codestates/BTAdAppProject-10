// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.14;

contract Lottery {
    address public owner;
    address payable[] private players;
    string[] private ids;
    uint256 private currentRound;
    uint32 private currentNumberOfPlayers;
    uint32 private maxNumberOfPlayers;
    uint32 private nextRoundMaxNumOfPlayers;
    uint256 private currentFee;
    uint256 private nextRoundFee;

    struct LotteryInfo {
        address winner;
        string id;
        uint256 amount;
    }

    mapping (uint256 => LotteryInfo) lotteryHistory;

    constructor() {
        owner = msg.sender;
        currentRound = 1;
        currentFee = .01 ether;       /* Round Fee: 0.01 ETH (Default) */
        nextRoundFee = .01 ether;
        maxNumberOfPlayers = 10;    /* Maximum number of players: 10 (Default) */
        nextRoundMaxNumOfPlayers = 10;
    }

    function getWinnerByLottery(uint lottery) public view returns (address payable) {
        require(lottery < currentRound, "The input lotter number is bigger than the current round.");
        return payable(lotteryHistory[lottery].winner);
    }

    function getIDByLottery(uint lottery) public view returns (string memory) {
        require(lottery < currentRound, "The input lotter number is bigger than the current round.");
        return lotteryHistory[lottery].id;
    }

    function getAmountByLottery(uint lottery) public view returns (uint256) {
        require(lottery < currentRound, "The input lotter number is bigger than the current round.");
        return lotteryHistory[lottery].amount;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance; 
    }

    function getPlayers() public view returns (address payable[] memory){
        return players;
    }

    function getCurrentRound() public view returns (uint256){
        return currentRound;
    }

    function getCurrentNumberOfPlayers() public view returns (uint32){
        return currentNumberOfPlayers;
    }

    function getMaxNumberOfPlayers() public view returns (uint32){
        return maxNumberOfPlayers;
    }

    function getCurrentFee() public view returns (uint256){
        return currentFee;
    }

    function enter() public payable{
        require(msg.value == currentFee, "The fee is incorrect. Check the fee.");
        setPlayerInfos(payable(msg.sender), toString(msg.sender));
    }

    function enter(string memory id) public payable{
        require(msg.value == currentFee, "The fee is incorrect. Check the fee.");
        setPlayerInfos(payable(msg.sender), id);
    }

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

    function setPlayerInfos(address payable add, string memory id) private {
        players.push(add);
        ids.push(id);
        if (++currentNumberOfPlayers == maxNumberOfPlayers){
            pickWinner();
            setNextRound();
        }
    }

    function getRandomNumber() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(owner, block.timestamp)));
    }

    function pickWinner() private {
        uint index = getRandomNumber() % maxNumberOfPlayers;
        address payable winner = payable(players[index]);
        uint amount = address(this).balance;
        winner.transfer(amount);

        lotteryHistory[currentRound] = LotteryInfo(winner, ids[index], amount);
    }

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

    function setMaximumNumberOfPlayers(uint32 pNextRoundMaxNumOfPlayers) public onlyOwner {
        nextRoundMaxNumOfPlayers = pNextRoundMaxNumOfPlayers;
        if(currentNumberOfPlayers == 0)
            maxNumberOfPlayers = pNextRoundMaxNumOfPlayers;
    }

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