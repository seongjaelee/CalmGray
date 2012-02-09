<?php
# Copyright 2010 Seong Jae Lee <seongjae at gmail dot com>
# All rights reserved. Distributable under GPL

/**
 * @author  Seong Jae Lee <seongjae at gmail dot com>
 * @date    2010-08-15
 * @name    CalmGray
 * @desc    MoniWiki Theme
 * @version	1.1
 * @license GPL
 */
 
	include_once("plugin/login.php");
	$theme_use_logo = true; // 사이트 로고를 좌상단에 표시합니다.
	$theme_use_sitename = false; // 사이트 이름을 좌상단에 표시합니다.
?>
<script type="text/javascript" src="http://code.jquery.com/jquery-latest.js"></script>
<!--<script type="text/javascript" src="<?php echo $this->themeurl;?>/javascripts/jquery-1.4.2.min.js"></script>-->
<script type="text/javascript" src="<?php echo $this->themeurl;?>/javascripts/shortcut.js"></script>
<script type="text/javascript" src="<?php echo $this->themeurl;?>/javascripts/jquery.simplemodal-1.3.5.min.js"></script>
<script type="text/javascript" src="<?php echo $this->themeurl;?>/menu.js"></script>
<!--[if IE 6]> <style type="text/css"> body { width:60em; background: Black url(<?php echo $this->themeurl;?>/imgs/bg.jpg) top center no-repeat; } #SearchBox input#SearchBoxSubmit { background: transparent url('<?php echo $this->themeurl;?>/imgs/search-icon.png') no-repeat; } </style> <![endif]-->
<!--[if IE 6]> <link rel="stylesheet" type="text/css" href="<?php echo $this->themeurl;?>/css/ie6.css" /> <![endif]-->
<!--[if IE 7]> <link rel="stylesheet" type="text/css" href="<?php echo $this->themeurl;?>/css/ie7.css" /> <![endif]-->
<!--[if lt IE 7]> <script defer type="text/javascript" src="<?php echo $this->themeurl;?>/javascripts/pngfix.js"></script> <![endif]-->

<img id="Wallpaper" src="<?php echo $this->themeurl;?>/imgs/bg1.jpg">

<?php include("dialogs.php");?>

<!-- 좌상단 사이트 로고/이름 표시 -->
<div id="Title">
<?php
	if ( $theme_use_logo ) { echo "<a href='".$this->link_url('FrontPage')."'><img src='".$DBInfo->logo_img."' style='border:0;'></a>\n"; }
	if ( $theme_use_sitename ) { echo "<a href='".$this->link_url('FrontPage')."'><span>".$DBInfo->sitename."</span></a>\n"; }
?>
</div>

<!-- 메뉴 -->
<div id="MainMenuTop">
<?php $menuIndex = 1; ?>
	<ul id="MainMenu">
<!-- 항해 메뉴 -->
		<li>
			<div class="mainMenuItem">항해(<u><?php echo $menuIndex++;?></u>)</div>
			<ul class="MenuPanel" style="display:none; width:160px;">
				<li><div class="menuItem"><a href="<?php echo $this->link_url('FrontPage');?>">대문</a></div><div class="shortcut">F</div></li>
				<li><div class="menuItem"><a href="<?php echo $this->link_url('RecentChanges');?>">바뀐 문서 목록</a></div><div class="shortcut">C</div></li>
				<li><div class="menuItem"><a href="<?php echo $this->link_url('?action=RandomPage');?>">랜덤 문서</a></div><div class="shortcut">A</div></li>
				<hr>
				<li id="GotoMenu"><div class="menuItem">바로 가기</div><div class="shortcut">,</div></li>
				<li id="TitleSearchMenu"><div class="menuItem">제목 검색</div><div class="shortcut">.</div></li>
				<li id="FullSearchMenu"><div class="menuItem">본문 검색</div><div class="shortcut">S</div></li>
				<li><div class="menuItem"><a href="<?php echo $this->link_url('FindPage');?>">상세 검색</a></div><div class="shortcut">Q</div></li>
				<hr>
				<li><div class="menuItem"><a href="<?php echo $this->link_url('?action=TitleIndex');?>">문서 목록</a></div><div class="shortcut">T</div></li>
				<li><div class="menuItem"><a href="<?php echo $this->link_url($this->page->name.'?action=LikePages');?>">유사 문서 목록</a></div><div class="shortcut">L</div></li>
				<li><div class="menuItem"><a href="<?php echo $this->link_url('?action=fullsearch&value='.$this->page->name.'&backlinks=1&context=20');?>">역링크 문서 목록</a></div></li>
				<li><div class="menuItem"><del>사용자 목록</del></div></li>
			</ul>
		</li>
