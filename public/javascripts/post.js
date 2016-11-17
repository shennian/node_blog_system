var post_id = $('#post-id').data('id');
$.ajax({
  url: '/post/' + post_id + '/post-content/get',
  method: 'get',
  success: function(data) {
    $('#content').html(data.data);
    $(document).ready(function () {
      $(".bar").css('left', '0%');
    });
  },
  error: function(data) {
    console.log(data);
  }
});
$.ajax({
  url: '/comment/all',
  method: 'get',
  data: {
    post_id: post_id
  },
  success: function(data) {
    var data = data.data;
    data.reverse()
    for (var v of data) {
      var name = v.name
      var message = v.message
      var t = `<div class="item">
                    ${name}: ${message}
                  </div>`
      $('#comment').after(t)
    }
  },
  error: function(data) {
    console.log(data);
  }
});
$('#comment').on('click', function() {
  $('.div-comment').css('display', 'flex')
});
$('.div-close').on('click', function() {
  $('.div-comment').css('display', 'none')
});
$('.ok-button').on('click', function() {
  var post_id = $('#post-id').data('id')
  var name = $("input[name='name']").val()
  var email = $("input[name='email']").val()
  var message = $("textarea").val()
  var t = `<div class="item">
                ${name}: ${message}
              </div>`
  $("#comment~ .item:last-child").remove()
  $('#comment').after(t)
  var data = {
    post_id: post_id,
    name: name,
    email: email,
    message: message,
  }
  $.ajax({
    url: '/comment/create',
    data: data,
    method: 'post',
    success: function(data) {
      console.log(data);

    },
    error: function(err) {
      console.log(err);
    }
  });
  var name = $("input[name='name']").val('')
  var email = $("input[name='email']").val('')
  var message = $("textarea").val('')
  $('.div-comment').css('display', 'none')
});
$('.fa-heart-o').on('click', function() {
  var id = $('#post-id').data('id');
  $.ajax({
    url: '/post/likes',
    method: 'post',
    data: {
      id: id,
    },
    success: function(data) {
      if (data.data == 'success') {
        $('.fa-heart-o').toggleClass('fa-heart');
        $('.fa-heart-o').toggleClass('fa-heart-o');
        $('.like').css('color', 'red');
      } else {

      }
    },
    error: function(err) {

    }
  });
});