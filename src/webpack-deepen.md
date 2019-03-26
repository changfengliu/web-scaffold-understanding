# webpack 工作原理

<mermaid>
graph LR;  
A-->BB;    
A-->C;  
BB-->D;  
C-->D;
</mermaid>

<mermaid>
sequenceDiagram
	participant Alice
	participant Bob
	Alice->John: Hello John, how are you?
	loop Healthcheck
		John->John: Fight against hypochondria
	end
	Note right of John: Rational thoughts <br/>prevail...
	John-->Alice: Great!
	John->Bob: How about you?
	Bob-->John: Jolly good!
</mermaid>

<mermaid>
classDiagram
Class01 <|-- AveryLongClass : Cool
Class03 *-- Class04
Class05 o-- Class06
Class07 .. Class08
Class09 --> C2 : Where am i?
Class09 --* C3
Class09 --|> Class07
Class07 : equals()
Class07 : Object[] elementData
Class01 : size()
Class01 : int chimp
Class01 : int gorilla
Class08 <--> C2: Cool label
</mermaid>
