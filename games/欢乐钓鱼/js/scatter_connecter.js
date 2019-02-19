
ScatterJS.plugins(new ScatterEOS());


//const network = {
//    blockchain: 'eos',
//    chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
//    host: '192.168.159.129',
//    port: 7777,
//    protocol: 'http'
//};
//

const network = {
    blockchain: 'eos',
    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    host: 'nodes.get-scatter.com',
    port: 443,
    protocol: 'https'
};




let scatter, eos;

ScatterJS.scatter.connect('LernaVanillaTest').then(connected => {
    if (!connected) return false;
    scatter = ScatterJS.scatter;
    eos = scatter.eos(network, Eos);


    scatter.getIdentity({ accounts: [network] }).then(() => {

        const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
        
        GLOBAL_DATA.username=account.name;
        


    }
    );

});

window.login = async () => {
    await scatter.suggestNetwork(network);
    await scatter.getIdentity({ accounts: [network] })
    eos = scatter.eos(network, Eos);



};

window.logout = () => {
    scatter.forgetIdentity();
};
login();