import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import FeePlans from '../../components/accounts/FeePlans';

vi.mock('../../api/feePlanApi', () => ({
  getFeePlans: vi.fn(() => Promise.resolve({
    data: [
      {
        id: 1, name: 'Day Scholar Plan', description: 'For day scholars', active: true,
        items: [
          { id: 1, feeType: 'TUITION', amount: 5000, frequency: 'MONTHLY' },
          { id: 2, feeType: 'EXAM', amount: 2000, frequency: 'ANNUAL' },
        ]
      },
      {
        id: 2, name: 'Hosteller Plan', description: 'For hostellers', active: true,
        items: [
          { id: 3, feeType: 'TUITION', amount: 5000, frequency: 'MONTHLY' },
          { id: 4, feeType: 'HOSTEL', amount: 8000, frequency: 'MONTHLY' },
        ]
      }
    ]
  })),
  deleteFeePlan: vi.fn(),
}));

describe('FeePlans', () => {
  beforeEach(() => vi.clearAllMocks());

  it('renders fee plan list', async () => {
    render(<FeePlans />);

    await waitFor(() => {
      expect(screen.getByText('Day Scholar Plan')).toBeInTheDocument();
      expect(screen.getByText('Hosteller Plan')).toBeInTheDocument();
    });
  });

  it('shows fee items in each plan', async () => {
    render(<FeePlans />);

    await waitFor(() => {
      expect(screen.getAllByText('TUITION')).toHaveLength(2);
      expect(screen.getByText('HOSTEL')).toBeInTheDocument();
    });
  });

  it('shows create button', () => {
    render(<FeePlans />);
    expect(screen.getByTestId('feeplan-create-btn')).toBeInTheDocument();
  });
});
