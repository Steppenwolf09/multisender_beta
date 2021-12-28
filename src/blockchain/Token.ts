import { Injectable } from '@nestjs/common'
const Web3 = require ('web3')
import {ConfigService} from '@nestjs/config'
const Contract = require ('web3-eth-contract')
import *  as abi from '@/assets/abiEth.json'
import *  as abiE from '@/assets/MyExschangeERC.json'
import *  as abiT from '@/assets/MyTRC20.json'
import {Account, Send} from "src/blockchain/blockchainService.interface";
import BigNumber from "bignumber.js";
import {Cron, CronExpression} from "@nestjs/schedule";




@Injectable()
export class Test {
  private gasPrice
  private gasLimit
  private chainId
  private privateKey
  private addrSender
  private ethContract
  private ws
  private web3
  private exchange

  constructor(
    private ethConfig: ConfigService
  ) {
    this.gasPrice = ethConfig.get<number>('EthereumConfig.gasPrice')
    this.gasLimit = ethConfig.get<number>('EthereumConfig.gasLimit')
    this.addrSender = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
    this.chainId = 31337
    this.privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
    this.ethContract = '0xa85233C63b9Ee964Add6F2cffe00Fd84eb32338f'
    this.exchange = '0xc6e7DF5E7b4f2A278906862b61205850344D4e7d'
    this.web3 = new Web3('http://127.0.0.1:8545/')
  }

  async sendTx(send: Array<Send>): Promise<string> {
    const receivers = []
    const amounts = []
    const ten = new BigNumber(10)
    for (let i = 0; i < send.length; i++) {
      receivers.push(send[i].to)
      amounts.push((new BigNumber(send[i].value).multipliedBy(ten.exponentiatedBy(18))).toString())
    }
    const contract = new Contract(abi['default'], this.ethContract)
    const newAcBal = new BigNumber(await this.web3.eth.getBalance(this.addrSender))
    const val = newAcBal.minus(new BigNumber(this.gasLimit * this.gasPrice))
    const rawTr = {
      gasPrice: this.gasPrice,
      gasLimit: this.gasLimit,
      to: this.ethContract,
      from: this.addrSender,
      value: val,
      chainId: this.chainId,
      data: contract.methods.send(receivers, amounts).encodeABI()
    }
    const signedTr = await this.web3.eth.accounts.signTransaction(rawTr, this.privateKey)

    const result = await this.web3.eth.sendSignedTransaction(signedTr.rawTransaction)
    return result.transactionHash
  }
  async getBalance(address){
   return await this.web3.eth.getBalance(address)
  }
  @Cron(CronExpression.EVERY_10_SECONDS)
  async sendToken(summ){
    const contract = new this.web3.eth.Contract(abiE['default'], this.ethContract)
    console.log(await contract.methods.getAmount(10).call())
    // console.log(await contract.methods.)
    // const rawTr = {
    //   gasPrice: this.gasPrice,
    //   gasLimit: this.gasLimit,
    //   to: this.ethContract,
    //   from: this.addrSender,
    //   value: summ,
    //   chainId: this.chainId,
    //   data: contract.methods.ethToTokenSwap(summ).encodeABI()
    // }
    // const signedTr = await this.web3.eth.accounts.signTransaction(rawTr, this.privateKey)
    //
    // const result = await this.web3.eth.sendSignedTransaction(signedTr.rawTransaction)
    // console.log(await contract.methods.getReserve().call())
    // return result.transactionHash
  }
}