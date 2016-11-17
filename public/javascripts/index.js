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



var renderPosts = function(posts) {
  for (var i = 0; i < posts.length; i++) {
    var post = posts[i];
    var id = post.id;
    var time = post.created_time;
    time = time.slice(0, time.indexOf('T'));
    var title = post.title;
    var t = `
              <div class="item" data-id="${id}">
                  <span>${title}</span>
                  <span>${time}</span>
              </div>
             `;
    $('.div-main-container').append(t);
  }
  $(document).ready(function () {
    $(".bar").css('left', '0%');
  });
};

$.ajax({
  url: '/post/all',
  method: 'get',
  success: function(data) {
    renderPosts(data.data);
  },
  error: function(err) {

  }
});

console.log("r324gfdgf324")
$(document).ready(function() {
  console.log("r324324")
  $('.div-main-container').on('click', '.item:not(:first)', function() {
    var id = $(this).data('id');

    console.log($(this))
    window.open(`/post/get?id=${id}`);
    console.log("2333")
  });
});



