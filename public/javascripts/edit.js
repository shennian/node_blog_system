var editor = new wangEditor('editor');
editor.onchange = function () {
  // 编辑区域内容变化时，实时打印出当前内容
  console.log(this.$txt.html());
};
editor.config.menus = [
  "bold",
  "underline",
  "italic",
  "strikethrough",
  "forecolor" ,
  "bgcolor",

  "eraser" ,
  "fontsize",
  "orderlist" ,
  "unorderlist" ,
  "quote",
  "link" ,
  "text" ,
  "submit" ,
  "cancel" ,
  "unlink" ,
  "table" ,
  "img" ,
  "insertcode" ,
  "undo" ,
  "redo" ,
  "fullscreen" ,
  "openLink"
];
editor.create();

var renderAlter = function(data) {
  $('.class-div-alter-container').show();
  setTimeout(function () {
    $('.class-div-alter-container').hide();
  }, 500);
}

function autoSave() {
  var title = $('#title').val();
  var post = editor.$txt.html();
  var id = $('body').data('post-id')
  var postData = {
    id: id,
    title: title,
    post: post,
  }
  api({
    url: '/post/save/master',
    method: 'post',
    data: postData,
    success: renderAlter,
  })
}

function publish() {
  var title = $('#title').val();
  var post = editor.$txt.html();
  var id = $('body').data('post-id')
  var postData = {
    id: id,
    title: title,
    post: post,
  }
  $.ajax({
    url: '/post/publish/master',
    method: 'post',
    data: postData,
    success: function(data) {
      if (data.msg == 'success') {
        window.location = data.data;
      }
    },
    error: function(err) {
      console.log(err);
    }
  });
}

function sendEamil() {
  var title = $('#title').val();
  var id = $('body').data('post-id')
  var postData = {
    url: location.origin +　'/post/get?id='+ id,
    title: title,
  }
  $.ajax({
    url: '/email/send/all',
    method: 'post',
    data: postData,
    success: function(data) {
      console.log(data);
    },
    error: function(err) {
      console.log(err);
    }
  });
}
setInterval(autoSave, 2000);

$('#save').on('click', function() {
  autoSave();
});

$('#publish').on('click', function() {
  publish();
  sendEamil();
});
