import {expect, test} from '@oclif/test'

describe('hash/directory', () => {
  test
  .stdout()
  .command(['hash/directory'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['hash/directory', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
