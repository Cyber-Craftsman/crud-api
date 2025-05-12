import { users } from '../db/memoryDb';
import { User } from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';

export function getAllUsers(): User[] {
  return users;
}

export function getUserById(id: string): User | undefined {
  return users.find((u) => u.id === id);
}

export function createUser(data: Omit<User, 'id'>): User {
  const newUser = { id: uuidv4(), ...data };
  users.push(newUser);
  return newUser;
}

export function updateUser(id: string, data: Omit<User, 'id'>): User | null {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;
  users[index] = { id, ...data };
  return users[index];
}

export function deleteUser(id: string): boolean {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return false;
  users.splice(index, 1);
  return true;
}
