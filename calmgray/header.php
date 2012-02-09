<?php
# Copyright 2010 Seong Jae Lee <seongjae at gmail dot com>
# All rights reserved. Distributable under GPL
# MoniWiki Theme
/**
 * @author  Seong Jae Lee <seongjae at gmail dot com>
 * @date    2010-07-11
 * @name    CalmGray
 * @desc    MoniWiki Theme
 * @version	1.0
 * @license GPL
 */
 
	include_once("plugin/login.php");
	$login=macro_login($this);
?>

 <div id="title">
	<div style="float:left;">
		<?php 
			echo $DBInfo->sitename;
		  if ($DBInfo->site_description) echo '<div id="siteDescription">'.$DBInfo->site_description.'</div>';
		?>
	</div>
	<div id='wikiIcon'>
		<?php echo $icons?>
	</div>
</div>

<form id="wikiGoto" method="get" action="/moniwiki/wiki.php/FindPage" onsubmit="moin_submit(this);">
	<input type="text" name="value" size="20" accesskey="s" class="text">
	<input type="hidden" name="action" value="goto">
</form>
<?php echo $menu?>

<div style='height:10px;'></div>

<div id='wikiMain'>
<div id='wikiHeader'>
	<?php echo $title?>
</div>
<?php echo $msg?>
