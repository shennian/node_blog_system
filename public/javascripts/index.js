$('#test').click(function() {
  console.log("hahaha");
  $.ajax({
    url: '/test-redirect',
    method: 'get',
    headers: {
      'Access-Control-Allow-Origin': 'https://www.baidu.com'
    },
    success: function(data) {
      console.log(data);
    }
  });
});
