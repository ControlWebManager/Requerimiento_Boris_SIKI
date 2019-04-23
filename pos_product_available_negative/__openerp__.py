# -*- coding: utf-8 -*-
# © 2017 Boris Silva - Adecuaciones para el uso con servicios silvaboris@gmail.com
{
    'name': 'Restrict out-of-stock POS Orders',
    'version': '1.0.0',
    'author': 'IT-Projects LLC, Ivan Yelizariev',
    'contributors': 'Boris Silva  <silvaboris@gmail.com>',
    'summary': 'Only supervisor can approve POS Order with out-of-stock product',
    'license': 'LGPL-3',
    'category': 'Point Of Sale',
    'website': 'https://it-projects.info',
    'depends': ['pos_pin'],
    'data': [
        'data.xml',
        'views.xml',
    ],

    # "price": 50.00,
    # "currency": "EUR",

    'installable': True,
}
