# -*- coding: utf-8 -*-
# © 2017 Boris Silva - Adecuaciones para el uso con servicios silvaboris@gmail.com
{
    'name': 'Available quantity of products in POS',
    'version': '1.0.3',
    'author': 'IT-Projects LLC, Ivan Yelizariev',
    'contributors': 'Boris Silva  <silvaboris@gmail.com>',
    'license': 'LGPL-3',
    'category': 'Point Of Sale',
    'website': 'https://twitter.com/yelizariev',
    'depends': ['point_of_sale', 'stock'],
    'data': [
        'data.xml',
    ],
    'qweb': [
        'static/src/xml/pos.xml',
    ],
    'installable': True,
}
