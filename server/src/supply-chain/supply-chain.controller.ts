import { Body, Controller, Post } from '@nestjs/common';
import { SupplyChainService } from './supply-chain.service';

@Controller('supply-chain')
export class SupplyChainController {
    constructor(private readonly supplyChainService: SupplyChainService) { }

    @Post('scan')
    scan(@Body() body: { batchId: string; location: string; status: string }) {
        // Mock handler ID for now
        return this.supplyChainService.scanBatch(body.batchId, body.location, body.status, 'mock-user-id');
    }
}
