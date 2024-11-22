import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const authToken = req.signedCookies['authToken'];

      if (!authToken) {
        throw new UnauthorizedException();
      } else {
        const user = this.jwtService.verify(authToken, {
          secret: process.env.JWT_PRIVATE_KEY,
        });

        req.user = user;
        return true;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      throw new UnauthorizedException();
    }
  }
}
