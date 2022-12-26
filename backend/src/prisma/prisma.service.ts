import {
  INestApplication,
  Injectable,
  NotFoundException,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TableNames } from 'prisma-api-query-builder/types';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async exists(
    model: TableNames<PrismaClient>,
    filter: object,
    throwAble = true,
    message?: string,
  ) {
    // TODO: replace "model as any" with "model"
    const _model: any = this[model as any];

    const exists = (await _model.count({ where: filter })) > 0;

    if (!exists && throwAble) throw new NotFoundException(message);

    return exists;
  }

  async onModuleInit() {
    try {
      // await this.$connect();
    } catch (error) {
      console.error('error connecting to database');
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      console.error('PRISMA FORCEFULL EXIT!');
      await app.close();
    });
  }
}
