// cypress/plugins/index.js
const codeCoverageTask = require('@cypress/code-coverage/task');

module.exports = (on, config) => {
  on('task', codeCoverageTask);
};
