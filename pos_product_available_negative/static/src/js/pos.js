odoo.define('pos_product_available_negative.pos', function (require) {
    "use strict";

    var screens = require('point_of_sale.screens');
    var models = require('point_of_sale.models');
    var core = require('web.core');
    var _t = core._t;

    var PosModelSuper = models.PosModel.prototype;
    var posmodels = PosModelSuper.models;

    for(var i=0; i<posmodels.length; i++){
        var model=posmodels[i];
        if(model.model === 'product.product'){
            model.fields.push('type');
        }
    }

    screens.PaymentScreenWidget.include({
        validate_order: function(force_validation) {
            var self = this;
            var _super = this._super;
            var order = this.pos.get_order();
            var orderlines = order.get_orderlines();
            var has_negative_product = false;

            for (var i = 0; i < orderlines.length; i++) {
                var line = orderlines[i];
                if (line.product.qty_available < line.quantity && line.product.type == 'product') {
                    has_negative_product = true;
                    self.gui.sudo_custom({
                        'title': _t('El pedido tiene producto(s) fuera de stock y debe ser aprobado por el supervisor'),
                        'special_group': this.pos.config.negative_order_group_id[0]
                    }).done(function(user){
                        order.negative_stock_user_id = user;
                        _super.call(self, force_validation);
                    });
                    break;
                }
            }
            if (!has_negative_product) {
                this._super(force_validation);
            }
        }
    });

    var _super_order = models.Order.prototype;
    models.Order = models.Order.extend({
        export_as_JSON: function () {
            var json = _super_order.export_as_JSON.apply(this, arguments);
            json.negative_stock_user_id = this.negative_stock_user_id ? this.negative_stock_user_id.id : false;
            return json;
        }
    });

});
