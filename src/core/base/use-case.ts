// src/core/base/use-case.ts

import { Observable } from 'rxjs';

export interface UseCase<TModel> {
  execute(...args: any[]): Observable<TModel>;
}