<!-- 문서 메뉴 -->
		<li>
			<div class="mainMenuItem">문서(<u><?php echo $menuIndex++;?></u>)</div>
			<ul class="MenuPanel" style="width:150px;">
				<li><div class="menuItem"><a href="<?php echo $this->link_url($this->page->name.'?action=edit');?>">문서 편집</a></div><div class="shortcut">E / W</div></li>
				<li><div class="menuItem"><a href="<?php echo $this->link_url($this->page->name.'?action=diff');?>">전 버전과 비교</a></div><div class="shortcut">D</div></li>
				<li><div class="menuItem"><a href="<?php echo $this->link_url($this->page->name.'?action=info');?>">문서 정보</a></div><div class="shortcut">I</div></li>
				<li><div class="menuItem"><a href="<?php echo $this->link_url($this->page->name.'?action=show');?>">문서 읽기</a></div><div class="shortcut">R</div></li>
				<li><div class="menuItem"><a href="<?php echo $this->link_url($this->page->name.'?action=print');?>">문서 인쇄</a></div><div class="shortcut">P</div></li>
				<hr>
				<li id="CreatePageMenu"><div class="menuItem">새 문서</div><div class="shortcut">N</div></li>
				<li><div class="menuItem"><a href="<?php echo $this->link_url($this->page->name.'?action=rename');?>">문서 제목 수정</a></div></li>
				<li><div class="menuItem"><a href="<?php echo $this->link_url($this->page->name.'?action=DeletePage');?>">문서 삭제</a></div></li>
<?php if ( is_dir($DBInfo->upload_dir."/".$DBInfo->pageToKeyname($this->page->name)) ) { ?>
				<li><div class="menuItem"><a href="<?php echo $this->link_url($this->page->name.'?action=UploadedFiles');?>">첨부파일 관리</a></div></li>
<?php } ?>
				<!--<li><div class="menuItem"><a href="<?php echo $this->link_url('?action=scrap');?>"><del>스크랩</del></a></div></li> 이미 즐겨찾기쪽에 있다.-->
				<li><div class="menuItem"><a href="<?php echo $this->link_url($this->page->name.'?action=keywords');?>">키워드 추가</a></div><div class="shortcut">K</div></li>
				<li><div class="menuItem"><a href="<?php echo $this->link_url($this->page->name.'?action=bookmark');?>">북마크</a></div><div class="shortcut">B</div></li>
			</ul>
		</li>
<!-- 계정 메뉴 -->
		<li>
			<div class="mainMenuItem">계정(<u><?php echo $menuIndex++;?></u>)</div>
			<ul class="MenuPanel" style="width:150px;">
<?php if ( $DBInfo->user->id == 'Anonymous' ) { ?>
				<li id="LogInMenu"><div class="menuItem">로그인</div><div class="shortcut">G</div></li>
				<li><div class="menuItem"><a href="UserPreferences">사용자 등록</a></div></li>
<?php } else { ?>
				<li><div class="menuItem"><a href="<?php echo $this->link_url($this->page->name.'?action=home');?>">내 페이지</a></div><div class="shortcut">H</div></li>
				<li><div class="menuItem"><a href="<?php echo $this->link_url('UserPreferences');?>">환경설정</a></div><div class="shortcut">U</div></li>
				<li><div class="menuItem"><a href="<?php echo $this->link_url($this->page->name.'?action=login&status=logoff');?>">로그아웃</a></div><div class="shortcut">G</div></li>
<?php } ?>
			</ul>
		</li>
