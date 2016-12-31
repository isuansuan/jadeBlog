define(function (require, exports, module) {
    var $ = require("jquery");
    var _ = require("lodash");
    var BS = require("bootstrap");
    var summernote = require("summernote");

    $(document).ready(function () {
        $('.btn-danger.delBlogBtn').on("click",function(){
            var id = $(this).val();
            if(id == undefined){
                $.jGrowl('参数非法', {life: 1000, position: 'bottom-left'});
                return;
            }

            if(!window.confirm("确认删除?")){
                return;
            }
            $.post("/blog/editblog/deleteBlog", {
                id: id
            }, function (data) {
                if (data.error) {
                    $.jGrowl(data.error, {life: 1000, position: 'bottom-left'});
                } else {
                    $.jGrowl("删除成功", {life: 1000, position: 'bottom-left'});
                    window.location.reload();
                }
            });
        });
    });
});