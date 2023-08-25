import { v4 as uuidV4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import {
  Seeder,
  SeederFactoryManager,
  useSeederFactory,
} from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

export class AdminSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(User);

    const id = uuidV4();
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash('Admin321!', salt);

    const userExist = await repository.findOneBy({ email: 'admin@gmail.com' });

    if (!userExist) {
      await repository.query(
        `INSERT INTO USERS(id, name, email, password, salt, role, status)
              values('${id}', 'admin', 'admin@gmail.com', '${password}', '${salt}', 'ADMIN', 'true')
          `,
      );
    }
  }
}
