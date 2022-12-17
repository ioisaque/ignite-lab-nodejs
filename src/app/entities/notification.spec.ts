import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('A sua fatura chegou!'),
      category: 'invoice',
      recipientId: 'lm_salgados',
    });
    expect(notification).toBeTruthy();
  });

  it('should NOT be able to create a notification content with less then 5 characters', () => {
    expect(() => new Content('aaa')).toThrow();
  });

  it('should NOT be able to create a notification content with less then 5 characters', () => {
    expect(() => new Content('a'.repeat(241))).toThrow();
  });
});
