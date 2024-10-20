import { describe, it, expect } from 'vitest'
import { getMonthLabel, getMonthYearNumber } from '../../src/utils/getCurrentDate'

describe('getMonthLabel', () => {
  it('should return the correct label for a valid date', () => {
    const result = getMonthLabel("2024-10")
    expect(result).toBe("OUTUBRO 2024")
  })

  it('should return an empty string for an invalid month', () => {
    const result = getMonthLabel("2024-13")
    expect(result).toBe("")
  })

  it('should return an empty string for a malformed input', () => {
    const result = getMonthLabel("2024-abc")
    expect(result).toBe("")
  })
})

describe('getMonthYearNumber', () => {
  it('should return the correct month and year for a valid date', () => {
    const result = getMonthYearNumber("2024-10")
    expect(result).toEqual({ month: 10, year: 2024 })
  })

  it('should return null for an invalid month', () => {
    const result = getMonthYearNumber("2024-13")
    expect(result).toBeNull()
  })

  it('should return null for an invalid year', () => {
    const result = getMonthYearNumber("abc-10")
    expect(result).toBeNull()
  })

  it('should return null for a malformed input', () => {
    const result = getMonthYearNumber("abc-def")
    expect(result).toBeNull()
  })
})
