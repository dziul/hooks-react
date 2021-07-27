import createClassName from '.'

describe('Test lib - createClassName', () => {
  it('should return string  with classname than for true', () => {
    const clasNameObject = {
      active: true,
      test: false,
      'body-content': true,
    }
    const className = createClassName(clasNameObject)
    const expectedValue = 'active body-content'

    expect(className).toEqual(expectedValue)
  })

  it('should return empty  when not fount classname than for true', () => {
    const clasNameObject = {
      active: false,
      test: false,
      'body-content': false,
    }
    const className = createClassName(clasNameObject)
    const expectedValue = ''

    expect(className).toEqual(expectedValue)
  })
})
