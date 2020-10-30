/************************
*
*	Podcast Infobox
*
**************************/

function fyydGetPodcast(byType,podcast_id,boxid,color) {
	
	fyyd_spinner(boxid);	
	
	var params = {};
	
	if (byType=='podcast_id') {
		params['podcast_id']=podcast_id;
	} else {
		params['podcast_slug']=podcast_id;
	}
	
	
	fyydCallAPI('podcast',params).then(function(json) {
		
		if (json.msg=='error') {
			fyyd_display_error(boxid,'cannot find podcast '+podcast_id);
			return;
		}
		
		var podcast = json['data'];
		
		if (color=='podcast') {
			var textcolor = podcast['tcolor'];
			var bgcolor = podcast['color'];
		} else {
			var textcolor = fyyd_contrastColor(color);
			var bgcolor = color;
		}
		
		fyydPutInfoBoxPodcast(boxid,podcast,bgcolor,textcolor);
		
	});
	
}

function fyydPutInfoBoxPodcast(boxid,podcast,bgcolor,textcolor) {
	
	var out = '\
		<div class="container-fyyd" style="background-color:'+bgcolor+'">\
			<div class="uk-grid">\
				<div class="uk-width-small-1-1 uk-width-1-3">\
					<a href="'+podcast['htmlURL']+'"><img class="fyyd-podcast-image" src="'+podcast['smallImageURL']+'"></a>\
				</div>\
				<div class="uk-width-small-1-1 uk-width-2-3">\
					<h4><a style="color:'+textcolor+'" href="'+podcast['htmlURL']+'">'+podcast['title']+'</a></h4>\
					<div style="color:'+textcolor+'">'+wordTrim(podcast['description'],150)+'</div>\
				</div>\
			</div>\
			<div class="uk-text-right uk-width-1-1" style="margin-top:0.5rem">\
				<small><a style="color:'+textcolor+'" href="'+podcast['url_fyyd']+'"><i>'+podcast['title']+'</i> on fyyd.de</a></small>\
			</div>\
		</div>';
	
	jQuery('#fyyd-'+boxid).html(
		out
	);
	
}

/************************
*
*	Collection Infobox
*
**************************/

function fyydGetCollection(url,boxid,color) {
	
	fyyd_spinner(boxid);
	
	var params = {};
	
	params['collection_url']=encodeURI(url);
	
	fyydCallAPI('collection/podcasts',params).then(function(json) {
		
		if (json.msg=='error') {
			fyyd_display_error(boxid,'cannot find collection at '+url);
			return;
		}
		
		var collection = json['data'];
		
		var textcolor = '#000';
		var bgcolor = '#ddd';
		
	
		fyydPutInfoBoxCollection(boxid,collection,bgcolor,textcolor);
		
	});
	
}


function fyydPutInfoBoxCollection(boxid,collection,bgcolor,textcolor) {
	
	var out = '\
		<div class="container-fyyd" style="background-color:'+bgcolor+'">\
			<div class="uk-grid">\
				<div class="uk-width-small-1-1 uk-width-1-3">\
					<a href="'+collection['url']+'"><img class="fyyd-podcast-image" alt="'+collection['title']+'" src="'+collection['smallImageURL']+'"></a>\
				</div>\
				<div class="uk-width-small-1-1 uk-width-2-3" >\
						<h4><a style="color:'+textcolor+'" href="'+collection['url']+'">'+collection['title']+'</a></h4>\
						<div style="color:'+textcolor+'">'+wordTrim(collection['description'],150)+'</div>\
				</div>\
			</div>\
			<div class="uk-grid uk-grid-width-small-1-2 uk-grid-width-medium-1-4 uk-grid-width-large-1-6 uk-grid-width-xlarge-1-6" style="max-height:320px;overflow-y:scroll" data-uk-grid-margin>\
	';

	collection['podcasts'].forEach( function(podcast,index,array) {
		out = out+'\
				<div>\
					<a href="'+podcast['url_fyyd']+'"><img alt="'+podcast['title']+'" width=100 src="'+podcast['smallImageURL']+'"></a>\
				</div>\
		';
	});
					
	var out=out+'\
			</div>\
			<div class="row-fyyd" style="margin-top:0.5rem">\
				<div class="uk-text-right uk-width-1-1">\
					<small><a style="color:'+textcolor+'" href="'+collection['url']+'"><i>'+collection['title']+'</i> on fyyd.de</a></small>\
				</div>\
			</div>\
		</div>';
	
	jQuery('#fyyd-'+boxid).html(
		out
	);
	
}

