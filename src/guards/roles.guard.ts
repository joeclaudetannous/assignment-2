import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// import { RolesUser } from 'src/enums/roles.enum';
// import { ROLES_KEY } from 'src/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector:Reflector) {

    }

    canActivate(context: ExecutionContext) {
        const requiredRoles = this.reflector.get<string[]>(
            'roles', 
            context.getHandler()
        );

        if(!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();

        return requiredRoles.includes(user.roles);
    }
}