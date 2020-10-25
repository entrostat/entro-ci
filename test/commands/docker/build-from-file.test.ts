import {expect, test} from '@oclif/test'

describe('docker/build-from-file', () => {
  test
  .stdout()
  .command(['docker/build-from-file'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['docker/build-from-file', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
