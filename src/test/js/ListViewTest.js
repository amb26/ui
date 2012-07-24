/*
Copyright 2011 Museum of Moving Image

Licensed under the Educational Community License (ECL), Version 2.0. 
ou may not use this file except in compliance with this License.

You may obtain a copy of the ECL 2.0 License at
https://source.collectionspace.org/collection-space/LICENSE.txt
*/

/*global jqUnit, jQuery, cspace, fluid, start, stop, ok, expect*/
"use strict";

cspace.test = cspace.test || {};

var listViewTester = function ($) {
    
    var container = ".listView-container";

    var setupListView = function (callbacks, options) {
        options = fluid.merge(null, options || {}, {
            model: {
                sortable: {},
                columns: [{
                    sortable: true,
                    id: "number",
                    name: "listView-number"
                }, {
                    sortable: false,
                    id: "summary",
                    name: "listView-summary"
                }, {
                    sortable: true,
                    id: "summarylist.updatedAt",
                    name: "listView-updatedAt"
                }],
                pagerModel: {
                    pageCount: 1,
                    pageIndex: 0,
                    pageSize: 5,
                    sortDir: 1,
                    sortKey: "",
                    totalRange: 0
                },
                pageSizeList: ["1", "5", "10", "20", "50"]
            },
            recordType: "person",
            elPath: "results"
        });
        options.listeners = options.listeners || {};
        fluid.each(callbacks, function (callback, eventName) {
            options.listeners[eventName] = {
                listener: function (listView) {
                    callback(listView);
                },
                priority: eventName.split(".")[1]
            };
        });
        var listView = cspace.listView(container, options);
        return listView;
    };
  
  var testit = function() {setupListView({}, undefined);}; 
  
  fluid.fetchResources({
      template: {
                fetchClass: "fastTemplate",
                url: "../../webapp/html/components/ListViewTemplate.html",
                options: {
                    dataType: "html"
                }
            }
      }, testit);
};