/************************
*
*	Curation Infobox
*
**************************/

function fyydGetCuration(url,boxid,color) {


	fyyd_spinner(boxid);
	
	var params = {};
	
	params['curation_url']=encodeURI(url);
	
	fyydCallAPI('curation/episodes',params).then(function(json) {
		
		if (json.msg=='error') {
			fyyd_display_error(boxid,'cannot find curation at '+url);
			return;
		}
		
		var curation = json['data'];
		
		var textcolor = '#000';
		var bgcolor = '#ddd';
		
		fyydPutInfoBoxCuration(boxid,curation,bgcolor,textcolor);
		
	});
	
}

function fyydPutInfoBoxCuration(boxid,curation,bgcolor,textcolor) {
		
	var out = '\
		<div class="container-fyyd" style="background-color:'+bgcolor+'">\
			<div class="uk-grid">\
				<div class="uk-width-small-1-1 uk-width-1-3">\
					<a href="'+curation['url']+'"><img class="fyyd-podcast-image" src="'+curation['smallImageURL']+'"></a>\
				</div>\
				<div class="uk-width-small-1-1 uk-width-2-3" >\
						<h4><a style="color:'+textcolor+'" href="'+curation['url']+'">'+curation['title']+'</a></h4>\
						<div style="color:'+textcolor+'">'+wordTrim(curation['description'],150)+'</div>\
				</div>\
			</div>\
			<ul class="uk-list uk-list-striped uk-margin" style="max-height:400px;overflow-y:scroll">\
		';
					
	curation['episodes'].forEach( function(episode,index,array) {
		out = out+'\
					<li><div class="uk-grid">\<div class="uk-width-small-1-3 uk-width-1-5	uk-margin-small">\
						<a href="'+episode['url_fyyd']+'"><img class="fyyd-podcast-image" width=80 src="'+episode['imgURL']+'"></a>\
					</div>\
					<div class="uk-width-small-2-3 uk-width-4-5  uk-text-small">\
						<div class="l-box"><a href="'+episode['url_fyyd']+'">'+wordTrim(episode['title'],100)+'</a></div>\
					</div></div></li>\
		';
	});
					
	var out=out+'</ul>\
				<div class="row-fyyd" style="margin-top:0.5rem">\
				<div class="uk-text-right uk-width-1-1">\
					<small><a style="color:'+textcolor+'" href="'+curation['url']+'"><i>'+curation['title']+'</i> on fyyd.de</a></small>\
				</div>\
			</div></div>';
	
	jQuery('#fyyd-'+boxid).html(
		out
	);
	
}

/************************
*
*	Episode Infobox
*
**************************/


function fyydGetEpisode(byType,episode_id,podcast_id,boxid,color) {
	
	fyyd_spinner(boxid);
	
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
			
			fyydPutInfoBoxEpisode(boxid,episode,podcast,bgcolor,textcolor);
		
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
			
			
				fyydPutInfoBoxEpisode(boxid,episode,podcast,bgcolor,textcolor);
				
			})
		});
	}
}


