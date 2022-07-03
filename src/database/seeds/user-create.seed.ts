import { User } from '../../modules/user/user.entity';
import { Connection, getManager } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import UserRoles from '../../modules/user/enums/user.enum';

export class UserCreateSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await getManager().query('TRUNCATE users');

    await factory(User)().create({
      name: 'Huu Thuong',
      email: 'Huuthuong@123gmail.com',
      password: 'Huuthuong@123',
      role: UserRoles.ADMIN,
    });

    await factory(User)().create({
      name: 'Huu Thuong',
      email: 'Huuthuong@gmail.com',
      password: 'Huuthuong@123',
      role: UserRoles.MEMBER,
    });

    await factory(User)().createMany(10);
  }
}
