var postPaging = function() {
  var offset = 0;
  var limit = 15;
  var readerPostItem = function(data) {
    var posts = data.data;
    for (var i = 0; i < posts.length; i++) {
      var post = posts[i]
      var title = post.title
      var id = post.id
      var template = `<div class="class-div-post-item" data-id='${id}'>
                        ${title}
                      </div>`
      $('.class-div-post-item-list').append(template)
    }
  }
  var getPostItem = function() {
    api({
      url: 'post/all/master',
      method: 'get',
      data: {
        offset: offset,
        limit: limit,
      },
      success: readerPostItem
    })
  }
  return {
    readerPostItem: readerPostItem,
    getPostItem: getPostItem,
  }
}

var pagingSingeTon = postPaging()
pagingSingeTon.getPostItem()

var renderCommentList = function(data) {
  var comments = data.data
  s = ''
  for (var i = 0; i < comments.length; i++) {
    comment = comments[i];
    var t = `<tr>
               <td><input type="checkbox" name="" value=""></td>
               <td>${comment.createdAt}</td>
               <td>${comment.name}</td>
               <td>${comment.email}</td>
               <td>${comment.message}</td>
               <td data-id='${comment.id}' class='delete-comment'>删除</td>
             </tr>`
    s += t;
  }
  var template = `<table>
                    <tr>
                      <th></th>
                      <th>时间</th>
                      <th>姓名</th>
                      <th>邮箱</th>
                      <th>评论</th>
                      <th>操作</th>
                    </tr>
                    ${s}
                  </table>`
  $('.class-div-comment-list').append(template)
}

$('.class-div-post-item-list').on('click', '.class-div-post-item', function() {
  $('.class-div-post-item').removeClass('cur')
  $(this).addClass('cur')
  $('.class-div-comment-list table').remove()
  var id = $(this).data('id');
  console.log(id);
  api({
    url: '/comment/all/master',
    method: 'get',
    data: {
      post_id: id,
    },
    success: renderCommentList
  })


});
$('.class-div-post-itme-header').on('click', '.class-div-post-item', function() {
  $('.class-div-post-item').removeClass('cur')
  $(this).addClass('cur')
  console.log(2333);
  $('.class-div-comment-list table').remove();
  api({
    url: '/comment/all/master',
    method: 'get',
    success: renderCommentList
  })
});

$('.button-date-search').on('click', function() {
  console.log(233);
  var id = $('.cur').data('id');
  var start = $("input[name='start']").val()
  var end = $("input[name='end']").val()
  if (id == undefined) {
    $('.class-div-comment-list table').remove();
    api({
      url: '/comment/all/master',
      method: 'get',
      data: {
        start: start,
        end: end,
      },
      success: renderCommentList
    })
  } else {
    $('.class-div-comment-list table').remove();
    api({
      url: '/comment/all/master',
      method: 'get',
      data: {
        post_id: id,
        start: start,
        end: end,
      },
      success: renderCommentList
    })
  }
});

$('.class-div-comment-list').on('click', '.delete-comment', function() {
  console.log(this);
  var id = $(this).data('id');
  console.log(id);
  api({
    url: '/comment/delete',
    method: 'post',
    data: {
      id: id,
    },
    success: data => {alert(data.data)}
  })
});
