var workerFarm = require('../../')
var workers = workerFarm(require.resolve('./child'))
var ret = 0

for (var i = 0; i < 10; i++) {
  workers('#' + i + ' FOO', function (err, output) {
    if (err) throw err
    console.log(output)
    if (++ret === 10) {
      workerFarm.end(workers)
    }
  })
}
