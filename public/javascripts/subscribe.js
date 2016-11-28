$('.div-subscribe-button').on('click', function() {
  var name = $.trim($("input[name='name']").val())
  var email = $.trim($("input[name='email']").val())
  if (name == '' || email == '') {
    alert('输入错误');
    return false;
  }
  $.ajax({
    url: '/email/create',
    method: 'post',
    data: {
      username: name,
      address: email,
    },
    success: function(data) {
      $(document).ready(function () {
        $(".bar").css('left', '0%');
      });
      location.href = '/'

    },
    error: function(err) {

    }
  });
});
