<?php

defined('ABSPATH') or die("Thanks for visting");

/**
* Plugin Name:  fyyd podcast shortcodes
* Plugin URI: https://fyyd.de/wordpress
* Description: this plugin adds shortcodes to present, link and promote podcasts with the help of fyyd's podcast directory
* Version: 0.3.1
* Author: Christian Bednarek
* Author URI: https://fyyd.de
* License: GPL2
* License URI:  https://www.gnu.org/licenses/gpl-2.0.html
* Text Domain:  fyyd-podcast-shortcodes
*/

wp_enqueue_script('fyyd-helper', plugins_url( '/js/helper.js', __FILE__ ) , array('jquery'), null, true);
wp_enqueue_script('fyyd-api', plugins_url( '/js/fyyd-api.js', __FILE__ ) , array('jquery'), null, true);
wp_enqueue_script('fyyd-infoboxes', plugins_url( '/js/fyyd-infoboxes.js', __FILE__ ) , array('jquery'), null, true);
wp_enqueue_script('fyyd-player', plugins_url( '/js/fyyd-player.js', __FILE__ ) , array('jquery'), null, true);
wp_enqueue_script('fyyd-podlove-player', plugins_url( '/pwp/embed.js', __FILE__ ) , array('jquery'), null, true);

if(!is_admin())
	wp_enqueue_style( 'fyyd-css',  plugins_url( '/css/fyyd.css', __FILE__ ) ,array(),false,'all');

wp_enqueue_script('uikit-js', plugins_url( '/js/uikit.min.js', __FILE__ ) , array('jquery'), null, true);

if(!is_admin())
	wp_enqueue_style( 'uikit-css',  plugins_url( '/css/uikit.min.css', __FILE__ ) ,array(),false,'all');



function fyyd_podcast( $atts, $content, $tag ) {
	
	/*
	*
	* displays a banner/widget for a podcast
	*
	* input: 
	*	- podcast_id (the id by which this podcast is identified at fyyd.de 
	*	- or podcast_slug (the slug by which this podcast is identified at fyyd.de
	*	- color as hex notification or 'podcast' (if 'podcast' then takes this podcast dominant color - taken from logo)
	*/
	
	if (isset($atts['podcast_id'])) {

		$byType='podcast_id';
		$pid = $atts['podcast_id'];
	
	} elseif (isset($atts['podcast_slug'])) {
	
		$byType='podcast_slug';
		$pid = $atts['podcast_slug'];
	
	} else {
	
		return fyyd_display_error('no podcast_id or podcast_slug provided',$atts,$tag);
	}
	
	$color = (  (isset($atts['color'])  && trim($atts['color']!='') && strtolower($atts['color'])!='undefined')  ? $atts['color']:'podcast');
	$boxid = $pid.rand(0,123456789);
	
	$args = "'" . implode ( "', '", array ( $byType,$pid,$boxid,$color ) ) . "'";
	
	return '<div id="fyyd-'.$boxid.'" class="fyyd-podcast-info"></div>'.'<script type="text/javascript">jQuery(document).ready(function($) { fyydGetPodcast('.$args.');});</script>';
}


function fyyd_collection( $atts, $content, $tag ) {
	
	/*
	*
	* displays a banner/widget for a collection
	*
	* input: 
	*	- collection_id (the id by which this collection is identified at fyyd.de 
	*	- color as hex notification or 'collection' (if 'collection' then takes this collections dominant color - taken from logo)
	*/
	
	if (isset($atts['podcast_id'])) {

		$byType='podcast_id';
		$pid = $atts['podcast_id'];
	
	} elseif (isset($atts['podcast_slug'])) {
	
		$byType='podcast_slug';
		$pid = $atts['podcast_slug'];
	
	} else {
	
		return fyyd_display_error('no podcast_id or podcast_slug provided',$atts,$tag);
	}
	
	$color = (  (isset($atts['color'])  && trim($atts['color']!='') && strtolower($atts['color'])!='undefined')  ? $atts['color']:'podcast');
	$boxid = $pid.rand(0,123456789);
	
	$args = "'" . implode ( "', '", array ( $byType,$pid,$boxid,$color ) ) . "'";
	
	return '<div id="fyyd-'.$boxid.'" class="fyyd-podcast-info"></div>'.'<script type="text/javascript">jQuery(document).ready(function($) { fyydGetPodcast('.$args.');});</script>';
}

