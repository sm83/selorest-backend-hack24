import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { printManualLog } from 'src/utils/manualLog';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      // const authToken = req.signedCookies['authToken'];
      // printManualLog('auth token in jwt-guard');
      // console.log(authToken);

      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        printManualLog('here1');
        throw new UnauthorizedException();
      } else {
        printManualLog('here2');
        const user = this.jwtService.verify(token, {
          secret: process.env.JWT_PRIVATE_KEY,
        });

        console.log(user);

        req.user = user;
        return true;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      throw new UnauthorizedException();
    }
  }
}
