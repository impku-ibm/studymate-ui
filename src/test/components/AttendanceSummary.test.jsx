import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AttendanceSummary from '../../components/attendance/AttendanceSummary';

vi.mock('../../api/attendanceApi', () => ({
  getStudentSummary: vi.fn(() => Promise.resolve({
    data: {
      studentId: 1,
      studentName: 'Raj Kumar',
      totalDays: 20,
      presentDays: 18,
      absentDays: 1,
      leaveDays: 1,
      attendancePercentage: 90.00
    }
  })),
}));

describe('AttendanceSummary', () => {
  beforeEach(() => vi.clearAllMocks());

  it('renders input fields', () => {
    render(<AttendanceSummary />);
    expect(screen.getByTestId('summary-student-id')).toBeInTheDocument();
    expect(screen.getByTestId('summary-month')).toBeInTheDocument();
    expect(screen.getByTestId('summary-load-btn')).toBeInTheDocument();
  });

  it('shows summary after loading', async () => {
    render(<AttendanceSummary />);

    fireEvent.change(screen.getByTestId('summary-student-id'), { target: { value: '1' } });
    fireEvent.click(screen.getByTestId('summary-load-btn'));

    await waitFor(() => {
      expect(screen.getByText('20')).toBeInTheDocument(); // total days
      expect(screen.getByText('18')).toBeInTheDocument(); // present
      expect(screen.getByText('90%')).toBeInTheDocument(); // percentage
    });
  });
});
