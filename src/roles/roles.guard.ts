import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) {}


  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

// HERE PASSING A USER WITH AN ARRAY roles: [admin] IN THE BODY REQUEST TO TEST
// TODO: NEED TO INCLUDE A USER IN THE REQUEST WITH A MIDDLEWARE SO:
// const user = request.user;
// return user && user.roles && hasRole();

    const user = request.body.user;
    const hasRole = () => user.roles.some((role) => roles.includes(role));
    return hasRole();
  }
}
