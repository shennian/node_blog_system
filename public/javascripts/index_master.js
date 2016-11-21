var private = function(status, id) {
  if (status == true) {
    return `<a href="/post/edit?id=${id}">取消私有</a>`
  } else {
    return `<a href="/post/edit?id=${id}">设为私有</a>`
  }
}

var publish = function(status, id) {
  if (status == false) {
    return `<a href="/post/edit?id=${id}">发布</a>`
  } else {
    return ''
  }
}

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
                  <span>
                    <a href="/post/edit/master?id=${id}">编辑</a>
                    ${private(post.private, id)}
                    ${publish(post.published, id)}
                  </span>

              </div>
             `;
    $('.div-main-container').append(t);
  }
  $(document).ready(function () {
    $(".bar").css('left', '0%');
  });
};



api({
  url: '/post/all/master',
  method: 'get',
  success: renderPosts,
});

$(document).ready(function() {
  $('.div-main-container').on('click', '.item:not(:first)', function() {
    var id = $(this).data('id');
    window.open(`/post/get?id=${id}`);
  });
});
