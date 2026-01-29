import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SupplyChainService {
    constructor(private prisma: PrismaService) { }

    async scanBatch(batchId: string, location: string, status: string, handlerId: string) {
        // 1. Verify batch exists by batchNumber (the public ID)
        const batch = await this.prisma.batch.findUnique({
            where: { batchNumber: batchId },
        });

        if (!batch) {
            throw new NotFoundException(`Batch with ID ${batchId} not found`);
        }

        // 2. Log scan event (SupplyChainEvent is better for shipping logs than Consumer ScanLog)
        const event = await this.prisma.supplyChainEvent.create({
            data: {
                batchId: batch.id,
                location: location,
                eventType: status || 'SCANNED',
                timestamp: new Date(),
                // handlerId: handlerId 
            },
        });

        // 3. We don't have a status field on Batch model yet, so skipping update or adding it conceptually
        // For now, we rely on the event history to determine status.

        return {
            success: true,
            scannedAt: event.timestamp,
            newStatus: status,
            batch: {
                id: batch.batchNumber,
                product: batch.productName
            }
        };
    }
}

