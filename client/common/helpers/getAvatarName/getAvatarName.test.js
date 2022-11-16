import getAvatarName from './index'

describe('getAvatarName', () => {
  it('should return SH', () => {
    const result = getAvatarName('Shamil')
    const expected = 'SH'
    expect(result).toEqual(expected)
  })
})
