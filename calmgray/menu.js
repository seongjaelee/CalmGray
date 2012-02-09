var mainMenus = [];
var flag = false;
var currentMenuItem = null;
var currentDialog = null;

function moveMenuItem( inc )
{ 
	if ( !currentMenuItem ) return;
	
	currentMenuItem.inactive();
	
	max = currentMenuItem.mainMenu.menuItems.length;
	index = currentMenuItem.index + inc;
	if ( index == -1 ) index += max;
	if ( index == max) index -= max;
	currentMenuItem = currentMenuItem.mainMenu.menuItems[index];
	
	currentMenuItem.active();
}

function closeAll()
{
	if ( currentMenuItem != null )
	{
		currentMenuItem.inactive();
		currentMenuItem.mainMenu.panel.hide();
		currentMenuItem = null;
	}
}

function toggleMainMenu( mainMenu )
{
	if ( currentMenuItem == null )
	{
		mainMenu.panel.show();
		currentMenuItem = mainMenu.menuItems[0];
		currentMenuItem.active();
	}
	else if ( mainMenu == currentMenuItem.mainMenu )
	{
		closeAll();
	}
	else
	{
		alert( mainMenu + 'error: toggle main menu' );
	}
}

function openMainMenu( mainMenu )
{
	flag = ( currentMenuItem != null && mainMenu == currentMenuItem.mainMenu );
	closeAll();
	
	if ( flag ) return;
	
	mainMenu.panel.show();
	currentMenuItem = mainMenu.menuItems[0];
	currentMenuItem.active();
}

function moveMainMenu( inc )
{
	if ( !currentMenuItem ) return;
	
	max = mainMenus.length;
	index = currentMenuItem.mainMenu.index + inc;
	if ( index == -1 ) index += max;
	if ( index == max) index -= max;
	
	openMainMenu( mainMenus[index] );
}

function MenuItem( index )
{
	this.index = index;
	this.mainMenu = null;
	
	this.active = function ()
	{ 
		$(this).css('background-color', '#222'); 
		$(this.mainMenu.menuItem).css('background-color', '#222');
	}
	
	this.inactive = function () 
	{ 
		$(this).css('background-color', 'transparent'); 
		$(this.mainMenu.menuItem).css('background-color', 'transparent');
	}
	
	this.execute = function ()
	{
		closeAll();
		if ( $(this).attr('id') == 'CreatePageMenu' )
		{
			$( "#DialogCreatePage" ).modal(modalOptions);
		}
		else if ( $(this).attr('id') == 'TitleSearchMenu' )
		{
			$( "#DialogSearchTitle" ).modal(modalOptions);
		}
		else if ( $(this).attr('id') == 'FullSearchMenu' )
		{
			$( "#DialogSearch" ).modal(modalOptions);
		}
		else if ( $(this).attr('id') == 'GotoMenu' )
		{
			$( "#DialogGoto" ).modal(modalOptions);
		}
		else if ( $(this).attr('id') == 'LogInMenu' )
		{
			$( "#DialogLogIn" ).modal(modalOptions);
		}
		else if ($(this).attr('id') == 'ShortcutMenu' )
		{
			$( "#DialogShortcut" ).modal(modalOptions);
		}
		else if ($(this).attr('id') == 'WikiGrammarMenu' )
		{
			$( "#DialogWikiGrammar" ).modal(modalOptions);
		}
		else
		{
			window.location = $('a', this).attr('href');
		}
	}
	
	$(this).hover( function () { currentMenuItem.inactive(); currentMenuItem = this; currentMenuItem.active(); } );
	$(this).click( function () { this.execute(); flag = true; } );
}

function MainMenuItem()
{
	this.mainMenu = null;
	$(this).click( function() { toggleMainMenu( this.mainMenu ); } );
	$(this).hover( function() { 
		if ( currentMenuItem && currentMenuItem.mainMenu != this.mainMenu)
		{
			openMainMenu(this.mainMenu);
		}
		else
		{
			$(this).css('background-color','#111'); 
		}
	}, function() { $(this).css('background-color','transparent'); } );
}

