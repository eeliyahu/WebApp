import { User } from './user.model';

describe('User', () => {
  it('should create an instance', () => {
    const user = new User(1, 'yossi cohen', 'yossi.cohen@example.com', 'password123');
    expect(user).toBeTruthy();
  });
});