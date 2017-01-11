//var BuyFroms = require('./../util/enums');

function NewBookCtrl(containerId, params){
    BaseCtrl.call(this, containerId, params);
    inheritPrototype(NewBookCtrl, BaseCtrl);
    this.name = 'BookCtrl';

    this.init = function () {
        var ctrl = this;
        this.vm = new Vue({
            el: '#'+ctrl.containerId,
            data: {
                action:'',
                book:{},
                BuyFroms:{
                  0:'淘宝',
                  1:'当当',
                  2:'捐赠'
                }
            },
            methods:{
                query:function(){
                    if(ctrl.params.id == 'add'){
                        this.action = '新增';
                        this.$set(this, 'book', {});
                        return;
                    }

                    this.action = '编辑';
                    var that = this;
                    var promise = $.get('book/'+ctrl.params.id);
                    promise.done(function(data){
                        that.$set(that, 'book', JSON.parse(data));
                    });
                },
                save:function(){
                    console.log('save book:');
                    console.log(this.book);
                    var promise = $.ajax({
                        type:'POST',
                        url:'book/save',
                        data:JSON.stringify(this.book),
                        contentType:'application/json'
                    });
                    promise.done(function(res){
                        console.log('save book: id = '+res);
                        UIkit.notify('保存成功!',{status:'info'});
                        ctrl.close();
                    });
                    promise.fail(function(error){
                        console.log(error);
                    });
                },
                cancel:function(){
                    window.history.go(-1);
                    //ctrl.close();
                }
            }
        });
        this.onRoute = this.vm.query;
    }
}
module.exports = NewBookCtrl;
var BookCtrl = buildController(function (ctrl) {
    ctrl.name = 'BookCtrl';
    ctrl.vm = null;

    ctrl.init = function () {
      ctrl.vm = new Vue({
          el: '#'+ctrl.ui[0].id,
          data: {
              action:'',
              book:{},
              BuyFroms:{
                0:'淘宝',
                1:'当当',
                2:'捐赠'
              }
          },
          methods:{
              query:function(){
                  if(ctrl.params.id == 'add'){
                      this.action = '新增';
                      this.$set(this, 'book', {});
                      return;
                  }

                  this.action = '编辑';
                  var that = this;
                  var promise = $.get('book/'+ctrl.params.id);
                  promise.done(function(data){
                      that.$set(that, 'book', JSON.parse(data));
                  });
              },
              save:function(){
                  console.log('save book:');
                  console.log(this.book);
                  var promise = $.ajax({
                      type:'POST',
                      url:'book/save',
                      data:JSON.stringify(this.book),
                      contentType:'application/json'
                  });
                  promise.done(function(res){
                      console.log('save book: id = '+res);
                      UIkit.notify('保存成功!',{status:'info'});
                      ctrl.close();
                  });
                  promise.fail(function(error){
                      console.log(error);
                  });
              },
              cancel:function(){
                  window.history.go(-1);
                  //ctrl.close();
              }
          }
      });
      ctrl.onRoute = ctrl.vm.query;
    };
});
