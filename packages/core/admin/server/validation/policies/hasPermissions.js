'use strict';

const isArray = require('lodash/isArray');
const isString = require('lodash/isString');
const { yup, validateYupSchema } = require('@strapi/utils');

const hasPermissionsSchema = yup.object({
  actions: yup.array().of(
    yup.lazy(val => {
      if (isArray(val)) {
        return yup
          .array()
          .of(yup.string())
          .min(1)
          .max(2);
      }

      if (isString(val)) {
        return yup.string().required();
      }

      return yup.object().shape({
        action: yup.string().required(),
        subject: yup.string(),
      });
    })
  ),
});

module.exports = {
  validateHasPermissionsInput: validateYupSchema(hasPermissionsSchema),
};
