import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SearchBar } from '../../components/ui/SearchBar/SearchBar.tsx'

describe('SearchBar', () => {
  it('shows a validation message and does not submit a query that is too short', async () => {
    const onSubmit = vi.fn()
    render(<SearchBar value="A" onChange={vi.fn()} onSubmit={onSubmit} />)

    await userEvent.click(screen.getByRole('button', { name: 'Search' }))

    expect(screen.getByText('Enter at least 2 characters.')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('submits a valid search query', async () => {
    const onSubmit = vi.fn()
    render(<SearchBar value="Dune" onChange={vi.fn()} onSubmit={onSubmit} />)

    await userEvent.click(screen.getByRole('button', { name: 'Search' }))

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(screen.queryByText('Enter at least 2 characters.')).not.toBeInTheDocument()
  })
})
