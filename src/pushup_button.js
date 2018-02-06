(function() {

	window.SteemMoreInfo.Utils.addSettings({
		title : 'Pushup Button',
		settings : [{
			title : '',
			key : 'PushupButton',
			defaultValue : 'enabled',
			options : [{
				title : 'Disabled',
				value : 'disabled'
			}, {
				title : 'Enabled',
				value : 'enabled'
			}],
			description : 'Adds pushup button for easy content promotion using <a class="smi-navigate" href="/@pushup">@pushup</a> bot.<br>'
		}]
	});

	var isPushupButtonEnabled = function() {
		var value = window.SteemMoreInfo.Utils.getSettingsValue('PushupButton');
		return value === 'enabled';
	};
	
	



  var createTransferUI = function(category, author, permlink) {
    var link = window.location.origin + '/' + category + '/@' + author + '/' + permlink;

    var modal = $('<div role="dialog" style="bottom: 0px; left: 0px; overflow-y: scroll; position: fixed; right: 0px; top: 0px;">\
      <div class="reveal-overlay fade in" style="display: block;"></div>\
      <div class="reveal fade in" role="document" tabindex="-1" style="display: block; min-height: 200px;">\
        <button class="close-button" type="button">\
          <span aria-hidden="true" class="">×</span>\
        </button>\
      </div>\
    </div>');

    var loading = $(window.SteemMoreInfo.Utils.getLoadingHtml({
      center: true
    }));
    modal.find('.reveal').append(loading);

    modal.find('.close-button').on('click', function() {
      modal.remove();
    });
    modal.find('.reveal-overlay').on('click', function() {
      modal.remove();
    });

    
    transferUI = $('<div>\
          <form>\
            <div class="row">\
	          <div class="column small-12">\
				<h4 class="column">pushup</h4>\
	            <p class="column">Advertise this post with <a href="/@pushup" target="_blank" rel="noopener">@pushup</a> service</p>\
	            <hr>\
	          </div>\
	          <div class="column small-2" style="padding-top: 5px;">Amount</div>\
              <div class="column small-10">\
                <div class="input-group" style="margin-bottom: 5px;">\
                  <input type="text" name="amount" value="5" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" autofocus="">\
                  <span class="input-group-label" style="padding-left: 0px; padding-right: 0px;">\
                    <select name="asset" placeholder="Asset" style="min-width: 5rem; height: inherit; background-color: transparent; border: none;">\
                      <option value="SBD" selected>SBD</option>\
                      <option value="STEEM">STEEM</option>\
                    </select>\
                  </span>\
                </div>\
                <div class="amount-error">\
                </div>\
                <div class="amount-upvote">\
                </div>\
              </div>\
            </div>\
            <br>\
            <br>\
            <div class="row">\
              <div class="column">\
                <span>\
                <button type="submit" disabled="" class="button">Bid</button>\
                </span>\
              </div>\
            </div>\
          </form>\
        </div>');

    //transferUI.find('input[name="memo"]').val(link);
    // transferUI.find('input[name="amount"]').val(min);

    var validate = function() {
      var amount = transferUI.find('input[name="amount"]').val();
      var error = true;
      amount = amount && parseFloat(amount);
      if(typeof amount === 'number'){
        error = false;
      }
      if(error){
        transferUI.find('button[type="submit"]').attr('disabled', 'disabled');
      }else{
        transferUI.find('button[type="submit"]').attr('disabled', null);
      }
      return !error;
    };

    transferUI.find('input').on('input', function() {
      validate();
    });

    transferUI.find('form').on('submit', function(e) {
      e.preventDefault();
      if(!validate()){
        return;
      }
      var to = 'pushup';
      var amount = transferUI.find('input[name="amount"]').val() + ' ' + transferUI.find('select[name="asset"]').val();
      // var memo = transferUI.find('input[name="memo"]').val();
      var memo = link;
      var url = 'https://v2.steemconnect.com/sign/transfer?to=' + encodeURIComponent(to) + '&amount=' + encodeURIComponent(amount) + '&memo=' + encodeURIComponent(memo);

      var transferWindow = window.open();
      transferWindow.opener = null;
      transferWindow.location = url;
    });

    validate();

      
      
    loading.remove();
    modal.find('.reveal').append(transferUI);

//    };

    $('body').append(modal);

  };
  
  	

	var addPushupButton = function() {
		
		var loggedIn = window.SteemMoreInfo.Utils.getLoggedUserName() != null;

	    if(!isPushupButtonEnabled() || !loggedIn){
	    	return;
	    }
	    
	    var pushable = function(author, permlink) {
			// notPushed
			// lessThanMaxAgeF
			return true;
		};
	
	    // var pushupButton = '<img class="pushup-button" src="https://steemitimages.com/DQmbHmA8aFK76XUSTPoudCqckjiCPuMkMNgxZ8pXb7MaQdP/image.png"/>';
	
		
		$('ul.PostsList__summaries li').each(function(index) {
			if ($('.pushup-button', this).length != 0){
				return;
			}
			var url =  $('h2.entry-title a:first', this).attr('href');
			if (url != null){
				var match = url.match(/^\/([^\/]*)\/@([^\/]*)\/(.*)$/);
				var category = match[1];
				var author = match[2];
				var permlink = match[3];
				if (pushable(author, permlink)){
				    var pushupButton = $('<img class="pushup-button" src="https://steemitimages.com/DQmbHmA8aFK76XUSTPoudCqckjiCPuMkMNgxZ8pXb7MaQdP/image.png"/>');				
					$('.articles__summary-footer', this).append(pushupButton);
					pushupButton.on('click', function() {
						createTransferUI(category, author, permlink);
					});  
										
				}
			}			
		});

		
		$('.PostFull__footer .Voting').each(function(index) {
			if (pushable(this)) {
				// $( this ).append(pushupButton);		
			}
		});
		$('.Comment__footer .Comment__footer__controls').each(function(index) {
			//except comments by @pushup
			if (pushable(this)) {
				// $( this ).append(pushupButton);		
			}
		});
		
		
	};

    //var promoteButton = $('.Promote__button');
	
	// if (pushable)
	
	// 
	// var post_footer = $('.PostFull__footer row');
	
	// $('.Voting').after(pushupButton);
/*
	pushupButton.on('click', function() {
		var url = window.location.pathname;
		var match = url.match(/^\/([^\/]*)\/@([^\/]*)\/(.*)$/);
		var category = match[1];
		var author = match[2];
		var permlink = match[3];
		// createTransferUI(category, author, permlink);
	});   
  */  
    
    // $.each( article_footers, function( index, footer ) {
	  	// console.log( index + ": " + footer + ": " + $(footer) );
		// footer.append(pushupButton);	
		// //footer.append( "<strong>Hello</strong>" );
// 
	// });
	
	





  $('body').attrchange(function(attrName) {
    if(attrName === 'class'){
      if($('body').hasClass('with-post-overlay')) {
        addPushupButton();
      }
    }
  });

  window.SteemMoreInfo.Events.addEventListener(window, 'changestate', function() {
    setTimeout(function() {
      addPushupButton();
    }, 100);
  });


  addPushupButton();

})();
