import {expect, test} from '@oclif/test'

describe('trigger:post-build', () => {
  test
  .stdout()
  .command(['trigger:post-build'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['trigger:post-build', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
