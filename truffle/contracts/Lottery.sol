// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Lottery {
    address public owner;
    address payable[] public players;
    uint256 public currentLottryId;


    /*
    //LotteryInfo 
    //winder : winner 지갑 주소
    //amount : winner 당첨금           
    //userId : winner ID                                                                      
    */
    struct LotteryWinnerInfo {
        address winner;
        uint256 amount;
        string winnerId;
        uint256 round;
    }

    /*
    //LotteryInfo 
    //winder : 참가자 지갑 주소
    //amount : 참가비           
    //userId : 참가자 ID                                                                      
    */
    struct BetInfo {
        address bettor;
        uint256 amount;
        string userId;
    }

    uint256 constant internal BET_AMOUNT = 5 * 10 ** 15;

    uint256 private _tail;
    uint256 private _head;
    mapping (uint256 => BetInfo) private _bets;

    mapping (uint256 => LotteryWinnerInfo) lotteryHistory;


    constructor() {
        owner = msg.sender;
        currentLottryId = 0;
    }

    function init_Lottory() public returns (bool) {
        //player 는 초기화하여 다음 회차에 사용
        players = new address payable[](0);
        
        return true;
    }

    /*
    // 회차별 winner 정보를 리턴
     */
    function getWinnerByLottery(uint lottery) public view returns (address payable) {
        return payable(lotteryHistory[lottery].winner);
    }

    /*
    // 누적된 참가비를 리턴
     */
    function getBalance() public view returns (uint) {
        return address(this).balance; 
    }


    /*
    // 참여한 플레이어들의 주소 정보를 리턴
     */
    function getPlayers() public view returns (address payable[] memory){
        return players;
    }

    /*
    // 참여한 플레이어 카운트 리턴
     */
    function getPlayerCount() public view returns (uint256 playerCount){
        return players.length;
    }

    function enter(string memory userId) public payable returns (bool) {
        
        require(players.length < 5, "Betting End, Only 10 players betting for round ");

        // Check the proper ether is sent
        require(msg.value == BET_AMOUNT, "Not enough ETH, You can bet 0.05 eth");
        
        BetInfo memory b;
        b.bettor = payable(msg.sender); 
        b.amount = msg.value;
        b.userId = userId;

        _bets[_tail] = b;
        _tail++; 

        players.push(payable(msg.sender));
        
        return true;
    }


    function getRandomNumber() public view returns (uint) {
        return uint(keccak256(abi.encodePacked(owner, block.timestamp)));
    }


    function getBetInfo(uint256 index) public view returns (string memory winnerId) {
        BetInfo memory b = _bets[index];
        winnerId = b.userId;
    }

    /*
    // pickWinner
    // winner 추첨
     */
    function pickWinner() public onlyOwner returns (bool) {
        uint index = getRandomNumber() % players.length;
        address payable winner = payable(players[index]);
        
        string memory winnerId = getBetInfo(index);

        uint amount = address(this).balance;
        winner.transfer(amount);

        //currentLottryId 는 최초에 0,lotteryHistory 변수 0번째 저장 목적, lotteryHistory 라운드 정보는 currentLottryId+1 로 저장
        //sample lotteryHistory[0] = LotteryWinnerInfo(winner, amount, winnerId, 1);
        lotteryHistory[currentLottryId] = LotteryWinnerInfo(winner, amount, winnerId, currentLottryId+1);
        currentLottryId++;
        
        return true;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner can execute this function");
        _;
    }
    
}
