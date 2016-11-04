function adMessage() {
  var a = localStorage.getItem('saidmessage');
  
  if(a == null) {
    $('body').append('<div id="ad_msg" style="color: rgb(250,250,250); position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: rgba(100,100,100,0.9); text-align: center;"><h1 style="font-size: 60px;">Yes, ads suck.</h1><p style="max-width: 500px; display: inline-block;">We know that ads can distrupt the user experience, but they are also one of the few viable options for covering server costs. The amount of people that we get on this site every day amazes us, and we are doing our best to try and keep up with the unprecedented amount of traffic. With a big update planned to roll out in the next two months, we will need to increase server capacity to keep this site up and running. We thank you for understanding. You guys are awesome.</p><br><div id="close_ad_msg" style="cursor: pointer; border: 2px solid rgb(200,200,200); display: inline-block; padding: 4px;">Close</div></div>')
  
    $("#close_ad_msg").click(function() {
      $("#ad_msg").hide();
    })
    localStorage.setItem('saidmessage', 'true');
  }
}