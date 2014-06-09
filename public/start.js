require([
	'jquery',
	'underscore',
	'backbone',
	'Marionette',
], function ($, _, backbone, Marionette) {
	var app = window.app = new Marionette.Application(),
		AppLayout = Marionette.Layout.extend({
			template: _.template("<div id='personList'></div>"),
			regions: {
				personList: '#personList'
			}
		}),
		Person = backbone.Model.extend({
			urlRoot: '/person'
		}),
		PersonView = Marionette.ItemView.extend({
			tagName: 'tr',
			template: function (model) {
				return _.template("<td><%= data.firstName %></td><td><%= data.lastName %></td>", {
					firstName: model.firstName,
					lastName: model.lastName
				}, { variable: 'data' });
			}
		}),
		PersonCollection = backbone.Collection.extend({
			url: '/person',
			model: Person
		}),
		EmptyView = Marionette.ItemView.extend({
			tagName: 'tr',
			template: function () {
				return _.template("<td colspan='2'>empty</td>");
			}
		}),
		PersonCollectionView = Marionette.CollectionView.extend({
			tagName: 'table',
			itemView: PersonView,
			emptyView: EmptyView
		});
		
	app.layout = new AppLayout();
	
	app.personCollection = new PersonCollection();
	
	app.personCollectionView = new PersonCollectionView({
		collection: app.personCollection
	});
	
	app.personCollection.fetch();
	
	app.on('start', function () {
		app.addRegions({
			mainRegion: $('#contents')
		});
		app.display();
	});
	
	app.display = function () {
		app.mainRegion.show(app.layout);
		app.layout.personList.show(app.personCollectionView);
	};
	
	$(function () {
		app.start();
	});
});
