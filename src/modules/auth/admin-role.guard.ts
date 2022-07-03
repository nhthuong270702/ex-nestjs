import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import UserRoles from 'src/modules/user/enums/user.enum';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (request?.user) {
      const { id } = request.user;

      console.log(id);

      const user = await this.userService.getUserById(id);

      return user.role === UserRoles.ADMIN;
    } else {
      console.log('ha');
    }

    return false;
  }
}
