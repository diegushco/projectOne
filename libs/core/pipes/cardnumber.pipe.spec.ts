import { CardNumberPipe } from './cardnumber.pipe';

describe('Pipe: Cardnumber', () => {
  it('create an instance', () => {
    const pipe = new CardNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
