import { v4 as uuidV4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { UserCards } from '../../cards/entities/user-cards.entity';
import { UserRole } from '../../users/enum/user-roles.enum';

export class AdminSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const userRepository = dataSource.getRepository(User);
    const userCardsRepository = dataSource.getRepository(UserCards);
    const id = uuidV4();
    const cardsId = uuidV4();
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash('Admin321!', salt);
    const email = 'admin@gmail.com';
    const role = UserRole.ADMIN;
    const name = 'admin';
    const status = true;
    const userExist = await userRepository.findOneBy({
      email: 'admin@gmail.com',
    });

    if (!userExist) {
      await userCardsRepository.query(
        `INSERT INTO USERS_CARDS(id)
              values('${cardsId}')
          `,
      );
      await userRepository.query(
        `INSERT INTO USERS(id, username, name, email, password, salt, role, status)
              values('${id}', '${name}', '${name}', '${email}', '${password}', '${salt}', 'ADMIN', 'true')
          `,
      );
      // await userRepository
      //   .createQueryBuilder()
      //   .insert()
      //   .into(User)
      //   .values({
      //     cards: cardsId,
      //     id,
      //     name,
      //     email,
      //     password,
      //     salt,
      //     role,
      //     status,
      //   })
      //   .execute();
    }
  }
}
