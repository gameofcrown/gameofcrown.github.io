
window.action_sell_card = (code, user, cardid,cardnum,asset,func) => {
    const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
    const opts = { authorization: [`${account.name}@${account.authority}`] };
    eos.contract(code, { requiredFields: {} }).then(contract => {
        contract.sellcard(cardid,cardnum,asset,account.name,opts).then(trx => { //修改此处
            //console.log('trx', trx);
            console.log('console', trx.processed.action_traces[0].console);
            window.setTimeout(
                function(){
                    func();
                }
                ,1500
            );
        }).catch(err => {
            console.error(err);
           
        })
    })
}
window.action_transfer = (code, from,to,asset,memo) => {
    const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
    const opts = { authorization: [`${account.name}@${account.authority}`] };
    eos.contract(code, { requiredFields: {} }).then(contract => {
        contract.transfer(account.name,to,asset,memo, opts).then(trx => { //修改此处
            //console.log('trx', trx);
            console.log('console', trx.processed.action_traces[0].console);
           
        }).catch(err => {
            console.error(err);
           
        })
    })
}
window.action_transfer_callback = (code, from,to,asset,memo,func) => {
    const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
    const opts = { authorization: [`${account.name}@${account.authority}`] };
    eos.contract(code, { requiredFields: {} }).then(contract => {
        contract.transfer(account.name,to,asset,memo, opts).then(trx => { //修改此处
            //console.log('trx', trx);
            console.log('console', trx.processed.action_traces[0].console);
            window.setTimeout(
                function(){
                    func();
                }
                ,1500
            );
        }).catch(err => {
            console.error(err);
           
        })
    })
}