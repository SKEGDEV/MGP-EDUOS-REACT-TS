# Especificación: Sistema de Captura de Criaturas

**Estado:** 🟡 Aprobado para desarrollo  
**Autor:** skegdeveloper  
**Fecha:** 16 de Mayo, 2026  
**Tecnologías:** React + TypeScript, TanStackQuery, TanStackRouter, Tailwind + Saas Module  

## 1. Resumen
Es un sistema que simula un sistema operativo en su forma visual empleando tecnicas de desarrollo limpio y escalable con React por lo que tienes que tomar tu roll de desarrollador senior en React con TypeScript, y experto en UI/UX y usando principios SOLID y reglas de clean code para el desarrollo de la misma.

Idea principal:
Escogi un sistema operativo simulado por la sencilla razon en este sistema podre agregar por medio de JSON configurable, autenticacion para todos mis demas proyectos que estaran integrados como un ecosistema unificado y los posibles reclutadores podran validar mi trabajo tanto de arquitectura como de uso de IA y comprension de la tecnologia que estoy solicitando. El concepto del sistema sera Jedi y Sith es decir el lado oscuro y lado de la luz entonces con esa idea necesito que me hagas una interface super creativa con este concepto algo fuera de lo comun, me gusta la idea de algo basado en windows pero mas mezclado con un linux xde, pero que tengan el concepto de Jedi y Sith (Jedi para el modo claro y Sith para el modo oscuro).

primer proyecto a implementar por medio de JSON:
Nombre: Tetris
URL: https://skegdeveloper.online/tetris/
WindowSizeDefault: 40%

## 2. Historias de Usuario
* **Como** Desarrollador, **quiero** que el manejo de estado sea manejado por medio de redux, **para** de esta forma poder tener una estructura escalable a futuro cuando el proyecto crezca y pensando tambien como un producto a futuro
* **Como** Desarrollador, **quiero** que el consumo de API quede configurado con TanStackQuery donde saque lo necesario para la sesion del estado global de la aplicacion redux, y que centralice la logica de consumo de la API por medio de un hook, **para** que cuando yo implemente el consumo de api pueda aprovechar esta facilidad y realizar la logica de negocio de una forma mas sencilla
* **Como** Desarrollador, **quiero** que los componentes puedan ser reutilizables siguiendo las buenas practicas de react y typescript, y que dichos componentes no contengan logica compleja esta debe vivir en hooks especializados **para** que de esta forma la vista quede unicamente con la logica local y no de aplicacion
* **Como** Desarrollador, **quiero** que todas responsabilidades se dividan en capas siguiendo los principios de clean architecture en react, **para** que de esta forma la aplicacion pueda ser escalable con facilidad y mantenible de igual forma sin afectar a los nuevos desarrolladores que se unan al proyecto
* **Como** Desarrollador, **quiero** que se utilice pnpm para instalar, ejecutar y desplegar la aplicacion, **para** de esta forma no tener los problemas de seguridad que ha estado teniendo npm y de concurrencia, ya que npm no el mejor gestor de paqutes hoy en dia
* **Como** desarrollador, **quiero** que las rutas se manejen con TanStackRouter y para la comunicacion entre paginas lo dejo a tu criterio que es mejor si utilizar url query (ruta?valor=value&valor2=value2&valorn=valuen) o el estado global de la aplicacion redux o un estado mas cerrado a los componentes que lo ocupen con useReduce y useContext, **para** de esta forma tener una forma moderna y limpia de manejo de rutas
* **Como** desarrollador, **quiero** que el sistema se comporte identico a un sistema operativo es decir, que las ventanas se puedan mover con el mouse libremente (por lo menos en la vista de computador) que se puedan abrir varias, que se puedan establecer igual a windows a un costado, full pantalla y 2 o mas ventanas en una misma pantalla, **para** que la experiencia de usuario sea lo mas intuitiva posible y adaptable
* **Como** desarrollador, **quiero** que los estilos sean manejados en una fusion con saas module y Tailwind, **para** que de esta forma lo complicado y que requiera animaciones o simplemente css puro lo hagas con saas module y lo mas normalito con Tailwind
* **Como** desarrollador, quiero que sea configurable con archivos JSON tanto las aplicaciones "Instaladas" por asi decirlo como de sesion, **para** de esta forma poder agregar nuevos proyectos al ecosistema y que estos puedan ser integrados por medio de Iframe que creo que es lo mas practico como si de aplicaciones se tratara, asi como tener un modo demo con la sesion configurando en un JSON la url de la api y si esta en modo demo o no
* **Como** desarrollador, **quiero** que la interface sea responsiva es decir que tenga una version mobile y una version de escritorio, **para** de esta forma mi trabajo pueda ser dado a conocer en cualquier dispositivo
* **Como** desarrollador, **quiero** que el login tenga las funcionalidades de crear cuenta, iniciar sesion y pantallas de recuperacion de contrasena por medio de correo electronico teniendo una donde se reciba el correo y otra el codigo enviado y validacion del mismo, **para** que de esta forma pueda tener nuevos usuarios siempre
* **Como** desarrollador, **quiero** que la interface sea unica y antes de ir al inicio de sesion pregunte si quiere pertenecer al lado oscuro o ser un jedi para predefinir el tema (claro en configuraciones se puede cambiar), **para** de esta forma seguir la tematica que te pedi, se me ocurria que al menu se le podria agregar un buscador de aplicaciones funcional primero, y segundo un borde configurable con neon al rededor como si el usuario haya seleccionado un sable de luz


## 3. Criterios de Aceptación (Gherkin)
```gherkin
Escenario: por ahora tendra 4 aplicaciones pre instaladas, navegador(apuntando un iframe a google) con dinamica de pestanas y eso, las configuraciones una ventana mas normal, para cambiar el sable de luz, tema y otras configuraciones que se te ocurran funcionales, un about que apunte a la pagina principal de mi github: https://github.com/SKEGDEV para que de esta forma me pueda dar a conocer, y el proyecto que te deje de tetris 
Escenario: poder iniciar sesion en modo demo para cuando no haya api, por ahora dejalo solo en modo demo yo configurare lo demas al rato 
Escenario: las ventanas pueden ser minimizables y configurables a mano como si de un sistema operativo real se tratara 
Escenario: Debe tener un README.md con instrucciones de implementacion tanto de los JSON como de las rutas de la api, y su instalacion, despliegue y debuggeo con npm, pnpm y yarn
