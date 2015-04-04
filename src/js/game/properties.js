var npmProperties = require('../../../package.json');

module.exports =
  { title: 'The Walking Box'
  , description: npmProperties.description
  , port: 3017
  , liveReloadPort: 3018
  , mute: false
  , showStats: true
  , size:
    { x: 1400
    , y: 900
    }
  , analyticsId: ''
  };
