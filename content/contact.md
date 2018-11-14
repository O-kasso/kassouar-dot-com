+++
title = "Contact"
weight = 6
draft = false
+++

<form id="contactform" action="#contactformsent" method="POST" netlify-honeypot="robo" netlify>
	<div class="field half first">
		<input type="text" name="name" id="name" placeholder="Name"/>
	</div>
	<div class="field half">
		<input type="email" id="email" name="email" placeholder="Email">
		<input class="hidden" name="robo" placeholder="Don't fill this out if you're a human." style="display:none">
	</div>
	<div class="field">
		<textarea name="message" id="message" rows="4" placeholder="Message"></textarea>
	</div>
  <div data-netlify-recaptcha></div>
	<ul class="actions">
		<li><input type="submit" value="Send message" class="special" /></li>
		<li><input type="reset" value="Reset" /></li>
	</ul>
	<input type="text" name="_gotcha" style="display:none" />
</form>
