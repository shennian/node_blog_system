var private = function(status, id) {
  if (status == true) {
    return `<span class='class-span-private-cancel'>取消私有</span>`
  } else {
    return `<span class='class-span-private-set'>设为私有</span>`
  }
}

var publish = function(status, id) {
  if (status == false) {
    return `<span class='class-span-publish-button'>发布</span>`
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
                    <span class="class-span-edit-button">编辑</span>
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
    return false;
  });
});
$(document).ready(function() {
  $('.div-main-container').on('click', '.item .class-span-edit-button', function() {
    var id = $(this).closest('.item').data('id');
    console.log(id);
    window.open(`/post/edit/master?id=${id}`);
    return false;
  });
});
$(document).ready(function() {
  $('.div-main-container').on('click', '.item .class-span-private-cancel', function() {
    var id = $(this).closest('.item').data('id');
    console.log(id);
    api({
      url: '/post/private/false/master',
      method: 'post',
      data: {
        id: id,
      },
      success: data => alert(data.data),
    });
    // window.open(`/post/edit/master?id=${id}`);
    return false;
  });
});
$(document).ready(function() {
  $('.div-main-container').on('click', '.item .class-span-private-set', function() {
    var id = $(this).closest('.item').data('id');
    console.log(id);
    api({
      url: '/post/private/true/master',
      method: 'post',
      data: {
        id: id,
      },
      success: data => alert(data.data),
    });
    return false;
  });
});
$(document).ready(function() {
  $('.div-main-container').on('click', '.item .class-span-edit-button', function() {
    var id = $(this).closest('.item').data('id');
    console.log(id);
    window.open(`/post/edit/master?id=${id}`);
    return false;
  });
});
$(document).ready(function() {
  $('.div-main-container').on('click', '.item .class-span-publish-button', function() {
    var id = $(this).closest('.item').data('id');
    api({
      url: '/post/publish/master',
      method: 'post',
      data: {
        id: id,
      },
      success: data => alert(data.msg),
    });
    return false;
  });
});
