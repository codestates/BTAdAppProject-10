const Lottery = artifacts.require("Lottery");

contract('Lottery', function([deployer, user1, user2, user3, user4, user5]){

    let lottery;
    
    beforeEach(async () => {
        lottery = await Lottery.new();
        
    })

    describe('Bet', function () {
        it('enter 0.005 ETH', async () => {
            // Fail transaction
            //await assertRevert(lottery.bet('0xab', {from : user1, value:4000000000000000}));

            let res = await lottery.enter('phg', {from : user1, value:5000000000000000});
            console.log(res);

            let res1 = await lottery.enter('jyp', {from : user2, value:5000000000000000});
            console.log(res1);
            // transaction object {chainId, value, to, from, gas(Limit), gasPrice}

            let res2 = await lottery.enter('abc', {from : user3, value:5000000000000000});
            console.log(res2);
            
            let res3 = await lottery.enter('def', {from : user4, value:5000000000000000});
            console.log(res3);
            
            let res4 = await lottery.enter('123', {from : user5, value:5000000000000000});
            console.log(res4);


            let cnt = await lottery.getPlayerCount();
            console.log('res1 : ' + cnt );
            
            let balance = await lottery.getBalance();
            console.log('res2 : ' + balance );
            
            let playeres = await lottery.getPlayers();
            console.log('res3 : ' + playeres );

            let winner = await lottery.pickWinner();
            console.log('res4 : ' + winner );
            
            let winnerByLotter = await lottery.getWinnerByLottery(0);
            console.log('winnerByLotter winner : ' + winnerByLotter.winner);
            console.log('winnerByLotter amount : ' + winnerByLotter.amount);
            console.log('winnerByLotter winnerId : ' + winnerByLotter.winnerId);
            console.log('winnerByLotter winner : ' + winnerByLotter.round);

            let initRes = await lottery.init_Lottory();
            console.log('init Result : ' + initRes);
        })   

    })


});