function fyydPutInfoBoxEpisode(boxid,episode,podcast,bgcolor,textcolor) {
	var out = '\
		<div class="container-fyyd" style="background-color:'+bgcolor+'">\
			<div class="uk-grid">\
				<div class="uk-width-small-1-1 uk-width-1-3">\
					<a href="'+podcast['htmlURL']+'"><img class="fyyd-podcast-image" src="'+podcast['smallImageURL']+'"></a>\
				</div>\
				<div class="uk-width-small-1-1 uk-width-2-3">\
					<h4><a style="color:'+textcolor+'" href="'+episode['url']+'">'+podcast['title']+': '+episode['title']+'</a></h4>\
					<div style="color:'+textcolor+'">'+wordTrim(episode['description'].replace(/<[^>]+>/g, ''),300)+'</div>\
				</div>\
			</div>\
			<div class="uk-text-right uk-width-1-1">\
				<small><a style="color:'+textcolor+'" href="'+podcast['url_fyyd']+'"><i>'+podcast['title']+'</i> on fyyd.de</a></small>\
			</div>\
		</div>';
	
	jQuery('#fyyd-'+boxid).html(
		out
	);
}

/************************
*
*	Episode Comments Infobox
*
**************************/

function fyydGetEpisodeComments(id,boxid) {
	
	var params = {};
	params['episode_id']=id;
	
	fyydCallAPI('episode/comments',params).then(function(json) {
	
		var post = json['data']['post'];
		var replies = json['data']['replies'];
		fyydPutPost(boxid,post);
		fyydPutReplies(boxid,replies);
			
	})
}


function fyydPutPost(boxid,post) {
	var out = '\
		<div class="row">\
		<h4>Kommentare</h4>\
		</div>\
		<div class="container-fyyd">\
			<div class="row-fyyd start-md start-lg" style="border-bottom:1px solid #ddd;">\
			<div class="col-xs-2 col-sm-3 col-md-3 col-lg-3">\
					<a href="'+post['account']['url']+'"><img class="fyyd-podcast-image" width=70 src="'+post['account']['avatar']+'"></a>\
				</div>\
				<div class="fyyd-row col-xs-10 col-sm-9 col-md-9 col-lg-9">\
					<div class="col-xs">\
						'+post['content']+'\
					</div>\
				</div>\
			</div>\
			<div class="row-fyyd" style="margin-top:0.5rem">\
				<div class="col-xs end-xs">\
				</div>\
			</div>\
		</div>';
	jQuery('#fyyd-'+boxid).html(
		out
	);
}

function fyydPutReplies(boxid,replies) {

	var out = '';
	
	for (var i = 0; i < replies.length; i++) {
		out+=fyydBuildReplies(replies[i],0);
	}	
	
	jQuery('#fyyd-episode-comments-'+boxid).html(out);

}

function fyydBuildReplies(reply,level) {
	
	var html = '\
		<div class="fyyd-comment" >\
			<div class="row-fyyd start-md start-lg" style="border-bottom:1px solid #ddd;margin-top:1rem">\
				<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">\
					<a href="'+reply['account']['url']+'"><img class="fyyd-podcast-image" width=60 src="'+reply['account']['avatar']+'"></a>\
				</div>\
				<div class="fyyd-row col-xs-10 col-sm-10 col-md-10 col-lg-10 fyyd-comment-post">\
					<div class="col-xs">\
						<p><a  class="fyyd-comment-author" href="'+reply['account']['url']+'">'+reply['account']['username']+'</a></p>\
						'+reply['content']+'\
					</div>\
				</div>\
			</div>\
			<div class="row-fyyd" style="margin-top:0.5rem">\
				<div class="col-xs end-xs">\
				</div>\
			</div>\
		';
	
	for (var i = 0; i < reply['replies'].length; i++) {
		html+=fyydBuildReplies(reply['replies'][i],level+1);
	}	
	html+='</div>';
	return html;
	
}


function fyyd_spinner(boxid) {
	
	jQuery('#fyyd-'+boxid).html(
		spinner_block
	);
}


function fyyd_display_error(boxid,msg) {
	
	jQuery('#fyyd-'+boxid).html(
		'<div class="fyyd-error-message"><p>'+msg+'</p></div>'
	);
	
}

