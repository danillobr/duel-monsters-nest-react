// src/use-cases/get-all-users.usecase.ts

import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UseCase } from 'src/core/base/use-case';
import { UserCreatedMapper } from 'src/core/domain/mappers/users/user-created.mapper';
import { UserRepository } from 'src/core/repositories/user.repository';
import { UserCreatedDto } from 'src/shared/dtos/users/user-created.dto';

@Injectable()
export class GetAllUsersUseCase implements UseCase<UserCreatedDto[]> {
  private userCreatedMapper: UserCreatedMapper;

  constructor(private readonly repository: UserRepository) {
    this.userCreatedMapper = new UserCreatedMapper();
  }

  public execute(): Observable<UserCreatedDto[]> {
    return this.repository
      .getAll()
      .pipe(map((data) => data.map(this.userCreatedMapper.mapTo)));
  }
}
