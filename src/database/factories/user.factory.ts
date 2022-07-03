import { randEmail, randFullName, randPassword } from '@ngneat/falso';
import { User } from '../../modules/user/user.entity';
import { define } from 'typeorm-seeding';

define(User, () => {
  const user = new User();
  user.name = randFullName();
  user.email = randEmail();
  user.password = randPassword();
  return user;
});
  