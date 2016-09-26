/**
 * 2007-2016 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA    <contact@prestashop.com>
 * @copyright 2007-2016 PrestaShop SA
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

(function () {
    var containers = [];

    function TabContainer(tab)
    {
        var _this = this;
        this.tab = $(tab);
        this.init = function () {
            _this.tab.find('> ul.tabs > li').live('click', function () {
                _this.tab.find('> .tabs > li').removeClass('active');
                $(this).addClass('active');
                _this.tab.find('> .tabs_content > div').hide();
                _this.tab.find('[id="'+$(this).data('tab')+'"]').show();
            });
            _this.tab.find('> .tabs_content > div').hide();
            _this.tab.find('> .tabs_content > div:first').show();
            _this.tab.find('> ul > li:first').addClass('active');

        };
        this.set = function(id)
        {
            _this.tab.find('.tabs > li').removeClass('active');
            $('[data-tab="'+id+'"]').addClass('active');
            _this.tab.find('.tabs_content > div').hide();
            _this.tab.find('[id="'+id+'"]').show();
        };
    }

    $.fn.tabContainer = function (method) {
        var response = null;
        $.each(this, function (index, item) {

            var elem = $(item);
            var tabContainer = null;
            var id = null;
            if (!elem.is('[data-tab-container]'))
            {
                id = containers.length;
                elem.attr('data-tab-container', id);
                tabContainer = new TabContainer(item);
                tabContainer.init();
                containers.push(tabContainer);
            }
            else
            {
                id = elem.attr('data-tab-container');
                tabContainer = containers[id];
            }

            if (method && tabContainer != null)
            {
                if (typeof tabContainer[method] != 'undefined')
                   response = tabContainer[method](arguments);
                else
                    console.error('Method "'+method+'" not exists in tabContainer.jquery');
            }
        });
        return response;
    };
})();
