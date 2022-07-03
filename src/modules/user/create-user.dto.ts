import { IsEmail, IsNotEmpty, Length, matches, Matches } from 'class-validator';
import { PASSWORD } from '../../app.utils';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 24)
  @Matches(PASSWORD.PASSWORD_RULE, {
    message: PASSWORD.MESSAGE_ERROR,
  })
  password: string;

  @IsNotEmpty()
  @Length(6, 24)
  @Matches(PASSWORD.PASSWORD_RULE, {
    message: PASSWORD.MESSAGE_ERROR,
  })
  confirm: string;
}
