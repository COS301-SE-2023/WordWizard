const webpack = require('webpack');

function getClientEnvironment(configuration) {
  const WW_APP = /^WW_/i;

  const raw = Object.keys(process.env)
    .filter((key) => WW_APP.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        NODE_ENV: process.env.NODE_ENV || configuration,
      }
    );

  return {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };
}

module.exports = (config, options, context) => {
  config.plugins.push(
    new webpack.DefinePlugin(getClientEnvironment(context.configuration))
  );
  return config;
};