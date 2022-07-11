import { useMemo } from 'react';
import get from 'lodash/get';
import toString from 'lodash/toString';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';

function useSelect({ schema, componentFieldName }) {
  const {
    checkFormErrors,
    modifiedData,
    moveComponentField,
    removeRepeatableField,
    triggerFormValidation,
  } = useCMEditViewDataManager();

  const mainField = useMemo(() => get(schema, ['settings', 'mainField'], 'id'), [schema]);
  const displayedValue = toString(
    get(modifiedData, [...componentFieldName.split('.'), mainField], '')
  );

  return {
    displayedValue,
    mainField,
    checkFormErrors,
    moveComponentField,
    removeRepeatableField,
    schema,
    triggerFormValidation,
  };
}

export default useSelect;
