$(document).ready(function(){
    new Vue({
        el:'#list',
        data:{
            listItem:'',    /* 用來儲存user輸入的任務 */
            status: 'no',   /* 預設任務狀態為未完成 */
            items:[{
                id: '',
                text: '',
                completed: false
            }]
        },
        methods:{
            /* 新增任務 */
            add:function() {
                var text = this.listItem.trim();
                var id = Date.now();
                if (!text) { return false }
                this.items.push({
                    id: id,
                    text: text,
                    computed: false  
                });
                this.listItem = '';
            },

            /* 刪除任務 */
            remove:function(index) {
                if (!confirm("要刪除嗎？")) {
                    return false
                }
                else {this.items.splice(index, 1);} /* 從此任務開始刪除，到這個任務為止。 */
            },
            removeAll:function(index) {   
                if (!confirm("要刪除全部任務嗎？")) {
                    return false
                }
                else {this.items.splice(index);}  /* 刪除全部。 */                      
            }
        },

        /* 更新任務狀態 */
        computed: {  /* computed要在methods外面 */
            filterItems:function() {
            
                /* 當任務狀態未勾選時，
                   就顯示在未完成頁籤中。 */                    
                if (this.status == 'no') {
                    $('h2').css("background-color", "#87A0C0");
                    var Items = [];
                    this.items.forEach(function(item) {
                        if (!item.completed) {
                            Items.push(item);
                            console.log(item.completed);
                        } 
                    })
                    return Items;   
                }

                /* 當任務狀態勾選時，
                   就顯示在完成頁籤中。 */                       
                else if (this.status == 'yes') {
                    $('h2').css("background-color", "#DE6847");                        
                    var Items = [];
                    this.items.forEach(function(item) {
                        if (item.completed) {
                            Items.push(item);
                        }
                    })
                    return Items;
                }

                /* 顯示所有任務。 */                       
                else if (this.status == 'all') {
                    $('h2').css("background-color", "#858585");
                    return this.items;
                }
            }
        }    
    });

    /* 當清單過長時，會出現置頂按鈕。 */
    $('#topButton').hide(); 
    $("#topButton").click(function(){ 
      $("html").animate(
        {
        scrollTop:0
        }
        ,500
      );
    });
    $(window).scroll(function() {
        if ( $(this).scrollTop() > 100) {
          $('#topButton').fadeIn("fast");
        }
        else {
          $('#topButton').stop().fadeOut("fast");
        }
    }); 
});
