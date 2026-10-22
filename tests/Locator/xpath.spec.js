/*
Xpath -XPath stands for XML Path Language. It's an expression language that is used to query or transform. We use it to traverse among elements and attributes in an XML document. 
-use to Find particular elements or attributes with matching patterns
-use to Extract information from any part of an XML document
-use to Uniquely identify or address parts of an XML document

//	         Selects nodes in the document from the current node that match the selection no matter where they are
/	         Selects the root node
tagname    	 Tag name of the current node
@	         Select the attribute
attribute	 Attribute name of the node
value	     Value of the attribute

*/


/*

Relative path -XPath begins with the double forward slash ‘//’ which means it can search the element anywhere in the Webpage. 


ID+tag -Targets only <a> tags with that specific ID.

https://demoblaze.com/
Example of xpath:-a[@id='login2']
https://www.amazon.in/
Example of xpath:-//input[@id='twotabsearchtextbox']


*[starts-with(@id, 'user_')]-ID Starts With-Useful for dynamic IDs that share a common prefix
Example of xpath: -//*[starts-with(@id, 'login')]
https://www.amazon.in/
Example of xpath: -//*[starts-with(@id, 'twotabsearchtextbox')]

*[contains(@id, 'submit')] -Finds any element whose ID contains the specified substring.
Example of xpath:-//*[contains(@id, 'login')]

Tag[contains(@id, 'Login')] -Finds  element in the tag specified whose ID contains the specified substring.
Example of xpath: -a[contains(@id, 'login2')] 
https://www.amazon.in/
Examples
//*[contains(@id, 'twotab')]
//*[contains(@id, 'nav')]

Has Any ID - Selects all elements on the page that possess an ID attribute.
Example of xpath:- //*[@id='login2'] 
https://www.amazon.in/
//*[@id='twotabsearchtextbox']

Uses of AND and OR in XPath -
input[@value = 'Log In' or @type = 'submit']
https://www.amazon.in/
//input[@ id="twotabsearchtextbox" or @role="searchbox"]//works
//input[@id="twotabsearchtextbox" and @aria-label="Search Amazon.in"]//works
//span[@id="nav-search-submit-text" and @aria-label="Go"]//works
//span[@id="nav-search-submit-text" and @aria-label="Search Amazon.in"]//doesn't work
//span[@id="nav-search-submit-text" or @aria-label="Search Amazon.in"] //works

Example -//a[@id ='login2' or data-toggle="modal"] will work
//a[@id ='login2' or type="text"]  will work
//a[@id ='login2' and data-toggle="modal"] will work
//a[@id ='login2' and type="text"]  will not work as type text is not present

Absolute XPath: Absolute XPath uses the root element of the HTML/XML code and followed by all the elements which are necessary to reach the desired element. It starts with the forward slash '/' . Generally, Absolute XPath is not recommended because in future any of the web element when added or removed then Absolute XPath changes.

Example for login 

xpath: /html[1]/body[1]/nav[1]/div[1]/ul[1]/li[5]/a[1]

Example for samsung product
xpath: /html[1]/body[1]/div[5]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/h4[1]/a[1]

https://www.amazon.in/
click on mobile link in home page 
xpath: /html[1]/body[1]/div[1]/header[1]/div[1]/div[5]/div[2]/div[1]/div[1]/ul[1]/li[2]/div[1]/a[1]


*/

/*

• / (Child): Selects direct children from the node set. Example: //div/child
• // (Descendant): Selects descendants at any level under the current node. Example: //div//span

Common XPath Axes (Relationships)

• ancestor::  : Selects all ancestors of the current node. Example: //span[text()='Submit']/ancestor::form    
• ancestor-or-self::  : Selects the current node and its ancestors.
• parent::    : Selects the direct parent of the current node. Example: //span/parent::div
• child::     : Selects direct children (default if no axis is specified).
• descendant::    : Selects all descendants.
• following-sibling::    : Selects siblings after the current node. Example: //label[@for='email']/following-sibling::input
• preceding-sibling::    : Selects siblings before the current node. Example: //input[@id='email']/preceding-sibling::label
• following::    : Selects everything in the document after the closing tag of the current node.
• preceding::   : Selects everything in the document before the opening tag of the current node

*/

/*

website : https://www.amazon.in/

ancestor::  : Selects all ancestors of the current node.
xpath: //input[@type='text']/ancestor::div  - 7 results found

ancestor-or-self::  : Selects the current node and its ancestors.
xpath://input[@type='text']/ancestor-or-self::div - 7 results found

parent::    : Selects the direct parent of the current node.
xpath: //input/parent::div  -2 results found

child::     : Selects direct children
xpath: //div/child::input - 5 results found
    //span/child::a - 4 results found 

descendant::    : Selects all descendants.
The XPath descendant axis selects all child elements, grandchild elements, and sub-elements beneath the current context node.
xpath: //div[@class="nav-search-field "]/descendant::* - 2 results

descendant::input

//div[@class="nav-right"]/descendant::input - 1 result
//div[@class="nav-right"]/descendant::span - 15 results
//div[@class="nav-right"]/descendant::span[1] - 2 result

descendant-or-self :
Selects all descendants (children, grandchildren, etc.) of the current node and the current node itself
xpath: 
//div[@class="nav-search-field "]/descendant-or-self::* - 3 result

following-sibling:: Selects siblings after the current node. Example: //label[@for='email']/following-sibling::input
xpath: 
//div[@class="nav-search-field "]/following::* - 1 result

following::    : Selects everything in the document after the closing tag of the current node. 
xpath: 
//div /following::form -->selects  form tag in the document after div tab closed
//input/following::label --> selects label tag in the document after input with closing tag

//div[@class="nav-search-field "]/following::* - 3737 result

preceding::   : Selects everything in the document before the opening tag of the current node
xpath: 
//div[@class="nav-search-field "]/preceding::* - 223 result

preceding-sibling::    : Selects siblings before the current node. Example: //input[@id='email']/preceding-sibling::label
xpath: 
//div[@class="nav-search-field "]/preceding::* -0 result
////div[@class="nav-right"]/preceding-sibling::* - 6 result


Some other xpaths locators
---------------------------
Position()-selects an element based on its position in the list of matching nodes

//div[@class= 'navFooterLinkCol navAccessibility']//ul/li[position()=4]

last()- selects  the last element in a set of matching nodes

//div[@class= 'navFooterLinkCol navAccessibility']//ul/li[last()]


contains - matches elements that contain a specific substring within an attribute.
-----------
//a[contains(@href,"/mobile")]


starts-with() --matches element whose attribute values start with a specified string
--------------
//a*[starts-with(@href,"/mobile")] - 2 result

text() - selects the element based on the exact text content of the element
-----------
//*[starts-with(@href,"/mobile")] - 1 result

normalize()- ignores the both side space of the string
------------
//a[normalize-space()='Computers']
//a[normalize-space()='Electronics'] ->the string electronics have space on both side in the html
*/