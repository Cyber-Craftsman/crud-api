import { validate as validateUUID } from 'uuid';
import { User } from '../models/user.model';

export function isValidUUID(id: string): boolean {
  return validateUUID(id);
}

export function isValidUserBody(body: any): body is Omit<User, 'id'> {
  return (
    body &&
    typeof body.username === 'string' &&
    typeof body.age === 'number' &&
    Array.isArray(body.hobbies) &&
    body.hobbies.every((h: any) => typeof h === 'string')
  );
}
