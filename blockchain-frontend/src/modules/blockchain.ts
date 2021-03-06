import { BlockChain } from 'blockchain/src/blockchain';
import EC from 'elliptic';

interface Keys {
    keyObj: object;
    publicKey: string;
    privateKey: string;
}

export class BlockchainService {
   blockchainInstance = new BlockChain();
   public walletKeys: Array<Keys> = [];

    constructor () {
        this.blockchainInstance.difficulty = 1;
        // Block reward goes to this wallet
        this.blockchainInstance.minePendingTransactions('my-wallet-address');
        
        this.generateWalletKeys();
    }

    public getBlocks() {
        return new BlockChain().chain;
    }

    private generateWalletKeys() {
        const ec = new EC.ec('secp256k1');
        const key = ec.genKeyPair();
        const keys: Keys = {
            keyObj: key,
            publicKey: key.getPublic('hex'),
            privateKey: key.getPrivate('hex'),
        };

        this.walletKeys.push(keys);
    };

}

