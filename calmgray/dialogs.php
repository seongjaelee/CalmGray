

<div id='DialogShortcut' class='dialog' style='display: none;'>
	<h1>단축키 목록</h1>
	<table style='width:500px;'>
		<thead>
			<tr>
				<th>단축키</th>
				<th>설명</th>
				<th>영어</th>
			</tr>
		</thead>
		<tbody>
			<tr><td>A</td><td>임의 문서로 이동</td><td>Random Page</td></tr>
			<tr><td>B</td><td>문서 북마크</td><td>Bookmark</td></tr>
			<tr><td>C</td><td>바뀐 문서 목록</td><td>Recent Changes</td></tr>
			<tr><td>D</td><td>문서 이전 버전과 비교</td><td>Diff</td></tr>
			<tr><td>E</td><td>문서 고치기</td><td>Edit</td></tr>
			<tr><td>F</td><td>대문</td><td>Front Page</td></tr>
			<tr><td>G</td><td>로그인/로그아웃</td><td>Log In/Log Out</td></tr>
			<tr><td>H</td><td>내 페이지</td><td>Homepage</td></tr>
			<tr><td>I</td><td>문서 정보</td><td>Info</td></tr>
			<tr><td>K</td><td>문서 키워드 추가</td><td>Keyword</td></tr>
			<tr><td>L</td><td>유사 문서 목록</td><td>Similar Pages</td></tr>
			<tr><td>N</td><td>새 문서</td><td>New</td></tr>
			<tr><td>P</td><td>문서 인쇄</td><td>Print</td></tr>
			<tr><td>R</td><td>문서 보기</td><td>Show</td></tr>
			<tr><td>S</td><td>본문 검색</td><td>Full Search</td></tr>
			<tr><td>T</td><td>문서 목록</td><td>Title Index</td></tr>
			<tr><td>U</td><td>환경 설정</td><td>User Preferences</td></tr>
			<tr><td>W</td><td>문서 고치기</td><td>Edit</td></tr>
			<tr><td>,</td><td>바로 가기</td><td>Goto</td></tr>
			<tr><td>.</td><td>제목 검색</td><td>Title Search</td></tr>
			<tr><td>Ctrl+S</td><td>문서 저장 (문서 수정 모드에서)</td><td>Save</td></tr>
		</tbody>
	</table>
	<div class='footer'>
		<input type='button' value='닫기' onClick='$.modal.close();'>
	</div>
</div>

