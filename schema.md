graph TD
%% contenidors
A[fa:fa-child Walking Santiago] 
	
A-->B[fa:fa-home Introducción]


B-->C[fa:fa-map Mapa de etapas]
B-->D[fa:fa-walking Etapas al detalle]
B-->E[fa:fa-university fa:fa-bed Lugares<br> de visita y<br> descanso]
B-->F[fa:fa-suitcase Equipaje   ]
B-->G[fa:fa-envelope fa:fa-phone Contacto]

C-->H(Representación cartográfica <br> de etapas y localidades.<br> <br> Buscador de etapas <br> y localidades por nombre. <br><br> Creación de 'popups' informativos.)
D-->I(Etapas: <br/><br>Breve descripción de las etapas. <br><br>Longitud en km.)
E-->J(Localidades del inicio <br> y fin de etapa: <br> <br>Breve descripción de la localidad. <br><br>Número de albergues.)
F-->K(Equipaje básico <br> para realizar el Camino.)
G-->L(Formulario de contacto. <br><br> Número de teléfono y<br> dirección e-mail.)

%% estils
classDef p1 fill:#C0E1FF,stroke:#000000,stroke-width:2px;
classDef p2 fill:#E4F0FF,stroke:#000000,stroke-width:1px;
classDef p3 fill:#FFFAD5,stroke:#000000,stroke-width:0.5px;

class A p1;
class B,C,D,E,F,G p2;
class H,I,J,K,L p3;
