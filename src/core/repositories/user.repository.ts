// src/core/repositories/user.repository.ts

import { Repository } from '../base/repository';
import { UserEntity } from '../domain/entities/users/user.entity';

export abstract class UserRepository extends Repository<UserEntity> {}