<!-- 즐겨찾기 메뉴. config.php에서 $use_scrap=1이어야 하고, 로긴해 있어야 한다. -->
<?php
if ($DBInfo->use_scrap && $DBInfo->user->id != 'Anonymous') {
	echo "		<li>\n";
	echo "			<div class='mainMenuItem'>즐겨찾기(<u>".$menuIndex."</u>)</div>\n";
	echo "			<ul class='MenuPanel' style='min-width:170px; width:170px;'>\n";
	$isScrapped = false;
	$menuIndex += 1;
	
	$list = explode("\t",$DBInfo->user->info['scrapped_pages']);
	sort($list);
	for ( $i = 0; $i < count( $list ); $i++ )
	{
		$item = $list[$i];
		if ( !$DBInfo->hasPage($item) ) continue;
		if ( $item == $this->page->name ) $isScrapped = true;
		
		$out = "				";
		$out = $out."<li><div class='menuItem'>";
		$out = $out."<a href='".$this->link_url($item)."'>".$item."</a>";
		$out = $out."</div>";
		$out = $out."</li>\n";
		
		echo $out;
	}
	if ( count( $list ) > 0 )
		echo "				<hr>\n";
	if ( !$isScrapped )
		echo "				<li><div calss='menuItem'><a href=".$this->link_url($this->page->name.'?action=scrap')." style='color:white;'>현 문서 즐겨찾기 추가</a></div></li>\n";
	else
		echo "				<li><div calss='menuItem'><a href=".$this->link_url($this->page->name.'?action=scrap&unscrap=1')." style='color:white;'>현 문서 즐겨찾기 삭제</a></div></li>\n";
		echo "			</ul>\n";
		echo "		</li>\n";
}
?>
<!-- 바뀐 글 메뉴 -->
<?php
	echo "		<li>\n";
	echo "			<div class='mainMenuItem'>바뀐글(<u>".$menuIndex."</u>)</div>\n";
	echo "			<ul class='MenuPanel' style='width:170px;'>\n";
	$menuIndex += 1;
	$list = array();
	$count = 0;
	foreach ( $DBInfo->editlog_raw_lines(30,null) as $line )
	{
		$parts = explode("\t", $line, 6 );
		$list[$DBInfo->keyToPagename($parts[0])] = 1;
	}
	foreach ( array_keys($list) as $item )
	{
		$count++;
		echo "				<li><div calss='menuItem'><a href='".$this->link_url($item)."' style='color:white;'>".$item."</a></div></li>\n";
		if ( $count > 10 ) break;
	}
	echo "				<hr>\n";
	echo "				<li><div class='menuItem'><a href='".$this->link_url("RecentChanges")."'>바뀐 문서 목록</a></div><div class='shortcut'>C</div></li>\n";
	echo "			</ul>\n";
	echo "		</li>\n";
?>
		<li>
			<div class="mainMenuItem">도움말(<u><?php echo $menuIndex++;?></u>)</div>
			<ul class="MenuPanel" style="width:150px;">
				<li id="ShortcutMenu"><div class="menuItem">단축키 목록</div></li>
				<li id="WikiGrammarMenu"><div class="menuItem">위키 기본 문법</div></li>
				<li><div class="menuItem"><a href="<?php echo $this->link_url('SystemInfo');?>">환경 정보</a></div></li>
			</ul>
		</li>
	</ul>
	<form id='SearchBox' method='get'>
		<div>
			<input type='text' name='value' onFocus='searchBoxFocused=true;' onBlur='searchBoxFocused=false;'/>
			<input type='submit' name='status' id='SearchBoxSubmit' value=''/>
			<input type='hidden' name='action' value='fullsearch' />
			<input type='hidden' name='context' value='1' />
		</div>
	</form>
</div>

<div id='wikiMain' onClick='closeAll();'>
	<div id='wikiHeader'>
		<?php echo $title?>
	</div>
	<?php echo $msg?>