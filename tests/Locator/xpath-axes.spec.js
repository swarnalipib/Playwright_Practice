/*
XPATH AXES
-------------------

Xpath axes defines the relationship between the current node and nodes in the document .
They allow you to navigate through elements and attributes in an XML document.

Here are the primary Xpath axes :-
1.self
2.parent
3.child
4.ancestor
5.ancestor-or-self
6.descendant
7.descendant-or-self
8.following
9.preceding
10.following-sibling
11.preceding-sibling

<html>
<head><title>My Webpage</title>
</head>
<body>
<bookstore>

<book category="cooking">
  <title lang="en">Everyday Italian</title>
  <author>Giada De Laurentiis</author>
  <year>2005</year>
  <price>30.00</price>
</book>

<book category="children">
  <title lang="en">Harry Potter</title>
  <author>J K. Rowling</author>
  <year>2005</year>
  <price>29.99</price>
</book>

<book category="web">
  <title lang="en">XQuery Kick Start</title>
  <author>James McGovern</author>
  <author>Per Bothner</author>
  <author>Kurt Cagle</author>
  <author>James Linn</author>
  <author>Vaidyanathan Nagarajan</author>
  <year>2003</year>
  <price>49.99</price>
</book>

<book category="web">
  <title lang="en">Learning XML</title>
  <author>Erik T. Ray</author>
  <year>2003</year>
  <price>39.95</price>
  <color type="blue">
    <colord>indigo</colord>
    <colort>navy</colord>
  </color>
</book>

</bookstore>

</body>
</html>


1.self -The current node itself.
usecase: Verifying the exact element or changing node tests.
//author[normalize-space()='Giada De Laurentiis']/self::* 

//  ->o/p- 1 current node itseld 
<author>Giada De Laurentiis</author> ->highlighted

2.parent -The immediate, direct parent node.
usecase: Moving one step up the hierarchy.
//author[normalize-space()='Giada De Laurentiis']/parent::* 
//o/p - 1
<book category="cooking">

3.child -All immediate, direct child nodes.
usecase:Accessing direct sub-elements 
//book[@category="cooking"]/child::*

//op - 4
<title lang="en">Everyday Italian</title>
  <author>Giada De Laurentiis</author>
  <year>2005</year>
  <price>30.00</price>

  or

  //book[@category="cooking"]/child::author
  //op - 1
  <author>Giada De Laurentiis</author>

  or

  //book[@category="web"]/child::*
  o/p -13

4.ancestor - Parents, grandparents, and all the way up to the root node.
usecase:Finding a broad wrapper or form element far above.

//book[@category="cooking"]/ancestor::*
//op-3
<html>
<body>
<bookstore>

or

//book[@category="children"]/ancestor::body 
//op-1
<body>

5.ancestor-or-self -current node + Parents, grandparents, and all the way up to the root node.
//book[@category="cooking"]/ancestor-or-self::*
//op-3
<html>
<body>
<bookstore>
<book category="cooking">


6.descendant - Children, grandchildren, and all nested elements below.
usecase:Searching a vast subtree for a nested element.

//book[@category="web"]/descendant::*
o/p-15

  <title lang="en">XQuery Kick Start</title>
  <author>James McGovern</author>
  <author>Per Bothner</author>
  <author>Kurt Cagle</author>
  <author>James Linn</author>
  <author>Vaidyanathan Nagarajan</author>
  <year>2003</year>
  <price>49.99</price>
  <title lang="en">Learning XML</title>
  <author>Erik T. Ray</author>
  <year>2003</year>
  <price>39.95</price>
  <color type="blue">
    <colord>indigo</colord>
    <colort>navy</colord>
or
//book[@category="web"]/descendant::price
//op-2
<price>49.99</price>
<price>39.95</price>
or
//book[@category="web"]/descendant::color
o/p-1
 <color type="blue">

 or 

 //color[@type='blue']/descendant-or-self::*
 o/p-2

    <colord>indigo</colord>
    <colort>navy</colord>

7.descendant-or-self- current node + Children, grandchildren, and all nested elements below.

//color[@type='blue']/descendant-or-self::*
o/p-3 it includes current node also

color type="blue">
    <colord>indigo</colord>
    <colort>navy</colord>


8.following -Every element in the document that comes after the current node's closing tag.
usecase :Jumping out of the current structural container to find something later.

//book[@category="web"]/following::*
o/p-9
<book category="web">
  <title lang="en">Learning XML</title>
  <author>Erik T. Ray</author>
  <year>2003</year>
  <price>39.95</price>
  <color type="blue">
    <colord>indigo</colord>
    <colort>navy</colord>
    <script>


9.following-sibling -Elements on the same level that come after the current node.
usecase: Finding a text input box that sits right next to a form label.

//book[@category="web"]/following-sibling::*
o/p-1
book[@category="web"]
or

//book[@category="cooking"]/following-sibling::*
o/p-3
<book category="children">
<book category="web">
<book category="web">

10.preceding -Every element in the document that comes before the current node (minus ancestors).
usecase:Locating earlier document nodes structurally unrelated to the parent tree.
//book[@category="web"][1]/preceding::*
o/p -12


<html>
<bookstore>

<book category="cooking">
  <title lang="en">Everyday Italian</title>
  <author>Giada De Laurentiis</author>
  <year>2005</year>
  <price>30.00</price>


<book category="children">
  <title lang="en">Harry Potter</title>
  <author>J K. Rowling</author>
  <year>2005</year>
  <price>29.99</price>

11.preceding-sibling -Elements on the same level that come before the current node.
usecase:Finding a checkbox that sits right before a specific label string.

//book[@category="web"][1]/preceding-sibling::*
o/p -2
<book category="children">
<book category="cooking">

*/