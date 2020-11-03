import {expect, test} from '@oclif/test'

describe('kube:update-deployment', () => {
  test
  .stdout()
  .command(['kube:update-deployment'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['kube:update-deployment', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
