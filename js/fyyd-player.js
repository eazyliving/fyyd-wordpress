function fyydGetEpisodePlayer(byType,episode_id,podcast_id,boxid,color) {
		
	var params = {};
	
	if (episode_id=='latest') {
		
		if (byType=='podcast_id') {
			params['podcast_id']=podcast_id;
		} else {
			params['podcast_slug']=podcast_id;
		}
		
		fyydCallAPI('podcast/episodes',params).then(function(json) {
			
			if (json.msg=='error') {
				fyyd_display_error(boxid,'cannot find podcast '+podcast_id);
				return;
			}
			
			var podcast = json['data'];
			var episode = json['data']['episodes'][0];
			
			if (color=='podcast') {
				var textcolor = podcast['tcolor'];
				var bgcolor = podcast['color'];
			} else {
				var textcolor = fyyd_contrastColor(color);
				var bgcolor = color;
			}
			
			fyydPutInfoBoxEpisodePlayer(boxid,episode,podcast,bgcolor);
	
		
		});
		
	} else {
		
		params['episode_id']=episode_id;
		fyydCallAPI('episode',params).then(function(json) {
			
			if (json.msg=='error') {
				fyyd_display_error(boxid,'cannot find episode '+episode_id);
				return;
			}
			
			var episode = json['data'];
			
			params['podcast_id']=episode['podcast_id'];
			
			fyydCallAPI('podcast',params).then(function(json) {
			
				var podcast=json['data'];
				
				if (color=='podcast') {
					var textcolor = podcast['tcolor'];
					var bgcolor = podcast['color'];
				} else {
					var textcolor = fyyd_contrastColor(color);
					var bgcolor = color;
				}
			
			
				fyydPutInfoBoxEpisodePlayer(boxid,episode,podcast,bgcolor);
	
				
			})
		});
	}
			
	
}

function fyydPutInfoBoxEpisodePlayer(boxid,episode,podcast,bgcolor) {
		
		var settings = new Object();
		settings.title = episode['title'];
		settings.link = episode['url'];
		settings.summary = episode['description'];
		settings.post = episode['imgURL'];
		settings.show = new Object();
		settings.show.title = podcast['title'];
		settings.show.poster = podcast['layoutImageURL'];
		settings.show.url = podcast['htmlURL'];
		settings.visibleComponents =  ["tabInfo","tabChapters","tabAudio","poster","showTitle","episodeTitle","subtitle","progressbar","controlSteppers","controlChapters"];
		settings.duration = episode['duration_string'];
		settings.reference = {"base":"/wp-content/plugins/fyyd-podcast-shortcodes/pwp/"};
		settings.chapters = episode['chapters'];
		settings.audio=[
				{ url:episode['enclosure'],mimeType: "audio/mp3"}
		];
		
		if (bgcolor!='') {
			settings.theme = {"main" : bgcolor };
		}
		
		podlovePlayer("#fyyd-"+boxid, settings)
		
	
	
}
