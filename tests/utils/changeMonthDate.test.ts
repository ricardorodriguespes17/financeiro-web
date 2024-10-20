import { describe, it, expect } from 'vitest'
import { changeMonthDate } from '../../src/utils/getCurrentDate'

describe('changeMonthDate', () => {
  it('should move forward by a number of months within the same year', () => {
    const result = changeMonthDate("2024-05", 2)
    expect(result).toBe("2024-07")
  })

  it('should move backward by a number of months within the same year', () => {
    const result = changeMonthDate("2024-05", -3)
    expect(result).toBe("2024-02")
  })

  it('should move forward by more than 12 months (crossing year)', () => {
    const result = changeMonthDate("2024-05", 14)
    expect(result).toBe("2025-07")
  })

  it('should move backward by more than 12 months (crossing year)', () => {
    const result = changeMonthDate("2024-05", -15)
    expect(result).toBe("2023-02")
  })

  it('should move forward to the start of the next year', () => {
    const result = changeMonthDate("2024-11", 2)
    expect(result).toBe("2025-01")
  })

  it('should move backward to the previous year', () => {
    const result = changeMonthDate("2024-01", -2)
    expect(result).toBe("2023-11")
  })

  it('should correctly handle large forward positions', () => {
    const result = changeMonthDate("2024-01", 25)
    expect(result).toBe("2026-02")
  })

  it('should correctly handle large backward positions', () => {
    const result = changeMonthDate("2024-01", -25)
    expect(result).toBe("2021-12")
  })
})
