$('.div-password-button').on('click', function() {
  var password = $('#input').val();
  $.ajax({
    url: '/master/login',
    method: 'post',
    data: {
      password: password,
    },
    success: function(data) {
      if (data.data == 'success') {
        $(document).ready(function () {
          $(".bar").css('left', '0%');
        });
        location.href = '/'
      } else {
        alert('密码错误')
      }
    },
    error: function(err) {

    }
  });
});
