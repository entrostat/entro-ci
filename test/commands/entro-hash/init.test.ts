import {expect, test} from '@oclif/test'

describe('entro-hash:init', () => {
  test
  .stdout()
  .command(['entro-hash:init'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['entro-hash:init', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