function MainMenu( index )
{
	$('ul', this).hide();
	
	this.index = index;
	this.menuItems = $('ul > li', this).each( MenuItem );
	this.menuItem = $(this).children('div').each( MainMenuItem )[0];
	this.menuItem.mainMenu = this;
	for ( i = 0; i < this.menuItems.length; i++ )
	{
		this.menuItems[i].mainMenu = this;
	}
	this.panel = $('ul', this);
	
	
	this.slide = function ()
	{
		if ( flag ) { flag = false; return; }
		if ( currentMenuItem != null && currentMenuItem.mainMenu == this ) return;
		openMainMenu( this );
	}
}

function getWikiActionLink( actionName )
{
	var location = self.location + '';
	if ((i = location.indexOf('&')) != -1) location = location.substring(0,i);
	if ((i = location.indexOf('#')) != -1) location = location.substring(0,i);
	if ((i = location.indexOf('?')) != -1) location = location.substring(0,i);
	if ((i = location.lastIndexOf('/')) == location.length - 1) location = location.substring(0,i);
	if ( location.lastIndexOf('.php') == location.length - 4 ) location = location + '/FrontPage';
	
	return location + '?action=' + actionName;
}

function getWikiSiteLink( pageName )
{
	var location = self.location + '';
	if ((i = location.indexOf('&')) != -1) location = location.substring(0,i);
	if ((i = location.indexOf('#')) != -1) location = location.substring(0,i);
	if ((i = location.indexOf('?')) != -1) location = location.substring(0,i);
	if ((i = location.lastIndexOf('/')) == location.length - 1) location = location.substring(0,i);
	//if ( location.lastIndexOf('.php') == location.length - 4 ) location = location + '/FrontPage';
	location = location.substring(0, location.lastIndexOf('.php') + 4);
	
	return location + '/' + pageName;
}

