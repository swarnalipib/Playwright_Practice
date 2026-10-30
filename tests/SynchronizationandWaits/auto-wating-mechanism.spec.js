/*
//An auto-waiting mechanism is a built-in feature in modern web testing and automation
frameworks (like Playwright and Cypress) that automatically checks if an element is 
 ready before performing an action on it.

 Playwright performs a range of actionability checks on the elements before making actions to ensure these actions behave as expected. It auto-waits for all the relevant checks to pass and only then performs the requested action. If the required checks do not pass within the given timeout, action fails with the TimeoutError.

For example, for locator.click(), Playwright will ensure that:

locator resolves to exactly one element
element is Visible
element is Stable, as in not animating or completed animation
element Receives Events, as in not obscured by other elements
element is Enabled

complete list of actionability checks performed for each action:

Action	                    Visible	Stable	ReceivesEvents	Enabled	Editable
locator.check()	               Yes	Yes	     Yes	          Yes	    -
locator.click()	               Yes	Yes	     Yes	          Yes   	-
locator.dblclick()	           Yes	Yes	     Yes	          Yes	    -
locator.setChecked()	       Yes	Yes	     Yes	          Yes	    -
locator.tap()	               Yes	Yes	     Yes	          Yes	    -
locator.uncheck()              Yes	Yes	     Yes	          Yes	    -
locator.hover()                Yes	Yes	     Yes	           -	    -
locator.dragTo()	           Yes	Yes	     Yes	           -	    -
locator.screenshot()	       Yes	Yes	       -	           -	    -
locator.fill()	               Yes	-	       -	           Yes   	Yes
locator.clear()	               Yes	-	       -	           Yes	    Yes
locator.selectOption()         Yes	-	       -	           Yes	     -
locator.selectText()	       Yes	-	       -	            -	     -
locator.scrollIntoViewIfNeeded()-	Yes	       -	            -	     -
locator.blur()	                -	-	       -	            -	     -
locator.dispatchEvent()        	-	-	-	-	-
locator.focus()	                -	-	-	-	-
locator.press()                 -	-	-	-	-
locator.pressSequentially()     -	-	-	-	-
locator.setInputFiles()	        -	-	-	-	-

note- Some actions like locator.click() support force option that disables non-essential actionability checks,

Visible
Element is considered visible when it has non-empty bounding box and does not have visibility:hidden computed style.

Note that according to this definition:

Elements of zero size are not considered visible.
Elements with display:none are not considered visible.
Elements with opacity:0 are considered visible.
Stable
Element is considered stable when it has maintained the same bounding box for at least two consecutive animation frames.

Enabled
Element is considered enabled when it is not disabled.

Element is disabled when:

it is a <button>, <select>, <input>, <textarea>, <option> or <optgroup> with a [disabled] attribute;
it is a <button>, <select>, <input>, <textarea>, <option> or <optgroup> that is a part of a <fieldset> with a [disabled] attribute;
it is a descendant of an element with [aria-disabled=true] attribute.
Editable
Element is considered editable when it is enabled and is not readonly.

Element is readonly when:

it is a <select>, <input> or <textarea> with a [readonly] attribute;
it has an [aria-readonly=true] attribute and an aria role that supports it.
Receives Events
Element is considered receiving pointer events when it is the hit target of the pointer event at the action point. For example, when clicking at the point (10;10), Playwright checks whether some other element (usually an overlay) will instead capture the click at (10;10).

For example, consider a scenario where Playwright will click Sign Up button regardless of when the locator.click() call was made:

page is checking that user name is unique and Sign Up button is disabled;
after checking with the server, the disabled Sign Up button is replaced with another one that is now enabled

*/