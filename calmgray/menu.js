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
			$.modal(modalCreate, modalOptions);
		}
		else if ( $(this).attr('id') == 'TitleSearchMenu' )
		{
			$.modal(modalTitleSearch, modalOptions);
		}
		else if ( $(this).attr('id') == 'FullSearchMenu' )
		{
			$.modal(modalFullSearch, modalOptions);
		}
		else if ( $(this).attr('id') == 'GotoMenu' )
		{
			$.modal(modalTitleSearch, modalOptions);
		}
		else if ( $(this).attr('id') == 'LogInMenu' )
		{
			$.modal((isLoggedIn===1)?modalLogOut:modalLogIn, modalOptions);
		}
		else if ($(this).attr('id') == 'ShortcutMenu' )
		{
			$.modal(modalShortcut, modalOptions);
		}
		else if ($(this).attr('id') == 'WikiGrammarMenu' )
		{
			$.modal(modalWikiGrammar, modalOptions);
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
	if ( location.lastIndexOf('.php') == location.length - 4) location = location + '/FrontPage';
	
	return location + '?action=' + actionName;
}

function getWikiSiteLink( pageName )
{
	var location = self.location + '';
	if ((i = location.indexOf('&')) != -1) location = location.substring(0,i);
	if ((i = location.indexOf('#')) != -1) location = location.substring(0,i);
	if ((i = location.indexOf('?')) != -1) location = location.substring(0,i);
	if ((i = location.lastIndexOf('/')) == location.length - 1) location = location.substring(0,i);
	location = location.substring(0, location.lastIndexOf('.php') + 4);
	
	return location + '/' + pageName;
}

var modalLogIn = "\
<div class='dialog'>\
	<h1>로그인</h1>\
	<form target='DummyIFrame' method='post' id='DialogLogInForm' action='"+getWikiSiteLink("UserPreferences")+"'>\
		<input type='hidden' name='action' value='userform'>\
		<label>아이디</label><input type='text' name='login_id'>\
		<label>비밀번호</label><input type='password' name='password'>\
		<div class='footer'>\
			<input type='submit' value='로그인' onClick='reloadFlag=1;'>\
			<input type='button' value='취소' onClick='$.modal.close();'>\
		</div>\
	</form>\
</div>";

var modalLogOut = "\
<div class='dialog'>\
	<h1>로그아웃</h1>\
	<form target='DummyIFrame' method='post' action='"+getWikiSiteLink("UserPreferences")+"'>\
		<input type='hidden' name='action' value='login'>\
		<input type='hidden' name='status' value='logoff'>\
		<div class='footer'>\
			<input type='submit' value='로그아웃' onClick='reloadFlag=1;'>\
			<input type='button' value='취소' onClick='$.modal.close();'>\
		</div>\
	</form>\
</div>";

var modalFullSearch ="\
<div class='dialog'>\
	<h1>전체 본문 검색</h1>\
		<form method='get' action='"+getWikiSiteLink("FrontPage")+"'>\
		<input type='hidden' name='action' value='fullsearch'>\
		<input type='text' name='value'>\
		<input type='hidden' name='context' value='1'>\
		<div class='footer'>\
			<input type='submit' value='검색'>\
			<input type='button' value='닫기' onClick='$.modal.close();'>\
		</div>\
	</form>\
</div>";

var modalTitleSearch ="\
<div class='dialog'>\
	<h1>제목 검색</h1>\
	<form method='get'>\
		<input type='hidden' name='action' value='titlesearch'>\
		<input type='text' name='value'>\
		<div class='footer'>\
			<input type='submit' value='검색'>\
			<input type='button' value='닫기' onClick='$.modal.close();'>\
		</div>\
	</form>\
</div>";

var modalCreate ="\
<div class='dialog'>\
	<h1>문서 생성</h1>\
	<form>\
		<input type='hidden' name='action' value='create'>\
		<input type='text' name='name' id='ModalDocumentName'>\
		<div class='footer'>\
			<input type='button' value='생성' onClick='document.location.href=getWikiSiteLink($(\"#ModalDocumentName\").attr(\"value\")+\"?action=edit\")'>\
			<input type='button' value='닫기' onClick='$.modal.close();'>\
		</div>\
	</form>\
</div>";

var modalShortcut ="\
<div class='dialog'>\
	<h1>단축키 목록</h1>\
	<table style='width:500px;'>\
		<thead>\
			<tr>\
				<th>단축키</th>\
				<th>설명</th>\
				<th>영어</th>\
			</tr>\
		</thead>\
		<tbody>\
			<tr><td>A</td><td>임의 문서로 이동</td><td>Random Page</td></tr>\
			<tr><td>B</td><td>문서 북마크</td><td>Bookmark</td></tr>\
			<tr><td>C</td><td>바뀐 문서 목록</td><td>Recent Changes</td></tr>\
			<tr><td>D</td><td>문서 이전 버전과 비교</td><td>Diff</td></tr>\
			<tr><td>E</td><td>문서 고치기</td><td>Edit</td></tr>\
			<tr><td>F</td><td>대문</td><td>Front Page</td></tr>\
			<tr><td>G</td><td>로그인/로그아웃</td><td>Log In/Log Out</td></tr>\
			<tr><td>H</td><td>내 페이지</td><td>Homepage</td></tr>\
			<tr><td>I</td><td>문서 정보</td><td>Info</td></tr>\
			<tr><td>K</td><td>문서 키워드 추가</td><td>Keyword</td></tr>\
			<tr><td>L</td><td>유사 문서 목록</td><td>Similar Pages</td></tr>\
			<tr><td>N</td><td>새 문서</td><td>New</td></tr>\
			<tr><td>P</td><td>문서 인쇄</td><td>Print</td></tr>\
			<tr><td>R</td><td>문서 보기</td><td>Show</td></tr>\
			<tr><td>S</td><td>전체 본문 검색</td><td>Full Search</td></tr>\
			<tr><td>T</td><td>문서 목록</td><td>Title Index</td></tr>\
			<tr><td>U</td><td>환경 설정</td><td>User Preferences</td></tr>\
			<tr><td>W</td><td>문서 고치기</td><td>Edit</td></tr>\
			<tr><td>,/.</td><td>제목 검색 & 바로 가기</td><td>Goto</td></tr>\
			<tr><td>Ctrl+S</td><td>문서 저장 (문서 수정 모드에서)</td><td>Save</td></tr>\
		</tbody>\
	</table>\
	<div class='footer'>\
		<input type='button' value='닫기' onClick='$.modal.close();'>\
	</div>\
</div>";

