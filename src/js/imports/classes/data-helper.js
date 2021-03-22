class FwDataHelper {
  constructor(data, dataParser) {
    if (!data) {
      return;
    }

    dataParser =
      dataParser ||
      function (dat) {
        return dat;
      };

    this._FwData = dataParser(data);

    return this.getData();
  }

  getData() {
    return this._FwData;
  }
}

export default FwDataHelper;
