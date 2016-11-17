var id = $('body').data('post-id')

$.ajax({
  url: '/post/title/get',
  method: 'get',
  data: {
    id: id,
  },
  success: function(data) {
    if (data.msg == 'success') {
      renderTitle(data.data);
    }
  }
});

$.ajax({
  url: '/post/title/get',
  method: 'get',
  data: {
    id: id,
  },
  success: function(data) {
    if (data.msg == 'success') {
      renderTitle(data.data);
    }
  }
});

function renderTitle(title) {
  $('#title').val(title);
}

$.ajax({
  url: '/post/' + id + '/post-content/get',
  method: 'get',
  success: function(data) {
    renderContent(data.data);
  },
  error: function(data) {
    console.log(data);
  }
});

function renderContent(post) {
  editor.$txt.append(post);
}