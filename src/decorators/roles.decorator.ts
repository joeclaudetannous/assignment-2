import { SetMetadata } from '@nestjs/common';
// import { RolesUser } from '../enums/roles.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);