<div id='DialogWikiGrammar' class='dialog' style='display: none;'s>
	<style>#DialogWikiGrammar pre {padding:0; margin:0;}</style>
	<h1>위키 기본 문법</h1>
	<table style='width:600px;'>
		<thead>
			<tr><th>문법</th><th>위키</th><th>HTML</th><th>예시</th></tr>
		</thead>
		<tbody>
			<tr><td>굵게</td>	<td>'''내용'''</td><td>&lt;b&gt;내용&lt;/b&gt;</td><td><b>내용</b></td></tr>
			<tr><td>기울여</td><td>''내용''</td><td>&lt;b&gt;내용&lt;/b&gt;</td><td><i>내용</i></td></tr>
			<tr><td>밑줄</td><td>__내용__</td><td>&lt;u&gt;내용&lt;/u&gt;</td><td><u>내용</u></td></tr>
			<tr><td>색깔</td><td>{{{#FF00DD 내용}}}</td><td>&lt;font color=#FF00DD&gt;내용&lt;/font&gt;</td><td><span style='color:#FF00DD;'>내용</span></td></tr>
			<tr><td>삭제</td><td>~~내용~~</td><td>&lt;del&gt;내용&lt;/del&gt;</td><td><del>내용</del></td></tr>
			<tr><td>대제목</td><td>== 내용 ==</td><td>&lt;h2&gt;내용&lt;/h2&gt;</td><td></td></tr>
			<tr><td>중제목</td><td>=== 내용 ===</td><td>&lt;h3&gt;내용&lt;/h3&gt;</td><td></td></tr>
			<tr><td>소제목</td><td>==== 내용 ====</td><td>&lt;h4&gt;내용&lt;/h4&gt;</td><td></td></tr>
			<tr><td>수평선</td><td>----</td><td>&lt;hr&gt;</td><td><hr></td></tr>
			<tr><td>링크</td><td>[[FrontPage]]</td><td>&lt;a href=FrontPage&gt;FrontPage&lt;/a&gt;</td><td><a href='FrontPage'>FrontPage</a></td></tr>
			<tr><td>링크</td><td>[[wiki:FrontPage Page]]</td><td>&lt;a href=FrontPage&gt;Page&lt;/a&gt;</td><td><a href='FrontPage'>Page</a></td></tr>
			<tr><td>링크</td><td>[[http://naver.com Naver]]</td><td>&lt;a href=http://naver.com&gt;Naver&lt;/a&gt;</td><td><a href='http://naver.com'>Naver</a></td></tr>
			<tr><td>공백태그</td><td>{{{내용}}}</td><td>&lt;pre&gt;내용[탭]내용&lt;/pre&gt;</td><td><pre>내용	내용</pre></td></tr>
			<tr><td>HTML</td><td>{{{#!HTML<br>내용}}}</td><td>{{{#!HTML<br>&lt;b&gt;내용&lt;/b&gt;}}}</td><td><b>내용</b></td></tr>
			<tr><td>총알 리스트</td><td>[공백]* 내용</td><td>&lt;ul&gt;&lt;li&gt;내용&lt;/li&gt;&lt;/ul&gt;</td><td><ul><li>내용</li></ul></td></tr>
			<tr><td>번호 리스트</td><td>[공백]1. 내용</td><td>&lt;ol&gt;&lt;li&gt;내용&lt;/li&gt;&lt;/ol&gt;</td><td><ol><li>내용</li></ol></td></tr>
			<tr><td>표</td><td>||좌측정렬 || 중앙정렬 || 우측정렬||</td><td></td><td></td></tr>
			<tr><td>목차</td><td>[[TableOfContents]]</td><td></td><td></td></tr>
			<tr><td>답글창</td><td>[[Comments]]</td><td></td><td></td></tr>
		</table>
	<div class='footer'>
		<input type='button' value='닫기' onClick='$.modal.close();'>
	</div>
</div>

<div id='DialogCreatePage' class='dialog' style='display: none;'>
	<h1>문서 생성</h1>
	<script type="text/javascript">
		$(document).ready( function() {
			$("#DialogCreatePageForm").submit( function () {
				$('#DialogCreatePageForm').attr('action', getWikiSiteLink( $("#DialogCreatePageName").attr('value') ) + '?action=edit'); $('#DialogCreatePageForm').submit();
			} );
		} );
	</script>
	<form id='DialogCreatePageForm'>
		<input type='text' id='DialogCreatePageName' style='width:100px; display:block; width:300px; font-size: 2em;'>
		<input type='hidden' name='action' value='edit'>
		<div class='footer'>
			<input type='submit' value='생성'>
			<input type='button' value='닫기' onClick='$.modal.close();'>
		</div>
	</form>
</div>

<div id='DialogSearchTitle' class='dialog' style='display: none;'>
	<h1>제목 검색</h1>
	<form method='get'>
		<input type='hidden' name='action' value='titlesearch'>
		<input type='text' name='value' style='width:100px; display:block; width:300px; font-size:2em;'>
		<div style='text-align:right; padding:10px 0;'>
			<input type='submit' value='이동'>
			<input type='button' value='닫기' onClick='$.modal.close();'>
		</div>
	</form>
</div>

<div id='DialogGoto' class='dialog' style='display: none;'>
	<h1>바로 가기</h1>
	<script type="text/javascript">
	$(document).ready( function() {
		$("#DialogGotoForm").submit( function () { $("#DialogGotoACtion").attr('value', $("#DialogGotoName").attr('value')); } );
	});
	</script>
	<form id='DialogGotoForm'>
		<input type='text' id='DialogGotoName' name='value' style='width:100px; display:block; width:300px; font-size: 2em;'>
		<div style='text-align:right; padding:10px 0;'>
			<input type='hidden' id='DialogGotoAction' name='action' value=''>
			<input type='submit' value='이동'>
			<input type='button' value='닫기' onClick='$.modal.close();'>
		</div>
	</form>
</div>

<div id='DialogSearch' class='dialog' style='display: none;'>
	<h1>본문 검색</h1>
	<script type="text/javascript">
	$(document).ready( function() {
		$("#DialogSearchForm").submit( function () {
			$('#DialogSearchForm').attr('action', getWikiSiteLink( 'FrontPage' ) + '?action=fullsearch&value=' + $("#DialogSearchText").attr('value') + '&context=1' );
			$('#DialogSearchForm').submit();
		} );
	} );
	</script>
	<form id='DialogSearchForm'>
		<input type='hidden' name='action' value='fullsearch'>
		<input id='DialogSearchText' type='text' name='value' style='width:100px; display:block; width:300px; font-size: 2em;'>
		<input type='hidden' name='context' value='1'>
		<div class='footer'>
			<input type='submit' value='검색'>
			<input type='button' value='닫기' onClick='$.modal.close();'>
		</div>
	</form>
</div>

<div id='DialogLogIn' class='dialog' style='display: none;'>
<?php if ( $DBInfo->user->id == 'Anonymous' ) { ?>
	<h1>로그인</h1>
	<form method='post' action='UserPreferences'>
		<input type="hidden" name="action" value="userform" />
		<label>아이디</label>
		<input type='text' name='login_id' style='width:100px; display:block; width:300px; font-size: 2em;'>
		<label>비밀번호</label>
		<input type='password' name='password' style='width:100px; display:block; width:300px; font-size: 2em;'>
		<div class='footer'>
			<input type='submit' value='로그인'>
			<input type='button' value='닫기' onClick='$.modal.close();'>
		</div>
	</form>
<?php } else { ?>
	<h1>로그 아웃</h1>
	<form method='post' action='UserPreferences'>
		<input type="hidden" name="action" value="login" />
		<input type="hidden" name="status" value="logoff" />
		<div style='text-align:right; padding: 10px 0; width:300px;'>
			<input type='submit' value='로그아웃'>
			<input type='button' value='닫기' onClick='$.modal.close();'>
		</div>
	</form>
<?php } ?>
</div>