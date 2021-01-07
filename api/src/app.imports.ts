import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

export const CONFIG_MODULE = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: ['./.env.development'],
});

export const TYPEORM_MODULE = TypeOrmModule.forRoot({
  entities: [
    join(__dirname, '**', '*.entity.{js,ts}'),
    join(__dirname, '**', '**', '*.entity.{js,ts}'),
  ],
  migrations: [join(__dirname, 'database', 'migrations', '*.{js,ts}')],
});
