'use strict';

const isString = require('lodash/isString');
const isObject = require('lodash/isObject');
const { createPolicy } = require('@strapi/utils').policy;
const { validateHasPermissionsInput } = require('../validation/policies/hasPermissions');

const inputModifiers = [
  {
    check: isString,
    transform: action => ({ action }),
  },
  {
    check: Array.isArray,
    transform: arr => ({ action: arr[0], subject: arr[1] }),
  },
  {
    // Has to be after the isArray check since _.isObject also matches arrays
    check: isObject,
    transform: perm => perm,
  },
];

module.exports = createPolicy({
  name: 'admin::hasPermissions',
  validator: validateHasPermissionsInput,
  handler(ctx, config) {
    const { actions } = config;
    const { userAbility: ability } = ctx.state;

    const permissions = actions.map(action =>
      inputModifiers.find(modifier => modifier.check(action)).transform(action)
    );

    const isAuthorized = permissions.every(({ action, subject }) => ability.can(action, subject));

    return isAuthorized;
  },
});