function fyyd( $atts, $content, $tag ) {
	
	/*
	*	simple shortcode to create an infobox just by the URL of the resource. Works with episodes and podcasts.
	*	
	*	input:
	*	- url (https://fyyd.de/....)
	*	- color (custom #RRGGBB or 'podcast' as default)
	*/
	
	
	if (!isset($atts['url'])) 
		return fyyd_display_error('please provide an url to the resource at fyyd.de',$atts,$tag);
			
	
	$url = parse_url($atts['url']);
	
	$parts = explode('/',$url['path']);
	
	$tax = strtolower ( $parts[1] );
	$id = strtolower ( $parts[2] );

	$color = (  (isset($atts['color'])  && trim($atts['color']!='') && strtolower($atts['color'])!='undefined')  ? $atts['color']:'podcast');

	if ($tax == 'podcast') {
		
		if (is_numeric($id)) {
			$pid=$id;
			$byType="podcast_id";
		} else {
			$byType="podcast_slug";
			$pid=$id;
		}
		
		$boxid = $pid.rand(0,123456789);
		
		$args = "'" . implode ( "', '", array ( $byType,$pid,$boxid,$color ) ) . "'";
		
		return '<div id="fyyd-'.$boxid.'" class="fyyd-podcast-info"></div>'.'<script type="text/javascript">jQuery(document).ready(function($) { fyydGetPodcast('.$args.');});</script>';
	}
	
	if ($tax == 'episode') {
		
		$eid=$id;
		$pid='';
		
		$boxid = $eid.rand(0,123456789);
		
		$args = "'" . implode ( "', '", array ( $byType,$eid,$pid,$boxid,$color ) ) . "'";

		if (!isset($atts['player']))
			return '<div id="fyyd-'.$boxid.'" class="fyyd-podcast-info"></div>'.'<script type="text/javascript">jQuery(document).ready(function($) { fyydGetEpisode('.$args.');});</script>';
		else
			return '<div id="fyyd-'.$boxid.'" class="fyyd-podcast-info"></div>'.'<script type="text/javascript">jQuery(document).ready(function($) { fyydGetEpisodePlayer('.$args.');});</script>';
	}
	
	if ($parts[3] == 'collection') {
		
		$boxid = $eid.rand(0,123456789);
		
		$args = "'" . implode ( "', '", array ( $atts['url'],$boxid,$color ) ) . "'";

	
		return '<div id="fyyd-'.$boxid.'" class="fyyd-podcast-info"></div>'.'<script type="text/javascript">jQuery(document).ready(function($) { fyydGetCollection('.$args.');});</script>';
		
	}
	
	if ($parts[3] == 'curation') {
		
		$boxid = $eid.rand(0,123456789);
		
		$args = "'" . implode ( "', '", array ( $atts['url'],$boxid,$color ) ) . "'";

	
		return '<div id="fyyd-'.$boxid.'" class="fyyd-podcast-info"></div>'.'<script type="text/javascript">jQuery(document).ready(function($) { fyydGetCuration('.$args.');});</script>';
		
	}
}

function fyyd_episode( $atts, $content, $tag ) {
	
	/*
	*
	* displays a banner/widget for an episode
	* optional as an HTML5 audioplayer
	*
	* input: 
	*	- episode_id (the id by which this episodeis identified at fyyd.de)
	*	- podcast_id or podcast_slug if episode is left out or "latest"
	*	- color as hex notification or 'podcast' (if 'podcast' then takes this podcast dominant color - taken from logo)
	*/
	
	if (isset($atts['podcast_id'])) {

		$byType='podcast_id';
		$pid = $atts['podcast_id'];
		$eid = 'latest';
		
	} elseif (isset($atts['podcast_slug'])) {
	
		$byType='podcast_slug';
		$pid = $atts['podcast_slug'];
		$eid = 'latest';
		
	} else {
		
		$pid = '';

		if (isset($atts['episode_id']))
			$eid = $atts['episode_id'];
		else 
			return fyyd_display_error('no episode_id or podcast_id|podcast_slug provided.',$atts,$tag);
			
	}
	$color = (  (isset($atts['color'])  && trim($atts['color']!='') && strtolower($atts['color'])!='undefined')  ? $atts['color']:'podcast');
	$boxid = $eid.rand(0,123456789);
	
	
	$args = "'" . implode ( "', '", array ( $byType,$eid,$pid,$boxid,$color ) ) . "'";
	
	if (!isset($atts['player']))
		return '<div id="fyyd-'.$boxid.'" class="fyyd-podcast-info"></div>'.'<script type="text/javascript">jQuery(document).ready(function($) { fyydGetEpisode('.$args.');});</script>';
	else
		return '<div id="fyyd-'.$boxid.'" class="fyyd-podcast-info"></div>'.'<script type="text/javascript">jQuery(document).ready(function($) { fyydGetEpisodePlayer('.$args.');});</script>';
}

function fyyd_display_error($msg,$atts,$tag) {
	
	$vals = '';
	foreach ($atts as $key=>$val)
		$vals.=' '.$key.'='.$val;
	
	return '<div class="fyyd-error-message"><p>'.$msg.'</p><p><code>['.$tag.' '.$vals.'</code>]</p></div>';
	
}



add_shortcode( 'fyyd-podcast', 'fyyd_podcast' );
add_shortcode( 'fyyd-episode', 'fyyd_episode' );
add_shortcode( 'fyyd', 'fyyd' );

function fyyd_episode_comments( $atts, $content, $tag ) {
	
	/*
	*
	* displays the comments for an episode
	*
	* input: 
	*	- episode_id (the id by which this episodeis identified at fyyd.de)
	*	
	* coming with 0.5
	
	if (isset($atts['episode_id']))
		$eid = $atts['episode_id'];
	else
		return fyyd_display_error('no episode_id provided',$atts,$tag);
	
	$boxid = $eid.rand(0,123456789);
	
	$args = "'" . implode ( "', '", array ( $eid,$boxid ) ) . "'";
	
	return '<div id="fyyd-episode-comments-'.$boxid.'" class="fyyd-episode-comments"></div>'.'<script type="text/javascript">jQuery(document).ready(function($) { fyydGetEpisodeComments("'.$args.'");});</script>';
	
	*/
}

/*
function fyyd_gutenberg_register() {
    wp_register_script(
        'fyyd-gutenberg',
        plugins_url( 'js/fyyd-gutenberg.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element' ,'wp-editor')
    );
 
    register_block_type( 'fyyd/episode', array(
		'title'=>'fyyd',
        'editor_script' => 'fyyd-gutenberg',
		'icon'=>'fyydIcon'
    ) );
 
}

function fyyd_gutenberg_category( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'fyyd',
				'title' => __( 'fyyd', 'fyyd' ),
			),
		)
	);
}

add_filter( 'block_categories', 'fyyd_gutenberg_category', 10, 2);
add_action( 'init', 'fyyd_gutenberg_register' );
*/
# add_shortcode( 'fyyd-episode-comments', 'fyyd_episode_comments' ); 
# coming soon!
