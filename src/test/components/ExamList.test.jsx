import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import ExamList from '../../components/exams/ExamList';

// Mock the API
vi.mock('../../api/examApi', () => ({
  getExams: vi.fn(() => Promise.resolve({
    data: [
      { id: 1, name: 'SA1 Exam 2025', examType: 'SA1', startDate: '2025-09-01', endDate: '2025-09-15', status: 'DRAFT' },
      { id: 2, name: 'FA1 Exam 2025', examType: 'FA1', startDate: '2025-07-01', endDate: '2025-07-10', status: 'PUBLISHED' },
    ]
  })),
  publishResults: vi.fn(),
}));

describe('ExamList', () => {
  const mockOnSelectExam = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders exam list with data', async () => {
    render(<ExamList onSelectExam={mockOnSelectExam} />);

    await waitFor(() => {
      expect(screen.getByText('SA1 Exam 2025')).toBeInTheDocument();
      expect(screen.getByText('FA1 Exam 2025')).toBeInTheDocument();
    });
  });

  it('shows status badges', async () => {
    render(<ExamList onSelectExam={mockOnSelectExam} />);

    await waitFor(() => {
      expect(screen.getByText('DRAFT')).toBeInTheDocument();
      expect(screen.getByText('PUBLISHED')).toBeInTheDocument();
    });
  });

  it('shows Results button for published exams', async () => {
    render(<ExamList onSelectExam={mockOnSelectExam} />);

    await waitFor(() => {
      expect(screen.getByTestId('exam-results-2')).toBeInTheDocument();
    });
  });

  it('shows create exam button', async () => {
    render(<ExamList onSelectExam={mockOnSelectExam} />);
    expect(screen.getByTestId('exam-create-btn')).toBeInTheDocument();
  });
});
