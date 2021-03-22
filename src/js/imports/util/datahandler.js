const _dataobj = (() => {
  const storage = {};
  let id = 1;
  return {
    _set(element, key, data) {
      if (typeof element.fwKeys === 'undefined') {
        element.fwKeys = {
          key,
          id,
        };
        id++;
      }

      storage[element.fwKeys.id] = data;
    },
    _get(element, key) {
      if (!element || typeof element.fwKeys === 'undefined') {
        return null;
      }

      const keyProperties = element.fwKeys;
      if (keyProperties.key === key) {
        return storage[keyProperties.id];
      }

      return null;
    },
    _remove(element, key) {
      if (typeof element.fwKeys === 'undefined') {
        return;
      }

      const keyProperties = element.fwKeys;
      if (keyProperties.key === key) {
        delete storage[keyProperties.id];
        delete element.fwKeys;
      }
    },
  };
})();

const DataHandler = {
  set(elm, key, data) {
    _dataobj._set(elm, key, data);
  },
  get(elm, key) {
    return _dataobj._get(elm, key);
  },
  remove(elm, key) {
    _dataobj._remove(elm, key);
  },
};

export default DataHandler;
