// src/use-cases/create-user.usecase.ts

import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UseCase } from 'src/core/base/use-case';
import { UserRepository } from 'src/core/repositories/user.repository';
import { UserCreateMapper } from 'src/core/domain/mappers/users/user-create.mapper';
import { UserCreatedMapper } from 'src/core/domain/mappers/users/user-created.mapper';
import { UserCreateDto } from 'src/shared/dtos/users/user-create.dto';
import { UserCreatedDto } from 'src/shared/dtos/users/user-created.dto';

@Injectable()
export class CreateUserUseCase implements UseCase<UserCreatedDto> {
  private userCreateMapper: UserCreateMapper;
  private userCreatedMapper: UserCreatedMapper;

  constructor(private readonly repository: UserRepository) {
    this.userCreateMapper = new UserCreateMapper();
    this.userCreatedMapper = new UserCreatedMapper();
  }

  public execute(user: UserCreateDto): Observable<UserCreatedDto> {
    const entity = this.userCreateMapper.mapFrom(user);

    return this.repository
      .create(entity)
      .pipe(map(this.userCreatedMapper.mapTo));
  }
}
