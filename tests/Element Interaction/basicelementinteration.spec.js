//Basic element interaction 


/*


1. Clicks & Mouse Actions

• Click element: await locator.click() (supports left, right, middle clicks, modifiers, and options like { force: true })
• Double click: await locator.dblclick()
• Right click (Context click): await locator.click({ button: 'right' })
• Hover over element: await locator.hover() (triggers menus and tooltips)
• Focus on element: await locator.focus()
• Force click	locator.click({ force: true })

2. Form & Text Inputs

• Fill text (Clear & type): await locator.fill('text') (clears existing text and triggers input/change events)
• Clear text: await locator.clear() (empties an input or textarea)
• Type character by character: await locator.pressSequentially('text', { delay: 50 }) (simulates real keyboard keystrokes)
• Press single keyboard key: await locator.press('Enter') or await page.keyboard.press('Control+A')

3. Checkboxes, Radios & Dropdowns

• Check a checkbox or radio: await locator.check()
• Uncheck a checkbox: await locator.uncheck()
• Set checkbox state programmatically: await locator.setChecked(true) (or false)
• Select dropdown option: await locator.selectOption('value') (can select by value, label, or index like { label: 'Option 1' })

4. File Uploads & Drag-and-Drop

• Upload file(s): await locator.setInputFiles('path/to/file.pdf') (or an array of paths)
• Drag and drop: await sourceLocator.dragTo(targetLocator)

5. Scrolling & Visibility

• Scroll element into view: await locator.scrollIntoViewIfNeeded()
• Mouse wheel scroll: await page.mouse.wheel(0, 500)



Basic interaction commands
Action	                      Playwright command
Click	                      locator.click()
Double-click	              locator.dblclick()
Right-click	                  locator.click({ button: 'right' })
Force click	                  locator.click({ force: true })
Hover	                      locator.hover()
Focus	                      locator.focus()
Remove focus	              locator.blur()
Fill text field	              locator.fill('Hello')
Type character-by-character   locator.pressSequentially('Hello')
Clear text field	          locator.clear()
Press a key                   locator.press('Enter')
Check checkbox	              locator.check()
Uncheck checkbox	          locator.uncheck()
Select radio button	          locator.check()
Select dropdown option	      locator.selectOption('value')
Upload file	                  locator.setInputFiles('file.pdf')
Scroll into view	          locator.scrollIntoViewIfNeeded()
Drag and drop	              source.dragTo(target)

//Keyboard
Command	                     Description
press <key>             	Press a key (e.g., Enter, ArrowLeft, a)
keydown <key>           	Press key down
keyup <key>	                Release key
type <text>	                Type text key by key into the focused element


Quick reference by HTML element
HTML element	                     Common commands
<input>	                        fill(), clear(), press(), inputValue()
<textarea>                  	fill(), clear(), pressSequentially()
<button>	                    click(), dblclick(), hover(), isEnabled()
<a>	                            click(), getAttribute('href')
<select>	                    selectOption(), inputValue()
<input type="checkbox">	        check(), uncheck(), isChecked()
<input type="radio">        	check(), isChecked()
<input type="file">          	setInputFiles()
<iframe>                    	frameLocator()
<div> / <span>               	click(), hover(), innerText(), textContent()
Any locator                 	count(), isVisible(), isEnabled(), focus(), blur()

*/