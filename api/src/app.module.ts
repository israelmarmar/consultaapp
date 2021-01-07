import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { CONFIG_MODULE, TYPEORM_MODULE } from './app.imports';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConferenceModule } from './conference/conference.module';

@Module({
  imports: [
    CONFIG_MODULE,
    TYPEORM_MODULE,
    AuthModule,
    UserModule,
    ConferenceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [TypeOrmModule],
})
export class AppModule {}
