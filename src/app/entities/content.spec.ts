import { Content } from './content';

describe('Notification Content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('A sua fatura chegou!');
    expect(content).toBeTruthy();
  });

  it('should NOT be able to create a notification content with less then 5 characters', () => {
    expect(() => new Content('aaa')).toThrow();
  });

  it('should NOT be able to create a notification content with less then 5 characters', () => {
    expect(() => new Content('a'.repeat(241))).toThrow();
  });
});
