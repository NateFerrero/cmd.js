(function () {
    'use strict';

    this.export = function (cmd) {

        /**
         * Command: view(#element) === ViewClass
         *          new ViewClass(#element) to render
         * @author Nate Ferrero
         */
        var ViewClassPrototype = {
            update: function () {
                cmd.extend.apply(null, arguments)(this.scope);
                console.log(this.scope);
                this.render();
            },
            render: function () {
                while (this.node.lastChild) {
                    this.node.removeChild(this.node.lastChild);
                }
                this.node.appendChild(this.template.cloneNode(true));
            }
        };

        this.args = [];
        this.all = function (args, vals) {
            if (typeof document === 'undefined') {
                return
            }
            var template = document.createDocumentFragment();
            vals.forEach(function (val) {
                template.appendChild(val.content || val.cloneNode(true));
            });

            var ViewClass = function (on) {
                this.on = on;
                this.template = document.importNode(template, true);
                this.node = document.createElement('view');
                this.scope = {};
                if (on) {
                    on.appendChild(this.node);
                }
                this.render();
            };

            ViewClass.prototype = ViewClassPrototype;
            return ViewClass;
        };
    };
}).call(typeof module === 'undefined' ? this['cmd:lib'].view = {} : this);