var modalWikiGrammar = "\
<div class='dialog'>\
	<h1>위키 기본 문법</h1>\
	<table style='width:600px;'>\
		<thead>\
			<tr><th>문법</th><th>위키</th><th>HTML</th><th>예시</th></tr>\
		</thead>\
		<tbody>\
			<tr><td>굵게</td>	<td>'''내용'''</td><td>&lt;b&gt;내용&lt;/b&gt;</td><td><b>내용</b></td></tr>\
			<tr><td>기울여</td><td>''내용''</td><td>&lt;b&gt;내용&lt;/b&gt;</td><td><i>내용</i></td></tr>\
			<tr><td>밑줄</td><td>__내용__</td><td>&lt;u&gt;내용&lt;/u&gt;</td><td><u>내용</u></td></tr>\
			<tr><td>색깔</td><td>{{{#FF00DD 내용}}}</td><td>&lt;font color=#FF00DD&gt;내용&lt;/font&gt;</td><td><span style='color:#FF00DD;'>내용</span></td></tr>\
			<tr><td>삭제</td><td>~~내용~~</td><td>&lt;del&gt;내용&lt;/del&gt;</td><td><del>내용</del></td></tr>\
			<tr><td>대제목</td><td>== 내용 ==</td><td>&lt;h2&gt;내용&lt;/h2&gt;</td><td></td></tr>\
			<tr><td>중제목</td><td>=== 내용 ===</td><td>&lt;h3&gt;내용&lt;/h3&gt;</td><td></td></tr>\
			<tr><td>소제목</td><td>==== 내용 ====</td><td>&lt;h4&gt;내용&lt;/h4&gt;</td><td></td></tr>\
			<tr><td>수평선</td><td>----</td><td>&lt;hr&gt;</td><td><hr></td></tr>\
			<tr><td>링크</td><td>[[FrontPage]]</td><td>&lt;a href=FrontPage&gt;FrontPage&lt;/a&gt;</td><td><a href='FrontPage'>FrontPage</a></td></tr>\
			<tr><td>링크</td><td>[[wiki:FrontPage Page]]</td><td>&lt;a href=FrontPage&gt;Page&lt;/a&gt;</td><td><a href='FrontPage'>Page</a></td></tr>\
			<tr><td>링크</td><td>[[http://naver.com Naver]]</td><td>&lt;a href=http://naver.com&gt;Naver&lt;/a&gt;</td><td><a href='http://naver.com'>Naver</a></td></tr>\
			<tr><td>공백태그</td><td>{{{내용}}}</td><td>&lt;pre&gt;내용[탭]내용&lt;/pre&gt;</td><td><pre>내용	내용</pre></td></tr>\
			<tr><td>HTML</td><td>{{{#!HTML<br>내용}}}</td><td>{{{#!HTML<br>&lt;b&gt;내용&lt;/b&gt;}}}</td><td><b>내용</b></td></tr>\
			<tr><td>총알 리스트</td><td>[공백]* 내용</td><td>&lt;ul&gt;&lt;li&gt;내용&lt;/li&gt;&lt;/ul&gt;</td><td><ul><li>내용</li></ul></td></tr>\
			<tr><td>번호 리스트</td><td>[공백]1. 내용</td><td>&lt;ol&gt;&lt;li&gt;내용&lt;/li&gt;&lt;/ol&gt;</td><td><ol><li>내용</li></ol></td></tr>\
			<tr><td>표</td><td>||좌측정렬 || 중앙정렬 || 우측정렬||</td><td></td><td></td></tr>\
			<tr><td>목차</td><td>[[TableOfContents]]</td><td></td><td></td></tr>\
			<tr><td>답글창</td><td>[[Comments]]</td><td></td><td></td></tr>\
		</table>\
	<div class='footer'>\
		<input type='button' value='닫기' onClick='$.modal.close();'>\
	</div>\
</div>";

var reloadFlag = 0;

function addShortcuts()
{
	$("body").prepend("<iframe id='DummyIFrame' style='display:none;' onload='if(reloadFlag===1)window.location.reload();'></iframe>");

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
	
	shortcut.add( "N",			function() { $.modal(modalCreate, modalOptions); }, { 'disable_in_input':true });
	shortcut.add( "G",			function() { $.modal((isLoggedIn===1)?modalLogOut:modalLogIn, modalOptions); }, { 'disable_in_input':true });
	shortcut.add( "S",			function() { $.modal(modalFullSearch, modalOptions); }, { 'disable_in_input':true });
	shortcut.add( ",",			function() { $.modal(modalTitleSearch, modalOptions); }, { 'disable_in_input':true });
	shortcut.add( ".",			function() { $.modal(modalTitleSearch, modalOptions); }, { 'disable_in_input':true });
	
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
	$('table.wiki tr:odd').addClass('odd');
}

$(document).ready( initSlideMenu );
