import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/users/repositories/users.repository';
import { v4 as uuidV4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { Query } from 'typeorm/driver/Query';

@Injectable()
export class SeedService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(): Promise<Query> {
    const id = uuidV4();
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash('admin', salt);
    const confirmationToken = crypto.randomBytes(32).toString('hex');

    const query = this.userRepository.query(
      `INSERT INTO USERS(id, name, email, password, salt, role, "status", confirmationToken, recoverToken, createdAt, updatedAt)
            values('${id}', 'admin', 'admin@gmail.com', '${password}', '${salt}', 'ADMIN', true, '${confirmationToken}', 'null', 'now()', 'now()')
        `,
    );

    return query;
  }
}
