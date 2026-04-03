import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import StaffDirectory from '../../components/staff/StaffDirectory';

vi.mock('../../api/staffApi', () => ({
  getAllStaff: vi.fn(() => Promise.resolve({
    data: [
      { id: 1, fullName: 'Ramesh Kumar', email: 'ramesh@school.com', phone: '9876543210', staffType: 'CLERK', active: true },
      { id: 2, fullName: 'Suresh Patel', email: null, phone: null, staffType: 'PEON', active: true },
    ]
  })),
}));

describe('StaffDirectory', () => {
  beforeEach(() => vi.clearAllMocks());

  it('renders staff list', async () => {
    render(<StaffDirectory />);

    await waitFor(() => {
      expect(screen.getByText('Ramesh Kumar')).toBeInTheDocument();
      expect(screen.getByText('Suresh Patel')).toBeInTheDocument();
    });
  });

  it('shows staff types', async () => {
    render(<StaffDirectory />);

    await waitFor(() => {
      expect(screen.getByText('CLERK')).toBeInTheDocument();
      expect(screen.getByText('PEON')).toBeInTheDocument();
    });
  });

  it('shows add staff button', () => {
    render(<StaffDirectory />);
    expect(screen.getByTestId('staff-add-btn')).toBeInTheDocument();
  });
});
