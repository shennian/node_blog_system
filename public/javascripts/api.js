var api = function(option) {
  var url = option.url;
  var method = option.method;
  var data = option.data;
  var success = option.success || console.log;
  var error = option.error || console.log;
  $.ajax({
    url: url,
    method: method,
    data: data,
    success: function(data) {
      success(data);
    },
    error: function(data) {
      error(data);
    },
  });
};
