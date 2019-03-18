import { IterableNumberPipe } from './iterable-number.pipe';

describe('IterableNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new IterableNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
