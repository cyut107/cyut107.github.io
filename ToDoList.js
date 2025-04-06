$(document).ready(function() {
    new Vue({
        el: '#list',
        data: {
            listItem: '',
            status: 'no',
            items: []
        },
        computed: {
            filterItems() {
                if (this.status === 'no') {
                    $('h2').css('background-color', '#87A0C0');
                    return this.items.filter(item => !item.completed);
                } else if (this.status === 'yes') {
                    $('h2').css('background-color', '#DE6847');
                    return this.items.filter(item => item.completed);
                } else if (this.status === 'all') {
                    $('h2').css('background-color', '#858585');
                    return this.items;
                }
                return this.items;
            },
            itemLength() {
                return this.items.filter(item => !item.completed).length;
            },
            headerStyle() {
                switch (this.status) {
                    case 'no':
                        return { 'background-color': '#87A0C0' };
                    case 'yes':
                        return { 'background-color': '#DE6847' };
                    case 'all':
                        return { 'background-color': '#858585' };
                    default:
                        return { 'background-color': '#fff' };
                }
            }
        },
        methods: {
            add() {
                const text = this.listItem.trim();
                if (!text) return;
                const id = Date.now();
                this.items.push({
                    id: id,
                    text: text,
                    completed: false
                });
                this.listItem = '';
            },

            /* 刪除單一任務 */
            remove(item) {
                if (!confirm("確定要刪除嗎？")) {
                    return false;
                }
                const index = this.items.findIndex(i => i.id === item.id);
                if (index !== -1) {
                    this.items.splice(index, 1);
                }
            },

            /* 刪除全部任務 */
            removeAll:function(index) {   
                if (!confirm("要刪除全部任務嗎？")) {
                    return false
                }
                else {this.items.splice(index);}  /* 刪除全部。 */                      
            }
        }
    });

    $('#topButton').hide(); 
    $("#topButton").click(function(){ 
        $("html, body").animate({
            scrollTop: 0
        }, 500);
    });
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#topButton').fadeIn("fast");
        } else {
            $('#topButton').stop().fadeOut("fast");
        }
    }); 
});
