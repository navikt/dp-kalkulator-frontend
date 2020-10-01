const { ESLINT_MODES } = require('@craco/craco');
const CracoLessPlugin = require('craco-less');

module.exports = function ({ env }) {
    return {
        eslint: {
            mode: ESLINT_MODES.file,
        },
        plugins: [{ plugin: CracoLessPlugin }],
    };
};
