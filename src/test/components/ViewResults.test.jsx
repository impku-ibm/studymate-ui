import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import ViewResults from '../../components/exams/ViewResults';

vi.mock('../../api/examApi', () => ({
  getResults: vi.fn(() => Promise.resolve({
    data: [
      { studentId: 1, studentName: 'Raj Kumar', admissionNumber: 'ADM001', totalMarks: 450, maxPossibleMarks: 500, percentage: 90.00, grade: 'A1', rankInClass: 1, resultStatus: 'PASS' },
      { studentId: 2, studentName: 'Priya Singh', admissionNumber: 'ADM002', totalMarks: 380, maxPossibleMarks: 500, percentage: 76.00, grade: 'B1', rankInClass: 2, resultStatus: 'PASS' },
      { studentId: 3, studentName: 'Amit Sharma', admissionNumber: 'ADM003', totalMarks: 150, maxPossibleMarks: 500, percentage: 30.00, grade: 'E', rankInClass: 3, resultStatus: 'FAIL' },
    ]
  })),
}));

describe('ViewResults', () => {
  const exam = { id: 1, name: 'SA1 Exam 2025' };
  const mockOnBack = vi.fn();

  beforeEach(() => vi.clearAllMocks());

  it('renders results table', async () => {
    render(<ViewResults exam={exam} onBack={mockOnBack} />);

    await waitFor(() => {
      expect(screen.getByText('Raj Kumar')).toBeInTheDocument();
      expect(screen.getByText('Priya Singh')).toBeInTheDocument();
      expect(screen.getByText('Amit Sharma')).toBeInTheDocument();
    });
  });

  it('shows grades and ranks', async () => {
    render(<ViewResults exam={exam} onBack={mockOnBack} />);

    await waitFor(() => {
      expect(screen.getByText('A1')).toBeInTheDocument();
      expect(screen.getByText('B1')).toBeInTheDocument();
      expect(screen.getByText('#1')).toBeInTheDocument();
    });
  });

  it('shows PASS and FAIL badges', async () => {
    render(<ViewResults exam={exam} onBack={mockOnBack} />);

    await waitFor(() => {
      expect(screen.getAllByText('PASS')).toHaveLength(2);
      expect(screen.getByText('FAIL')).toBeInTheDocument();
    });
  });

  it('shows exam name in header', () => {
    render(<ViewResults exam={exam} onBack={mockOnBack} />);
    expect(screen.getByText('SA1 Exam 2025 — Results')).toBeInTheDocument();
  });
});
