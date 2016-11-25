var renderPosts = function(data) {
  var posts = data.data;
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

api({
  url: '/post/all',
  method: 'get',
  success: renderPosts,
});

$(document).ready(function() {
  $('.div-main-container').on('click', '.item:not(:first)', function() {
    var id = $(this).data('id');
    window.open(`/post/get?id=${id}`);
  });
});
