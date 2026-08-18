import { vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import Dashboard from '@/components/Dashboard'

vi.mock('@tanstack/react-router', () => ({
  useNavigate: vi.fn(),
}))

describe('Dashboard', () => {
  test('renders the backend response', async () => {
    render(<Dashboard />)
    await waitFor(() => {
      expect(screen.getByText(/project: oscar-example/i)).toBeInTheDocument()
    })
  })
})
