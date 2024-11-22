import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TestsController } from './tests.controller';

@Module({
  controllers: [TestsController],
  imports: [forwardRef(() => AuthModule)],
})
export class TestsModule {}
