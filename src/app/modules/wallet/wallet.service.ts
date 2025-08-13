
import { IWallet } from "./wallet.interface"
import { Wallet } from "./wallet.model"


const addMoney  = async (payload : Partial<IWallet  >) => {
    const wallet = await Wallet.create(payload)
    return wallet
}


// const withdrawMoney = async ( Partial<IWallet>) => {
//     const wallet = await Wallet.findOne({owner : userId})
//     return wallet
// }



export  const WalletServices = {
    addMoney,
 
}