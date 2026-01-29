import { Controller, Get, Post, Body } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';

@Controller('blockchain')
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) { }

  @Get()
  getChain() {
    return this.blockchainService.getChain();
  }

  @Get('verify')
  verifyChain() {
    return this.blockchainService.verifyChain();
  }
}
