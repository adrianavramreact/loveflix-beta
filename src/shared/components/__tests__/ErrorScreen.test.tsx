import { fireEvent, render, screen } from '@testing-library/react-native';

import { ErrorScreen } from '@/shared/components/ErrorScreen';
import { strings } from '@/shared/constants/strings';

describe('ErrorScreen', () => {
  it('explains that something went wrong', async () => {
    await render(<ErrorScreen onRetry={jest.fn()} />);
    expect(screen.getByRole('header', { name: strings.error.title })).toBeTruthy();
  });

  it('retries from the button', async () => {
    const onRetry = jest.fn();
    await render(<ErrorScreen onRetry={onRetry} />);
    fireEvent.press(screen.getByRole('button', { name: strings.error.retry }));
    expect(onRetry).toHaveBeenCalled();
  });
});
