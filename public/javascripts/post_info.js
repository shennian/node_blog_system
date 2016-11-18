var id = $('body').data('post-id')

api({
  url: '/post/title/get',
  method: 'get',
  data: {
    id: id,
  },
  success: renderTitle
})

function renderTitle(data) {
  if (data.msg == 'success') {
    var title = data.data;
    $('#title').val(title);
  }
}

api({
  url: '/post/content/get',
  method: 'get',
  data: {
    id: id,
  },
  success: renderContent
})

function renderContent(data) {
  var post = data.data
  editor.$txt.append(post);
}