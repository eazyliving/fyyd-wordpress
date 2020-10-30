=== fyyd podcast shortcodes ===
Contributors: c.bednarek
Tags: fyyd, podcast, audio-player
Requires at least: 5.0
Tested up to: 5.2
Requires PHP: 5.4
Stable tag: 0.3.1
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Adds shortcodes to promote and display information about podcasts and their episodes including an HTML5 audioplayer.
 
== Description ==
 
Blogging about podcasts is a thing now. Of course it's good practice to link to the podcast's website and include some additional information, maybe inside an information block.

This plugin provides shortcodes to display podcasts' information inside your blogposts. This includes general information about the podcast and single episodes' information, including the option of an HTML5 audioplayer for those episodes. In addition there are infoboxes for collections and curations.  

To get the data needed, the plugin makes use of podcasts' data provided by fyyd.de, a podcast directory and service point. fyyd's API (https://github.com/eazyliving/fyyd-api) is the interface to all those podcasts.

All displayed content is dynamically fetched by the clients browser, there's no server-side action/caching/etc...

This plugin provides shortcodes to include infoboxes for

= Podcasts =

`[fyyd-podcast podcast_id=57585]`
`[fyyd-podcast podcast_slug=silence]`
`[fyyd-podcast podcast_slug=silence color=#008000]`
`[fyyd url=https://fyyd.de/podcast/silence]`

= episodes (optional with HTML5 audioplayer) =

`[fyyd-episode episode_id=3970971]`
`[fyyd-episode episode_id=latest podcast_slug=silence]`
`[fyyd-episode episode_id=3970971 color=#008000]`
`[fyyd-episode podcast_slug=anerzaehlt player=true]`
`[fyyd url=https://fyyd.de/episode/3989950]`

You can set episode_id to "latest" or leave it out to provide the latest episode published. In this case you have to provide the podcast_id or podcast_slug of the podcast. 

For podcasts and episode you can provide a background color (#rrggbb). Default when left out is the dominant color of the podcast's logo.

= curations (custom feeds with episodes from different podcasts) =

`[fyyd url=https://fyyd.de/user/eazy/curation/33c3-picks]`

= collections (podcasts collected under a certain topic) =
	
`[fyyd url=https://fyyd.de/user/eazy/collection/zeitungs-podcast?page=0&matrix=1]`

To create and manage curations and collections, you need to have an account at [fyyd.de](https://fyyd.de). 

== Installation ==
 
1. Upload the contents of the plugins zip-archive to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress

== Frequently Asked Questions ==
 
Does this plugin require some kind of authentification for the API?
	No, the API-requests used are open to all without any authentification.

 
== Changelog ==

= 0.3.1 =
fixed an issue with css loaded in admin backend

= 0.3 =
added the fyyd shortcode to easily embed podcasts, episodes, curations and collections by url

= 0.2 =
fixed a conflict between podlove player and lodash, resulting in breaking gutenberg blocks of foreign plugins
 
= 0.1 =
* Initial release