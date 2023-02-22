/* eslint-disable prettier/prettier */
import { CacheModule, CacheStore, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { redisStore } from 'cache-manager-redis-store';
import { AuthModule } from './components/auth/auth.module';
import { PhoneModule } from './components/phone/phone.module';
import { UserModule } from './components/user/user.module';
import { dataSourceOptions } from './config/data-source.config';
import { CartModule } from './components/cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const store = await redisStore({
          socket: {
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
          },
        });

        return {
          store: store as unknown as CacheStore,
          ttl: 0,
        };
      },
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    AuthModule,
    PhoneModule,
    CartModule,
  ],
})
export class AppModule {}
