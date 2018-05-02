var resp = function(data, res, errorCode) {
    var response = {
        'ErrorCode': errorCode,
        'data': data
    };
    res.send(response);
};

var respData = function(data, res) {
    res.send(data);
};

var respPage = function(title, data, res) {
    res.render(title, data);
};

module.exports = {
    resp: resp,
    respData: respData,
    respPage: respPage
};
