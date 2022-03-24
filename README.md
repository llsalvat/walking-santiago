# Walking Santiago

## Tema y motivación
En el desarrollo de esta web, he escogido la temática del Camino de Santiago, en concreto el Camino Francés. Con ello he descargado las etapas principales del Camino desde la ciudad francesa de Saint Jean Pied-de-Port hasta Santiago de Compostela; fuente del Instituto Geográfico Nacional. 
<br>
A parte, se ha realizado una digitalización de esas localidades inicio y fin de etapa. En estas se ha incluido información respecto al descanso del peregrino, en concreto, el número de albergues disponibles en la localidad. 
<br>
Otros recursos publicados en la web corresponden a una breve descripción de las Etapas y las Localidades de inicio y fin de etapa. 
<br>
También se han incluído imágenes de cada una de las localidades en: images/supply_points.
<br>
Finalmente, también se incluye un relato sobre qué materiales concretos y consejos respecto al equipaje debe llevar un peregrino en realización del Camino.

*los datos descriptivos se han extraído de: https://www.alberguescaminosantiago.com/poblaciones/o-pedrouzo-la-coruna-camino-de-santiago/  <br>
https://www.columbus-outdoor.com/blog/llevar-la-mochila-camino-santiago/ <br>
https://marlycamino.com/es/como-organizar-una-mochila-para-el-camino-de-santiago/
*


## Datos 

**bold text**

*italicized text*
> blockquote

1. First item
2. Second item
3. Third item

- First item
- Second item
- Third item

`code`

Inline `code` example...
<br>
---

## Estructura de la web
```mermaid

    graph TD;
    A[fa:fa-child Walking Santiago]; 
    
    A-->B[fa:fa-home Introducción];

    B-->C[fa:fa-map Mapa de etapas];
    B-->D[fa:fa-walking Etapas al detalle];
    B-->E[fa:fa-university fa:fa-bed Lugares de visita y descanso];
    B-->F[fa:fa-suitcase Equipaje];
    B-->G[fa:fa-envelope fa:fa-phone Contacto];

    C-->H(Representación cartográfica <br> de etapas y localidades.<br> <br> Buscador de etapas <br> y localidades por nombre. <br><br> Creación de 'popups' informativos.);
    D-->I(Etapas: <br/><br>Breve descripción de las etapas. <br><br>Longitud en km.);
    E-->J(Localidades del inicio <br> y fin de etapa: <br> <br>Breve descripción de la localidad. <br><br>Número de albergues.);
    F-->K(Equipaje básico <br> para realizar el Camino.);
    G-->L(Formulario de contacto. <br><br> Número de teléfono y<br> dirección e-mail.);


    classDef p1 fill:#C0E1FF,stroke:#000000,stroke-width:2px;
    classDef p2 fill:#E4F0FF,stroke:#000000,stroke-width:1px;
    classDef p3 fill:#FFFAD5,stroke:#000000,stroke-width:0.5px;

    class A p1;
    class B,C,D,E,F,G p2;
    class H,I,J,K,L p3;
```


Un text explicatiu que apunta a aquest [link](https://www.example.com)

![alt text](images/Ways_ofSt._James_in_Europe.png)

## Cartografía con qgis2web
La siguiente imagen corresponde al diseño de impresión del mapa interactivo publicador en la web. 
<br>
<br>
![Una foto del Camino de Santiago francés](./images/icon/map1.png)

## Dificultades y mejoras

## Recursos
Enlaces a recursos:
https://www.markdownguide.org/cheat-sheet/ <br>
https://stackedit.io/ <br>
https://www.w3schools.com/html/default.asp

