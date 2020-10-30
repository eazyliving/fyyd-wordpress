var fyydIcon = wp.element.createElement( "svg",  { version: "1.1", width: "16pt", height: "16pt", x: "0pt", y: "0px", viewBox: "0 0 368 368" }, wp.element.createElement("path", {"fill":"#008000", d: "M1.4 183.6C1.4 82.2 83.6 0 185 0c101.3 0 183.6 82.2 183.6 183.6 0 101.3-82.2 183.6-183.6 183.6C83.6 367.1 1.4 284.9 1.4 183.6zm149.9 119.3c6 6 15.5 6 21.5 0l108.5-108.5c6-6 6-15.5 0-21.5L172.8 64.3c-6-6-15.5-6-21.5 0l-24.4 24.4c-6 6-6 15.5 0 21.5l73.4 73.4-73.4 73.4c-6 6-6 15.5 0 21.5l24.4 24.4z" }));

( function( blocks, editor, element ) {
    var el = element.createElement;
    var RichText = editor.RichText;

    blocks.registerBlockType( 'fyyd/episode', {
        title: 'episode',
        icon: fyydIcon,
        category: 'fyyd',
 
        attributes: {
            episode_id: {
                type: 'string'
            },
			color: {
				type: 'string'
			}
        },
 
        edit: function(props) {
			function updateEpisodeID(event) {
			  props.setAttributes({episode_id: event.target.value})
			}
			function updateColor(value) {
			  props.setAttributes({color: event.target.value})
			}
			return React.createElement(
			 "div",
			  null,
			  React.createElement(
				"div",
				"",
			 	"fyyd episode shortcode"
			  ),
			  React.createElement(
				"div",
				null,
				"episode ID"
			  ),
			  React.createElement("input", { type: "text", value: props.attributes.episode_id, onChange: updateEpisodeID }), 
			  React.createElement(
				"div",
				null,
				"color"
			  ),
			  React.createElement("input", { type: "text", value: props.attributes.color, onChange: updateColor }),
			);
		  },
		  save: function(props) {
			return wp.element.createElement(
			  "",
			  "",
			  "[fyyd-episode episode_id="+props.attributes.episode_id+" color=" + props.attributes.color+"]"
			);
		  }
		
    } );
}(
    window.wp.blocks,
    window.wp.editor,
    window.wp.element
) );


