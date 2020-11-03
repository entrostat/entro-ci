import {expect, test} from '@oclif/test'

describe('kube:deployment:update', () => {
  test
  .stdout()
  .command(['kube:deployment:update'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['kube:deployment:update', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
