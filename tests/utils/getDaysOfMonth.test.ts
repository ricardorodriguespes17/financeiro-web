import { describe, it, expect, vi } from 'vitest'
import getDaysOfMonth from '../../src/utils/getDaysOfMonth'
import { getMonthYearNumber } from '../../src/utils/getCurrentDate'
import getFirstDayOfMonth from '../../src/utils/getFirstDayOfMonth'
import getLastDayOfMonth from '../../src/utils/getLastDayOfMonth'

vi.mock('../../src/utils/getCurrentDate')
vi.mock('../../src/utils/getFirstDayOfMonth')
vi.mock('../../src/utils/getLastDayOfMonth')

describe('getDaysOfMonth', () => {
  it('should return null if getMonthYearNumber returns null', () => {
    vi.mocked(getMonthYearNumber).mockReturnValue(null)

    const result = getDaysOfMonth('2024-10')
    
    expect(result).toBeNull()
  })

  it('should return the correct array of days for a given month', () => {
    const mockMonthYearResult = { year: 2024, month: 9 }
    const mockFirstDayOfMonth = 2
    const mockLastDayOfMonth = 31

    vi.mocked(getMonthYearNumber).mockReturnValue(mockMonthYearResult)
    vi.mocked(getFirstDayOfMonth).mockReturnValue(mockFirstDayOfMonth)
    vi.mocked(getLastDayOfMonth).mockReturnValue(mockLastDayOfMonth)

    const result = getDaysOfMonth('2024-10')

    const expectedArray = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]

    expect(result).toEqual(expectedArray)
  })

  it('should correctly handle months with fewer than 31 days', () => {
    const mockMonthYearResult = { year: 2024, month: 10 }
    const mockFirstDayOfMonth = 5
    const mockLastDayOfMonth = 30

    vi.mocked(getMonthYearNumber).mockReturnValue(mockMonthYearResult)
    vi.mocked(getFirstDayOfMonth).mockReturnValue(mockFirstDayOfMonth)
    vi.mocked(getLastDayOfMonth).mockReturnValue(mockLastDayOfMonth)

    const result = getDaysOfMonth('2024-02')

    const expectedArray = [-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]

    expect(result).toEqual(expectedArray)
  })
})
