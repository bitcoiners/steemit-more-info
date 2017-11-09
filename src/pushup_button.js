(function(){


  window.SteemMoreInfo.Utils.addSettings({
    title: 'Pushup Button',
    settings: [{
      title: '',
      key: 'PushupButton',
      defaultValue: 'enabled',
      options: [{
        title: 'Disabled',
        value: 'disabled'
      }, {
        title: 'Enabled',
        value: 'enabled'
      }],
      description: 'Add pushup button to posts for easy promotion using <a class="smi-navigate" href="/@pushup">@pushup</a> bot.' + 
      	'<a href="#positionOrigin" class="ui-btn ui-corner-all ui-shadow ui-btn-inline" ui-icon-delete ui-btn-icon-left data-rel="popup" data-position-to="origin" data-transition="flip">' + 
      	'Position to origin</a>' +
		'<a href="#positionOrigin" class="ui-btn ui-corner-all ui-shadow ui-btn-inline" ui-icon-delete ui-btn-icon-notext data-rel="popup" data-position-to="origin" data-transition="flip">' + 
      	'Position to origin</a>' +
		'<div data-role="popup" id="positionOrigin" class="ui-content" data-theme="a">' +
		'<p>I am positioned over the origin.</p>' +
		'</div>'	
    }]
  });


})();