var fyyd_spinner_img="<img width='40' height='40' alt='waiting for fyyd.de' src='data:image/gif;base64,\
R0lGODlhKAAoAJEAAJzOnEikSP///wCAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNU\
Dw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4On\
htcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDU\
uNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYg\
eG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gP\
HJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY2\
9tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyI\
geG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJl\
ZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4b\
XBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjlFNUY5Nzk0QTJFOTExRTlCQUQxQzVGQjYwRjI3RkNFIi\
B4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjlFNUY5Nzk1QTJFOTExRTlCQUQxQzVGQjYwRjI3RkN\
FIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OUU1Rjk3OTJB\
MkU5MTFFOUJBRDFDNUZCNjBGMjdGQ0UiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OUU1Rjk3O\
TNBMkU5MTFFOUJBRDFDNUZCNjBGMjdGQ0UiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj\
4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6un\
o5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCv\
rq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2d\
XRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PD\
s6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwI\
BAAAh+QQEMgAAACwAAAAAKAAoAAACupSPCBAxP9pKtFoAs37T+oNtYhZ8lzOmEGAq6guVLQrDskeP\
TP3cVJg65F4+0CsxVLGQqaIhGXSllhSoyPeiVnnGLK4ms2q0TJiBNyAjxCtgTS0kut/fJltXH93xF\
vGeX9GENuYhOMiRt/FH2Nc0BwP3pBLwqJQowoIWKbDH8rf5Z1DJWPF349VYIwVYZtMqUooWqPKKmj\
AKEcfj1GWHxrt6qNgigPtLLLqIiRy8y1yxA/lswtDQI8FcAAAh+QQEMgAAACwAAAAAKAAoAAACv5S\
PCRDtm6Kcgo2L8w2A+mNpotZ9UTimGGeC6ku2AEyv31znAYXneRnxCQfAw3CoOAqLSqSh16yVAqnF\
EqoxpFxS48gqSsKKgi81e3qRtZpGTILFrJ/ts20Snxvsrx0+oyfAB+MHdxE4uJJSeIKoknjXcgC5Q\
bkhudcX1yZpeVhGaOL5WcMYMXpBR2M6Weq1epqDgHrZ6org40ebKhalMrcrxGrrmzE8WxzpEfyIue\
kTSMFci5mwy1KNh1KJbVIAACH5BAQyAAAALAAAAAAoACgAAAK7lI8JwTMcQJq0CuCy1tH6E2ziKH0\
TNqZbZxqhCmvl98b2MFf1jap5sosFDrGfoWcbImKUm0OZgEFdzikCKcpVLVgR6Ga92kpgbrkrCh/Q\
qYvQ7MQFV/D4QqU+xjNzfn3f5/AHqDIYF/hgCIaY57b3gJhYweYTKUlBSZL5pNgmUDYJaskZWkQEi\
sn0haoA83NIEXkCu+QaS/tpq3O42Uj1mOK7CizTokf8YGQymmWMuZmh7Hy1sMMAID1RAAAh+QQEMg\
AAACwAAAAAKAAoAAACvJSPCMHjHgBItNb1snbSehRsohZ8FjCm2mQeoQpDrfDGcfnV9u3pO09B/YY\
sxA/nUyWSI5yBKXIKdtLnzmWrYmOsbM4mEKq0FGgmDCNXzBy22uI2v3spuacDbzbvHDqV/1BU5nWy\
IbhE4nN4ILZSmNGgcaGyOEXS+JCAKXLIuenAuFM0YpAiQfQ5gJM6xHXQCjugEPvTSQs0e0s5qcvp1\
xtowkY0w1o7Y4ARG4Gce1TZrDwG3aywwICNN1MAADs='>";

var spinner_block='\
<div class="uk-width-1-1 uk-panel uk-text-center uk-vertical-align" style="height:200px">\
	<div class="uk-margin-top uk-vertical-align-middle"><p>'+fyyd_spinner_img+'</p><p>fyyd.de</p></div>\
</div>';