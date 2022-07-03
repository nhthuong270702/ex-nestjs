import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { SETTING } from '../../app.utils';
import { User } from './user.entity';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post('register')
    async doUserRegistration(@Body(SETTING.VALIDATION_PIPE)
    createUserDto: CreateUserDto): Promise<User> {
        return await this.userService.doUserRegistration(createUserDto);
    }
}
