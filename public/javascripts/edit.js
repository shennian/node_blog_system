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


function autoSave() {
  var title = $('#title').val();
  var post = editor.$txt.html();
  var id = $('body').data('post-id')
  var postData = {
    id: id,
    title: title,
    post: post,
  }
  $.ajax({
    url: '/post/edit',
    method: 'post',
    data: postData,
    success: function(data) {
      $('.class-div-alter-container').show();
      setTimeout(function () {
        $('.class-div-alter-container').hide();
      }, 500);
    },
    error: function(err) {
      console.log(err);
    }
  });
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
    url: '/post/publish',
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
setInterval(autoSave, 2000);

$('#save').on('click', function() {
  autoSave();
});

$('#publish').on('click', function() {
  publish();
});