function addShortcuts()
{
	if (mainMenus.length > 0 ) shortcut.add( "1", function() { window.scrollTo(0,0); openMainMenu(mainMenus[0]); }, { 'disable_in_input':true } ); // navigation
	if (mainMenus.length > 1 ) shortcut.add( "2", function() { window.scrollTo(0,0); openMainMenu(mainMenus[1]); }, { 'disable_in_input':true } ); // page
	if (mainMenus.length > 2 ) shortcut.add( "3", function() { window.scrollTo(0,0); openMainMenu(mainMenus[2]); }, { 'disable_in_input':true } ); // account
	if (mainMenus.length > 3 ) shortcut.add( "4", function() { window.scrollTo(0,0); openMainMenu(mainMenus[3]); }, { 'disable_in_input':true } ); // favorite
	if (mainMenus.length > 4 ) shortcut.add( "5", function() { window.scrollTo(0,0); openMainMenu(mainMenus[4]); }, { 'disable_in_input':true } ); // help
	if (mainMenus.length > 5 ) shortcut.add( "6", function() { window.scrollTo(0,0); openMainMenu(mainMenus[5]); }, { 'disable_in_input':true } ); // help
	
	shortcut.add( "D",			function() { self.location = getWikiActionLink('diff'); }, { 'disable_in_input':true } );
	shortcut.add( "E",			function() { self.location = getWikiActionLink('edit'); }, { 'disable_in_input':true } );
	shortcut.add( "W",			function() { self.location = getWikiActionLink('edit'); }, { 'disable_in_input':true } );
	shortcut.add( "I",			function() { self.location = getWikiActionLink('info'); }, { 'disable_in_input':true } );
	shortcut.add( "P",			function() { self.location = getWikiActionLink('print'); }, { 'disable_in_input':true } );
	shortcut.add( "R",			function() { self.location = getWikiActionLink('show'); }, { 'disable_in_input':true } );
	shortcut.add( "K",			function() { self.location = getWikiActionLink('keywords'); }, { 'disable_in_input':true } );
	shortcut.add( "B",			function() { self.location = getWikiActionLink('bookmark'); }, { 'disable_in_input':true } );
	
	shortcut.add( "U",			function() { self.location = getWikiSiteLink('UserPreferences'); }, { 'disable_in_input':true } );
	
	shortcut.add( "A",			function() { self.location = getWikiActionLink('randompage'); }, { 'disable_in_input':true } );
	shortcut.add( "L",			function() { self.location = getWikiActionLink('likePages'); }, { 'disable_in_input':true } );
	shortcut.add( "F",			function() { self.location = getWikiSiteLink('FrontPage'); }, { 'disable_in_input':true } );
	shortcut.add( "C",			function() { self.location = getWikiSiteLink('RecentChanges'); }, { 'disable_in_input':true } );
	//shortcut.add( "S",			function() { self.location = getWikiSiteLink('FindPage'); }, { 'disable_in_input':true } );
	shortcut.add( "Q",			function() { self.location = getWikiSiteLink('FindPage'); }, { 'disable_in_input':true } );
	shortcut.add( "T",			function() { self.location = getWikiSiteLink('TitleIndex'); }, { 'disable_in_input':true } );
	shortcut.add( "H",			function() { self.location = getWikiActionLink('home'); }, { 'disable_in_input':true } );
	
	shortcut.add( "Up",     function() { if (currentMenuItem) moveMenuItem(-1); else window.scrollBy(0,-50); }, { 'disable_in_input':true } );
	shortcut.add( "Down",   function() { if (currentMenuItem) moveMenuItem(1); else window.scrollBy(0,50); }, { 'disable_in_input':true } );
	shortcut.add( "Left",   function() { if (currentMenuItem) moveMainMenu(-1); else window.scrollBy(-50,0); }, { 'disable_in_input':true } );
	shortcut.add( "Right",  function() { if (currentMenuItem) moveMainMenu(1); else window.scrollBy(50,0); }, { 'disable_in_input':true } );
	shortcut.add( "Enter",  function() { if (currentMenuItem) { currentMenuItem.execute(); } }, { 'disable_in_input':true } );
	shortcut.add( "Q",      function() { closeAll(); }, { 'disable_in_input':true } );
	shortcut.add( "Ctrl+S", function() { $(".save-button").click(); }, { 'disable_in_input':false } );
	
	shortcut.add( "N",			function() { closeAll(); $("#DialogCreatePage").modal(modalOptions) }, { 'disable_in_input':true });
	shortcut.add( "G",			function() { closeAll(); $("#DialogLogIn").modal(modalOptions) }, { 'disable_in_input':true });
	shortcut.add( "S",			function() { closeAll(); $("#DialogSearch").modal(modalOptions) }, { 'disable_in_input':true });
	shortcut.add( ",",			function() { closeAll(); $("#DialogGoto").modal(modalOptions) }, { 'disable_in_input':true });
	shortcut.add( ".",			function() { closeAll(); $("#DialogSearchTitle").modal(modalOptions) }, { 'disable_in_input':true });
	
	shortcut.add( "Esc",		manageSearchBox, { 'disable_in_input':false, 'propagate':true } );
	shortcut.add( "Esc",    closeAll, { 'disable_in_input':true, 'propagate':true } );
}

var modalOptions =
{ 
	opacity: 80,
	focus: true,
	onShow: function() { currentDialog = true; $('.simplemodal-container:first input[type="text"]:first').focus(); }, 
	onClose: function() { currentDialog = false; $.modal.close(); }
};

var searchBoxFocused = false;
function manageSearchBox()
{
		if ( currentMenuItem ) return;
		if ( currentDialog ) return;
		if ( searchBoxFocused ) document.getElementById("SearchBox").elements["value"].blur();
}

function initSlideMenu()
{
	// Initialize Menu Items
	mainMenus = $('#MainMenu > li').each( MainMenu );
	
	// Initialize Shortcuts
	addShortcuts();
	
	// Initialize Tables
	//$("table.wiki").tablesorter(); 
	$('table.wiki tr:odd').addClass('odd');
}

$(document).ready( initSlideMenu );
