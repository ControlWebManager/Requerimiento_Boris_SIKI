odoo.define('mt_pos.screens', function (require) {
"use strict";
var screens = require('point_of_sale.screens');
var gui = require('point_of_sale.gui');
var core = require('web.core');
var _t = core._t;


var LockButton = screens.ActionButtonWidget.extend({
    template: 'LockButton',
    
    button_click: function () {
	var self = this;	
    
	
	this.gui.show_popup('hide-cancel',{
	    'title': _t('Password? App mt_pos'),
	    'confirm': function(val) {
		var result = self.validate_pwd(val);
		console.log(this.pos.config.disc_pwd);
		if (result == true){
		    return true
		}else{
		    self.button_click();
		}
		
	    },
	    
	});
	
    },
    
    validate_pwd: function(val){
	if (val == this.pos.config.disc_pwd){
	    return true;
	}else{
	    return false;
	} 
    },


});


screens.NumpadWidget.include({
    
    start: function() {
	var self = this;
	this._super();
	
    },
    changedMode: function() {
	var self = this;
	this._super();
	var mode = this.state.get('mode');
        if (mode === 'discount'){
            //function call in pos_pin/static/src/js/pos.js line 51
            self.gui.sudo_custom({
                'title': _t('Necesitas la Aprobación de un supervisor'),
                'special_group': this.pos.config.negative_order_group_id[0],
                'action': mode // action click , captura el stado o mode del boton
                })



            /*this.gui.show_popup('password',{
            'title': _t('Fill Password'),
            'confirm': function(val) {
                var result = self.validate_pwd(val);
                console.log(this.pos.config.disc_pwd);
                if (result == true){
                $('.selected-mode').removeClass('selected-mode');
                $(_.str.sprintf('.mode-button[data-mode="%s"]', mode), self.$el).addClass('selected-mode');

                }else{
                var newmode = 'quantity';
                $('.selected-mode').removeClass('selected-mode');
                $(_.str.sprintf('.mode-button[data-mode="%s"]', newmode), self.$el).addClass('selected-mode');
                return self.state.changeMode(newmode);
                }

            },
            'cancel':  function(val){
                var newmode = 'quantity';
                $('.selected-mode').removeClass('selected-mode');
                $(_.str.sprintf('.mode-button[data-mode="%s"]', newmode), self.$el).addClass('selected-mode');
                return self.state.changeMode(newmode);
            },
            });*/
        }
    },
    
    validate_pwd: function(val){
	if (val == this.pos.config.disc_pwd){
	    return true;
	}else{
	    return false;
	} 
    },
});

screens.define_action_button({
    'name': 'lock',
    'widget': LockButton,
    'condition': function () {
	
	return true;
    },
});


});
