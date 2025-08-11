
import { IWallet } from "./wallet.interface"
import walletModel from "./wallet.model"

const addMoney  = async (payload : Partial<IWallet  >) => {
    const wallet = await walletModel.create(payload)
    return wallet
}




export  const WalletServices = {
    addMoney
}