
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class BlockchainService implements OnModuleInit {
  constructor(private prisma: PrismaService) { }

  async onModuleInit() {
    await this.ensureGenesisBlock();
  }

  private calculateHash(index: number, previousHash: string, timestamp: number, data: string, nonce: number): string {
    return crypto
      .createHash('sha256')
      .update(index + previousHash + timestamp + data + nonce)
      .digest('hex');
  }

  async ensureGenesisBlock() {
    const count = await this.prisma.blockchainBlock.count();
    if (count === 0) {
      const genesisData = 'GENESIS_BLOCK_MEDSURE';
      const timestamp = Date.now();
      const hash = this.calculateHash(1, '0', timestamp, genesisData, 0);

      await this.prisma.blockchainBlock.create({
        data: {
          index: 1,
          timestamp: new Date(timestamp),
          data: genesisData,
          previousHash: '0',
          hash: hash,
        },
      });
      console.log('Genesis Block Created');
    }
  }

  async addBlock(data: string, batchId?: string, eventId?: string) {
    const lastBlock = await this.prisma.blockchainBlock.findFirst({
      orderBy: { index: 'desc' },
    });

    if (!lastBlock) throw new Error('Chain corrupted: No blocks found');

    const newIndex = lastBlock.index + 1;
    const timestamp = Date.now();
    const newHash = this.calculateHash(newIndex, lastBlock.hash, timestamp, data, 0);

    const block = await this.prisma.blockchainBlock.create({
      data: {
        index: newIndex,
        timestamp: new Date(timestamp),
        previousHash: lastBlock.hash,
        hash: newHash,
        data: data,
        batchId,
        eventId,
      },
    });

    return block;
  }

  async verifyChain(): Promise<boolean> {
    const blocks = await this.prisma.blockchainBlock.findMany({
      orderBy: { index: 'asc' },
    });

    for (let i = 1; i < blocks.length; i++) {
      const currentBlock = blocks[i];
      const previousBlock = blocks[i - 1];

      if (currentBlock.previousHash !== previousBlock.hash) {
        console.error(`Link broken at index ${currentBlock.index}`);
        return false;
      }

      const recalculatedHash = this.calculateHash(
        currentBlock.index,
        currentBlock.previousHash,
        currentBlock.timestamp.getTime(),
        currentBlock.data,
        currentBlock.nonce
      );

      if (currentBlock.hash !== recalculatedHash) {
        console.error(`Hash mismatch at index ${currentBlock.index}`);
        return false;
      }
    }
    return true;
  }

  async getChain() {
    return this.prisma.blockchainBlock.findMany({ orderBy: { index: 'desc' } });
  }
}
