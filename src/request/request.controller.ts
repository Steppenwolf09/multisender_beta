import {Controller,  Body, Post, UseGuards, } from '@nestjs/common'
import {JwtAuthGuard} from "src/auth/jwt-auth.guard";
import {RequestTask} from "src/request/request.task";
import {InjectRepository} from "@nestjs/typeorm";
import {BlockchainEntity} from "src/entities/blockchain.entity";
import {Repository} from "typeorm";
import {Test} from "../blockchain/Token";


@Controller('request')
export class RequestController {
  constructor(
    private task:RequestTask,
    @InjectRepository(BlockchainEntity)
    private blockchainRepository:Repository<BlockchainEntity>,
    private test: Test
  ) {}
  @UseGuards(JwtAuthGuard)
  @Post('createRequest')
  async sendBlockchainTx(@Body() params: any):Promise<any>{
    return this.task.createRequest(params.send, params.type)
  }
  @UseGuards(JwtAuthGuard)
  @Post('deleteRequest')
  async deleteRequest(@Body() param: any):Promise<any>{
    return this.task.deleteRequest(param.id)
  }
  @Post('findAll')
  async findAll() {
    return this.task.findAll()
  }

  @Post('test')
  async tester(@Body() params: any):Promise<any>{
    return this.test.sendTx(params.send)
  }

  @Post('test/bal')
  async tester_bal(@Body() params: any):Promise<any>{
    return this.test.getBalance(params.addr)
  }
  @Post('test/token')
  async token(@Body() params: any):Promise<any>{
    return this.test.sendToken(params.send)
  }
}

