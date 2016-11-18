var id = $('#post-id').data('id');

var renderContent = function(data) {
  $('#content').html(data.data);
  $(document).ready(function () {
    $(".bar").css('left', '0%');
  });
}
api({
  url: '/post/content/get',
  method: 'get',
  data: {
    id: id
  },
  success: renderContent
})

var renderComment = function(data) {
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
}

api({
  url: '/comment/all',
  method: 'get',
  data: {
    id: id
  },
  success: renderComment,
})

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
  api({
    url: '/comment/create',
    data: data,
    method: 'post',
  })
  var name = $("input[name='name']").val('')
  var email = $("input[name='email']").val('')
  var message = $("textarea").val('')
  $('.div-comment').css('display', 'none')
});

var renderLikes = function(data) {
  if (data.data == 'success') {
    $('.fa-heart-o').toggleClass('fa-heart');
    $('.fa-heart-o').toggleClass('fa-heart-o');
    $('.like').css('color', 'red');
  } else {

  }
}

$('.fa-heart-o').on('click', function() {
  var id = $('#post-id').data('id');
  api({
    url: '/post/likes',
    method: 'post',
    data: {
      id: id,
    },
    success: renderLikes
  });
});