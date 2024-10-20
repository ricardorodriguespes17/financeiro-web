import { TransferenceType } from '../../src/@types/TransferenceType'
import { calculateSubTotal, calculateTotal } from '../../src/utils/calculateTotal'
import { describe, it, expect, vi, Mock } from 'vitest'
import { getCurrentDay, getCurrentMonthDate } from '../../src/utils/getCurrentDate'

const transferences: TransferenceType[] = [
  { id: '1', name: 'Salary', value: 3000, expireDay: 5, type: 'income', boardId: '2024-10' },
  { id: '4', name: 'Freelance', value: 800, expireDay: 19, type: 'income', boardId: '2024-10' }
]

vi.mock('../../src/utils/getCurrentDate', () => ({
  getCurrentDay: vi.fn(),
  getCurrentMonthDate: vi.fn(),
}))

describe('calculateTotal', () => {
  it('should calculate the total sum of transferences', () => {

    const result = calculateTotal(transferences)
    expect(result).toBe(3800)
  })
})

describe('calculateSubTotal', () => {
  it('should calculate the subtotal for current month and past due transferences', () => {
    (getCurrentDay as Mock).mockReturnValue(15);
    (getCurrentMonthDate as Mock).mockReturnValue('2024-10')

    const result = calculateSubTotal(transferences)
    expect(result).toBe(800)
  })
})
