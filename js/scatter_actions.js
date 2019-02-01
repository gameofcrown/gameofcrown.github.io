window.action_update_own_planet = (code, user, id) => {
    const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
    const opts = { authorization: [`${account.name}@${account.authority}`] };
    eos.contract(code, { requiredFields: {} }).then(contract => {
        contract.updsdp(id,account.name, opts).then(trx => { //修改此处
            //console.log('trx', trx);
            console.log('console', trx.processed.action_traces[0].console);
           
        }).catch(err => {
            console.error(err);
           
        })
    })
}
window.action_update_planet = (code, id,payer) => {
    const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
    const opts = { authorization: [`${account.name}@${account.authority}`] };
    eos.contract(code, { requiredFields: {} }).then(contract => {
        contract.updsdp(id,account.name, opts).then(trx => { //修改此处
            //console.log('trx', trx);
            console.log('console', trx.processed.action_traces[0].console);
           
        }).catch(err => {
            console.error(err);
           
        })
    })
}

window.action_set_teleport = (code, user, id,coord,bttpoint) => {
    const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
    const opts = { authorization: [`${account.name}@${account.authority}`] };
    eos.contract(code, { requiredFields: {} }).then(contract => {
        contract.sdtelecrd(id,account.name,coord, bttpoint ,opts).then(trx => { //修改此处
            //console.log('trx', trx);
            console.log('console', trx.processed.action_traces[0].console);
           
        }).catch(err => {
            console.error(err);
           
        })
    })
}
window.action_update_teleport = (code, user, id) => {
    const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
    const opts = { authorization: [`${account.name}@${account.authority}`] };
    eos.contract(code, { requiredFields: {} }).then(contract => {
        contract.updtele(id,account.name,opts).then(trx => { //修改此处
            //console.log('trx', trx);
            console.log('console', trx.processed.action_traces[0].console);
           
        }).catch(err => {
            console.error(err);
           
        })
    })
}

window.action_sell_planet = (code, user, id,asset) => {
    const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
    const opts = { authorization: [`${account.name}@${account.authority}`] };
    eos.contract(code, { requiredFields: {} }).then(contract => {
        contract.selltrdpl(id,account.name,asset, opts).then(trx => { //修改此处
            //console.log('trx', trx);
            console.log('console', trx.processed.action_traces[0].console);
           
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