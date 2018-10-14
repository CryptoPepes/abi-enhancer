import Web3 from "web3";

import fs from "fs";

const web3 = new Web3();

function processABI(abiPath, outputPath) {
    const abi = JSON.parse(fs.readFileSync(abiPath, 'utf8'));

    for (let i = 0; i < abi.length; i++) {
        const abiMethod = abi[i];
        if (abiMethod.type === 'function') {
            const signature = web3.eth.abi.encodeFunctionSignature(abiMethod);
            console.log(`Created signature ${signature} for method ${abiMethod.name}.`);
            // strip off the '0x' prefix
            abiMethod['sign'] = signature.substring(2);
        }
    }

    var json = JSON.stringify(abi);
    fs.writeFile(outputPath, json, {encoding: 'utf8', flag: 'w'}, (err) =>{
        if(!err) {
            console.log("completed!") 
        } else {
            console.log(err);
        }
    });
}
processABI('abi/DPEP_abi.json', './out/DPEP_abi.json');
processABI('abi/CPEP_abi.json', './out/CPEP_abi.json');
processABI('abi/sale_abi.json', './out/sale_abi.json');
processABI('abi/cozy_abi.json', './out/cozy_abi.json');