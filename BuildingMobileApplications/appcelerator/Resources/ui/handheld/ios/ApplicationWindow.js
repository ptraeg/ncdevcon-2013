function ApplicationWindow() {
	//declare module dependencies
	var MasterView = require('ui/common/MasterView'),
		SettingsView = require('ui/common/SettingsView');
		
	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
		
	//construct UI
	var masterView = new MasterView(),
		settingsView = new SettingsView();
		
	//create master view container
	var masterContainerWindow = Ti.UI.createWindow({
		title:'FasTip'
	});
	masterContainerWindow.add(masterView);
	
	//create detail view container
	var detailContainerWindow = Ti.UI.createWindow({
		title:'FasTip Settings'
	});
	detailContainerWindow.add(settingsView);
	
	// Settings button in main view
	var settingsButtonBar = Titanium.UI.createButtonBar({
		labels:['Settings'],
		backgroundColor:'#336699'
	});
	masterContainerWindow.setRightNavButton(settingsButtonBar);

	// Done button in settings view
	var settingsDoneButtonBar = Titanium.UI.createButtonBar({
		labels:['Done'],
		backgroundColor:'#336699'
	});
	detailContainerWindow.setRightNavButton(settingsDoneButtonBar);

	//create iOS specific NavGroup UI
	var navGroup = Ti.UI.iPhone.createNavigationGroup({
		window:masterContainerWindow
	});
	self.add(navGroup);

	settingsButtonBar.addEventListener('click', function(e) {
		navGroup.open(detailContainerWindow);
	});
	
	settingsDoneButtonBar.addEventListener('click', function(e) {
		settingsView.fireEvent('saveSettings',e);
	});
	
	settingsView.addEventListener('closeSettings', function(e) {
		navGroup.close(detailContainerWindow);
		masterView.fireEvent('recalc');
	});
	
	return self;
};

module.exports = ApplicationWindow;
