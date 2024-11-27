 
import {
  INestApplication,
  Injectable,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);
  async onModuleInit() {
    this.logger.log('Initializing Prisma Service...');
    await this.$connect();
    this.logger.log('Prisma Service initialized!');
  }
  async enableShutDownHook(app: INestApplication) {
    process.on('beforeExit', async () => {
      this.logger.log('Shutting down Prisma Service...');
      await app.close();
    });
  }
}
