import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'aws-0-eu-central-1.pooler.supabase.com',
            port: 5432,
            username: 'postgres.yhckhhhgmkwxzprkaole',
            password: 'bprsKsSvNTBDVSAl',
            database: 'postgres',
            entities: [User],
            synchronize: true,
        }),
        UsersModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
